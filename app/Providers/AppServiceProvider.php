<?php

namespace App\Providers;

use App\Models\User;
use App\Services\AiClient;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AiClient::class, fn () => new AiClient(
            (string) config('ai.url'),
            (int) config('ai.timeout'),
        ));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::define(
            'manage-knowledge-base',
            fn (User $user): bool => $user->isAdmin(),
        );
    }
}
