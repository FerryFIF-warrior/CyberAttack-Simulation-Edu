<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BadgeDefinition;
use App\Models\LearningModule;
use App\Models\QuizQuestion;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $counts = User::where('created_at', '>=', now()->subDays(13)->startOfDay())
            ->get(['created_at'])
            ->groupBy(fn ($u) => $u->created_at->toDateString())
            ->map(fn ($g) => $g->count());

        $registrations = collect(range(13, 0))->map(function ($i) use ($counts) {
            $d = now()->subDays($i);

            return ['date' => $d->format('d/m'), 'count' => (int) ($counts[$d->toDateString()] ?? 0)];
        })->values();

        // Kolom level hanya dipakai kalau memang ada di tabel users
        $levels = Schema::hasColumn('users', 'level')
            ? User::select('level', DB::raw('count(*) as total'))
                ->groupBy('level')->orderBy('level')->get()
                ->map(fn ($r) => ['label' => (string) $r->level, 'total' => (int) $r->total])->values()
            : collect();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalAdmins' => User::where('role', 'admin')->count(),
                'newThisWeek' => User::where('created_at', '>=', now()->subDays(7))->count(),
            ],
            'registrations' => $registrations,
            'levels' => $levels,
            'content' => [
                'materi' => Schema::hasTable('learning_modules') ? LearningModule::count() : 0,
                'kuis' => Schema::hasTable('quiz_questions') ? QuizQuestion::count() : 0,
                'badge' => Schema::hasTable('badge_definitions') ? BadgeDefinition::count() : 0,
            ],
            'recentUsers' => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
        ]);
    }
}
