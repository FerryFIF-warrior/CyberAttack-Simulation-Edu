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

    @vite('resources/js/blade.js')
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
</head>

<body class="min-h-screen flex flex-col justify-between antialiased selection:bg-[#00e5ff]/30" style="background:radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%),radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%),#070b14;color:#cbd5e1">

    <header class="sticky top-0 z-50 backdrop-blur-xl" style="background:rgba(7,11,20,0.82);border-bottom:3px solid #233044;box-shadow:0 8px 24px rgba(0,0,0,0.35)">
        <div class="h-[62px] max-w-7xl mx-auto px-6 flex items-center justify-between">
            <a class="flex items-center gap-2 hover:opacity-90 transition" href="{{ url('/') }}">
                <img src="{{ asset('assets/img/logo.png') }}" alt="logo" class="h-7 w-7 rounded-xl" style="border:2px solid rgba(255,255,255,0.08);box-shadow:0 4px 12px rgba(0,0,0,0.35)" />
                <span class="font-extrabold tracking-tight text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif">Security Cat</span>
                <span class="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Edu Simulator</span>
            </a>
            <nav class="flex items-center gap-2">
                @auth
                    <a class="hidden sm:inline-flex px-3 py-1.5 rounded-full text-sm font-bold {{ request()->routeIs('dashboard') ? 'text-white' : 'text-white/60 hover:text-white' }}" style="{{ request()->routeIs('dashboard') ? 'background:#0f1828;border:2px solid rgba(255,255,255,0.08);box-shadow:inset 0 1px 0 rgba(255,255,255,0.06)' : '' }}" href="{{ route('dashboard') }}">Dashboard</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">@csrf<button type="submit" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold text-white/70 hover:text-white" style="border:2px solid transparent">Logout</button></form>
                @else
                    <a class="px-3 py-1.5 rounded-full text-sm font-bold {{ request()->routeIs('login') ? 'text-white' : 'text-white/60 hover:text-white' }}" style="{{ request()->routeIs('login') ? 'background:#0f1828;border:2px solid rgba(255,255,255,0.08)' : '' }}" href="{{ route('login') }}">Sign In</a>
                    <a class="px-4 py-1.5 rounded-full text-sm font-extrabold" style="background:#00e5ff;color:#0a0e15;border:2.5px solid #00b8cc;box-shadow:0 4px 0 #00b8cc,0 8px 18px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.3);font-family:'Nunito',sans-serif" href="{{ route('register') }}">Register</a>
                @endauth
            </nav>
        </div>
    </header>

    <main class="w-full flex-1 flex flex-col justify-center" style="background:transparent">
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