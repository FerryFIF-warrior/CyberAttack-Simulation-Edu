@extends('layouts.app')

@section('title', 'Registrasi Operator Baru | Security Cat')

@section('content')
    <div
        class="flex flex-col w-full items-center justify-center py-12 md:py-16 px-margin-mobile sm:px-margin-tablet lg:px-margin-desktop relative overflow-hidden">
        {{-- Ambient Glow Behind Register Deck --}}
        <div class="absolute w-[600px] h-[600px] -top-28 left-1/2 -translate-x-1/2 rounded-full bg-primary-container/10 blur-[140px] pointer-events-none -z-10">
        </div>
        <div
            class="absolute w-80 h-80 -bottom-20 right-1/4 rounded-full bg-secondary-container/10 blur-[120px] pointer-events-none -z-10">
        </div>

        {{-- Central Card Shell with entrance animation --}}
        <div
            class="w-full max-w-lg bg-surface-container-low/90 backdrop-blur-2xl rounded-2xl border border-surface-container-high/60 shadow-2xl p-8 sm:p-11 flex flex-col gap-7 relative animate-fade-in-up">
            {{-- Subtle Top Terminal Bar Accent --}}
            <div
                class="flex items-center justify-between font-label-caps text-label-caps text-on-surface-variant pb-1 border-b border-surface-container-high/40">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-tertiary-fixed-dim inline-block animate-pulse"></span>
                    <span class="tracking-widest uppercase text-tertiary-fixed-dim">NODE PROVISIONING</span>
                </div>
                <span class="text-outline uppercase hidden sm:inline tracking-wider">ETHICAL SANDBOX // V2.4</span>
            </div>

            {{-- Header Section with Mascot Logo --}}
            <div class="flex flex-col items-center text-center gap-3 pt-1">
                <a class="relative group inline-block cursor-pointer" href="{{ url('/') }}">
                    <div
                        class="absolute -inset-2 rounded-full bg-primary-container/20 blur-lg group-hover:bg-primary-container/40 transition-all duration-300">
                    </div>
                    <img alt="Security Cat Logo"
                        class="relative w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_16px_rgba(0,240,255,0.45)] group-hover:scale-105 transition-transform duration-200"
                        src="{{ asset('assets/img/logo.png') }}" />
                </a>
                <div class="flex flex-col gap-1.5 mt-1">
                    <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">Registrasi Operator Baru
                    </h1>
                    <p class="font-body-md text-body-md text-on-surface-variant">
                        Daftar operator baru white-hat.
                    </p>
                </div>
            </div>

            {{-- Form registrasi: submit ke Laravel (bukan lagi SCAuth/auth.js) --}}
            <form class="flex flex-col gap-5 mt-2" id="register-operator-form" method="POST"
                action="{{ route('register.store') }}" novalidate>
                @csrf

                {{-- Field 1: Callsign --}}
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <label class="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
                            for="callsign">
                            Callsign
                        </label>
                        <span class="font-code-sm text-code-sm text-outline flex items-center gap-1"
                            id="callsign-status">
                            <span class="material-symbols-outlined text-[14px]">terminal</span> MENUNGGU INPUT
                        </span>
                    </div>
                    <div class="relative flex items-center">
                        <span
                            class="absolute left-3.5 font-code-md text-code-md text-secondary-container pointer-events-none select-none">cat@root:~$</span>
                        <input
                            class="w-full bg-surface-container-lowest text-on-surface pl-28 pr-4 py-3 rounded-lg font-code-md text-code-md outline-none border border-surface-container-high/40 focus:border-primary-container/60 transition-all duration-200 focus:bg-surface-container-low @error('callsign') border-error/70 @enderror"
                            id="callsign" name="callsign" placeholder="ctf_handle" required type="text"
                            value="{{ old('callsign') }}" autocomplete="username" />
                    </div>
                    @error('callsign')
                        <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                        </p>
                    @enderror
                </div>

                {{-- Field 2: Email Kampus / Instansi --}}
                <div class="flex flex-col gap-2">
                    <label class="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
                        for="institution-email">
                        Email Kampus / Instansi
                    </label>
                    <div class="relative flex items-center">
                        <span
                            class="absolute left-3.5 material-symbols-outlined text-outline text-[18px] pointer-events-none">alternate_email</span>
                        <input
                            class="w-full bg-surface-container-lowest text-on-surface pl-11 pr-4 py-3 rounded-lg font-body-md text-body-md outline-none border border-surface-container-high/40 focus:border-primary-container/60 transition-all duration-200 focus:bg-surface-container-low @error('email') border-error/70 @enderror"
                            id="institution-email" name="email" placeholder="operator@kampus.ac.id" required
                            type="email" value="{{ old('email') }}" autocomplete="email" />
                    </div>
                    @error('email')
                        <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                        </p>
                    @enderror
                </div>

                {{-- Field 3: Kata Sandi --}}
                <div class="flex flex-col gap-2">
                    <label class="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
                        for="master-key">
                        Kata Sandi
                    </label>
                    <div class="relative flex items-center">
                        <span
                            class="absolute left-3.5 material-symbols-outlined text-outline text-[18px] pointer-events-none">vpn_key</span>
                        <input
                            class="w-full bg-surface-container-lowest text-on-surface pl-11 pr-11 py-3 rounded-lg font-code-md text-code-md outline-none border border-surface-container-high/40 focus:border-primary-container/60 transition-all duration-200 focus:bg-surface-container-low @error('password') border-error/70 @enderror"
                            id="master-key" name="password" placeholder="••••••••••••" required type="password"
                            autocomplete="new-password" />
                        <button aria-label="Toggle Password Visibility"
                            class="absolute right-3.5 text-outline hover:text-primary transition-colors flex items-center"
                            id="toggle-password" type="button">
                            <span class="material-symbols-outlined text-[18px]" id="eye-icon">visibility</span>
                        </button>
                    </div>
                    @error('password')
                        <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                        </p>
                    @enderror
                    {{-- Minimalist Cyber Entropy Gauge --}}
                    <div class="flex flex-col gap-1.5 pt-1">
                        <div class="flex items-center justify-between font-code-sm text-code-sm">
                            <span class="text-on-surface-variant flex items-center gap-1.5">
                                <span
                                    class="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">verified_user</span>
                                Entropi: <span class="text-tertiary-fixed-dim font-semibold"
                                    id="entropy-label">Kosong</span>
                            </span>
                            <span class="text-outline font-body-sm text-body-sm">Minimal 12 karakter</span>
                        </div>
                        <div class="grid grid-cols-4 gap-1.5 h-1.5 w-full" id="entropy-bars">
                            <div class="entropy-bar h-full rounded-full bg-surface-container-high transition-colors">
                            </div>
                            <div class="entropy-bar h-full rounded-full bg-surface-container-high transition-colors">
                            </div>
                            <div class="entropy-bar h-full rounded-full bg-surface-container-high transition-colors">
                            </div>
                            <div class="entropy-bar h-full rounded-full bg-surface-container-high transition-colors">
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Field 4: Konfirmasi Kata Sandi --}}
                <div class="flex flex-col gap-2">
                    <label class="font-label-caps text-label-caps uppercase tracking-wider text-on-surface"
                        for="confirm-key">
                        Konfirmasi Kata Sandi
                    </label>
                    <div class="relative flex items-center">
                        <span
                            class="absolute left-3.5 material-symbols-outlined text-outline text-[18px] pointer-events-none">key_vertical</span>
                        <input
                            class="w-full bg-surface-container-lowest text-on-surface pl-11 pr-4 py-3 rounded-lg font-code-md text-code-md outline-none border border-surface-container-high/40 focus:border-primary-container/60 transition-all duration-200 focus:bg-surface-container-low @error('password_confirmation') border-error/70 @enderror"
                            id="confirm-key" name="password_confirmation" placeholder="••••••••••••" required
                            type="password" autocomplete="new-password" />
                    </div>
                    @error('password_confirmation')
                        <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                        </p>
                    @enderror
                </div>

                {{-- Ethics Pact Checkbox (TIDAK dicentang otomatis) --}}
                <div class="flex items-start gap-3 pt-1">
                    <div class="flex items-center h-5">
                        <input class="w-4 h-4 rounded bg-surface-container-lowest text-primary-container accent-primary-container cursor-pointer"
                            id="ethics-pact" name="ethics_pact" type="checkbox" value="1"
                            @checked(old('ethics_pact')) required />
                    </div>
                    <label class="font-body-sm text-body-sm text-on-surface-variant cursor-pointer leading-relaxed"
                        for="ethics-pact">
                        Saya menyetujui Pakta Etika White-Hat Security Cat.
                    </label>
                </div>
                @error('ethics_pact')
                    <p class="font-code-sm text-code-sm text-error flex items-center gap-1.5" id="register-msg">
                        <span class="material-symbols-outlined text-[14px]">error</span> {{ $message }}
                    </p>
                @enderror

                {{-- Primary Action Button --}}
                <button id="register-submit" type="submit"
                    class="w-full mt-2 py-3 px-6 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container font-headline-sm text-headline-sm font-bold tracking-tight shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_28px_rgba(0,240,255,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-[20px]">terminal</span>
                    <span class="">Daftar Akun</span>
                </button>

                {{-- SSO Fast Lane Divider --}}
                <div class="relative flex items-center justify-center my-1.5">
                    <div class="w-full h-px bg-surface-container-high"></div>
                    <span
                        class="absolute bg-surface-container-low px-3 font-label-caps text-label-caps text-outline uppercase tracking-wider">
                        Atau Autentikasi Cepat
                    </span>
                </div>

                {{-- Single Sign-On Options (dekoratif — integrasi menyusul via Socialite, Fase 8) --}}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface-container-high/60 text-on-surface font-body-sm text-body-sm border border-surface-container-high/40 opacity-50 cursor-not-allowed"
                        type="button" disabled title="Segera hadir — integrasi SSO GitHub menyusul (Fase 8)">
                        <svg class="w-4 h-4 fill-current" viewbox="0 0 24 24">
                            <path clip-rule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                fill-rule="evenodd"></path>
                        </svg>
                        <span class="">Daftar via GitHub</span>
                    </button>
                    <button
                        class="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface-container-high/60 text-on-surface font-body-sm text-body-sm border border-surface-container-high/40 opacity-50 cursor-not-allowed"
                        type="button" disabled title="Segera hadir — integrasi SSO kampus menyusul (Fase 8)">
                        <span class="material-symbols-outlined text-[18px] text-secondary">school</span>
                        <span class="">SSO Kampus / Lembaga</span>
                    </button>
                </div>
            </form>

            {{-- Footer Switcher --}}
            <div class="pt-2 text-center font-body-sm text-body-sm text-on-surface-variant border-t border-surface-container-high/40">
                Sudah memiliki terminal access?
                <a class="text-primary font-semibold hover:text-primary-fixed-dim hover:underline ml-1 inline-flex items-center gap-0.5"
                    href="{{ route('login') }}">
                    Masuk di sini <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
            </div>
        </div>
    </div>
@endsection
