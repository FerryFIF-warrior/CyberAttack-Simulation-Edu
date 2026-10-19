<?php

namespace App\Http\Controllers;

use App\Models\SimulationLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SecurityLogController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $logs = $request->user()
            ->simulationLogs()
            ->latest('id')
            ->limit(200)
            ->get()
            ->map(fn (SimulationLog $log) => $log->toLogArray())
            ->all();

        return Inertia::render('SecurityLog/Index', [
            'logs' => $logs,
            'labs' => config('simulation.labs', []),
        ]);
    }
}
