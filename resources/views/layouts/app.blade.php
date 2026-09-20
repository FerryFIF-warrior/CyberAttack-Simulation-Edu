<!DOCTYPE html>
<html class="dark" lang="id">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Security Cat — Cyber Attack Simulation Edu')</title>

    <link href="{{ asset('assets/img/logo.png') }}" rel="icon" type="image/png" />

    {{-- Fonts: Inter, JetBrains Mono & Material Symbols (sama seperti HTML asli) --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet" />
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        rel="stylesheet" />

    {{-- Tailwind 4 via Vite (menggantikan cdn.tailwindcss.com) --}}
    @vite('resources/js/blade.js')
</head>

<body
    class="bg-background font-body-md text-body-md text-on-surface min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">

    {{-- ===== Header ===== --}}
    <header
        class="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] animate-enter-nav">
        <div class="h-16 max-w-7xl mx-auto px-margin-desktop flex items-center justify-between">
            <div class="flex items-center gap-gutter-md">
                <a class="flex items-center gap-gutter-sm hover:opacity-85 transition-opacity duration-200"
                    href="{{ url('/') }}">
                    <span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">Security Cat</span>
                </a>
            </div>
            <nav class="flex items-center gap-gutter-md">
                @auth
                    <a class="text-on-surface-variant hover:text-primary font-medium text-body-md transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-surface-container/60 {{ request()->routeIs('dashboard') ? 'text-primary font-bold' : '' }}"
                        href="{{ route('dashboard') }}">Dashboard</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit"
                            class="text-on-surface-variant hover:text-error font-medium text-body-md transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-surface-container/60 inline-flex items-center gap-1.5">
                            <span class="material-symbols-outlined text-body-lg">logout</span>
                            Logout
                        </button>
                    </form>
                @else
                    <a class="font-medium text-body-md transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-surface-container/60 {{ request()->routeIs('login') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary' }}"
                        href="{{ route('login') }}">Sign In</a>
                    <a class="font-medium text-body-md transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-surface-container/60 {{ request()->routeIs('register') ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary' }}"
                        href="{{ route('register') }}">Register</a>
                @endauth
            </nav>
        </div>
    </header>

    {{-- ===== Konten halaman ===== --}}
    <main class="w-full pt-16 flex-1 flex flex-col justify-center bg-background">
        @yield('content')
    </main>

    {{-- ===== Footer ===== --}}
    <footer
        class="w-full bg-surface-container-lowest/90 backdrop-blur-md py-gutter-lg border-t border-surface-container/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div
            class="max-w-7xl mx-auto px-margin-desktop flex flex-col sm:flex-row items-center justify-between gap-gutter-sm font-code-sm text-code-sm text-on-surface-variant">
            <div class="flex items-center gap-gutter-xs">
                <span class="text-primary-fixed-dim font-semibold">SHA-256:</span>
                <span class="text-outline">9b74...3f81e</span>
                <span class="text-outline-variant px-gutter-xs">|</span>
                <span class="">TIMESTAMP: {{ now()->toIso8601String() }}</span>
            </div>
            <div class="flex items-center gap-gutter-xs">
                <span class="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
                <span class="text-on-surface-variant">WHITE-HAT LAB VERIFIED #SC-7049</span>
            </div>
        </div>
    </footer>
</body>

</html>
