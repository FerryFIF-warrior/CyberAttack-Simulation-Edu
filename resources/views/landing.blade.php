<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Security Cat — Lab Serangan Siber</title>
  <meta name="description" content="Ruang latihan serangan siber untuk mahasiswa. Floor bertingkat, target terisolasi, dan data dummy." />
  <link rel="icon" href="{{ asset('assets/img/logo.png') }}" type="image/png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Nunito:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

  {{-- Navbar global memakai Tailwind; dimuat sebelum <style> supaya reset desain tetap menang. --}}
  @vite('resources/js/blade.js')

  <style>
    /* Hallmark · macrostructure: Split Studio (dikunci brief — layout landing-cinematic)
     * theme: clay dark (sistem project Security Cat) · vibe: "puffy navy toy, cyan signal"
     * paper: #070b14 · surface: #162030 · line: #233044 · accent: #00e5ff
     * display: Bricolage Grotesque · body: Nunito · label: Space Mono
     */

    :root {
      --paper:        #070b14;
      --paper-glow-a: #1a2a44;
      --paper-glow-b: #1e2a4a;
      --paper-glow-c: #0e1e36;
      --surface:      #162030;
      --inset:        #0f1828;
      --line:         #233044;
      --line-soft:    rgba(255, 255, 255, 0.07);
      --rule:         rgba(255, 255, 255, 0.05);
      --paper-glass:  rgba(7, 11, 20, 0.84);

      --ink:          #ffffff;
      --ink-2:        #cbd5e1;
      --muted:        #8b98ab;
      --muted-2:      #7f8da1;

      --accent:       #00e5ff;
      --accent-deep:  #00b8cc;
      --accent-soft:  rgba(0, 229, 255, 0.18);
      --green:        #34d399;
      --amber:        #ffd23a;
      --violet:       #a78bfa;
      --focus:        #00e5ff;

      --font-display: "Bricolage Grotesque", "Nunito", ui-sans-serif, system-ui, sans-serif;
      --font-body:    "Nunito", ui-sans-serif, system-ui, sans-serif;
      --font-label:   "Space Mono", ui-monospace, monospace;

      --r-card:   28px;
      --r-inset:  20px;
      --r-btn:    16px;
      --r-pill:   999px;
      --shadow-card:  0 18px 36px rgba(0, 0, 0, 0.55), 0 6px 14px rgba(0, 0, 0, 0.4),
                      inset 0 1.5px 0 rgba(255, 255, 255, 0.08), inset 0 -3px 0 rgba(0, 0, 0, 0.35);
      --shadow-inset: inset 0 3px 10px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      --shadow-lift:  0 22px 44px rgba(0, 0, 0, 0.55), 0 8px 18px rgba(0, 0, 0, 0.4),
                      inset 0 1.5px 0 rgba(255, 255, 255, 0.1);

      --dur-micro: 120ms;
      --dur-short: 200ms;
      --dur-long:  620ms;
      --ease-out:  cubic-bezier(.22, .61, .36, 1);
      --ease-puff: cubic-bezier(.22, 1, .36, 1);
    }

    *, *::before, *::after { box-sizing: border-box; }

    html, body { overflow-x: clip; }

    /* Anchor section tidak ketutup navbar sticky */
    html { scroll-padding-top: 96px; }

    /* Dibungkus layer base supaya utilitas Tailwind (navbar) tetap menang. */
    @layer base {
      a { color: inherit; text-decoration: none; }
      button { font: inherit; }
    }

    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(900px 600px at 20% -10%, var(--paper-glow-a) 0%, transparent 60%),
        radial-gradient(800px 600px at 95% 10%, var(--paper-glow-b) 0%, transparent 55%),
        radial-gradient(700px 500px at 50% 100%, var(--paper-glow-c) 0%, var(--paper) 60%),
        var(--paper);
      background-attachment: fixed;
      color: var(--ink-2);
      font-family: var(--font-body);
      font-weight: 600;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      caret-color: var(--accent);
    }

    :focus-visible {
      outline: 3px solid var(--focus);
      outline-offset: 3px;
      border-radius: 8px;
    }

    .shell {
      width: 100%;
      max-width: 1320px;
      margin-inline: auto;
      padding-inline: 20px;
    }
    @media (min-width: 640px) { .shell { padding-inline: 32px; } }
    @media (min-width: 1024px) { .shell { padding-inline: 48px; } }

    /* ── Clay primitives ─────────────────────────────── */
    .clay-card {
      background: var(--surface);
      border: 3px solid var(--line);
      border-radius: var(--r-card);
      box-shadow: var(--shadow-card);
    }
    .clay-inset {
      background: var(--inset);
      border: 2px solid var(--line-soft);
      border-radius: var(--r-inset);
      box-shadow: var(--shadow-inset);
    }
    .clay-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      min-height: 26px;
      padding: 0 11px;
      border-radius: var(--r-pill);
      background: var(--inset);
      border: 2px solid var(--line-soft);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                  0 2px 8px rgba(0, 0, 0, 0.3);
      font-family: var(--font-label);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      white-space: nowrap;
    }

    /* ── Type ────────────────────────────────────────── */
    .display {
      margin: 0;
      font-family: var(--font-display);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 0.95;
      color: var(--ink);
      text-transform: lowercase;
      overflow-wrap: anywhere;
      min-width: 0;
    }

    .label {
      font-family: var(--font-label);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--muted);
      line-height: 1.4;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }

    /* ── Buttons — clay puff ─────────────────────────── */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      min-height: 46px;
      padding: 0 22px;
      border: 2.5px solid var(--accent-deep);
      border-radius: var(--r-btn);
      background: var(--accent);
      color: var(--paper);
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.01em;
      box-shadow: 0 5px 0 var(--accent-deep), 0 10px 22px rgba(0, 0, 0, 0.35),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transition: transform var(--dur-micro) var(--ease-out),
                  filter var(--dur-micro) var(--ease-out),
                  box-shadow var(--dur-micro) var(--ease-out);
    }
    .btn:hover { filter: brightness(1.06); transform: translateY(-1px); }
    .btn:active {
      transform: translateY(3px);
      box-shadow: 0 2px 0 var(--accent-deep), 0 4px 10px rgba(0, 0, 0, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.18);
    }

    .btn--quiet {
      background: var(--surface);
      color: var(--ink);
      border-color: var(--line);
      box-shadow: 0 5px 0 rgba(0, 0, 0, 0.35), 0 10px 22px rgba(0, 0, 0, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    .btn--quiet:hover { border-color: var(--muted-2); filter: none; }
    .btn--quiet:active {
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.35), 0 4px 10px rgba(0, 0, 0, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .btn--sm { min-height: 38px; padding: 0 16px; font-size: 13px; border-radius: 14px; }

    .text-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      font-family: var(--font-label);
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      border-bottom: 2px solid var(--line);
      transition: color var(--dur-short) var(--ease-out),
                  border-color var(--dur-short) var(--ease-out);
    }
    .text-link:hover { color: var(--ink); border-color: var(--accent); }

    /* ── Hero ────────────────────────────────────────── */
    .hero {
      position: relative;
      border-bottom: 1px solid var(--rule);
      isolation: isolate;
      overflow: hidden;
      padding-bottom: 64px;
    }
    .hero-inner {
      position: relative;
      z-index: 2;
      padding-top: 56px;
    }
    @media (min-width: 900px) {
      .hero { padding-bottom: 104px; }
      .hero-inner { padding-top: 88px; }
    }

    .hero-title {
      font-size: clamp(2.6rem, 6.2vw + 1rem, 5.3rem);
      max-width: 12ch;
    }
    .hero-title .line { display: block; }
    .hero-title .line--signal {
      color: var(--accent);
      text-shadow: 0 6px 30px rgba(0, 229, 255, 0.22);
    }

    .hero-lede {
      margin: 24px 0 0;
      max-width: 46ch;
      font-size: 16px;
      line-height: 1.7;
      font-weight: 600;
      color: var(--muted);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px 22px;
      margin-top: 32px;
    }

    /* Maskot latar hero */
    .hero-ghost {
      position: absolute;
      z-index: 0;
      right: 0;
      top: 8%;
      bottom: auto;
      width: min(400px, 100vw);
      height: auto;
      transform: translateX(10%);
      pointer-events: none;
      user-select: none;
      opacity: 0.11;
      filter: drop-shadow(0 0 44px rgba(0, 229, 255, 0.18));
    }
    @media (min-width: 641px) {
      .hero-ghost { width: 460px; top: auto; bottom: 0; transform: translate(13%, 13%); opacity: 0.24; }
    }
    @media (min-width: 900px) {
      .hero-ghost { width: 620px; transform: translate(13%, 13%); opacity: 0.3; }
    }

    /* ── Sections ────────────────────────────────────── */
    .section {
      padding-top: 64px;
      padding-bottom: 64px;
      border-bottom: 1px solid var(--rule);
    }
    @media (min-width: 900px) {
      .section { padding-top: 84px; padding-bottom: 84px; }
    }

    .section-head { display: grid; gap: 18px; }
    @media (min-width: 900px) {
      .section-head {
        grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
        gap: 40px;
        align-items: end;
      }
    }
    .section-title {
      margin: 14px 0 0;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(1.9rem, 3.2vw + 1rem, 2.9rem);
      line-height: 1.02;
      letter-spacing: -0.03em;
      color: var(--ink);
      max-width: 14ch;
      overflow-wrap: anywhere;
    }
    .section-note {
      margin: 0;
      max-width: 52ch;
      font-size: 15px;
      line-height: 1.7;
      font-weight: 600;
      color: var(--muted);
    }

    .head-side { display: flex; flex-direction: column; gap: 14px; }
    .companion {
      width: clamp(84px, 9vw, 108px);
      height: auto;
      margin-left: auto;
      object-fit: contain;
      opacity: 0.9;
      filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.45));
      transition: transform 600ms var(--ease-puff);
    }
    .head-side:hover .companion { transform: translateY(-4px) rotate(-2deg); }
    @media (max-width: 899px) {
      .companion { display: none; }
    }

    /* ── Steps ───────────────────────────────────────── */
    .steps {
      display: grid;
      gap: 20px;
      margin-top: 40px;
      align-items: start;
    }
    @media (min-width: 760px) {
      .steps { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .step {
      padding: 24px;
      background: var(--surface);
      border: 3px solid var(--line);
      border-radius: var(--r-card);
      box-shadow: var(--shadow-card);
      transition: transform var(--dur-short) var(--ease-puff),
                  border-color var(--dur-short) var(--ease-out),
                  box-shadow var(--dur-short) var(--ease-out);
    }
    .step:hover {
      transform: translateY(-4px);
      border-color: var(--accent-soft);
      box-shadow: var(--shadow-lift);
    }
    .step-num {
      display: inline-flex;
      align-items: center;
      min-height: 26px;
      padding: 0 10px;
      border-radius: var(--r-pill);
      background: var(--inset);
      border: 2px solid var(--line-soft);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 2px 8px rgba(0, 0, 0, 0.3);
      font-family: var(--font-label);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--accent);
    }
    .step h3 {
      margin: 16px 0 8px;
      font-family: var(--font-display);
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--ink);
    }
    .step p { margin: 0; font-size: 14px; line-height: 1.65; font-weight: 600; color: var(--muted); }

    /* ── Step yang bisa dibuka ───────────────────────── */
    .step--more { position: relative; }
    .step--more:hover { transform: none; }
    .step--more.is-open {
      border-color: var(--accent-soft);
      box-shadow: var(--shadow-lift);
    }
    .step-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .step-cue {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-label);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted-2);
      transition: color var(--dur-short) var(--ease-out);
    }
    .step-cue svg { transition: transform 500ms var(--ease-puff); }
    .step--more:hover .step-cue { color: var(--ink-2); }
    .step--more.is-open .step-cue { color: var(--accent); }
    .step--more.is-open .step-cue svg { transform: rotate(135deg); }

    .step-hit {
      position: absolute;
      inset: 0;
      z-index: 3;
      width: 100%;
      padding: 0;
      border: 0;
      background: none;
      border-radius: inherit;
      cursor: pointer;
    }
    .step--more:has(.step-hit:focus-visible) {
      outline: 3px solid var(--focus);
      outline-offset: 3px;
    }
    .step-hit:focus-visible { outline: none; }

    .step-detail {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 500ms var(--ease-out);
    }
    .step--more.is-open .step-detail { grid-template-rows: 1fr; }
    .step-detail-inner {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 0;
      padding-top: 16px;
      overflow: hidden;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity 300ms var(--ease-out), transform 500ms var(--ease-puff);
    }
    .step--more.is-open .step-detail-inner {
      opacity: 1;
      transform: none;
    }
    .step-detail-text {
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
      font-weight: 600;
      color: var(--ink-2);
    }
    .step-mascot {
      width: 76px;
      height: 76px;
      flex: none;
      object-fit: contain;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45));
    }
    @media (max-width: 420px) {
      .step-mascot { width: 60px; height: 60px; }
    }

    /* ── Learning cycle ──────────────────────────────── */
    .cycle {
      display: grid;
      gap: 14px;
      margin-top: 40px;
    }
    @media (min-width: 760px) {
      .cycle { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    @media (min-width: 1100px) {
      .cycle { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    }
    .cycle .step {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      padding: 20px 20px 84px;
    }
    .cycle .step h3 { margin-top: 14px; font-size: 16px; }
    .cycle .step p { font-size: 13px; }
    .cycle .step:nth-child(2) .step-num { color: var(--green); }
    .cycle .step:nth-child(3) .step-num { color: var(--amber); }
    .cycle .step:nth-child(4) .step-num { color: var(--violet); }
    .cycle .step:nth-child(5) .step-num { color: var(--accent); }

    .cycle .step > :not(.cycle-mascot) { position: relative; z-index: 2; }
    .cycle-mascot {
      position: absolute;
      z-index: 0;
      right: -4%;
      bottom: -4%;
      width: 72%;
      height: auto;
      opacity: 0;
      transform: translateX(112%);
      pointer-events: none;
      user-select: none;
      filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));
      transition: transform 850ms var(--ease-out),
                  opacity 300ms var(--ease-out);
    }
    .cycle .step::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(to bottom,
        var(--surface) 0%,
        var(--surface) 42%,
        rgba(22, 32, 48, 0.72) 62%,
        rgba(22, 32, 48, 0) 96%);
    }
    .cycle .step:hover .cycle-mascot,
    .cycle .step:focus-within .cycle-mascot {
      opacity: 0.32;
      transform: translateX(0);
    }
    @media (hover: none) {
      .cycle-mascot { opacity: 0.26; transform: none; }
    }

    /* ── Index rows ──────────────────────────────────── */
    .index {
      display: grid;
      gap: 12px;
      margin-top: 40px;
    }
    .index-row {
      display: grid;
      grid-template-columns: 92px minmax(0, 1fr) auto;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      background: var(--inset);
      border: 2px solid var(--line-soft);
      border-radius: var(--r-inset);
      box-shadow: var(--shadow-inset);
      transition: transform var(--dur-short) var(--ease-puff),
                  background-color var(--dur-short) var(--ease-out),
                  border-color var(--dur-short) var(--ease-out),
                  box-shadow var(--dur-short) var(--ease-out);
    }
    a.index-row:hover {
      transform: translateY(-3px);
      background: var(--surface);
      border-color: var(--accent-soft);
      box-shadow: 0 16px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    .index-code {
      font-family: var(--font-label);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--accent);
      overflow-wrap: anywhere;
    }
    .index-code--violet { color: var(--violet); }
    .index-code--amber  { color: var(--amber); }
    .index-code--green  { color: var(--green); }
    .index-name {
      display: block;
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--ink);
      overflow-wrap: anywhere;
    }
    .index-meta {
      display: block;
      margin-top: 3px;
      font-family: var(--font-label);
      font-size: 10px;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--muted-2);
    }
    .index-row .clay-pill { justify-self: end; }
    a.index-row:hover .clay-pill { color: var(--ink); border-color: var(--line); }

    @media (max-width: 560px) {
      .index-row {
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas: "code pill" "body body";
        row-gap: 10px;
      }
      .index-code { grid-area: code; }
      .index-row > span:nth-child(2) { grid-area: body; }
      .index-row .clay-pill { grid-area: pill; }
    }

    /* ── Principles ──────────────────────────────────── */
    .principles {
      display: grid;
      gap: 20px;
      margin-top: 40px;
    }
    @media (min-width: 760px) {
      .principles { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    .principle {
      padding: 24px;
      background: var(--surface);
      border: 3px solid var(--line);
      border-radius: var(--r-card);
      box-shadow: var(--shadow-card);
    }
    .principle h3 {
      margin: 0 0 10px;
      font-family: var(--font-label);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--ink);
    }
    .principle p { margin: 0; font-size: 14px; line-height: 1.65; font-weight: 600; color: var(--muted); }

    /* ── Stats strip ─────────────────────────────────── */
    .stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin-top: 24px;
    }
    @media (min-width: 760px) { .stats { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
    .stat {
      padding: 18px;
      background: var(--inset);
      border: 2px solid var(--line-soft);
      border-radius: var(--r-inset);
      box-shadow: var(--shadow-inset);
    }
    .stat b {
      display: block;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(24px, 3vw, 30px);
      line-height: 1;
      color: var(--ink);
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
    }
    .stat .label { margin-top: 7px; display: block; font-size: 10px; }

    /* ── Closing ─────────────────────────────────────── */
    .close-band { padding-block: 64px; }
    @media (min-width: 900px) { .close-band { padding-block: 88px; } }

    .close-card {
      position: relative;
      overflow: hidden;
      padding: 32px 26px;
      background: var(--surface);
      border: 3px solid var(--line);
      border-radius: 32px;
      box-shadow: var(--shadow-card);
      isolation: isolate;
    }
    @media (min-width: 640px) { .close-card { padding: 44px 40px; } }
    .close-mascot {
      position: absolute;
      right: -4%;
      bottom: -1%;
      z-index: 0;
      width: min(300px, 42vw);
      height: auto;
      opacity: 0.95;
      pointer-events: none;
      user-select: none;
      filter: drop-shadow(0 18px 36px rgba(0, 0, 0, 0.5));
    }
    @media (min-width: 900px) {
      .close-mascot { width: 320px; right: -2%; bottom: -3%; }
    }
    @media (max-width: 639px) {
      .close-mascot { display: none; }
    }
    .close-inner { position: relative; z-index: 1; }
    .close-title {
      margin: 16px 0 0;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: clamp(2rem, 5vw + 0.5rem, 3.6rem);
      line-height: 0.99;
      letter-spacing: -0.03em;
      color: var(--ink);
      max-width: 16ch;
      overflow-wrap: anywhere;
    }
    .close-title .line--signal { color: var(--accent); }
    .close-inner .hero-actions { margin-top: 28px; }

    /* ── Footer ──────────────────────────────────────── */
    .site-foot {
      padding-block: 22px;
      border-top: 3px solid var(--line);
      background: var(--paper-glass);
      font-family: var(--font-label);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted-2);
    }
    .foot-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px 24px;
    }
    .foot-links { display: flex; gap: 18px; }
    .foot-links a { border-bottom: 2px solid transparent; padding-bottom: 2px; }
    .foot-links a:hover { color: var(--ink); border-color: var(--accent); }

    /* ── Motion ──────────────────────────────────────── */
    .reveal {
      opacity: 0;
      transform: translateY(14px);
      animation: reveal var(--dur-long) var(--ease-out) forwards;
      animation-delay: calc(var(--i, 0) * 55ms);
    }
    @keyframes reveal { to { opacity: 1; transform: none; } }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 1ms !important;
      }
      .reveal { opacity: 1; transform: none; }
    }
  </style>
</head>
<body>

  @php
      // Semua lab berbagi jumlah floor yang sama; kalau suatu saat berbeda,
      // kalimat langkah otomatis jatuh ke "puluhan" supaya tidak menyesatkan.
      $floorCounts = array_map(
          fn ($lab) => array_sum(array_column(config('simulation.levels')[$lab['slug']] ?? [], 'floorCount')),
          $labs
      );
      $uniqueFloors = array_unique($floorCounts);
      $floorsPerLab = count($uniqueFloors) === 1 ? (string) (int) reset($uniqueFloors) : 'puluhan';
  @endphp

  <x-navbar />

  <main>

    <!-- Hero -->
    <section class="hero">
      <img class="hero-ghost" src="{{ asset('assets/img/13_relaxed.svg') }}" alt="" aria-hidden="true" />
      <div class="shell">
        <div class="hero-inner">
          <h1 class="display hero-title reveal" style="--i:1;">
            <span class="line">latih naluri.</span>
            <span class="line">baca jejak.</span>
            <span class="line line--signal">jaga sistem.</span>
          </h1>

          <p class="hero-lede reveal" style="--i:2;">
            Ruang latihan serangan siber untuk mahasiswa. Setiap modul berisi floor
            bertingkat, target terisolasi, dan data dummy, aman untuk salah berkali-kali.
          </p>

          <div class="hero-actions reveal" style="--i:3;">
            <a href="#modul" class="text-link">Lihat {{ count($labs) }} modul</a>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="section" id="cara-kerja">
      <div class="shell">
        <div class="section-head">
          <div>
            <h2 class="section-title reveal" style="--i:1;">Tiga langkah, satu sandbox.</h2>
          </div>
          <p class="section-note reveal" style="--i:2;">
            Kamu masuk, mencoba, gagal, lalu membaca jejak seranganmu sendiri.
            Semua di dalam sandbox yang bisa diulang.
          </p>
        </div>

        <div class="steps">
          <article class="step step--more reveal" style="--i:3;">
            <button type="button" class="step-hit" aria-expanded="false" aria-controls="step-1">
              <span class="sr-only">Buka detail langkah 01 - Pilih modul</span>
            </button>
            <div class="step-top">
              <span class="step-num">01</span>
              <span class="step-cue" aria-hidden="true">
                Detail
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              </span>
            </div>
            <h3>Pilih modul</h3>
            <p>Empat skenario: phishing, SQL injection, brute force, dan kontrol akses.</p>
            <div class="step-detail" id="step-1">
              <div class="step-detail-inner">
                <img class="step-mascot" src="{{ asset('assets/img/10_curious.svg') }}" alt="" aria-hidden="true" />
                <p class="step-detail-text">Tiap modul punya {{ $floorsPerLab }} floor bertingkat. Mulai dari yang paling dasar, atau lompat ke skenario yang ingin kamu kuasai.</p>
              </div>
            </div>
          </article>

          <article class="step step--more reveal" style="--i:4;">
            <button type="button" class="step-hit" aria-expanded="false" aria-controls="step-2">
              <span class="sr-only">Buka detail langkah 02 - Telusuri floor</span>
            </button>
            <div class="step-top">
              <span class="step-num">02</span>
              <span class="step-cue" aria-hidden="true">
                Detail
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              </span>
            </div>
            <h3>Telusuri floor</h3>
            <p>Tiap modul punya {{ $floorsPerLab }} floor. Naik satu per satu, atau ulangi floor yang gagal.</p>
            <div class="step-detail" id="step-2">
              <div class="step-detail-inner">
                <img class="step-mascot" src="{{ asset('assets/img/02_walking.svg') }}" alt="" aria-hidden="true" />
                <p class="step-detail-text">Salah tidak menghapus progres. Floor yang sudah selesai tetap tercatat, jadi kamu bisa berhenti lalu melanjutkan kapan saja.</p>
              </div>
            </div>
          </article>

          <article class="step step--more reveal" style="--i:5;">
            <button type="button" class="step-hit" aria-expanded="false" aria-controls="step-3">
              <span class="sr-only">Buka detail langkah 03 — Baca laporan</span>
            </button>
            <div class="step-top">
              <span class="step-num">03</span>
              <span class="step-cue" aria-hidden="true">
                Detail
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              </span>
            </div>
            <h3>Baca laporan</h3>
            <p>Skor, temuan, dan jejak aktivitas tersimpan agar bisa kamu tinjau ulang.</p>
            <div class="step-detail" id="step-3">
              <div class="step-detail-inner">
                <img class="step-mascot" src="{{ asset('assets/img/12_proud.svg') }}" alt="" aria-hidden="true" />
                <p class="step-detail-text">Semua jejak masuk ke security log: kapan dimulai, keputusan apa yang diambil, dan di floor mana kamu berhenti.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Learning cycle -->
    <section class="section" id="siklus">
      <div class="shell">
        <div class="section-head">
          <div>
            <h2 class="section-title reveal" style="--i:1;">Lima tahap, berulang tiap modul.</h2>
          </div>
          <p class="section-note reveal" style="--i:2;">
            Konsep inti Security Cat adalah Attack–Defense Visualization. Setiap modul
            berjalan dari serangan, deteksi, pertahanan, evaluasi, sampai pembelajaran.
          </p>
        </div>

        <div class="cycle">
          <article class="step reveal" style="--i:3;">
            <img class="cycle-mascot" src="{{ asset('assets/img/kucing_04_semangat.svg') }}" alt="" aria-hidden="true" />
            <span class="step-num">01</span>
            <h3>Attack</h3>
            <p>Menjalankan skenario serangan pada environment dummy yang sudah disiapkan.</p>
          </article>
          <article class="step reveal" style="--i:4;">
            <img class="cycle-mascot" src="{{ asset('assets/img/kucing_03_penasaran.svg') }}" alt="" aria-hidden="true" />
            <span class="step-num">02</span>
            <h3>Detection</h3>
            <p>Jejak serangan muncul di security log secara real-time.</p>
          </article>
          <article class="step reveal" style="--i:5;">
            <img class="cycle-mascot" src="{{ asset('assets/img/kucing_10_mengintai.svg') }}" alt="" aria-hidden="true" />
            <span class="step-num">03</span>
            <h3>Defense</h3>
            <p>Memilih pertahanan — rate limiting, validasi input, MFA, logging — lalu melihat dampaknya.</p>
          </article>
          <article class="step reveal" style="--i:6;">
            <img class="cycle-mascot" src="{{ asset('assets/img/04_sitting.svg') }}" alt="" aria-hidden="true" />
            <span class="step-num">04</span>
            <h3>Evaluation</h3>
            <p>Kuis dan scenario menilai keputusanmu; skor dan XP tercatat.</p>
          </article>
          <article class="step reveal" style="--i:7;">
            <img class="cycle-mascot" src="{{ asset('assets/img/13_relaxed.svg') }}" alt="" aria-hidden="true" />
            <span class="step-num">05</span>
            <h3>Learning</h3>
            <p>Materi dan Chat-AI membantu memahami apa yang baru saja terjadi.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section class="section" id="modul">
      <div class="shell">
        <div class="section-head">
          <div>
            <h2 class="section-title reveal" style="--i:1;">Empat jalur serangan.</h2>
          </div>
          <div class="head-side">
            <img class="companion" src="{{ asset('assets/img/02_walking.svg') }}" alt="" aria-hidden="true" />
            <p class="section-note reveal" style="--i:2;">
              Disusun bertingkat: dari menggoda korban, membaca query, menebak kredensial,
              sampai memahami batas akses.
            </p>
          </div>
        </div>

        <div class="index">
          @foreach ($labs as $lab)
            @php
                $codeClass = ['', 'index-code--violet', 'index-code--amber', 'index-code--green'][$loop->index % 4];
                $labFloors = array_sum(array_column(config('simulation.levels')[$lab['slug']] ?? [], 'floorCount'));
                $labLevels = count(config('simulation.levels')[$lab['slug']] ?? []);
            @endphp
            <a href="{{ route('simulasi.detail', $lab['slug']) }}" class="index-row reveal" style="--i:{{ 3 + $loop->index }};">
              <span class="index-code {{ $codeClass }}">{{ $lab['code'] }}</span>
              <span>
                <span class="index-name">{{ $lab['lab_name'] }}</span>
                <span class="index-meta">{{ $lab['category'] }} · {{ $labLevels }} level · {{ $labFloors }} floor</span>
              </span>
              <span class="clay-pill">Masuk →</span>
            </a>
          @endforeach
        </div>
      </div>
    </section>

    <!-- Chat-AI tutor -->
    <section class="section" id="ai">
      <div class="shell">
        <div class="section-head">
          <div>
            <h2 class="section-title reveal" style="--i:1;">Tanya materi, bukan alat serangan.</h2>
          </div>
          <div class="head-side">
            <img class="companion" src="{{ asset('assets/img/13_relaxed.svg') }}" alt="" aria-hidden="true" />
            <p class="section-note reveal" style="--i:2;">
              Pendamping belajar berbasis materi Security Cat. Saat kamu bertanya, sistem
              mengambil bagian materi yang relevan lebih dulu, baru menyusun jawaban
              lengkap dengan sumbernya.
            </p>
          </div>
        </div>

        <div class="index">
          <div class="index-row reveal" style="--i:3;">
            <span class="index-code">A1</span>
            <span>
              <span class="index-name">Knowledge base</span>
              <span class="index-meta">Materi Security Cat · chunking</span>
            </span>
            <span class="clay-pill">Sumber</span>
          </div>
          <div class="index-row reveal" style="--i:4;">
            <span class="index-code">A2</span>
            <span>
              <span class="index-name">Retrieval (RAG)</span>
              <span class="index-meta">Potongan relevan diambil dari pertanyaanmu</span>
            </span>
            <span class="clay-pill">Cari</span>
          </div>
          <div class="index-row reveal" style="--i:5;">
            <span class="index-code">A3</span>
            <span>
              <span class="index-name">ChatBot API</span>
              <span class="index-meta">Pertanyaan + konteks materi dikirim ke LLM</span>
            </span>
            <span class="clay-pill">Jawab</span>
          </div>
          <div class="index-row reveal" style="--i:6;">
            <span class="index-code">A4</span>
            <span>
              <span class="index-name">Jawaban + sumber</span>
              <span class="index-meta">Bertanda sumber materi; bisa dinilai &amp; disimpan</span>
            </span>
            <span class="clay-pill">Tinjau</span>
          </div>
        </div>

        <p class="reveal" style="--i:7; margin: 28px 0 0; max-width: 58ch; font-size: 14px; line-height: 1.7; font-weight: 600; color: var(--muted);">
          Chat-AI dibatasi pada konteks pembelajaran: permintaan serangan nyata, scanning,
          atau eksploitasi ditolak. Jika layanan AI sedang tidak tersedia, materi dan
          simulator tetap berjalan seperti biasa.
        </p>
      </div>
    </section>

    <!-- Sandbox principles -->
    <section class="section" id="sandbox">
      <div class="shell">
        <div class="section-head">
          <div>
            <h2 class="section-title reveal" style="--i:1;">Aman untuk mencoba.</h2>
          </div>
          <div class="head-side">
            <img class="companion" src="{{ asset('assets/img/09_angry_defensive.svg') }}" alt="" aria-hidden="true" />
            <p class="section-note reveal" style="--i:2;">
              Latihan menyerang tanpa menyerang siapa pun. Semua target berjalan
              di lingkungan tertutup.
            </p>
          </div>
        </div>

        <div class="principles">
          <article class="principle reveal" style="--i:3;">
            <h3>Isolasi penuh</h3>
            <p>Setiap sesi berjalan di sandbox terpisah. Eksperimenmu tidak menyentuh sistem nyata.</p>
          </article>
          <article class="principle reveal" style="--i:4;">
            <h3>Data dummy</h3>
            <p>Nama, kredensial, dan basis data di dalam latihan adalah data buatan.</p>
          </article>
          <article class="principle reveal" style="--i:5;">
            <h3>Progres tersimpan</h3>
            <p>Floor yang selesai dan skor terakhir tercatat, jadi kamu bisa melanjutkan kapan saja.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Gamification & standards -->
    <section class="section" id="progres">
      <div class="shell">
        <div class="section-head">
          <div>
            <h2 class="section-title reveal" style="--i:1;">Diuji, dinilai, diberi poin.</h2>
          </div>
          <div class="head-side">
            <img class="companion" src="{{ asset('assets/img/12_proud.svg') }}" alt="" aria-hidden="true" />
            <p class="section-note reveal" style="--i:2;">
              Belajar tidak berhenti di simulasi. Ada kuis, skenario kasus, XP, level,
              dan badge yang mencatat sejauh mana kamu menguasai materi.
            </p>
          </div>
        </div>

        <div class="principles">
          <article class="principle reveal" style="--i:3;">
            <h3>Kuis &amp; scenario</h3>
            <p>Soal dengan feedback dan skor, ditambah skenario kasus berbasis pilihan keputusan.</p>
          </article>
          <article class="principle reveal" style="--i:4;">
            <h3>XP, level, badge</h3>
            <p>Tiga tingkat: beginner, intermediate, advanced. Poin pengalaman dan lencana menandai capaianmu.</p>
          </article>
          <article class="principle reveal" style="--i:5;">
            <h3>Untuk siapa</h3>
            <p>Mahasiswa dan pelajar, dosen/instruktur sebagai media ajar, serta masyarakat umum di materi dasar.</p>
          </article>
        </div>

        <div class="stats">
          <div class="stat reveal" style="--i:6;">
            <b>17</b>
            <span class="label">Kebutuhan fungsional</span>
          </div>
          <div class="stat reveal" style="--i:7;">
            <b>10</b>
            <span class="label">Kebutuhan non-fungsional</span>
          </div>
          <div class="stat reveal" style="--i:8;">
            <b>≥70</b>
            <span class="label">Target skor SUS</span>
          </div>
          <div class="stat reveal" style="--i:9;">
            <b>100+</b>
            <span class="label">Pengguna serentak</span>
          </div>
          <div class="stat reveal" style="--i:10;">
            <b>≤3s</b>
            <span class="label">Muat halaman/simulator</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing -->
    <section class="close-band">
      <div class="shell">
        <div class="close-card">
          <img class="close-mascot" src="{{ asset('assets/img/06_greeting.svg') }}" alt="" aria-hidden="true" />
          <div class="close-inner">
            <span class="clay-pill reveal" style="--i:0; color: var(--accent);">Mulai dari floor pertama</span>
            <h2 class="close-title reveal" style="--i:1;">Belajar, pahami,<br> lalu cegah ancamannya.</h2>
            <div class="hero-actions reveal" style="--i:2;">
              <a href="{{ route('dashboard') }}" class="btn">Buka dashboard →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-foot">
    <div class="shell">
      <div class="foot-row">
        <span>Security Cat · Sandbox edukasi</span>
        <nav class="foot-links" aria-label="Tautan tambahan">
          <a href="{{ route('landing') }}">Home</a>
          <a href="{{ route('about') }}">About</a>
          <a href="{{ route('learning') }}">Learning</a>
        </nav>
      </div>
    </div>
  </footer>

  <script>
    (() => {
      // Kartu langkah: klik mana pun di kartu membuka detail (slide 0.5s)
      document.querySelectorAll('.step-hit').forEach((hit) => {
        hit.addEventListener('click', () => {
          const card = hit.closest('.step');
          const open = card.classList.toggle('is-open');
          hit.setAttribute('aria-expanded', String(open));
        });
      });
    })();
  </script>
</body>
</html>
