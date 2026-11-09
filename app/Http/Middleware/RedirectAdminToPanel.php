<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Dipasang di route /dashboard: admin otomatis diarahkan ke panel admin.
 * Admin tetap bisa melihat dashboard biasa lewat /dashboard?as=user
 */
class RedirectAdminToPanel
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role === 'admin' && $request->query('as') !== 'user') {
            return redirect()->route('admin.dashboard');
        }

        return $next($request);
    }
}
