<?php

use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\KnowledgeBaseController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SimulationController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\RedirectAdminToPanel;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('landing');

Route::view('/about', 'about')->name('about');
Route::get('/learning', fn () => \Inertia\Inertia::render('Learning/Index'))->name('learning');

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
    Route::get('/dashboard', DashboardController::class)
        ->middleware(RedirectAdminToPanel::class)
        ->name('dashboard');
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

Route::middleware(['auth', EnsureUserIsAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', AdminDashboardController::class)->name('dashboard');

        // Kelola pengguna
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])->name('users.role');
        Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');

        // Kelola materi, kuis, badge
        Route::get('/content/{resource}', [ContentController::class, 'index'])->where('resource', 'materi|kuis|badge')->name('content.index');
        Route::post('/content/{resource}', [ContentController::class, 'store'])->where('resource', 'materi|kuis|badge')->name('content.store');
        Route::put('/content/{resource}/{id}', [ContentController::class, 'update'])->where('resource', 'materi|kuis|badge')->name('content.update');
        Route::delete('/content/{resource}/{id}', [ContentController::class, 'destroy'])->where('resource', 'materi|kuis|badge')->name('content.destroy');
                   Route::get('/content/materi/{id}/document', [ContentController::class, 'document'])->whereNumber('id')->name('content.document');

        // Knowledge base AI (FR-16)
        Route::get('/knowledge-base', [KnowledgeBaseController::class, 'index'])->name('kb.index');
        Route::post('/knowledge-base', [KnowledgeBaseController::class, 'store'])->name('kb.store');
        Route::post('/knowledge-base/reindex', [KnowledgeBaseController::class, 'reindex'])->name('kb.reindex');
        Route::delete('/knowledge-base/{id}', [KnowledgeBaseController::class, 'destroy'])->where('id', '[A-Za-z0-9_-]+')->name('kb.destroy');
    });

require __DIR__.'/auth.php';