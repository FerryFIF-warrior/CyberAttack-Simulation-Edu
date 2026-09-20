@props(['title' => 'Security Cat — CyberAttack Simulator Edu'])

<!DOCTYPE html>
<html class="dark" lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ $title }}</title>
        <link href="{{ asset('assets/img/logo.png') }}" rel="icon" type="image/png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
        @vite('resources/js/blade.js')
    </head>
    <body class="min-h-screen bg-cat-bg font-sans text-slate-300 antialiased">
        {{ $slot }}
    </body>
</html>
