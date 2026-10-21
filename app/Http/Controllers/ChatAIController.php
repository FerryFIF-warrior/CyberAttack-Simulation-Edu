<?php

namespace App\Http\Controllers;

use App\Models\ChatSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatAIController extends Controller
{
    public function index(Request $request): Response
    {
        $sessions = $request->user()
            ->chatSessions()
            ->withCount('messages')
            ->latest('updated_at')
            ->get()
            ->map(fn (ChatSession $session) => $session->toSummaryArray())
            ->all();

        return Inertia::render('ChatAI/Index', [
            'sessions' => $sessions,
        ]);
    }
}
