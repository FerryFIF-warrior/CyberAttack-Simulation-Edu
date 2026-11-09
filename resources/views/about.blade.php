<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="description" content="Profil dua developer Security-Cat — Abel Voura Ghea Adefika dan Ferry Iqbal Fuadi, kelompok Tacet Discord, D3 Teknik Informatika Sekolah Vokasi Universitas Sebelas Maret." />
  <title>Security Cat — Dua Developer di Balik Proyek</title>
  <link rel="icon" href="{{ asset('assets/img/logo.png') }}" type="image/png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Geist:wght@400;500;600&family=Instrument+Serif&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

  {{-- Navbar global memakai Tailwind; dimuat sebelum <style> supaya reset desain tetap menang. --}}
  @vite('resources/js/blade.js')

  <style>
    /* Hallmark · macrostructure: Photographic · tone: atmospheric-cinematic · anchor hue: cyan 195 (brand #00e5ff)
     * genre: atmospheric · theme: Aurora (kanvas gelap + dua bloom cyan statis + 3 aset Background) · enrichment: background
     * nav: navbar global (digabung dari N5 floating pill) · footer: Ft5 statement
     * background: 3 scene pixel-art · 01.jpg kota senja — tekstur fixed seluruh halaman (z -3, op 0.16) · 02.gif bar
     *   cyberpunk — pita hero full-bleed · 03.gif kota malam — pita proyek (op 0.26, mask atas+bawah)
     * GIF animasi TIDAK bisa dihentikan prefers-reduced-motion (CSS tak bisa menjeda playback GIF).
     */

    :root {
      /* ── Warna · Aurora: kanvas malam dingin, aksen cyan brand ── */
      --color-paper:     oklch(13% 0.021 235);
      --color-rule:      oklch(30% 0.020 230);
      --color-ink:       oklch(95% 0.006 220);
      --color-ink-2:     oklch(84% 0.010 215);
      --color-muted:     oklch(66% 0.013 210);
      --color-accent:    oklch(85% 0.130 195);   /* ≈ #00e5ff — cyan Security-Cat */
      --color-glow:      oklch(85% 0.130 195 / 0.30);
      --color-bloom-a:   oklch(78% 0.115 195 / 0.16);
      --color-bloom-b:   oklch(74% 0.100 200 / 0.10);
      --color-focus:     oklch(82% 0.120 195);

      /* ── Tipografi · 2+1: display serif + body sans + label mono ── */
      --font-display: "Instrument Serif", ui-serif, Georgia, serif;
      --font-body:    "Geist", ui-sans-serif, system-ui, sans-serif;
      --font-label:   "Space Mono", ui-monospace, monospace;

      --text-xs:    0.64rem;    /* 10.24px — label mono */
      --text-sm:    0.8rem;
      --text-base:  1rem;
      --text-md:    1.25rem;
      --text-lg:    1.5625rem;
      --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);
      --text-name:  clamp(1.75rem, 2.6vw + 1rem, 2.75rem);
      --text-stmt:  clamp(1.75rem, 4vw + 0.75rem, 3.25rem);

      /* ── Ruang · skala 4pt ── */
      --space-2xs: 0.25rem;
      --space-xs:  0.5rem;
      --space-sm:  0.75rem;
      --space-md:  1rem;
      --space-lg:  1.5rem;
      --space-xl:  2.5rem;
      --space-2xl: 4rem;
      --space-3xl: 6rem;
      --section-gap: clamp(5rem, 9vw, 8rem);
      --page-gutter: clamp(1rem, 4vw, 2.5rem);
      --page-max: 72rem;
      --pad-hero-top:    clamp(4.5rem, 8vh, 7rem);
      --pad-hero-bottom: clamp(6rem, 11vh, 9.5rem);
      --pad-fold-top:    clamp(3rem, 5vw, 5rem);

      /* ── Radius ── */
      --radius-pill: 999px;

      /* ── Bayangan · bertint ke anchor hue, bukan hitam murni ── */
      --shadow-lift:  oklch(8% 0.018 235 / 0.45);
      --shadow-photo: oklch(8% 0.018 235 / 0.50);

      /* ── Gerak ── */
      --ease-out:  cubic-bezier(0.16, 1, 0.3, 1);
      --dur-micro: 120ms;
    }

    * { box-sizing: border-box; }

    html {
      color-scheme: dark;
      overflow-x: clip;
      scroll-behavior: smooth;
      /* Anchor tidak ketutup navbar sticky */
      scroll-padding-top: var(--space-3xl);
    }
    body {
      overflow-x: clip;
      margin: 0;
      background: var(--color-paper);
      color: var(--color-ink-2);
      font-family: var(--font-body);
      font-size: var(--text-base);
      font-weight: 400;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    /* Dibungkus layer base supaya utilitas Tailwind (navbar) tetap menang. */
    @layer base {
      a { color: inherit; text-decoration: none; }
      button { font: inherit; }
    }
    a:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
      border-radius: 2px;
    }

    /* Dua bloom cyan statis — atmosfer genre atmospheric (gerak: tidak ada) */
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background:
        radial-gradient(42% 38% at 78% 10%, var(--color-bloom-a) 0%, transparent 70%),
        radial-gradient(38% 34% at 6% 92%, var(--color-bloom-b) 0%, transparent 72%);
    }

    /* Lapisan dasar · Background-01.jpg — tekstur gelap seluruh halaman */
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -3;
      pointer-events: none;
      background: url("{{ asset('assets/img/Background-01.jpg') }}") center / cover no-repeat;
      opacity: 0.16;
    }

    h1, h2 {
      font-family: var(--font-display);
      font-weight: 400;
      color: var(--color-ink);
      letter-spacing: -0.02em;
      line-height: 1.08;
      overflow-wrap: anywhere;
      min-width: 0;
      margin: 0;
    }

    p { margin: 0; }
    ul { margin: 0; padding: 0; list-style: none; }
    img { display: block; max-width: 100%; }

    .label {
      font-family: var(--font-label);
      font-size: var(--text-xs);
      font-weight: 400;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--color-muted);
      margin: 0;
    }

    /* ── Wordmark (dipakai footer) ── */
    .wordmark {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      font-family: var(--font-label);
      font-size: var(--text-sm);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-ink);
      white-space: nowrap;
    }
    .wordmark__dot {
      width: 7px;
      height: 7px;
      background: var(--color-accent);
      border-radius: 2px;
      flex: none;
    }

    /* ── Hero · bias kiri, tanpa full-viewport-centred ── */
    .hero {
      position: relative;
      max-width: var(--page-max);
      margin-inline: auto;
      padding: var(--pad-hero-top) var(--page-gutter) var(--pad-hero-bottom);
    }
    /* Pita full-bleed · Background-02.gif (scene pixel-art bar cyberpunk) */
    .hero::before {
      content: "";
      position: absolute;
      inset: 0 calc(50% - 50vw);
      z-index: -2;
      pointer-events: none;
      background:
        linear-gradient(90deg,
          color-mix(in oklch, var(--color-paper) 100%, transparent) 0%,
          color-mix(in oklch, var(--color-paper) 100%, transparent) 58%,
          color-mix(in oklch, var(--color-paper) 72%, transparent) 76%,
          color-mix(in oklch, var(--color-paper) 42%, transparent) 100%),
        url("{{ asset('assets/img/Background-02.gif') }}") center / cover no-repeat;
      -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);
      mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);
    }
    .hero__inner {
      max-width: 46rem;
      display: grid;
      gap: var(--space-lg);
    }
    .hero__title {
      font-size: var(--text-display);
      line-height: 1.04;
      max-width: 15ch;
    }
    .hero__lede {
      font-size: var(--text-md);
      line-height: 1.6;
      color: var(--color-ink-2);
      max-width: 55ch;
    }
    .hero__meta { margin-top: var(--space-xl); }

    /* Entrance bertahap saat load — blur→tajam + naik, stagger ≤ 500ms total delay */
    .hero__title   { animation: rise 1s var(--ease-out)  90ms both; }
    .hero__lede    { animation: rise 1s var(--ease-out) 180ms both; }
    .hero__meta    { animation: rise 1s var(--ease-out) 270ms both; }
    @keyframes rise {
      from { opacity: 0; transform: translateY(8px); filter: blur(8px); }
      to   { opacity: 1; transform: none; filter: blur(0); }
    }

    /* ── Fold developer · H6 photographic: potret mendominasi, anotasi di sudut ── */
    .dev {
      position: relative;
      max-width: var(--page-max);
      margin-inline: auto;
      padding: var(--section-gap) var(--page-gutter);
    }
    #abel   { padding-top: var(--pad-fold-top); }
    #ferry  { padding-top: var(--space-2xl); }

    .dev__row {
      display: grid;
      align-items: center;
      gap: var(--space-2xl);
    }
    .dev:not(.dev--mirror) .dev__row { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr); }
    .dev--mirror .dev__row { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.9fr); }

    .dev__stage {
      position: relative;
      margin: 0;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      min-height: clamp(31rem, 96dvh, 57rem);
    }
    .dev__halo {
      position: absolute;
      top: 6%;
      right: -6%;
      width: min(60%, 40rem);
      aspect-ratio: 1;
      background: radial-gradient(closest-side, var(--color-glow) 0%, transparent 72%);
      opacity: 0.55;
      pointer-events: none;
    }
    .dev__photo {
      position: relative;
      height: clamp(31rem, 96dvh, 57rem);
      width: auto;
      max-width: 100%;
      object-fit: contain;
      object-position: bottom;
      filter: drop-shadow(0 24px 48px var(--shadow-photo));
      -webkit-mask-image: linear-gradient(180deg, #000 82%, transparent 100%);
      mask-image: linear-gradient(180deg, #000 82%, transparent 100%);
    }
    .dev__info {
      display: grid;
      gap: var(--space-md);
    }
    .dev__name { font-size: var(--text-name); }
    .dev__id {
      font-variant-numeric: tabular-nums;
      color: var(--color-muted);
    }

    .dev__bio {
      font-size: var(--text-md);
      line-height: 1.6;
      color: var(--color-ink-2);
    }
    .dev__credits-label { margin-top: var(--space-xs); }
    .dev__tasks {
      display: grid;
      gap: var(--space-sm);
    }
    .dev__tasks li {
      position: relative;
      padding-left: var(--space-lg);
      line-height: 1.6;
      color: var(--color-ink-2);
    }
    .dev__tasks li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.65em;
      width: 7px;
      height: 7px;
      background: var(--color-accent);
      border-radius: 2px;
      opacity: 0.85;
    }

    /* Cermin: Ferry — foto kiri, teks kanan */
    .dev--mirror .dev__stage { justify-content: flex-start; }
    .dev--mirror .dev__halo { right: auto; left: -6%; }

    /* Reveal sekali-jalan saat fold masuk viewport */
    .js .dev__stage[data-reveal] {
      --slide: 90px;
      opacity: 0;
      transform: translateX(var(--slide)) scale(1.02);
    }
    .js .dev--mirror .dev__stage[data-reveal] { --slide: -90px; }
    .js .dev__stage[data-reveal].is-in {
      opacity: 1;
      transform: none;
      transition:
        opacity 1500ms var(--ease-out),
        transform 1500ms var(--ease-out);
    }

    .js .dev__info[data-reveal] .dev__name           { --line: 0 }
    .js .dev__info[data-reveal] .dev__id             { --line: 1 }
    .js .dev__info[data-reveal] .dev__bio            { --line: 2 }
    .js .dev__info[data-reveal] .dev__credits-label  { --line: 3 }
    .js .dev__info[data-reveal] .dev__tasks li { --line: 4 }
    .js .dev__info[data-reveal] :is(.dev__name, .dev__id, .dev__bio, .dev__credits-label, .dev__tasks li) {
      opacity: 0;
      transform: translateY(14px);
      transition:
        opacity 650ms var(--ease-out) calc(var(--line, 0) * 650ms),
        transform 650ms var(--ease-out) calc(var(--line, 0) * 650ms);
    }
    .js .dev__info[data-reveal].is-in :is(.dev__name, .dev__id, .dev__bio, .dev__credits-label, .dev__tasks li) {
      opacity: 1;
      transform: none;
    }

    /* ── Pita data proyek ── */
    .proyek {
      position: relative;
      max-width: var(--page-max);
      margin-inline: auto;
      padding: var(--section-gap) var(--page-gutter);
    }
    .proyek::before {
      content: "";
      position: absolute;
      inset: 0 calc(50% - 50vw);
      z-index: -2;
      pointer-events: none;
      background: url("{{ asset('assets/img/Background-03.gif') }}") center / cover no-repeat;
      opacity: 0.26;
      -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%);
      mask-image: linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%);
    }
    .proyek__intro {
      display: grid;
      gap: var(--space-md);
      max-width: 54ch;
    }
    .proyek__intro h2 { font-size: var(--text-lg); }
    .proyek__intro p { color: var(--color-ink-2); }

    /* ── Ft5 · footer statement ── */
    .foot {
      max-width: var(--page-max);
      margin-inline: auto;
      padding: var(--space-lg) var(--page-gutter) var(--space-3xl);
      display: grid;
      gap: var(--space-lg);
    }
    .foot__line {
      font-family: var(--font-display);
      font-size: var(--text-stmt);
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--color-ink);
      max-width: 38ch;
      overflow-wrap: anywhere;
      min-width: 0;
      margin: 0;
    }
    .foot__meta {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--space-sm);
      padding-top: var(--space-md);
      border-top: 1px solid var(--color-rule);
    }

    /* ── <60rem: H6 collapse — kartu turun inline di bawah foto ── */
    @media (max-width: 59.99rem) {
      .hero::before {
        background:
          linear-gradient(color-mix(in oklch, var(--color-paper) 90%, transparent),
                         color-mix(in oklch, var(--color-paper) 90%, transparent)),
          url("{{ asset('assets/img/Background-02.gif') }}") center / cover no-repeat;
      }
      .dev:not(.dev--mirror) .dev__row,
      .dev--mirror .dev__row {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--space-xl);
      }
      .dev__stage {
        order: -1;
        display: block;
        min-height: 0;
      }
      .dev__photo {
        height: auto;
        width: min(100%, 31rem);
        margin-inline: auto;
      }
      .dev .dev__halo {
        top: 0;
        right: auto;
        left: 50%;
        transform: translateX(-50%);
        width: min(90%, 26rem);
      }
    }

    /* ── <40rem: hero lega ── */
    @media (max-width: 39.99rem) {
      .hero__title { max-width: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .hero__title, .hero__lede, .hero__meta,
      .js .dev__stage[data-reveal],
      .js .dev__info[data-reveal] :is(.dev__name, .dev__id, .dev__bio, .dev__credits-label, .dev__tasks li) {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    }
  </style>
</head>
<body>
  <script>document.documentElement.classList.add("js");</script>

  <x-navbar />

  <header class="hero" id="atas">
    <div class="hero__inner">
      <h1 class="hero__title">Dua developer di balik Security&nbsp;Cat.</h1>
      <p class="hero__lede">Security Cat dibangun oleh kelompok Tacet Discord yang terdiri dari dua mahasiswa D3 Teknik Informatika,
        Sekolah Vokasi Universitas Sebelas Maret.
        Halaman ini membagi mana tangan mengerjakan apa.</p>
      <p class="label hero__meta">SKPL v2.5 · Madiun, 27 September 2026</p>
    </div>
  </header>

  <section class="dev" id="abel" aria-labelledby="nama-abel">
    <div class="dev__row">
      <div class="dev__info" data-reveal>
        <h2 class="dev__name" id="nama-abel">Abel Voura Ghea Adefika</h2>
        <p class="label dev__id">V3925038 · Dokumentasi &amp; Konten Pembelajaran</p>
        <p class="dev__bio">Penyusun utama dokumentasi SKPL v2.5 dan materi pembelajaran Security Cat.</p>
        <p class="label dev__credits-label">Pembagian tugas</p>
        <ul class="dev__tasks">
          <li>Menyusun Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) v2.5, analisis kebutuhan, pemodelan proses bisnis, hingga penutup.</li>
          <li>Materi pembelajaran empat modul: Phishing, Brute Force, SQL Injection, dan Authentication Attack.</li>
        </ul>
      </div>
      <figure class="dev__stage" data-reveal>
        <span class="dev__halo" aria-hidden="true"></span>
        <img class="dev__photo" src="{{ asset('assets/img/Dev-2.png') }}" alt="Potret Abel Voura Ghea Adefika" width="1086" height="1448" loading="lazy" decoding="async" />
      </figure>
    </div>
  </section>

  <section class="dev dev--mirror" id="ferry" aria-labelledby="nama-ferry">
    <div class="dev__row">
      <figure class="dev__stage" data-reveal>
        <span class="dev__halo" aria-hidden="true"></span>
        <img class="dev__photo" src="{{ asset('assets/img/Dev-1.png') }}" alt="Potret Ferry Iqbal Fuadi" width="1086" height="1448" loading="lazy" decoding="async" />
      </figure>
      <div class="dev__info" data-reveal>
        <h2 class="dev__name" id="nama-ferry">Ferry Iqbal Fuadi</h2>
        <p class="label dev__id">V3925006 · Backend, Simulator &amp; Rilis</p>
        <p class="dev__bio">Mengerjakan inti aplikasi: server, simulasi serangan, modul Chat-AI, sampai deployment proyek.</p>
        <p class="label dev__credits-label">Pembagian tugas</p>
        <ul class="dev__tasks">
          <li>Backend Laravel autentikasi, dashboard, dan struktur basis data.</li>
          <li>Simulator empat skenario serangan, progres level/floor, dan security log.</li>
          <li>Integrasi modul Chat-AI tutor berbasis RAG.</li>
          <li>Infrastruktur rilis: Docker + FrankenPHP, Vercel, dan TiDB dengan TLS.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="proyek" id="proyek" aria-labelledby="nama-proyek">
    <div class="proyek__intro">
      <h2 id="nama-proyek">Security Cat</h2>
      <p>CyberAttack Simulator Edu - platform web edukasi cybersecurity berbahasa Indonesia: materi, empat simulator serangan pada environment dummy, kuis dengan XP dan badge, serta Chat-AI tutor berbasis RAG. Seluruh simulasi berjalan terisolasi: dibuat untuk dipelajari, bukan untuk dipakai menyerang.</p>
    </div>
  </section>

  <footer class="foot">
    <p class="foot__line">Dua tangan membangun satu simulator.</p>
    <div class="foot__meta">
      <span class="wordmark"><span class="wordmark__dot" aria-hidden="true"></span>security-cat</span>
      <span class="label">Tacet Discord · Semester 3 · 2026</span>
    </div>
  </footer>

  <script>
    (function () {
      var targets = document.querySelectorAll("[data-reveal]");
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !("IntersectionObserver" in window)) {
        targets.forEach(function (el) { el.classList.add("is-in"); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
      targets.forEach(function (el) { io.observe(el); });
    })();
  </script>
</body>
</html>
