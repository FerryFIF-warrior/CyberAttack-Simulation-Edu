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

    <x-navbar />

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