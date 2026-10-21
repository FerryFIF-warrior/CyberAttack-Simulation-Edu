<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Throwable;

class AiClient
{
    /**
     * @param  array<int, array{role: string, content: string}>  $history
     * @return array{answer: string, sources: array<int, array{id: string, judul: string, halaman: int|null}>, status: string, distance: float|null}
     */
    public function chat(string $question, array $history = []): array
    {
        try {
            $response = $this->pending()->post('/chat', [
                'question' => $question,
                'history' => $history,
            ]);

            if (! $response->successful()) {
                return $this->chatError();
            }

            $data = $response->json();
            if (! is_array($data)) {
                return $this->chatError();
            }

            $status = (string) ($data['status'] ?? 'error');
            if (! in_array($status, ['ok', 'not_found', 'unsafe', 'error'], true)) {
                $status = 'error';
            }

            return [
                'answer' => (string) ($data['answer'] ?? ''),
                'sources' => $this->sources(Arr::get($data, 'sources', [])),
                'status' => $status,
                'distance' => is_numeric($data['distance'] ?? null) ? (float) $data['distance'] : null,
            ];
        } catch (Throwable) {
            return $this->chatError();
        }
    }

    /**
     * @return array{documents: array<int, array<string, mixed>>, error: string|null}
     */
    public function documents(): array
    {
        try {
            $response = $this->pending()->get('/documents');

            if (! $response->successful()) {
                return ['documents' => [], 'error' => 'AI Service menolak permintaan daftar dokumen.'];
            }

            $payload = $response->json();
            $documents = is_array($payload) && is_array($payload['documents'] ?? null)
                ? $payload['documents']
                : [];

            return [
                'documents' => $documents,
                'error' => null,
            ];
        } catch (Throwable) {
            return ['documents' => [], 'error' => 'AI Service tidak dapat dihubungi.'];
        }
    }

    /**
     * @return array{id: string|null, chunk_count: int, error: string|null}
     */
    public function ingest(string $judul, string $sumber, string $teks): array
    {
        try {
            $response = $this->pending()->post('/documents', [
                'judul' => $judul,
                'sumber' => $sumber,
                'teks' => $teks,
            ]);

            if (! $response->successful()) {
                return ['id' => null, 'chunk_count' => 0, 'error' => 'AI Service gagal meng-index dokumen.'];
            }

            return [
                'id' => (string) ($response->json('id') ?? ''),
                'chunk_count' => (int) $response->json('chunk_count', 0),
                'error' => null,
            ];
        } catch (Throwable) {
            return ['id' => null, 'chunk_count' => 0, 'error' => 'AI Service tidak dapat dihubungi.'];
        }
    }

    /**
     * @return array{deleted: bool, error: string|null}
     */
    public function deleteDocument(string $documentId): array
    {
        try {
            $response = $this->pending()->delete('/documents/'.rawurlencode($documentId));

            if (! $response->successful()) {
                return ['deleted' => false, 'error' => 'AI Service gagal menghapus dokumen.'];
            }

            return ['deleted' => (bool) $response->json('deleted', false), 'error' => null];
        } catch (Throwable) {
            return ['deleted' => false, 'error' => 'AI Service tidak dapat dihubungi.'];
        }
    }

    /**
     * @return array{indexed: int, total_chunks: int, error: string|null}
     */
    public function reindex(): array
    {
        try {
            $response = $this->pending()->post('/reindex');

            if (! $response->successful()) {
                return ['indexed' => 0, 'total_chunks' => 0, 'error' => 'AI Service gagal melakukan reindex.'];
            }

            return [
                'indexed' => (int) $response->json('indexed', 0),
                'total_chunks' => (int) $response->json('total_chunks', 0),
                'error' => null,
            ];
        } catch (Throwable) {
            return ['indexed' => 0, 'total_chunks' => 0, 'error' => 'AI Service tidak dapat dihubungi.'];
        }
    }

    /**
     * @return array{status: string, kb_chunks: int, model_llm: string|null, embedding: string|null}
     */
    public function health(): array
    {
        try {
            $response = $this->pending()->get('/health');

            if (! $response->successful()) {
                return ['status' => 'error', 'kb_chunks' => 0, 'model_llm' => null, 'embedding' => null];
            }

            return [
                'status' => (string) $response->json('status', 'ok'),
                'kb_chunks' => (int) $response->json('kb_chunks', 0),
                'model_llm' => $response->json('model_llm'),
                'embedding' => $response->json('embedding'),
            ];
        } catch (Throwable) {
            return ['status' => 'error', 'kb_chunks' => 0, 'model_llm' => null, 'embedding' => null];
        }
    }

    private function pending(): PendingRequest
    {
        return Http::baseUrl($this->baseUrl)
            ->timeout($this->timeout)
            ->acceptJson();
    }

    /**
     * @return array<int, array{id: string, judul: string, halaman: int|null}>
     */
    private function sources(mixed $sources): array
    {
        if (! is_array($sources)) {
            return [];
        }

        return array_values(array_map(function (mixed $source): array {
            $source = is_array($source) ? $source : [];

            return [
                'id' => (string) ($source['id'] ?? ''),
                'judul' => (string) ($source['judul'] ?? 'Materi'),
                'halaman' => is_numeric($source['halaman'] ?? null) ? (int) $source['halaman'] : null,
            ];
        }, $sources));
    }

    /**
     * @return array{answer: string, sources: array<int, array{id: string, judul: string, halaman: int|null}>, status: string, distance: float|null}
     */
    private function chatError(): array
    {
        return [
            'answer' => 'AI sedang tidak tersedia - materi & simulator tetap dapat digunakan.',
            'sources' => [],
            'status' => 'error',
            'distance' => null,
        ];
    }

    public function __construct(
        private readonly string $baseUrl,
        private readonly int $timeout,
    ) {}
}
