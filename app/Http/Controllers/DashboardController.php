<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        $progress = [
            'phishing' => ['status' => 'selesai', 'score' => 92, 'completed_at' => '2026-04-02'],
            'bruteforce' => ['status' => 'selesai', 'score' => 88, 'completed_at' => '2026-03-20'],
            'sqli' => ['status' => 'berjalan', 'score' => null, 'completed_at' => null],
            'auth' => ['status' => 'berjalan', 'score' => null, 'completed_at' => null],
        ];

        $modules = collect(config('simulation.labs'))
            ->map(fn (array $lab) => $lab + ($progress[$lab['slug']] ?? [
                'status' => 'berjalan',
                'score' => null,
                'completed_at' => null,
            ]))
            ->values()
            ->all();

        $total = count($modules);
        $done = collect($modules)->where('status', 'selesai')->count();
        $percent = $total > 0 ? (int) round($done / $total * 100) : 0;
        $lastModule = collect($modules)->where('status', 'selesai')->sortByDesc('completed_at')->first();

        return view('dashboard', [
            'student' => [
                'name' => auth()->user()->callsign,
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
