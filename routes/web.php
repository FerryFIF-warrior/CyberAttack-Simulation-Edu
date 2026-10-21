<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SimulationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', LandingController::class)->name('landing');

Route::view('/about', 'about')->name('about');
Route::get('/learning', fn () => Inertia::render('Learning/Index'))->name('learning');

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
    Route::get('/', [SimulationController::class, 'index'])->name('simulasi.index');
    Route::get('/{simulation}', [SimulationController::class, 'detail'])->name('simulasi.detail');
    Route::get('/{simulation}/level/{level}', [SimulationController::class, 'levelDetail'])->name('simulasi.level.detail');
    Route::get('/{simulation}/level/{level}/floor/{floor}', [SimulationController::class, 'floorPlay'])->name('simulasi.floor.play');
});

require __DIR__.'/auth.php';
