@extends('layouts.app')

@section('title', 'Sign In — Terminal White-Hat | Security Cat')

@section('content')
    <div
        class="flex flex-col w-full items-center justify-center py-10 md:py-14 px-6 relative overflow-hidden">
        <div
            class="absolute w-[700px] h-[700px] -top-32 left-1/2 -translate-x-1/2 rounded-full pointer-events-none -z-10" style="background:radial-gradient(circle at center, rgba(0,229,255,0.09) 0%, transparent 70%);filter:blur(40px)">
        </div>
        <div
            class="absolute w-80 h-80 -bottom-20 right-1/4 rounded-full pointer-events-none -z-10" style="background:radial-gradient(circle, rgba(139,196,168,0.07) 0%, transparent 70%);filter:blur(30px)">
        </div>

        <div class="w-full max-w-lg relative z-10 animate-fade-in-up">
            <div
                class="w-full max-w-lg p-7 sm:p-9 flex flex-col gap-6 relative clay-card" style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55), inset 0 1.5px 0 rgba(255,255,255,0.08)">
                {{-- Subtle Top Terminal Bar Accent --}}
                <div
                    class="flex items-center justify-between font-label-caps text-label-caps text-[#8b98ab] pb-1 border-b border-clay-line">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-[#A8D5BA] inline-block animate-pulse"></span>
                        <span class="tracking-widest uppercase text-[#A8D5BA]">DEFENSE GATEWAY</span>
                    </div>
                    <span class="text-[#8b98ab] uppercase hidden sm:inline tracking-wider">PORT: 443 // ISOLATED</span>
                </div>

                {{-- Header Section with Mascot Logo --}}
                <div class="flex flex-col items-center text-center gap-3 pt-1">
                    <a class="relative group inline-block cursor-pointer" href="{{ url('/') }}">
                        <div
                            class="absolute -inset-2 rounded-full bg-[#00e5ff]/10 blur-lg group-hover:bg-[#00e5ff]/20 transition-all duration-300">
                        </div>
                        <img alt="Security Cat Mascot"
                            class="relative w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_16px_rgba(0,240,255,0.45)] group-hover:scale-105 transition-transform duration-200"
                            src="{{ asset('assets/img/logo.png') }}" />
                    </a>
                    <div class="flex flex-col gap-1.5 mt-1">
                        <h1 class="font-headline-lg text-headline-lg text-white tracking-tight">Masuk Terminal White-Hat</h1>
                        <p class="font-body-md text-body-md text-[#8b98ab]">
                            Akses lingkungan simulasi aman dan lacak progres rank ofensif-defensif Anda.
                        </p>
                    </div>
                </div>

                {{-- Form login: submit ke Laravel (bukan lagi SCAuth/auth.js) --}}
                <form class="flex flex-col gap-5 mt-2" id="login-form" method="POST"
                    action="{{ route('login.store') }}" novalidate>
                    @csrf

                    {{-- Field: Callsign / Email --}}
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between items-center">
                            <label class="font-label-caps text-label-caps uppercase tracking-wider text-slate-200"
                                for="callsign-input">
                                Callsign // Email Operator
                            </label>
                            <span class="font-code-sm text-code-sm text-[#8b98ab]">IDENTIFIER</span>
                        </div>
                        <div class="relative flex items-center group">
                            <span
                                class="absolute left-3.5 text-[#00e5ff]/70 group-focus-within:text-[#00e5ff] pointer-events-none flex items-center transition-colors duration-200">
                                <span class="material-symbols-outlined text-body-lg">alternate_email</span>
                            </span>
                            <input
                                class="w-full bg-clay-inset text-slate-200 pl-11 pr-4 py-3 rounded-lg font-code-md text-code-md outline-none border border-clay-line focus:border-[#00e5ff]/40 transition-all duration-200 focus:bg-clay-inset @error('identifier') border-error/70 @enderror"
                                id="callsign-input" name="identifier" placeholder="operator@campus.id atau handle_ctf"
                                type="text" value="{{ old('identifier') }}" autocomplete="username" autofocus />
                        </div>
                        @error('identifier')
                            <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5" id="login-msg">
                                <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                            </p>
                        @enderror
                    </div>

                    {{-- Field: Passkey --}}
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between items-center">
                            <label class="font-label-caps text-label-caps uppercase tracking-wider text-slate-200"
                                for="passkey-input">
                                Kunci Sandi // Passkey
                            </label>
                            <a class="font-code-sm text-code-sm text-[#00e5ff] hover:text-white transition-colors duration-200"
                                href="{{ route('password.request') }}">Lupa Passkey?</a>
                        </div>
                        <div class="relative flex items-center group">
                            <span
                                class="absolute left-3.5 text-[#00e5ff]/70 group-focus-within:text-[#00e5ff] pointer-events-none flex items-center transition-colors duration-200">
                                <span class="material-symbols-outlined text-body-lg">key</span>
                            </span>
                            <input
                                class="w-full bg-clay-inset text-slate-200 pl-11 pr-11 py-3 rounded-lg font-code-md text-code-md outline-none border border-clay-line focus:border-[#00e5ff]/40 transition-all duration-200 focus:bg-clay-inset @error('password') border-error/70 @enderror"
                                id="passkey-input" name="password" placeholder="••••••••••••••••" type="password"
                                autocomplete="current-password" />
                            <button aria-label="Toggle password visibility"
                                class="absolute right-3.5 text-[#8b98ab] hover:text-white transition-colors duration-200 flex items-center p-1 rounded hover:bg-surface-container"
                                id="toggle-pwd-btn" type="button">
                                <span class="material-symbols-outlined text-body-lg" id="pwd-icon">visibility</span>
                            </button>
                        </div>
                        @error('password')
                            <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                            </p>
                        @enderror
                    </div>

                    <button id="login-submit" type="submit"
                        class="w-full mt-2 py-3 px-6 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-headline-sm text-headline-sm font-bold tracking-tight shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_28px_rgba(0,240,255,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined text-body-lg">login</span>
                        Autentikasi &amp; Masuk Terminal
                    </button>
                </form>

                {{-- ===== SSO (dekoratif — integrasi menyusul via Socialite, Fase 8) ===== --}}
                <div class="relative flex items-center justify-center my-1.5">
                    <div class="w-full h-px bg-surface-container-high"></div>
                    <span
                        class="absolute bg-clay-inset px-3 font-label-caps text-label-caps text-[#8b98ab] uppercase tracking-wider">Atau Autentikasi Cepat</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-clay-inset text-slate-200 font-body-sm text-body-sm border border-clay-line opacity-50 cursor-not-allowed"
                        type="button" disabled title="Segera hadir — integrasi SSO GitHub menyusul (Fase 8)">
                        <svg aria-hidden="true" class="w-4 h-4 fill-current text-slate-200" viewbox="0 0 24 24">
                            <path clip-rule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                fill-rule="evenodd"></path>
                        </svg>
                        <span class="">Akses GitHub</span>
                    </button>
                    <button
                        class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-clay-inset text-slate-200 font-body-sm text-body-sm border border-clay-line opacity-50 cursor-not-allowed"
                        type="button" disabled title="Segera hadir — integrasi SSO kampus menyusul (Fase 8)">
                        <span class="material-symbols-outlined text-body-lg text-[#00e5ff]">school</span>
                        <span class="">Akun EduID Kampus</span>
                    </button>
                </div>

                {{-- ===== Footer kartu ===== --}}
                <div class="pt-2 text-center font-body-sm text-body-sm text-[#8b98ab] border-t border-clay-line">
                    <span class="font-body-sm text-body-sm text-[#8b98ab]">
                        Belum punya callsign?
                        <a class="text-white font-semibold hover:text-[#00e5ff] hover:underline ml-1 inline-flex items-center gap-0.5"
                            href="{{ route('register') }}">Daftar Akun Baru</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
@endsection
