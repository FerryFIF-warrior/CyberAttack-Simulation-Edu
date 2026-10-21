<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminKnowledgeBaseTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        config(['ai.admin_emails' => ['admin@example.com']]);

        return User::factory()->create(['email' => 'admin@example.com']);
    }

    public function test_non_admin_cannot_open_knowledge_base(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('admin.knowledge-base.index'))
            ->assertForbidden();
    }

    public function test_admin_can_list_documents_and_health(): void
    {
        Http::fake([
            '*' => Http::response([
                'status' => 'ok',
                'kb_chunks' => 12,
                'model_llm' => 'openai/gpt-oss-20b',
                'embedding' => 'paraphrase-multilingual-MiniLM-L12-v2',
                'documents' => [
                    [
                        'id' => 'doc-1',
                        'judul' => 'Phishing',
                        'sumber' => 'phishing.pdf',
                        'chunk_count' => 6,
                        'status' => 'indexed',
                        'indexed_at' => '2026-10-19T10:00:00+00:00',
                    ],
                ],
            ]),
        ]);

        $this->actingAs($this->admin())
            ->get(route('admin.knowledge-base.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/KnowledgeBase/Index')
                ->has('documents', 1)
                ->where('documents.0.judul', 'Phishing')
                ->where('health.kb_chunks', 12)
                ->where('aiError', null));
    }

    public function test_admin_can_ingest_documents_and_chunk_count_increases(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $admin = $this->admin();

        Http::fakeSequence()
            ->push(['id' => 'doc-1', 'chunk_count' => 5], 201)
            ->push(['id' => 'doc-2', 'chunk_count' => 9], 201);

        $payload = [
            'judul' => 'Dasar Phishing',
            'sumber' => 'materi-phishing.pdf',
            'teks' => 'Phishing adalah teknik rekayasa sosial yang menipu pengguna agar menyerahkan kredensial.',
        ];

        $this->actingAs($admin)
            ->postJson(route('admin.knowledge-base.store'), $payload)
            ->assertCreated()
            ->assertJsonPath('chunk_count', 5);

        $this->actingAs($admin)
            ->postJson(route('admin.knowledge-base.store'), $payload)
            ->assertCreated()
            ->assertJsonPath('chunk_count', 9);
    }

    public function test_admin_can_reindex_and_delete_documents(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $admin = $this->admin();

        Http::fake([
            '*/reindex' => Http::response(['indexed' => 4, 'total_chunks' => 24]),
            '*/documents/doc-1' => Http::response(['deleted' => true]),
        ]);

        $this->actingAs($admin)
            ->postJson(route('admin.knowledge-base.reindex'))
            ->assertOk()
            ->assertJsonPath('indexed', 4)
            ->assertJsonPath('total_chunks', 24);

        $this->actingAs($admin)
            ->deleteJson(route('admin.knowledge-base.destroy', 'doc-1'))
            ->assertOk()
            ->assertJsonPath('deleted', true);
    }

    public function test_admin_ingest_reports_ai_failure_without_crashing(): void
    {
        config(['ai.url' => 'http://ai.test']);
        $admin = $this->admin();

        Http::fake([
            '*' => Http::response('Service unavailable', 500),
        ]);

        $this->actingAs($admin)
            ->postJson(route('admin.knowledge-base.store'), [
                'judul' => 'Dasar MFA',
                'sumber' => 'materi-mfa.pdf',
                'teks' => 'MFA meminta lebih dari satu faktor verifikasi identitas pengguna.',
            ])
            ->assertStatus(502)
            ->assertJsonPath('message', 'AI Service gagal meng-index dokumen.');
    }
}
