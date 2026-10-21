<?php

namespace Tests\Feature;

use App\Services\AiClient;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AiClientTest extends TestCase
{
    public function test_chat_parses_distance_and_sources(): void
    {
        Http::fake([
            '*' => Http::response([
                'status' => 'ok',
                'answer' => 'Jawaban dari konteks.',
                'sources' => [
                    ['id' => 'doc-1', 'judul' => 'Materi MFA', 'halaman' => 3],
                ],
                'distance' => 0.31,
            ]),
        ]);

        $result = (new AiClient('http://ai.test', 8))->chat('Apa itu MFA?');

        $this->assertSame('ok', $result['status']);
        $this->assertSame(0.31, $result['distance']);
        $this->assertSame('Materi MFA', $result['sources'][0]['judul']);
        $this->assertSame(3, $result['sources'][0]['halaman']);
    }

    public function test_chat_maps_connection_failure_to_error(): void
    {
        Http::fake([
            '*' => Http::response('Service unavailable', 503),
        ]);

        $result = (new AiClient('http://ai.test', 8))->chat('Apa itu MFA?');

        $this->assertSame('error', $result['status']);
        $this->assertSame([], $result['sources']);
        $this->assertStringContainsString('AI sedang tidak tersedia', $result['answer']);
    }

    public function test_admin_calls_return_error_when_ai_service_is_down(): void
    {
        Http::fake([
            '*' => Http::response('Service unavailable', 500),
        ]);

        $client = new AiClient('http://ai.test', 8);

        $this->assertSame('AI Service menolak permintaan daftar dokumen.', $client->documents()['error']);
        $this->assertSame('AI Service gagal meng-index dokumen.', $client->ingest('Judul', 'sumber.pdf', 'Teks materi yang cukup panjang.')['error']);
        $this->assertSame('AI Service gagal melakukan reindex.', $client->reindex()['error']);
    }
}
