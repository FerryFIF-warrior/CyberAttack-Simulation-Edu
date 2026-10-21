<?php

use App\Http\Controllers\Admin\KnowledgeBaseController;
use App\Http\Controllers\Api\ChatMessageController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ChatAIController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SecurityLogController;
use App\Http\Controllers\SimulationController;
use Illuminate\Support\Facades\Route;

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
    Route::get('/security-log', SecurityLogController::class)->name('security-log');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/chat-ai', [ChatAIController::class, 'index'])->name('chat-ai');
    Route::post('/chat/sessions', [ChatMessageController::class, 'storeSession'])->name('chat.sessions.store');
    Route::get('/chat/sessions/{chatSession}/messages', [ChatMessageController::class, 'messages'])->name('chat.sessions.messages');
    Route::post('/chat/sessions/{chatSession}/messages', [ChatMessageController::class, 'storeMessage'])
        ->middleware('throttle:6,1')
        ->name('chat.messages.store');
    Route::delete('/chat/sessions/{chatSession}', [ChatMessageController::class, 'destroy'])->name('chat.sessions.destroy');
    Route::patch('/chat/messages/{chatMessage}/feedback', [ChatMessageController::class, 'updateFeedback'])->name('chat.messages.feedback');
});

Route::middleware(['auth', 'can:manage-knowledge-base'])->prefix('admin')->group(function () {
    Route::get('/knowledge-base', [KnowledgeBaseController::class, 'index'])->name('admin.knowledge-base.index');
    Route::post('/knowledge-base', [KnowledgeBaseController::class, 'store'])->name('admin.knowledge-base.store');
    Route::delete('/knowledge-base/{documentId}', [KnowledgeBaseController::class, 'destroy'])->name('admin.knowledge-base.destroy');
    Route::post('/knowledge-base/reindex', [KnowledgeBaseController::class, 'reindex'])->name('admin.knowledge-base.reindex');
});

Route::middleware('auth')->prefix('simulasi')->group(function () {
    Route::get('/', [SimulationController::class, 'index'])->name('simulasi.index');
    Route::get('/{simulation}', [SimulationController::class, 'detail'])->name('simulasi.detail');
    Route::get('/{simulation}/level/{level}', [SimulationController::class, 'levelDetail'])->name('simulasi.level.detail');
    Route::get('/{simulation}/level/{level}/floor/{floor}', [SimulationController::class, 'floorPlay'])->name('simulasi.floor.play');
});

require __DIR__.'/auth.php';
