<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Services\AiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class ChatMessageController extends Controller
{
    private const FALLBACK_ANSWER = 'AI sedang tidak tersedia - materi & simulator tetap dapat digunakan.';

    public function storeSession(Request $request): JsonResponse
    {
        $session = $request->user()->chatSessions()->create([
            'title' => 'Sesi Baru',
        ]);

        return response()->json([
            'session' => $session->toSummaryArray(),
        ], 201);
    }

    public function messages(ChatSession $chatSession): JsonResponse
    {
        Gate::authorize('view', $chatSession);

        $messages = $chatSession->messages()
            ->orderBy('id')
            ->get()
            ->map(fn (ChatMessage $message) => $message->toChatArray())
            ->all();

        return response()->json(['messages' => $messages]);
    }

    public function storeMessage(
        Request $request,
        ChatSession $chatSession,
        AiClient $aiClient,
    ): JsonResponse {
        Gate::authorize('view', $chatSession);

        $validated = $request->validate([
            'question' => ['required', 'string', 'max:1000'],
        ]);

        $question = trim($validated['question']);
        if ($question === '') {
            return response()->json([
                'message' => 'Pertanyaan tidak boleh kosong.',
            ], 422);
        }

        $history = $chatSession->messages()
            ->orderByDesc('id')
            ->limit(10)
            ->get()
            ->reverse()
            ->map(fn (ChatMessage $message) => [
                'role' => $message->role,
                'content' => $message->message,
            ])
            ->values()
            ->all();

        $userMessage = $chatSession->messages()->create([
            'role' => 'user',
            'message' => $question,
        ]);

        $result = $aiClient->chat($question, $history);
        $status = $result['status'];
        $answer = trim((string) $result['answer']);

        if ($answer === '') {
            $status = 'error';
            $answer = self::FALLBACK_ANSWER;
        }

        $assistantMessage = $chatSession->messages()->create([
            'role' => 'assistant',
            'message' => $answer,
            'source_refs' => $result['sources'] !== [] ? $result['sources'] : null,
        ]);

        if ($chatSession->title === 'Sesi Baru') {
            $chatSession->title = Str::limit($question, 60);
            $chatSession->save();
        }
        $chatSession->touch();

        return response()->json([
            'status' => $status,
            'distance' => $result['distance'],
            'session' => $chatSession->fresh()->loadCount('messages')->toSummaryArray(),
            'user_message' => $userMessage->toChatArray(),
            'assistant_message' => $assistantMessage->toChatArray(),
        ]);
    }

    public function updateFeedback(Request $request, ChatMessage $chatMessage): JsonResponse
    {
        Gate::authorize('view', $chatMessage->session);

        $validated = $request->validate([
            'feedback' => ['required', 'integer', 'in:0,1'],
        ]);

        $chatMessage->update([
            'feedback' => (int) $validated['feedback'],
        ]);

        return response()->json([
            'message' => $chatMessage->fresh()->toChatArray(),
        ]);
    }

    public function destroy(ChatSession $chatSession): JsonResponse
    {
        Gate::authorize('delete', $chatSession);

        $chatSession->delete();

        return response()->json(['deleted' => true]);
    }
}
