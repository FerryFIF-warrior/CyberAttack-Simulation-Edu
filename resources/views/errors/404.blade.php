<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>404 — Halaman Tidak Ditemukan · Security Cat</title>
    <link rel="icon" href="{{ asset('assets/img/logo.png') }}">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { background: #070b14; overflow: hidden; }

        .video-bg {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 0;
        }
    </style>
</head>
<body>
    {{-- Video full background saja (tanpa overlay — tulisan 404 sudah ada di dalam video).
         Putar terus-menerus (loop) selama user di halaman ini. --}}
    <video
        class="video-bg"
        src="{{ asset('assets/video/not-found.mp4') }}"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
    ></video>
</body>
</html>
