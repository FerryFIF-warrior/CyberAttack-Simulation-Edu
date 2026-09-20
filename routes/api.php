<?php

use App\Http\Controllers\Api\SimulationAttemptController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::post('/simulations/{simulationId}/levels/{levelNumber}/floors/{floorNumber}/attempt', [SimulationAttemptController::class, 'attempt']);
    Route::get('/me/simulation-progress', [SimulationAttemptController::class, 'progress']);
});
