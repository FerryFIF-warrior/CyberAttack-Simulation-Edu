<x-layouts.app title="Security Cat — Student Cybersecurity Dashboard">
    <x-dashboard.topbar :student="$student" />

    <main class="mx-auto max-w-6xl space-y-10 px-6 py-8">
        {{-- Welcome --}}
        <section class="cat-card cat-hero-glow p-6 sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="cat-tag">D3 Teknik Informatika · Universitas Sebelas Maret PSDKU Madiun</span>
                <span class="font-mono text-[10px] text-cat-green">Lingkungan Belajar Terisolasi · 100% Data Dummy · Tanpa Penetrasi Nyata</span>
            </div>
            <div class="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-white sm:text-3xl">Selamat datang di Security Cat 👋</h1>
                    <p class="mt-2 max-w-xl text-sm text-cat-muted">
                        Siap melanjutkan pembelajaran cybersecurity? Platform praktikum interaktif terpadu untuk memahami simulasi serangan dan membangun pertahanan siber yang tangguh.
                    </p>
                </div>
                <span class="rounded-lg border border-cat-line bg-cat-bg px-3 py-2 font-mono text-[11px] text-slate-200">{{ $student['semester'] }}</span>
            </div>
        </section>

        {{-- Statistik --}}
        <section class="grid gap-4 md:grid-cols-3">
            <div class="cat-card p-5">
                <div class="flex items-center justify-between">
                    <p class="cat-label">Modul Selesai</p>
                    <x-icon name="check-circle" class="text-cat-cyan" />
                </div>
                <p class="mt-3 text-3xl font-bold text-white">{{ $done }} / {{ $total }} <span class="text-lg font-semibold">Modul</span></p>
                @if ($done > 0)
                    <p class="mt-3 text-[11px] text-cat-green">✓ {{ collect($modules)->where('status', 'selesai')->pluck('competency')->join(' & ') }} selesai dikerjakan</p>
                @endif
            </div>

            <div class="cat-card p-5">
                <div class="flex items-center justify-between">
                    <p class="cat-label">Progress Belajar</p>
                    <x-icon name="trending-up" class="text-cat-cyan" />
                </div>
                <p class="mt-3 text-3xl font-bold text-cat-cyan">{{ $percent }}% <span class="text-sm font-medium text-cat-muted">Total Lab</span></p>
                <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-cat-bg">
                    <div class="h-full rounded-full bg-cat-cyan" style="width: {{ $percent }}%"></div>
                </div>
                <p class="mt-2 text-[11px] text-cat-muted">Tersisa {{ $total - $done }} skenario mitigasi praktikum</p>
            </div>

            <div class="cat-card p-5">
                <div class="flex items-center justify-between">
                    <p class="cat-label">Skor Terakhir</p>
                    <x-icon name="shield-check" class="text-cat-green" />
                </div>
                <p class="mt-3 text-3xl font-bold text-white">{{ $lastModule['score'] ?? '–' }} <span class="text-lg font-semibold text-cat-muted">/ 100</span></p>
                @if ($lastModule)
                    <p class="mt-3 text-[11px] text-cat-green">Lab {{ $lastModule['competency'] }}: {{ $lastModule['roadmap'] }} (Lulus)</p>
                @endif
            </div>
        </section>

        {{-- Skenario --}}
        <section>
            <div class="flex flex-wrap items-end justify-between gap-2">
                <div>
                    <span class="cat-tag">Interactive Sandbox Scenarios</span>
                    <h2 class="mt-3 text-2xl font-semibold text-white">Skenario Pembelajaran</h2>
                </div>
                <span class="font-mono text-[11px] text-cat-muted">Filter: Semua Kategori ({{ $total }})</span>
            </div>

            <div class="mt-6 grid gap-5 md:grid-cols-3">
                @foreach ($modules as $module)
                    @php
                        $isDone = $module['status'] === 'selesai';
                        $icons = ['phishing' => 'mail', 'brute-force' => 'lock', 'sql-injection' => 'database'];
                    @endphp
                    <article @class(['cat-card flex flex-col p-5', 'border-t-2 border-t-cat-cyan' => ! $isDone])>
                        <div class="flex items-start justify-between">
                            <span class="flex size-9 items-center justify-center rounded-lg bg-white/5 text-cat-cyan">
                                <x-icon :name="$icons[$module['slug']]" class="size-5" />
                            </span>
                            @if ($isDone)
                                <span class="cat-tag border-cat-green/30 bg-cat-green/10 text-cat-green">Selesai (Nilai {{ $module['score'] }})</span>
                            @else
                                <span class="cat-tag border-cat-line bg-white/5 text-cat-muted">Belum Dikerjakan</span>
                            @endif
                        </div>

                        <p class="mt-4 font-mono text-[10px] uppercase tracking-wider text-cat-cyan">{{ $module['code'] }} · {{ $module['category'] }}</p>
                        <h3 class="mt-1 font-semibold text-white">{{ $module['title'] }}</h3>
                        <p class="mt-2 flex-1 text-sm leading-relaxed text-cat-muted">{{ $module['summary'] }}</p>

                        <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-cat-muted">
                            @foreach ($module['tags'] as $tag)
                                <span>{{ $tag }}</span>
                            @endforeach
                        </div>

                        <a href="#" @class([
                            'mt-4 w-full',
                            'cat-btn-ghost' => $isDone,
                            'cat-btn-primary' => ! $isDone,
                        ])>
                            Mulai Simulasi
                            <x-icon :name="$isDone ? 'check-circle' : 'arrow-right'" />
                        </a>
                    </article>
                @endforeach
            </div>
        </section>

        {{-- Roadmap --}}
        <section class="cat-card p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <span class="cat-tag">Milestone Roadmap</span>
                    <h2 class="mt-3 text-xl font-semibold text-white">Progress Pembelajaran Mahasiswa</h2>
                    <p class="mt-1 text-xs text-cat-muted">Kurikulum Praktikum Keamanan Jaringan &amp; Data · {{ $student['semester'] }}</p>
                </div>
                <div class="rounded-lg border border-cat-line bg-cat-bg px-4 py-2 text-right">
                    <p class="text-xl font-bold text-cat-cyan">{{ $percent }}% <span class="font-mono text-[10px] font-normal uppercase text-cat-muted">Status Capaian</span></p>
                    <p class="text-[11px] text-cat-muted">{{ $done }} dari {{ $total }} Selesai</p>
                </div>
            </div>

            @php
                $stages = collect($modules)->map(fn ($m, $i) => [
                    'no' => $i + 1,
                    'title' => 'Modul '.($i + 1).': '.$m['competency'],
                    'desc' => $m['roadmap'],
                    'state' => $m['status'] === 'selesai' ? 'selesai' : 'berjalan',
                ])->push([
                    'no' => $total + 1,
                    'title' => 'Sertifikasi Lab UNS',
                    'desc' => 'Evaluasi Sandbox Komprehensif',
                    'state' => 'terkunci',
                ]);
            @endphp

            <div class="mt-6 grid gap-3 md:grid-cols-4">
                @foreach ($stages as $stage)
                    <div @class([
                        'rounded-lg border p-4',
                        'border-cat-line bg-cat-bg' => $stage['state'] === 'selesai',
                        'border-cat-cyan/40 bg-cat-cyan/5' => $stage['state'] === 'berjalan',
                        'border-cat-line/60 bg-cat-bg/40 opacity-60' => $stage['state'] === 'terkunci',
                    ])>
                        <div class="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                            <span class="text-cat-muted">Tahap {{ $stage['no'] }}</span>
                            <span @class([
                                'text-cat-green' => $stage['state'] === 'selesai',
                                'text-cat-cyan' => $stage['state'] === 'berjalan',
                                'text-cat-muted' => $stage['state'] === 'terkunci',
                            ])>
                                {{ match ($stage['state']) { 'selesai' => '✓ Selesai', 'berjalan' => 'In Progress', default => '🔒 Terkunci' } }}
                            </span>
                        </div>
                        <p class="mt-2 text-sm font-semibold text-white">{{ $stage['title'] }}</p>
                        <p class="mt-1 text-xs text-cat-muted">{{ $stage['desc'] }}</p>
                    </div>
                @endforeach
            </div>

            <div class="mt-6 border-t border-cat-line pt-4">
                <p class="cat-label">Distribusi Penguasaan Kompetensi &amp; Materi</p>
                <div class="mt-3 grid gap-4 md:grid-cols-3">
                    @foreach ($competencies as $c)
                        <div>
                            <div class="flex items-center justify-between text-xs">
                                <span class="text-slate-200">{{ $c['label'] }}</span>
                                <span class="font-mono text-cat-cyan">{{ $c['value'] }}%</span>
                            </div>
                            <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cat-bg">
                                <div class="h-full rounded-full {{ $c['value'] >= 100 ? 'bg-cat-green' : 'bg-cat-cyan' }}" style="width: {{ $c['value'] }}%"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
    </main>

    <footer class="border-t border-cat-line/60">
        <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-[11px] text-cat-muted">
            <p>Praktikum didampingi oleh Dosen Pengampu &amp; Asisten Laboratorium D3 TI UNS</p>
            <p class="flex gap-4">
                <a href="#" class="hover:text-white">Panduan Praktikum (PDF)</a>
                <a href="#" class="hover:text-white">FAQ Sandbox</a>
            </p>
        </div>
    </footer>
</x-layouts.app>
