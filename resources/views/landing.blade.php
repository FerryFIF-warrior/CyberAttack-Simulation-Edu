<x-layouts.app title="Security Cat — CyberAttack Simulator Edu | Landing Page">
    <x-navbar />

    <main>
        {{-- HERO --}}
        <section class="cat-hero-glow cat-dots">
            <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
                <div>
                    <span class="cat-tag">Universitas Sebelas Maret · D3 Teknik Informatika · PSDKU Madiun</span>
                    <h1 class="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                        Learn Cybersecurity.<br>
                        <span class="text-cat-cyan">Detect Threats.</span><br>
                        Defend Smarter.
                    </h1>
                    <div class="mt-7 flex flex-wrap gap-3">
                        <a href="{{ route('dashboard') }}" class="cat-btn-primary">
                            Mulai Belajar <x-icon name="arrow-right" />
                        </a>
                        <a href="{{ route('dashboard') }}" class="cat-btn-ghost">Lihat Dashboard</a>
                    </div>

                    <dl class="cat-card mt-8 grid max-w-md grid-cols-3 divide-x divide-cat-line text-sm">
                        <div class="p-4">
                            <dt class="text-xl font-bold text-cat-cyan">{{ count($labs) }}+</dt>
                            <dd class="text-xs text-cat-muted">Lab Skenario</dd>
                        </div>
                        <div class="p-4">
                            <dt class="text-xl font-bold text-cat-green">100%</dt>
                            <dd class="text-xs text-cat-muted">Data Dummy Aman</dd>
                        </div>
                        <div class="p-4">
                            <dt class="text-xl font-bold text-white">UNS</dt>
                            <dd class="text-xs text-cat-muted">PSDKU Madiun</dd>
                        </div>
                    </dl>
                </div>

                {{-- Kartu terminal sandbox --}}
                <div class="cat-card overflow-hidden shadow-2xl shadow-cat-cyan/5">
                    <div class="flex items-center justify-between border-b border-cat-line px-4 py-2.5">
                        <div class="flex gap-1.5">
                            <span class="size-2 rounded-full bg-red-400/80"></span>
                            <span class="size-2 rounded-full bg-amber-400/80"></span>
                            <span class="size-2 rounded-full bg-cat-green/80"></span>
                        </div>
                        <span class="font-mono text-[10px] text-cat-muted">sec-cat@geek-sandbox</span>
                        <span class="cat-tag">Live</span>
                    </div>
                    <div class="p-5">
                        <div class="flex flex-col items-center gap-3 rounded-lg bg-cat-bg py-10">
                            <x-icon name="cat" class="size-24 text-cat-cyan drop-shadow-[0_0_18px_rgb(0_229_255/0.45)]" />
                            <span class="cat-tag border-cat-green/30 bg-cat-green/10 text-cat-green">Sandbox Active</span>
                        </div>
                        <ul class="mt-4 space-y-2 font-mono text-[11px]">
                            <li class="flex items-center justify-between rounded-md bg-cat-bg px-3 py-2">
                                <span class="flex items-center gap-2 text-cat-muted"><x-icon name="lock" class="size-3.5" /> Sandbox Mode</span>
                                <span class="text-cat-green">Isolated</span>
                            </li>
                            <li class="flex items-center justify-between rounded-md bg-cat-bg px-3 py-2">
                                <span class="flex items-center gap-2 text-cat-muted"><x-icon name="database" class="size-3.5" /> Simulation Payload</span>
                                <span class="text-cat-cyan">100% Dummy Data</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {{-- STRIP KEAMANAN --}}
        <div class="mx-auto -mt-4 mb-16 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border border-cat-line bg-cat-surface px-5 py-3 font-mono text-[11px] text-cat-muted">
            <span class="flex items-center gap-1.5"><x-icon name="shield-check" class="size-3.5 text-cat-green" /> Safe learning environment</span>
            <span>Dummy data only</span>
            <span>No real-world attacks</span>
        </div>

        {{-- FITUR --}}
        <section id="fitur" class="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20">
            <div class="text-center">
                <span class="cat-tag">Fitur Unggulan Platform</span>
                <h2 class="mx-auto mt-4 max-w-xl text-2xl font-semibold text-white sm:text-3xl">
                    Belajar Cybersecurity dengan Cara yang Lebih Interaktif
                </h2>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-3">
                @foreach ([
                    ['icon' => 'shield-check', 'title' => 'Simulasi Aman', 'tag' => 'Isolated', 'text' => 'Pelajari skenario serangan dalam lingkungan simulasi tertutup berbasis browser tanpa risiko bahaya ke infrastruktur nyata.', 'code' => 'sandbox://virtual-node-01'],
                    ['icon' => 'target', 'title' => 'Deteksi Serangan', 'tag' => 'Telemetry', 'text' => 'Kenali karakteristik dan alur serangan secara visual melalui pembacaan audit log, header forensik, dan indikator anomali.', 'code' => 'realtime payload inspector'],
                    ['icon' => 'lock', 'title' => 'Defense & Mitigasi', 'tag' => 'Hardening', 'text' => 'Langkah pertahanan terhadap ancaman dengan mengimplementasikan parameter sanitasi, patch code, dan konfigurasi proteksi.', 'code' => 'secure coding guidance'],
                ] as $feature)
                    <article class="cat-card p-6">
                        <div class="flex items-center gap-3">
                            <span class="flex size-9 items-center justify-center rounded-lg bg-cat-cyan/10 text-cat-cyan">
                                <x-icon :name="$feature['icon']" class="size-5" />
                            </span>
                            <h3 class="font-semibold text-white">{{ $feature['title'] }}</h3>
                            <span class="cat-tag ml-auto">{{ $feature['tag'] }}</span>
                        </div>
                        <p class="mt-4 text-sm leading-relaxed text-cat-muted">{{ $feature['text'] }}</p>
                        <p class="mt-4 border-t border-cat-line pt-3 font-mono text-[10px] text-cat-cyan/80">{{ $feature['code'] }}</p>
                    </article>
                @endforeach
            </div>
        </section>

        {{-- ALUR BELAJAR --}}
        <section id="alur" class="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20">
            <div class="text-center">
                <span class="cat-tag">Metodologi Belajar</span>
                <h2 class="mt-4 text-2xl font-semibold text-white sm:text-3xl">Alur Pembelajaran Terstruktur</h2>
                <p class="mx-auto mt-2 max-w-lg text-sm text-cat-muted">
                    Tiga fase sistematis untuk menguasai konsep keamanan informasi dari fundamental hingga tindakan kuratif.
                </p>
            </div>

            <div class="mt-10 grid gap-5 md:grid-cols-3">
                @foreach ([
                    ['no' => '01', 'label' => 'Learn', 'icon' => 'book-open', 'title' => 'Pahami Fundamental', 'text' => 'Pahami konsep fundamental ancaman siber, prinsip kerentanan, dan mekanisme protokol secara teori interaktif dan modul ringkas.', 'foot' => 'Tahap teori & anatomi serangan'],
                    ['no' => '02', 'label' => 'Detect', 'icon' => 'search', 'title' => 'Inspeksi & Deteksi', 'text' => 'Amati pola log mencurigakan, inspeksi lalu lintas simulasi, dan identifikasi anomali serangan secara langsung melalui layar telemetri.', 'foot' => 'Tahap analisis log & anomali'],
                    ['no' => '03', 'label' => 'Defend', 'icon' => 'shield-check', 'title' => 'Terapkan Mitigasi', 'text' => 'Terapkan aturan mitigasi, perbaiki celah dummy code, dan amankan sistem dengan standar praktik keamanan web & database terbaik.', 'foot' => 'Tahap implementasi proteksi'],
                ] as $step)
                    <article class="cat-card p-5">
                        <div class="flex items-center justify-between">
                            <span class="font-mono text-[11px] font-semibold uppercase tracking-wider text-cat-cyan">{{ $step['no'] }}. {{ $step['label'] }}</span>
                            <x-icon :name="$step['icon']" class="size-4 text-cat-cyan" />
                        </div>
                        <h3 class="mt-4 font-semibold text-white">{{ $step['title'] }}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-cat-muted">{{ $step['text'] }}</p>
                        <p class="mt-4 font-mono text-[10px] uppercase tracking-wider text-cat-green">▸ {{ $step['foot'] }}</p>
                    </article>
                @endforeach
            </div>
        </section>

        {{-- SKENARIO LAB --}}
        <section id="skenario" class="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20">
            <span class="cat-tag">Modul Praktik Terpadu</span>
            <div class="mt-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 class="text-2xl font-semibold text-white sm:text-3xl">Skenario Edukasi Keamanan Siber</h2>
                    <p class="mt-2 max-w-lg text-sm text-cat-muted">
                        Eksplorasi modul skenario simulasi terisolasi untuk memahami cara kerja dan mitigasi ancaman secara praktis.
                    </p>
                </div>
                <span class="flex items-center gap-1.5 font-mono text-[10px] text-cat-green">
                    <span class="size-1.5 rounded-full bg-cat-green"></span> Semua target beroperasi dalam sandbox dummy
                </span>
            </div>

            <div class="mt-8 grid gap-5 md:grid-cols-3">
                @foreach ($labs as $lab)
                    <x-lab-card :lab="$lab" />
                @endforeach
            </div>
        </section>

        {{-- CTA --}}
        <section class="mx-auto max-w-5xl px-6 pb-20">
            <div class="cat-card relative overflow-hidden bg-gradient-to-br from-cat-card to-cat-cyan/10 p-8 sm:p-10">
                <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div class="max-w-md">
                        <span class="cat-tag">Universitas Sebelas Maret PSDKU Madiun</span>
                        <h2 class="mt-4 text-3xl font-bold leading-tight text-white">Siap mulai belajar cybersecurity?</h2>
                        <p class="mt-3 text-sm text-cat-muted">
                            Masuki lingkungan simulasi edukatif bersama Security Cat dan asah keterampilan pertahanan digital Anda hari ini.
                        </p>
                    </div>
                    <a href="{{ route('dashboard') }}" class="cat-btn-primary shrink-0">
                        Buka Dashboard <x-icon name="terminal" />
                    </a>
                </div>
            </div>
        </section>
    </main>

    <x-footer />
</x-layouts.app>
