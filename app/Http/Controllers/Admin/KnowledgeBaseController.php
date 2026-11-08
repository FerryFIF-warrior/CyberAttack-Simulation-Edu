<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Jembatan Laravel -> AI Service (Flask) untuk FR-16.
 * Dokumen dan embedding disimpan di AI Service, bukan di MySQL.
 * API key hanya ada di backend (.env), tidak pernah dikirim ke browser (NFR-04).
 *
 * Kontrak endpoint yang diharapkan dari AI Service:
 *   GET    /documents        -> {"documents":[{"id","title","source","status","chunks","created_at"}]}
 *   POST   /documents        -> body {title, source, content}
 *   DELETE /documents/{id}
 *   POST   /index            -> memulai proses indexing ulang
 */
class KnowledgeBaseController extends Controller
{
    private function configured(): bool
    {
        return filled(env('AI_SERVICE_URL'));
    }

    private function client(): PendingRequest
    {
        return Http::baseUrl(rtrim((string) env('AI_SERVICE_URL'), '/'))
            ->withHeaders(['X-API-Key' => (string) env('AI_SERVICE_KEY', '')])
            ->acceptJson()
            ->timeout(5);
    }

    public function index(): Response
    {
        $connected = false;
        $message = null;
        $documents = [];

        if (! $this->configured()) {
            $message = 'AI_SERVICE_URL belum diisi di file .env.';
        } else {
            try {
                $res = $this->client()->get('/documents');
                if ($res->successful()) {
                    $connected = true;
                    $documents = $res->json('documents') ?? [];
                } else {
                    $message = 'AI Service membalas dengan status ' . $res->status() . '.';
                }
            } catch (\Throwable $e) {
                $message = 'AI Service tidak dapat dihubungi. Materi dan simulator tetap berfungsi.';
            }
        }

        return Inertia::render('Admin/KnowledgeBase', compact('connected', 'message', 'documents'));
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'source' => ['nullable', 'string', 'max:200'],
            'content' => ['required', 'string'],
        ]);

        return $this->forward(fn () => $this->client()->post('/documents', $data), 'Gagal menambahkan dokumen.');
    }

    public function destroy(string $id): RedirectResponse
    {
        return $this->forward(fn () => $this->client()->delete('/documents/' . $id), 'Gagal menghapus dokumen.');
    }

    public function reindex(): RedirectResponse
    {
        return $this->forward(fn () => $this->client()->post('/index'), 'Gagal memulai indexing.');
    }

    private function forward(callable $call, string $failMessage): RedirectResponse
    {
        if (! $this->configured()) {
            return back()->withErrors(['service' => 'AI_SERVICE_URL belum diisi di file .env.']);
        }

        try {
            $res = $call();
            if (! $res->successful()) {
                return back()->withErrors(['service' => $failMessage . ' (status ' . $res->status() . ')']);
            }
        } catch (\Throwable $e) {
            return back()->withErrors(['service' => 'AI Service tidak dapat dihubungi.']);
        }

        return back();
    }
}
