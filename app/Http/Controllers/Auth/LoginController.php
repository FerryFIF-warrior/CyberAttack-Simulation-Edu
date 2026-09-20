<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class LoginController extends Controller
{
    /**
     * Tampilkan form login (dikonversi dari login.html).
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Proses login. Mendukung identifier berupa email ATAU callsign
     * (sesuai placeholder UI: "operator@campus.id atau handle_ctf").
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'identifier' => ['required', 'string'],
            'password' => ['required', 'string'],
        ], [
            'identifier.required' => 'Callsign atau email wajib diisi.',
            'password.required' => 'Passkey wajib diisi.',
        ]);

        $field = filter_var($credentials['identifier'], FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'callsign';

        if (Auth::attempt(
            [$field => $credentials['identifier'], 'password' => $credentials['password']],
            $request->boolean('remember'),
        )) {
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard'));
        }

        throw ValidationException::withMessages([
            'identifier' => 'Callsign/email atau passkey salah. Akses ditolak oleh Defense Gateway.',
        ]);
    }

    /**
     * Logout: hapus sesi & regenerasi token CSRF.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
