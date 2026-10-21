<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SimulationController extends Controller
{
    /**
     * Judul floor per simulasi & level (fallback: "Floor N").
     *
     * @var array<string, array<int, array<int, string>>>
     */
    private const FLOOR_TITLES = [
        'phishing' => [
            1 => [1 => 'Email Hadiah Palsu', 2 => 'SMS Phishing Mengatasnamakan Bank', 3 => 'Lampiran Berbahaya', 4 => 'Urgensi Palsu', 5 => 'Ujian Akhir: Detektif Email'],
            3 => [1 => 'Pengintaian Diam-Diam', 2 => 'Kampanye, Bukan Email Tunggal', 3 => 'Penyamaran Vendor Tepercaya', 4 => 'Jebakan di Rapat Virtual', 5 => 'Tekanan dari Dalam', 6 => 'Ujian Akhir: Memutus Rantai Kampanye'],
            4 => [1 => 'Pengintaian Lintas Platform', 2 => 'Email yang Terlalu Sempurna', 3 => 'Serangan Dua Tahap', 4 => 'Penyamaran Internal yang Terverifikasi Sebagian', 5 => 'Tekanan Waktu dan Otoritas Ganda', 6 => 'Insiden yang Disamarkan sebagai Latihan', 7 => 'Ujian Akhir: Membedakan Kampanye Asli dari Latihan Resmi'],
        ],
        'bruteforce' => [
            1 => [1 => 'Serangan Dictionary: Password Lemah', 2 => 'Menahan Serangan dengan Rate Limiting', 3 => 'Kunci Akun dengan Account Lockout', 4 => 'Lapisan Tambahan: CAPTCHA & MFA', 5 => 'Ujian Akhir: Pertahanan Berlapis'],
            3 => [1 => 'Pengintaian Infrastruktur', 2 => 'Botnet Terdistribusi', 3 => 'Serangan Meniru Perilaku Manusia', 4 => 'Menyasar API Pihak Ketiga', 5 => 'Respons Insiden Skala Besar', 6 => 'Ujian Akhir: Pertahanan Adaptif'],
            4 => [1 => 'Pengintaian Pola Pertahanan', 2 => 'Serangan Low-and-Slow', 3 => 'Penyusupan Lewat Akun Layanan', 4 => 'False Flag', 5 => 'Celah di Proses Pemulihan Setelah Lockout', 6 => 'Serangan Terkoordinasi Lintas Zona Waktu', 7 => 'Ujian Akhir: Memilah Insiden Nyata dari Gangguan Wajar'],
        ],
        'sqli' => [
            3 => [1 => 'Injeksi Tertunda', 2 => 'Menukar Label Kewenangan', 3 => 'Mengirim Kabar Lewat Jalur Lain', 4 => 'Jejak yang Bukan Miliknya', 5 => 'Godaan Alat Serba Otomatis', 6 => 'Ujian Akhir: Laporan Rantai Lanjutan'],
            4 => [1 => 'Celah di Lapisan Cache', 2 => 'Injeksi Lewat Data yang Tampak Tidak Berbahaya', 3 => 'Celah yang Sudah Diperbaiki Sebagian', 4 => 'Serangan Berantai Antar-Layanan', 5 => 'False Positive yang Disengaja', 6 => 'Celah di Fitur Aman Buatan Sendiri', 7 => 'Ujian Akhir: Dua Laporan Mirip, Satu Palsu'],
        ],
        'auth' => [
            3 => [1 => 'Pengintaian Rantai Kepercayaan', 2 => 'Rantai Kepercayaan Pihak Ketiga', 3 => 'Token yang Dipakai Ulang', 4 => 'Serangan di Tengah Jalan', 5 => 'Eskalasi dari Akses Terbatas ke Akses Penuh', 6 => 'Ujian Akhir: Laporan Arsitektur Kepercayaan'],
            4 => [1 => 'Pengintaian Kebijakan Pemulihan Akun', 2 => 'Token Palsu yang Terlihat Sah', 3 => 'Pembajakan Sesi via Perangkat yang Dipercaya', 4 => 'Serangan terhadap Mekanisme Ingat Saya', 5 => 'Penyamaran lewat Akun Dukungan Bayangan', 6 => 'Downgrade Diam-Diam', 7 => 'Ujian Akhir: Permintaan Akses Darurat yang Ambigu'],
        ],
    ];

    public function index(): Response
    {
        $slugs = array_keys(config('simulation.labs', []));
        $levelConfigsAll = config('simulation.levels', []);
        $progressAll = Auth::user()?->simulationProgress()
            ->whereIn('simulation_id', $slugs)
            ->get()
            ->keyBy('simulation_id') ?? collect();

        $simulations = collect($slugs)->map(function (string $slug) use ($progressAll, $levelConfigsAll) {
            $progress = $progressAll->get($slug);
            $data = $progress?->progress_data;
            $levels = $levelConfigsAll[$slug] ?? [];
            $totalLevels = count($levels);
            $levelsData = $data['levels'] ?? null;
            $completedLevels = 0;
            $completedFloors = $data['completed_floor_count'] ?? 0;
            $totalFloors = $data['total_floor_count'] ?? collect($levels)->sum('floorCount');
            if ($levelsData) {
                $completedLevels = collect($levelsData)->filter(fn ($l) => ($l['completed'] ?? false))->count();
            }
            $totalScore = $data['total_score'] ?? 0;
            $maxScore = $data['max_score'] ?? collect($levels)->sum('maxScore');
            $completionPercent = $data['completion_percent'] ?? 0;
            $status = 'not_started';
            if ($data) {
                if ($totalLevels > 0 && $completedLevels === $totalLevels) {
                    $status = 'completed';
                } elseif ($completedFloors > 0 || $completedLevels > 0) {
                    $status = 'in_progress';
                } else {
                    $status = 'not_started';
                }
            }

            return [
                'id' => $slug,
                'completionPercent' => $completionPercent,
                'totalScore' => $totalScore,
                'maxScore' => $maxScore,
                'completedLevels' => $completedLevels,
                'totalLevels' => $totalLevels,
                'completedFloors' => $completedFloors,
                'totalFloors' => $totalFloors,
                'status' => $status,
                'earnedBadges' => $data['earned_badges'] ?? [],
            ];
        })->values()->all();

        $phishing = collect($simulations)->firstWhere('id', 'phishing');

        return Inertia::render('Simulations/Index', [
            'phishingProgress' => $phishing ? [
                'completionPercent' => $phishing['completionPercent'],
                'totalScore' => $phishing['totalScore'],
                'maxScore' => $phishing['maxScore'],
                'earnedBadges' => $phishing['earnedBadges'],
            ] : null,
            'simulations' => $simulations,
            'labs' => $this->labsMeta(),
        ]);
    }

    public function detail(string $simulation): Response
    {
        $levelConfigs = config('simulation.levels.'.$simulation);
        if (! $levelConfigs) {
            abort(404);
        }

        $progressData = $this->progressData($simulation);

        $levels = collect($levelConfigs)->map(function (array $config, int $index) use ($progressData) {
            $levelProgress = $progressData['levels'][$index] ?? null;

            return [
                'level' => $index + 1,
                'floorCount' => $config['floorCount'],
                'maxScore' => $config['maxScore'],
                'unlocked' => $levelProgress['unlocked'] ?? ($index === 0),
                'completed' => $levelProgress['completed'] ?? false,
                'levelScore' => $levelProgress['level_score'] ?? 0,
            ];
        })->values()->all();

        return Inertia::render('Simulation/Detail', [
            'simulationId' => $simulation,
            'levels' => $levels,
            'lab' => $this->labMeta($simulation),
            'unlockThreshold' => (int) config('simulation.level_unlock_threshold'),
        ]);
    }

    public function levelDetail(string $simulation, int $level): Response
    {
        $levelConfigs = config('simulation.levels.'.$simulation);
        if (! $levelConfigs) {
            abort(404);
        }
        $levelConfig = $levelConfigs[$level - 1] ?? null;
        if (! $levelConfig) {
            abort(404);
        }
        $totalFloors = $levelConfig['floorCount'] ?? 0;

        $progressData = $this->progressData($simulation);
        $levelProgress = $progressData['levels'][$level - 1] ?? null;
        $levelFloors = $levelProgress['floors'] ?? [];
        $floorTitles = self::FLOOR_TITLES[$simulation] ?? [];

        $floors = collect(range(1, $totalFloors))->map(function (int $floorNum) use ($levelFloors, $floorTitles, $level) {
            $floorProgress = $levelFloors[$floorNum - 1] ?? null;
            $ownCompleted = (bool) ($floorProgress['completed'] ?? false);
            $previousCompleted = $floorNum > 1 && (bool) ($levelFloors[$floorNum - 2]['completed'] ?? false);

            return [
                'floorNumber' => $floorNum,
                'title' => $floorTitles[$level][$floorNum] ?? "Floor $floorNum",
                'completed' => $ownCompleted,
                'playable' => $floorNum === 1 || $ownCompleted || $previousCompleted,
                'bestPoints' => $floorProgress['best_points'] ?? 0,
                'maxPoints' => $floorProgress['max_points'] ?? max(config('simulation.choice_points')),
            ];
        })->values()->all();

        return Inertia::render('Simulation/LevelDetail', [
            'simulationId' => $simulation,
            'level' => $level,
            'maxScore' => $levelConfig['maxScore'] ?? 0,
            'unlocked' => $levelProgress['unlocked'] ?? ($level - 1 === 0),
            'completed' => $levelProgress['completed'] ?? false,
            'levelScore' => $levelProgress['level_score'] ?? 0,
            'floors' => $floors,
            'lab' => $this->labMeta($simulation),
            'unlockThreshold' => (int) config('simulation.level_unlock_threshold'),
        ]);
    }

    public function floorPlay(string $simulation, int $level, int $floor): Response|RedirectResponse
    {
        $levelConfigs = config('simulation.levels.'.$simulation);
        if (! $levelConfigs) {
            abort(404);
        }
        $levelConfig = $levelConfigs[$level - 1] ?? null;
        if (! $levelConfig || $floor < 1 || $floor > ($levelConfig['floorCount'] ?? 0)) {
            abort(404);
        }

        $progressData = $this->progressData($simulation);
        $levelProgress = $progressData['levels'][$level - 1] ?? null;
        $levelUnlocked = $levelProgress['unlocked'] ?? ($level - 1 === 0);

        if (! $levelUnlocked) {
            return redirect()->route('simulasi.level.detail', [
                'simulation' => $simulation,
                'level' => $level,
            ]);
        }

        $levelFloors = $levelProgress['floors'] ?? [];
        $floorPlayable = $floor === 1
            || (bool) ($levelFloors[$floor - 1]['completed'] ?? false)
            || (bool) ($levelFloors[$floor - 2]['completed'] ?? false);

        return Inertia::render('Simulation/Play', [
            'simulationId' => $simulation,
            'level' => $level,
            'floor' => $floor,
            'floorCount' => $levelConfig['floorCount'],
            'maxScore' => $levelConfig['maxScore'],
            'floorPlayable' => $floorPlayable,
            'requiredFloor' => $floorPlayable ? null : $floor - 1,
        ]);
    }

    /**
     * Data progress (progress_data) milik user login, null bila belum pernah attempt.
     *
     * @return array<string, mixed>|null
     */
    private function progressData(string $simulation): ?array
    {
        $progress = Auth::user()?->simulationProgress()
            ->where('simulation_id', $simulation)
            ->first();

        return $progress?->progress_data;
    }

    /**
     * Metadata lab per simulasi dari config (single source of truth).
     *
     * @return array<string, array{name: string, lab: string, vector: string, code: string, tags: array<int, string>}>
     */
    private function labsMeta(): array
    {
        $labs = [];
        foreach (config('simulation.labs', []) as $slug => $lab) {
            $labs[$slug] = $this->labMeta($slug, $lab);
        }

        return $labs;
    }

    /**
     * @param  array<string, mixed>|null  $lab
     * @return array{name: string, lab: string, vector: string, code: string, tags: array<int, string>}
     */
    private function labMeta(string $simulation, ?array $lab = null): array
    {
        $lab ??= config('simulation.labs.'.$simulation) ?? config('simulation.labs.phishing');

        return [
            'name' => $lab['competency'],
            'lab' => $lab['lab_name'],
            'vector' => $lab['vector'],
            'code' => $lab['code'],
            'tags' => $lab['tags'],
        ];
    }
}
