<?php

namespace Tests\Feature;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ChatAITest extends TestCase
{
    use RefreshDatabase;

    private function sessionFor(User $user): ChatSession
    {
        return ChatSession::factory()->create([
            'user_id' => $user->id,
            'title' => 'Sesi Baru',
        ]);
    }

    public function test_chat_page_lists_only_the_users_sessions(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();
        $this->sessionFor($user);
        $this->sessionFor($other);

        $this->actingAs($user)
            ->get(route('chat-ai'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ChatAI/Index')
                ->has('sessions', 1)
                ->where('sessions.0.title', 'Sesi Baru'));
    }

    public function test_relevant_question_returns_answer_sources_and_saves_history(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $user = User::factory()->create();
        $session = $this->sessionFor($user);

        Http::fake([
            '*' => Http::response([
                'status' => 'ok',
                'answer' => 'Phishing adalah teknik rekayasa sosial untuk menipu pengguna.',
                'sources' => [
                    ['id' => 'doc-1', 'judul' => 'Phishing Website Detection', 'halaman' => 2],
                ],
                'distance' => 0.23,
            ]),
        ]);

        $this->actingAs($user)
            ->postJson(route('chat.messages.store', $session), [
                'question' => 'Apa itu phishing?',
            ])
            ->assertOk()
            ->assertJsonPath('status', 'ok')
            ->assertJsonPath('distance', 0.23)
            ->assertJsonPath('assistant_message.message', 'Phishing adalah teknik rekayasa sosial untuk menipu pengguna.')
            ->assertJsonCount(1, 'assistant_message.source_refs');

        $this->assertDatabaseCount('chat_messages', 2);
        $this->assertDatabaseHas('chat_messages', [
            'session_id' => $session->id,
            'role' => 'user',
            'message' => 'Apa itu phishing?',
        ]);

        $assistant = ChatMessage::where('session_id', $session->id)
            ->where('role', 'assistant')
            ->firstOrFail();

        $this->assertSame('Phishing Website Detection', $assistant->source_refs[0]['judul']);
        $this->assertSame('Apa itu phishing?', $session->fresh()->title);
    }

    public function test_out_of_scope_question_returns_not_found(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $user = User::factory()->create();
        $session = $this->sessionFor($user);

        Http::fake([
            '*' => Http::response([
                'status' => 'not_found',
                'answer' => 'Maaf, informasi tidak ditemukan di dokumen.',
                'sources' => [],
                'distance' => 0.91,
            ]),
        ]);

        $this->actingAs($user)
            ->postJson(route('chat.messages.store', $session), [
                'question' => 'Siapa presiden Indonesia saat ini?',
            ])
            ->assertOk()
            ->assertJsonPath('status', 'not_found')
            ->assertJsonPath('assistant_message.message', 'Maaf, informasi tidak ditemukan di dokumen.')
            ->assertJsonPath('distance', 0.91);

        $this->assertDatabaseCount('chat_messages', 2);
    }

    public function test_unsafe_request_returns_unsafe_without_crashing(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $user = User::factory()->create();
        $session = $this->sessionFor($user);

        Http::fake([
            '*' => Http::response([
                'status' => 'unsafe',
                'answer' => 'Maaf, saya hanya dapat membantu pembelajaran keamanan siber yang defensif.',
                'sources' => [],
                'distance' => null,
            ]),
        ]);

        $this->actingAs($user)
            ->postJson(route('chat.messages.store', $session), [
                'question' => 'Buatkan malware untuk mencuri password',
            ])
            ->assertOk()
            ->assertJsonPath('status', 'unsafe')
            ->assertJsonPath('assistant_message.message', 'Maaf, saya hanya dapat membantu pembelajaran keamanan siber yang defensif.');

        $this->assertDatabaseCount('chat_messages', 2);
    }

    public function test_ai_service_failure_shows_fallback_and_keeps_history(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $user = User::factory()->create();
        $session = $this->sessionFor($user);

        Http::fake([
            '*' => Http::response('Service unavailable', 500),
        ]);

        $this->actingAs($user)
            ->postJson(route('chat.messages.store', $session), [
                'question' => 'Apa itu MFA?',
            ])
            ->assertOk()
            ->assertJsonPath('status', 'error')
            ->assertJsonPath('assistant_message.message', 'AI sedang tidak tersedia - materi & simulator tetap dapat digunakan.');

        $this->assertDatabaseCount('chat_messages', 2);
    }

    public function test_feedback_is_stored_and_isolated_by_owner(): void
    {
        $user = User::factory()->create();
        $session = $this->sessionFor($user);
        $message = $session->messages()->create([
            'role' => 'assistant',
            'message' => 'Jawaban contoh.',
        ]);

        $this->actingAs($user)
            ->patchJson(route('chat.messages.feedback', $message), ['feedback' => 1])
            ->assertOk()
            ->assertJsonPath('message.feedback', 1);

        $this->assertDatabaseHas('chat_messages', [
            'id' => $message->id,
            'feedback' => 1,
        ]);
    }

    public function test_non_owner_cannot_read_send_delete_or_feedback(): void
    {
        $owner = User::factory()->create();
        $intruder = User::factory()->create();
        $session = $this->sessionFor($owner);
        $message = $session->messages()->create([
            'role' => 'assistant',
            'message' => 'Jawaban privat.',
        ]);

        $this->actingAs($intruder)
            ->getJson(route('chat.sessions.messages', $session))
            ->assertForbidden();

        $this->actingAs($intruder)
            ->postJson(route('chat.messages.store', $session), ['question' => 'Apa itu MFA?'])
            ->assertForbidden();

        $this->actingAs($intruder)
            ->patchJson(route('chat.messages.feedback', $message), ['feedback' => 0])
            ->assertForbidden();

        $this->actingAs($intruder)
            ->deleteJson(route('chat.sessions.destroy', $session))
            ->assertForbidden();

        $this->assertDatabaseHas('chat_sessions', ['id' => $session->id]);
    }

    public function test_session_can_be_created_and_deleted_by_owner(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson(route('chat.sessions.store'))
            ->assertCreated()
            ->assertJsonPath('session.title', 'Sesi Baru');

        $sessionId = $response->json('session.id');

        $this->actingAs($user)
            ->deleteJson(route('chat.sessions.destroy', $sessionId))
            ->assertOk()
            ->assertJsonPath('deleted', true);

        $this->assertDatabaseMissing('chat_sessions', ['id' => $sessionId]);
    }

    public function test_chat_page_does_not_expose_ai_secrets(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('chat-ai'))
            ->assertOk()
            ->assertDontSee('GROQ_API_KEY')
            ->assertDontSee('gsk_');

        $response->assertInertia(fn (Assert $page) => $page
            ->component('ChatAI/Index')
            ->missing('groq_api_key')
            ->missing('key'));

        $this->assertArrayNotHasKey('key', config('ai'));
        $this->assertArrayNotHasKey('groq_api_key', config('ai'));
    }
}
