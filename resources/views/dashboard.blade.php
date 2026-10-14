<x-layouts.app title="Security Cat — Student Cybersecurity Dashboard">
    <x-navbar />
    <style>@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap');@keyframes clayIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){[style*="clayIn"]{animation:none!important;opacity:1!important;transform:none!important}}</style>
    @php
        $clayCard='background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08),inset 0 -3px 0 rgba(0,0,0,0.35)';
        $clayInset='background:#0f1828;border:2px solid rgba(255,255,255,0.06);border-radius:20px;box-shadow:inset 0 3px 10px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)';
        $clayPill='background:#0f1828;border:2px solid rgba(255,255,255,0.07);border-radius:999px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06),inset 0 -1px 0 rgba(0,0,0,0.3),0 2px 8px rgba(0,0,0,0.3)';
        $mapAccent=['phishing'=>['a'=>'#00e5ff','ad'=>'#00b8cc','bg'=>'#0e2a33'],'bruteforce'=>['a'=>'#ffb020','ad'=>'#d48c00','bg'=>'#2b2110'],'sqli'=>['a'=>'#a78bfa','ad'=>'#7c5bd6','bg'=>'#211e33'],'auth'=>['a'=>'#34d399','ad'=>'#1fa87a','bg'=>'#132620']];
    @endphp
    <main class="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-5" style="background:radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%),radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%),radial-gradient(700px 500px at 50% 100%, #0e1e36 0%, #080d18 60%),#070b14;min-height:calc(100vh - 3.5rem);">
        <section class="relative overflow-hidden p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-6" style="{{$clayCard}};animation:clayIn 520ms cubic-bezier(0.22,1,0.36,1) both">
            <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.07]" style="background:radial-gradient(circle, white 0%, transparent 70%)"></div>
            <div class="flex-1 min-w-0">
                <div class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold tracking-wide" style="{{$clayPill}};font-family:'Space Mono',monospace;color:rgba(255,255,255,0.75)">
                    <span class="w-2 h-2 rounded-full animate-pulse" style="background:#34d399;box-shadow:0 0 10px rgba(52,211,153,0.9)"></span> LAB_OS v1
                    <span class="w-px h-3 bg-white/10 hidden sm:block"></span><span class="hidden sm:inline opacity-50">D3 TI · UNS PSDKU Madiun</span>
                </div>
                <h1 class="mt-4 leading-[0.88] tracking-[-0.03em]" style="font-family:'Bricolage Grotesque','Nunito',sans-serif">
                    <span class="block text-[26px] sm:text-[36px] font-extrabold text-white">Selamat datang,</span>
                    <span class="block text-[26px] sm:text-[36px] font-extrabold" style="color:#ffd23a;text-shadow:0 2px 0 #b88c00,0 6px 18px rgba(255,210,58,0.25)">{{$student['name']}}</span>
                </h1>
                <p class="mt-3 text-[13px] sm:text-[14px] leading-6 max-w-[560px]" style="font-family:'Nunito',system-ui,sans-serif;font-weight:700;color:rgba(255,255,255,0.55)">Platform praktikum interaktif terisolasi — 100% data dummy, tanpa penetrasi nyata. Lanjutkan jejak sandbox kamu.</p>
                <div class="mt-4 flex flex-wrap items-center gap-2">
                    <span class="px-3 py-1.5 rounded-full text-[11px] font-extrabold" style="{{$clayPill}};font-family:'Nunito',sans-serif;color:rgba(255,255,255,0.65)">{{$student['semester']}}</span>
                    <span class="px-3 py-1.5 rounded-full text-[11px] font-extrabold" style="background:#ffd23a;color:#1a1400;border:2px solid #e6b800;border-radius:999px;box-shadow:0 4px 0 #b88c00,0 6px 14px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.45);font-family:'Nunito',sans-serif">★ dark clay</span>
                    <span class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold" style="{{$clayPill}};font-family:'Space Mono',monospace;color:rgba(255,255,255,0.35)">NIM {{$student['nim']}} · 4 modul</span>
                </div>
                <p class="mt-3 font-mono text-[10px] tracking-wide" style="color:rgba(255,255,255,0.28)">Lingkungan Belajar Terisolasi · Tip: ketuk kartu modul untuk mulai</p>
            </div>
            <div class="shrink-0 flex items-center justify-center" style="width:320px;height:320px">
                <svg class="logo-animated" viewBox="0 0 1004 1004" width="320" height="320" style="filter:drop-shadow(0 0 32px #00f6fd88)">
                    <image href="{{asset('assets/img/logo.svg')}}" width="1004" height="1004" />
                </svg>
            </div>
        </section>
        <section class="grid gap-4 md:grid-cols-3">
            @php
                $stats=[['label'=>'Modul Selesai','icon'=>'check-circle','val'=> $done.' / '.$total,'sub'=> $done>0 ? collect($modules)->where('status','selesai')->pluck('competency')->join(' & ').' selesai' : 'Belum ada modul selesai','accent'=>'#ffd23a','bg'=>'#2a2410'],['label'=>'Progress Belajar','icon'=>'trending-up','val'=> $percent.'%','sub'=> 'Tersisa '.($total-$done).' skenario','accent'=>'#00e5ff','bg'=>'#0e2a33','showBar'=>true],['label'=>'Skor Terakhir','icon'=>'shield-check','val'=> ($lastModule['score'] ?? '–').' / 100','sub'=> $lastModule ? 'Lab '.$lastModule['competency'] : 'Belum ada skor','accent'=>'#34d399','bg'=>'#132620']];
            @endphp
            @foreach($stats as $i => $s)
                <div class="p-5 flex flex-col gap-3 relative overflow-hidden" style="{{$clayCard}};animation:clayIn 520ms cubic-bezier(0.22,1,0.36,1) {{90+$i*70}}ms both">
                    <div class="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-[0.05]" style="background:radial-gradient(circle, white 0%, transparent 70%)"></div>
                    <div class="flex items-center justify-between">
                        <p class="text-[11px] font-extrabold tracking-[0.14em]" style="font-family:'Space Mono',monospace;color:rgba(255,255,255,0.5)">{{$s['label']}}</p>
                        <span class="w-9 h-9 rounded-[12px] grid place-items-center" style="background:{{$s['bg']}};border:2px solid {{$s['accent']}}22;box-shadow:0 6px 14px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.08);color:{{$s['accent']}}"><x-icon :name="$s['icon']" class="size-5" /></span>
                    </div>
                    <p class="text-[22px] font-extrabold leading-none text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif">{{$s['val']}}</p>
                    @if(!empty($s['showBar']))
                        <div class="w-full rounded-full p-[2px]" style="background:#0a1220;box-shadow:inset 0 2px 6px rgba(0,0,0,0.6);border:1.5px solid rgba(255,255,255,0.06)"><div class="h-[10px] rounded-full" style="width:{{$percent}}%;background:linear-gradient(180deg,#00e5ff 0%,#00b8cc 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,0.3)"></div></div>
                    @endif
                    <p class="text-[11px] font-bold leading-4" style="font-family:'Nunito',sans-serif;color:rgba(255,255,255,0.42)">{{$s['sub']}}</p>
                </div>
            @endforeach
        </section>
<section style="animation:clayIn 520ms cubic-bezier(0.22,1,0.36,1) 220ms both">
            <div class="flex flex-wrap items-end justify-between gap-2">
                <div>
                    <span class="inline-flex px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest" style="{{$clayPill}};font-family:'Space Mono',monospace;color:rgba(255,255,255,0.55)">Interactive Sandbox Scenarios</span>
                    <h2 class="mt-3 text-[22px] sm:text-[24px] font-extrabold tracking-tight text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif">Skenario Pembelajaran</h2>
                </div>
                <span class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold" style="{{$clayPill}};font-family:'Space Mono',monospace;color:rgba(255,255,255,0.35)">Filter: Semua Kategori ({{$total}})</span>
            </div>
            @php $icons=['phishing'=>'mail','bruteforce'=>'lock','sqli'=>'database','auth'=>'target']; @endphp
            <div class="mt-10 relative" style="min-height: 1200px;">
                <!-- Central line: spans from first simulation node to last (set by JS) -->
                <div class="absolute left-1/2 w-[3px] -translate-x-1/2 timeline-line" style="background:transparent;" data-total="{{count($modules)}}">
                    <div class="absolute top-0 left-0 w-full h-0 timeline-progress" style="background:linear-gradient(180deg,#00e5ff 0%,#00b8cc 100%);box-shadow:0 0 16px #00e5ff,0 0 32px #00e5ff88;"></div>
                </div>
                <div class="relative flex flex-col" style="gap: 380px;">
                    @foreach ($modules as $index => $module)
                        @php
                            $ac=$mapAccent[$module['slug']]??$mapAccent['phishing'];
                            $isLeft = $index % 2 === 0;
                        @endphp
                        <div class="relative w-full timeline-item" data-index="{{$index}}">
                            <!-- Center dot on timeline -->
                            <div class="absolute left-1/2 z-10 w-[26px] h-[26px] rounded-full flex items-center justify-center timeline-node" style="top:50%;background:#0a0e15;box-shadow:0 0 0 4px #0a0e15,0 0 16px {{$ac['a']}},0 0 32px {{$ac['a']}}88;border:3px solid {{$ac['a']}};"><x-icon :name="$icons[$module['slug']]" class="size-3.5" style="color:{{$ac['a']}};" /></div>
                            <div class="timeline-content {{$isLeft ? 'w-1/2 pr-14' : 'w-1/2 ml-auto pl-14'}}" style="text-align:{{$isLeft ? 'right' : 'left'}}">
                                <p class="font-mono text-[10px] uppercase tracking-wider mb-2" style="color:{{$ac['a']}}">{{$module['code']}} · {{$module['category']}}</p>
                                <h3 class="text-[22px] sm:text-[26px] font-extrabold leading-tight text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif;position:relative"><span class="tw-ghost">{{$module['title']}}</span><span class="tw-live typewriter-title" data-text="{{$module['title']}}" data-reverse="{{$isLeft ? 'true' : 'false'}}"></span></h3>
                                <p class="mt-3 text-[14px] leading-7" style="font-family:'Nunito',system-ui,sans-serif;font-weight:600;color:rgba(255,255,255,0.65);position:relative"><span class="tw-ghost">{{$module['summary']}}</span><span class="tw-live typewriter-desc" data-text="{{$module['summary']}}" data-reverse="{{$isLeft ? 'true' : 'false'}}"></span></p>
                                <p class="mt-3 text-[10px] font-bold tracking-widest" style="font-family:'Space Mono',monospace;color:rgba(255,255,255,0.22)">5 LEVEL · 25 FLOOR · {{$module['code']}}</p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
        <section class="relative overflow-hidden p-5 sm:p-6" style="{{$clayCard}};animation:clayIn 520ms cubic-bezier(0.22,1,0.36,1) 300ms both">
            <div class="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.06]" style="background:radial-gradient(circle, white 0%, transparent 70%)"></div>
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <span class="inline-flex px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest" style="{{$clayPill}};font-family:'Space Mono',monospace;color:rgba(255,255,255,0.55)">Threat Intelligence</span>
                    <h2 class="mt-3 text-[20px] sm:text-[22px] font-extrabold tracking-tight text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif">Jenis-Jenis Serangan Siber</h2>
                    <p class="mt-1 text-[12px] font-bold" style="font-family:'Space Mono',monospace;color:rgba(255,255,255,0.38)">Referensi cepat vektor ancaman & metode mitigasi</p>
                </div>
            </div>
            @php
                $attacks = [
                    ['name' => 'Malware', 'desc' => 'Perisian jahat yang dirancang untuk merusak, mengganggu, atau mendapatkan akses tidak sah ke sistem komputer.'],
                    ['name' => 'Ransomware', 'desc' => 'Malware yang mengenkripsi file korban dan menuntut tebusan untuk kunci dekripsi.'],
                    ['name' => 'Phishing', 'desc' => 'Teknik penipuan via email/situs palsu untuk mencuri kredensial atau data sensitif.'],
                    ['name' => 'Distributed Denial of Service (DDoS)', 'desc' => 'Serangan banjir trafik dari banyak sumber untuk melumpuhkan layanan target.'],
                    ['name' => 'Man-in-the-Middle (MitM)', 'desc' => 'Penyadapan komunikasi dua pihak untuk mencuri atau memanipulasi data transit.'],
                    ['name' => 'SQL Injection (SQLi)', 'desc' => 'Injeksi query SQL berbahaya via input tidak bersih untuk mengakses/modifikasi database.'],
                    ['name' => 'Zero-Day Exploit', 'desc' => 'Serangan memanfaatkan kerentanan belum diketahui vendor/belum memiliki patch.'],
                    ['name' => 'Brute Force Attack', 'desc' => 'Percobaan kombinasi kredensial secara otomatis hingga berhasil masuk.'],
                    ['name' => 'Spoofing', 'desc' => 'Pemalsuan identitas (IP, email, DNS) untuk menipu sistem atau pengguna.'],
                    ['name' => 'Insider Threat', 'desc' => 'Ancaman dari dalam organisasi (karyawan/mitra) yang menyalahi kepercayaan akses.'],
                    ['name' => 'Cross-Site Scripting (XSS)', 'desc' => 'Injeksi skrip jahat ke halaman web yang dieksekusi browser korban.'],
                    ['name' => 'SIM Swap', 'desc' => 'Pengambilalihan nomor telepon korban via manipulasi operator seluler untuk bypass 2FA.'],
                    ['name' => 'Business Email Compromise (BEC)', 'desc' => 'Penipuan email bisnis menargetkan pembayaran palsu atau pencurian data perusahaan.'],
                    ['name' => 'Cryptojacking', 'desc' => 'Penggunaan sumber daya komputasi korban tanpa izin untuk menambang kripto.'],
                    ['name' => 'Credential Stuffing', 'desc' => 'Penggunaan kredensial bocor dari kebocoran data lain untuk akses tidak sah.'],
                    ['name' => 'DNS Spoofing / Cache Poisoning', 'desc' => 'Manipulasi cache DNS mengarahkan pengguna ke server jahat.'],
                    ['name' => 'Drive-by Download', 'desc' => 'Unduhan malware otomatis saat mengunjungi situs terinfeksi tanpa interaksi pengguna.'],
                    ['name' => 'Eavesdropping', 'desc' => 'Penyadapan lalu lintas jaringan tidak terenkripsi untuk mencuri informasi sensitif.'],
                    ['name' => 'Rootkits', 'desc' => 'Malware tingkat kernel yang menyembunyikan keberadaannya dan memberikan akses root persisten.'],
                    ['name' => 'Spyware', 'desc' => 'Perisian pemantau aktivitas pengguna tanpa sepengetahuan untuk pencurian data.'],
                ];
            @endphp
            <div class="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                @foreach ($attacks as $attack)
                    <div class="relative p-4 rounded-[16px]" style="background:#0f1828;border:2px solid rgba(255,255,255,0.06);box-shadow:inset 0 2px 8px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.04);transition:transform 0.2s,border-color 0.2s,box-shadow 0.2s" onmouseover="this.style.transform='translateY(-2px)';this.style.borderColor='rgba(0,229,255,0.3)';this.style.boxShadow='inset 0 2px 8px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.04),0 8px 24px rgba(0,229,255,0.15)'" onmouseout="this.style.transform='none';this.style.borderColor='rgba(255,255,255,0.06)';this.style.boxShadow='inset 0 2px 8px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.04)'">
                        <h3 class="font-extrabold text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif;font-size:14px;position:relative"><span class="tw-ghost">{{$attack['name']}}</span><span class="tw-live typewriter-title" data-text="{{$attack['name']}}"></span></h3>
                        <p class="mt-2 text-[12px] leading-5" style="font-family:'Nunito',sans-serif;font-weight:600;color:rgba(255,255,255,0.55);position:relative"><span class="tw-ghost">{{$attack['desc']}}</span><span class="tw-live typewriter-desc" data-text="{{$attack['desc']}}"></span></p>
                    </div>
                @endforeach
            </div>
        </section>
        <p class="text-center text-[11px] font-bold tracking-wide" style="font-family:'Space Mono',monospace;color:rgba(255,255,255,0.22)">clay dark puff · referensi 2x2 dashboard · palet modul Security Cat dipertahankan</p>
</main>
    <footer class="border-t" style="border-color:rgba(255,255,255,0.06);background:#070b14"><div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-[11px]" style="font-family:'Space Mono',monospace;color:rgba(255,255,255,0.32)"><p>Praktikum didampingi Dosen Pengampu & Asisten Lab D3 TI UNS</p><p class="flex gap-4"><span>Panduan Praktikum (PDF)</span><span>FAQ Sandbox</span></p></div></footer>

    <style>
        @keyframes logoFloat {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes logoGlow {
            0%, 100% { filter: drop-shadow(0 0 24px #00f6fd88) drop-shadow(0 0 48px #00f6fd44); }
            50% { filter: drop-shadow(0 0 32px #00f6fdcc) drop-shadow(0 0 64px #00f6fd66); }
        }
        .logo-animated {
            animation: logoFloat 4s ease-in-out infinite, logoGlow 3s ease-in-out infinite;
            transform-origin: center center;
        }
        @media (prefers-reduced-motion: reduce) {
            .logo-animated { animation: none; }
        }
        .tw-ghost {
            visibility: hidden;
        }
        .tw-live {
            position: absolute;
            inset: 0;
        }
        .tw-caret {
            display: inline-block;
            width: 2px;
            height: 1em;
            margin-left: 1px;
            background: #00e5ff;
            vertical-align: -0.15em;
            animation: caretBlink 0.75s step-end infinite;
        }
        @keyframes caretBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        @keyframes lineDraw {
            from { height: 0%; }
            to { height: 100%; }
        }
        .timeline-progress {
            animation: lineDraw 2s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .timeline-node {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .timeline-item.visible .timeline-node {
            opacity: 1;
            transform: translate(-50%,-50%) scale(1);
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // ===== POSITION TIMELINE NODES + LINE (first node → last node) =====
            const timelineLine = document.querySelector('.timeline-line');
            const timelineProgress = document.querySelector('.timeline-progress');
            const timelineItems = document.querySelectorAll('.timeline-item');
            const totalItems = timelineLine ? parseInt(timelineLine.dataset.total || '0') : 0;

            function positionTimeline() {
                const nodes = [];
                timelineItems.forEach(item => {
                    const h3 = item.querySelector('.typewriter-title');
                    const node = item.querySelector('.timeline-node');
                    if (h3 && node) {
                        const itemRect = item.getBoundingClientRect();
                        const h3Rect = h3.getBoundingClientRect();
                        node.style.top = (h3Rect.bottom - itemRect.top + 8) + 'px';
                        nodes.push(node);
                    }
                });

                if (timelineLine && nodes.length > 1) {
                    const containerRect = timelineLine.parentElement.getBoundingClientRect();
                    const firstRect = nodes[0].getBoundingClientRect();
                    const firstCenter = firstRect.top - containerRect.top + firstRect.height / 2;
                    const lastRect = nodes[nodes.length - 1].getBoundingClientRect();
                    const lastCenter = lastRect.top - containerRect.top + lastRect.height / 2;
                    timelineLine.style.top = firstCenter + 'px';
                    timelineLine.style.height = Math.max(0, lastCenter - firstCenter) + 'px';
                }
            }

            positionTimeline();
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(positionTimeline);
            }
            window.addEventListener('resize', positionTimeline);

            // ===== TYPEWRITER ANIMATION =====
            const typewriterElements = document.querySelectorAll('.typewriter-title, .typewriter-desc');

            const typewriterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                        const el = entry.target;
                        const text = el.dataset.text || '';
                        el.textContent = '';
                        el.classList.add('typing');

                        let i = 0;
                        const speed = el.classList.contains('typewriter-title') ? 30 : 15;

                        function type() {
                            if (i < text.length) {
                                i++;
                                el.textContent = text.slice(0, i);
                                const caret = document.createElement('span');
                                caret.className = 'tw-caret';
                                el.appendChild(caret);
                                setTimeout(type, speed);
                            } else {
                                el.textContent = text;
                                el.classList.remove('typing');
                                el.classList.add('typed');
                            }
                        }

                        setTimeout(type, 100);
                        typewriterObserver.unobserve(el);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });

            typewriterElements.forEach(el => typewriterObserver.observe(el));

            // ===== TIMELINE SCROLL ANIMATION =====
            if (timelineItems.length > 0 && totalItems > 0) {
                const scrollObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const item = entry.target;
                            const index = parseInt(item.dataset.index || '0');
                            item.classList.add('visible');

                            if (timelineProgress) {
                                const progressPercent = ((index + 1) / totalItems) * 100;
                                timelineProgress.style.height = progressPercent + '%';
                            }

                            scrollObserver.unobserve(item);
                        }
                    });
                }, {
                    threshold: 0.2,
                    rootMargin: '0px 0px -100px 0px'
                });

                timelineItems.forEach(item => scrollObserver.observe(item));
            }
        });
    </script>
</x-layouts.app>
