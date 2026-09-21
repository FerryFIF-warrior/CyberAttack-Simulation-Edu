<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', LandingController::class)->name('landing');

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
        $phishingProgress = $user?->simulationProgress()
            ->where('simulation_id', 'phishing')
            ->first();
        $phishingData = $phishingProgress?->progress_data;

        return Inertia::render('Simulations/Index', [
            'phishingProgress' => $phishingData ? [
                'completionPercent' => $phishingData['completion_percent'] ?? 0,
                'totalScore' => $phishingData['total_score'] ?? 0,
                'maxScore' => $phishingData['max_score'] ?? 100,
                'earnedBadges' => $phishingData['earned_badges'] ?? [],
            ] : null,
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

        $floors = collect(range(1, $totalFloors))->map(function (int $floorNum) use ($levelProgress) {
            $floorProgress = $levelProgress['floors'][$floorNum - 1] ?? null;

            return [
                'floorNumber' => $floorNum,
                'title' => "Floor $floorNum",
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
        if (! config('simulation.levels.'.$simulation)) {
            abort(404);
        }

        return Inertia::render('Simulation/Play', [
            'simulationId' => $simulation,
            'level' => $level,
            'floor' => $floor,
        ]);
    })->name('simulasi.floor.play');
});

require __DIR__.'/auth.php';
