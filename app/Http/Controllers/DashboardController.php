<?php

namespace App\Http\Controllers;

use App\Support\LabCatalog;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        // Progres dummy mahasiswa. Ganti dengan query ke tabel progress bila sudah ada.
        $progress = [
            'phishing' => ['status' => 'selesai', 'score' => 92, 'completed_at' => '2026-04-02'],
            'brute-force' => ['status' => 'selesai', 'score' => 88, 'completed_at' => '2026-03-20'],
            'sql-injection' => ['status' => 'berjalan', 'score' => null, 'completed_at' => null],
        ];

        $modules = collect(LabCatalog::all())
            ->map(fn (array $lab) => $lab + $progress[$lab['slug']])
            ->all();

        $total = count($modules);
        $done = collect($modules)->where('status', 'selesai')->count();
        $percent = $total > 0 ? (int) round($done / $total * 100) : 0;
        $lastModule = collect($modules)->where('status', 'selesai')->sortByDesc('completed_at')->first();

        return view('dashboard', [
            'student' => [
                'name' => 'Mahasiswa D3 TI UNS',
                'nim' => 'K3123001',
                'semester' => 'Semester Genap 2025/2026',
            ],
            'modules' => $modules,
            'total' => $total,
            'done' => $done,
            'percent' => $percent,
            'lastModule' => $lastModule,
            'competencies' => [
                ['label' => 'Teori & Konsep Keamanan', 'value' => 100],
                ['label' => 'Analisis Log & Telemetry Simulasi', 'value' => 85],
                ['label' => 'Implementasi Kode Mitigasi', 'value' => 40],
            ],
        ]);
    }
}
