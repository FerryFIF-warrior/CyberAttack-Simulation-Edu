<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class RegisterController extends Controller
{
    /**
     * Tampilkan form registrasi operator (dikonversi dari register.html).
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Validasi, buat user baru, lalu auto-login dan arahkan ke dashboard.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'callsign' => ['required', 'string', 'min:3', 'max:30', 'alpha_dash', 'unique:users,callsign'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:12', 'confirmed'],
            'ethics_pact' => ['accepted'],
        ], [
            'callsign.required' => 'Callsign wajib diisi.',
            'callsign.min' => 'Callsign minimal 3 karakter.',
            'callsign.max' => 'Callsign maksimal 30 karakter.',
            'callsign.alpha_dash' => 'Callsign hanya boleh berisi huruf, angka, strip (-), dan underscore (_).',
            'callsign.unique' => 'Callsign sudah dipakai operator lain.',
            'email.required' => 'Email kampus/instansi wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'email.unique' => 'Email sudah terdaftar di terminal ini.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.min' => 'Kata sandi minimal 12 karakter.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
            'ethics_pact.accepted' => 'Centang Pakta Etika White-Hat dulu.',
        ]);

        $user = User::create([
            'name' => $validated['callsign'],
            'callsign' => $validated['callsign'],
            'email' => $validated['email'],
            'password' => $validated['password'], // otomatis di-bcrypt via cast 'hashed'
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('dashboard');
    }
}
