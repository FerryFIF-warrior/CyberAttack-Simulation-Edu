<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KnowledgeBaseController extends Controller
{
    public function index(AiClient $aiClient): Response
    {
        $documents = $aiClient->documents();
        $health = $aiClient->health();

        return Inertia::render('Admin/KnowledgeBase/Index', [
            'documents' => $documents['documents'],
            'aiError' => $documents['error'],
            'health' => $health,
        ]);
    }

    public function store(Request $request, AiClient $aiClient): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'sumber' => ['required', 'string', 'max:200'],
            'teks' => ['required', 'string', 'min:20', 'max:500000'],
        ]);

        $result = $aiClient->ingest(
            $validated['judul'],
            $validated['sumber'],
            $validated['teks'],
        );

        if ($result['error'] !== null) {
            if ($this->wantsJson($request)) {
                return response()->json(['message' => $result['error']], 502);
            }

            return back()->with('error', $result['error']);
        }

        $message = "Dokumen ter-index menjadi {$result['chunk_count']} chunk.";

        if ($this->wantsJson($request)) {
            return response()->json([
                'id' => $result['id'],
                'chunk_count' => $result['chunk_count'],
            ], 201);
        }

        return back()->with('status', $message);
    }

    public function destroy(Request $request, string $documentId, AiClient $aiClient): JsonResponse|RedirectResponse
    {
        $result = $aiClient->deleteDocument($documentId);

        if ($result['error'] !== null) {
            if ($this->wantsJson($request)) {
                return response()->json(['message' => $result['error']], 502);
            }

            return back()->with('error', $result['error']);
        }

        if ($this->wantsJson($request)) {
            return response()->json(['deleted' => $result['deleted']]);
        }

        return back()->with('status', 'Dokumen knowledge base dihapus.');
    }

    public function reindex(Request $request, AiClient $aiClient): JsonResponse|RedirectResponse
    {
        $result = $aiClient->reindex();

        if ($result['error'] !== null) {
            if ($this->wantsJson($request)) {
                return response()->json(['message' => $result['error']], 502);
            }

            return back()->with('error', $result['error']);
        }

        $message = "{$result['indexed']} dokumen di-index ulang ({$result['total_chunks']} chunk).";

        if ($this->wantsJson($request)) {
            return response()->json([
                'indexed' => $result['indexed'],
                'total_chunks' => $result['total_chunks'],
            ]);
        }

        return back()->with('status', $message);
    }

    private function wantsJson(Request $request): bool
    {
        return $request->wantsJson() && ! $request->header('X-Inertia');
    }
}
