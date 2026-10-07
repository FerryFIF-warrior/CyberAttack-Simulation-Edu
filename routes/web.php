<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', LandingController::class)->name('landing');

Route::view('/about', 'about')->name('about');
Route::view('/learning', 'learning')->name('learning');

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('login.store');

    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('register.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('simulasi')->group(function () {
    Route::get('/', function () {
        $user = auth()->user();
        $slugs = ['phishing', 'bruteforce', 'sqli', 'auth'];
        $levelConfigsAll = config('simulation.levels');
        $progressAll = $user ? $user->simulationProgress()->whereIn('simulation_id', $slugs)->get()->keyBy('simulation_id') : collect();
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
        ]);
    })->name('simulasi.index');

    Route::get('/{simulation}', function (string $simulation) {
        $levelConfigs = config('simulation.levels.'.$simulation);
        if (! $levelConfigs) {
            abort(404);
        }
        $user = auth()->user();
        $progress = $user?->simulationProgress()
            ->where('simulation_id', $simulation)
            ->first();
        $progressData = $progress?->progress_data;

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
        ]);
    })->name('simulasi.detail');

    Route::get('/{simulation}/level/{level}', function (string $simulation, int $level) {
        $levelConfigs = config('simulation.levels.'.$simulation);
        if (! $levelConfigs) {
            abort(404);
        }
        $levelConfig = $levelConfigs[$level - 1] ?? null;
        $totalFloors = $levelConfig['floorCount'] ?? 0;

        $user = auth()->user();
        $progress = $user?->simulationProgress()
            ->where('simulation_id', $simulation)
            ->first();
        $progressData = $progress?->progress_data;
        $levelProgress = $progressData['levels'][$level - 1] ?? null;

        $floorTitles = [
            'phishing' => [1 => [1 => 'Email Hadiah Palsu', 2 => 'SMS Phishing Mengatasnamakan Bank', 3 => 'Lampiran Berbahaya', 4 => 'Urgensi Palsu', 5 => 'Ujian Akhir: Detektif Email']],
            'bruteforce' => [1 => [1 => 'Serangan Dictionary: Password Lemah', 2 => 'Menahan Serangan dengan Rate Limiting', 3 => 'Kunci Akun dengan Account Lockout', 4 => 'Lapisan Tambahan: CAPTCHA & MFA', 5 => 'Ujian Akhir: Pertahanan Berlapis']],
        ];
        $floors = collect(range(1, $totalFloors))->map(function (int $floorNum) use ($levelProgress, $simulation, $level, $floorTitles) {
            $floorProgress = $levelProgress['floors'][$floorNum - 1] ?? null;

            return [
                'floorNumber' => $floorNum,
                'title' => $floorTitles[$simulation][$level][$floorNum] ?? "Floor $floorNum",
                'completed' => $floorProgress['completed'] ?? false,
                'playable' => $floorProgress['completed'] ?? ($floorNum === 1),
                'bestPoints' => $floorProgress['best_points'] ?? 0,
                'maxPoints' => $floorProgress['max_points'] ?? 4,
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
        ]);
    })->name('simulasi.level.detail');

    Route::get('/{simulation}/level/{level}/floor/{floor}', function (string $simulation, int $level, int $floor) {
        $levelConfigs = config('simulation.levels.'.$simulation);
        if (! $levelConfigs) {
            abort(404);
        }
        $levelConfig = $levelConfigs[$level - 1] ?? null;
        if (! $levelConfig || $floor < 1 || $floor > ($levelConfig['floorCount'] ?? 0)) {
            abort(404);
        }

        $user = auth()->user();
        $progress = $user?->simulationProgress()
            ->where('simulation_id', $simulation)
            ->first();
        $progressData = $progress?->progress_data;
        $levelProgress = $progressData['levels'][$level - 1] ?? null;
        $levelUnlocked = $levelProgress['unlocked'] ?? ($level - 1 === 0);

        if (! $levelUnlocked) {
            return redirect()->route('simulasi.level.detail', [
                'simulation' => $simulation,
                'level' => $level,
            ]);
        }

        return Inertia::render('Simulation/Play', [
            'simulationId' => $simulation,
            'level' => $level,
            'floor' => $floor,
        ]);
    })->name('simulasi.floor.play');
});

require __DIR__.'/auth.php';
