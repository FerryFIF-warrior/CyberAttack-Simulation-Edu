<x-layouts.app title="Security Cat — CyberAttack Simulator Edu | Landing Page">
    <x-navbar />
    <style>@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap');</style>
    <main style="background:radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%),radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%),radial-gradient(700px 500px at 50% 100%, #0e1e36 0%, #080d18 60%),#070b14">
        {{-- HERO --}}
        <section class="mx-auto max-w-6xl px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div>
                <span class="inline-flex px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-[0.14em] uppercase" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Universitas Sebelas Maret · D3 TI · PSDKU Madiun</span>
                <h1 class="mt-5 text-4xl sm:text-5xl font-extrabold leading-[0.95] tracking-tight text-white" style="font-family:'Bricolage Grotesque','Nunito',sans-serif">
                    Learn Cybersecurity.<br>
                    <span style="color:#00e5ff">Detect Threats.</span><br>
                    Defend Smarter.
                </h1>
                <div class="mt-7 flex flex-wrap gap-3">
                    <a href="{{ route('dashboard') }}" class="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] text-sm font-extrabold" style="background:#00e5ff;color:#0a0e15;border:2.5px solid #00b8cc;box-shadow:0 5px 0 #00b8cc,0 10px 22px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.3);font-family:'Nunito',sans-serif">Mulai Belajar <x-icon name="arrow-right" /></a>
                    <a href="{{ route('dashboard') }}" class="inline-flex items-center px-6 py-3 rounded-[16px] text-sm font-extrabold text-white" style="background:#162030;border:3px solid #233044;box-shadow:0 5px 0 rgba(0,0,0,0.35),0 10px 22px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.08)">Lihat Dashboard</a>
                </div>
                <dl class="mt-8 grid max-w-md grid-cols-3 gap-0 text-sm" style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08);overflow:hidden">
                    <div class="p-4 text-center" style="border-right:2px solid #233044"><dt class="text-xl font-extrabold" style="color:#00e5ff">{{ count($labs) }}+</dt><dd class="text-xs mt-1" style="color:#8b98ab">Lab Skenario</dd></div>
                    <div class="p-4 text-center" style="border-right:2px solid #233044"><dt class="text-xl font-extrabold" style="color:#34d399">100%</dt><dd class="text-xs mt-1" style="color:#8b98ab">Data Dummy Aman</dd></div>
                    <div class="p-4 text-center"><dt class="text-xl font-extrabold text-white">UNS</dt><dd class="text-xs mt-1" style="color:#8b98ab">PSDKU Madiun</dd></div>
                </dl>
            </div>
            {{-- terminal clay card --}}
            <div style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08);overflow:hidden">
                <div class="flex items-center justify-between px-4 py-2.5" style="border-bottom:3px solid #233044;background:#0f1828">
                    <div class="flex gap-1.5"><span class="size-2.5 rounded-full" style="background:#ff6b6b;box-shadow:inset 0 1px 0 rgba(255,255,255,0.5)"></span><span class="size-2.5 rounded-full" style="background:#ffd23a;box-shadow:inset 0 1px 0 rgba(255,255,255,0.5)"></span><span class="size-2.5 rounded-full" style="background:#34d399;box-shadow:inset 0 1px 0 rgba(255,255,255,0.5)"></span></div>
                    <span style="font-family:'Space Mono',monospace;font-size:10px;color:#8b98ab">sec-cat@geek-sandbox</span>
                    <span class="px-2 py-1 rounded-full text-[10px] font-extrabold" style="background:#00e5ff;color:#0a0e15;border:2px solid #00b8cc">Live</span>
                </div>
                <div class="p-5">
                    <div class="flex flex-col items-center gap-3 py-10 rounded-[20px]" style="background:#0f1828;border:2px solid rgba(255,255,255,0.06);box-shadow:inset 0 3px 10px rgba(0,0,0,0.55)">
                        <span class="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:rgba(52,211,153,0.15);border:2px solid rgba(52,211,153,0.3);color:#34d399;font-family:'Space Mono',monospace">Sandbox Active</span>
                        <span class="text-xs" style="color:#6b7a90;font-family:'Space Mono',monospace">isolated • dummy data only</span>
                    </div>
                    <ul class="mt-4 space-y-2" style="font-family:'Space Mono',monospace;font-size:11px">
                        <li class="flex items-center justify-between px-3 py-2 rounded-full" style="background:#0f1828;border:2px solid rgba(255,255,255,0.06)"><span class="flex items-center gap-2" style="color:#8b98ab"><x-icon name="lock" class="size-3.5" /> Sandbox Mode</span><span style="color:#34d399;font-weight:700">Isolated</span></li>
                        <li class="flex items-center justify-between px-3 py-2 rounded-full" style="background:#0f1828;border:2px solid rgba(255,255,255,0.06)"><span class="flex items-center gap-2" style="color:#8b98ab"><x-icon name="database" class="size-3.5" /> Simulation Payload</span><span style="color:#00e5ff;font-weight:700">100% Dummy Data</span></li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="mx-auto -mt-2 mb-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-3 rounded-full" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);font-family:'Space Mono',monospace;font-size:11px;color:#8b98ab">
            <span class="flex items-center gap-1.5"><x-icon name="shield-check" class="size-3.5" style="color:#34d399" /> Safe learning environment</span><span>Dummy data only</span><span>No real-world attacks</span>
        </div>

        {{-- FITUR --}}
        <section id="fitur" class="mx-auto max-w-6xl px-6 pb-14">
            <div class="text-center"><span class="inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Fitur Unggulan Platform</span><h2 class="mx-auto mt-4 max-w-xl text-2xl sm:text-3xl font-extrabold text-white" style="font-family:'Bricolage Grotesque',sans-serif">Belajar Cybersecurity dengan Cara yang Lebih Interaktif</h2></div>
            <div class="mt-8 grid gap-5 md:grid-cols-3">
                @foreach ([
                    ['icon'=>'shield-check','title'=>'Simulasi Aman','tag'=>'Isolated','text'=>'Pelajari skenario serangan dalam lingkungan simulasi tertutup berbasis browser tanpa risiko bahaya ke infrastruktur nyata.','code'=>'sandbox://virtual-node-01'],
                    ['icon'=>'target','title'=>'Deteksi Serangan','tag'=>'Telemetry','text'=>'Kenali karakteristik dan alur serangan secara visual melalui pembacaan audit log, header forensik, dan indikator anomali.','code'=>'realtime payload inspector'],
                    ['icon'=>'lock','title'=>'Defense & Mitigasi','tag'=>'Hardening','text'=>'Langkah pertahanan terhadap ancaman dengan mengimplementasikan parameter sanitasi, patch code, dan konfigurasi proteksi.','code'=>'secure coding guidance'],
                ] as $feature)
                    <article class="p-6" style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08)">
                        <div class="flex items-center gap-3">
                            <span class="flex size-10 items-center justify-center rounded-2xl" style="background:rgba(0,229,255,0.12);border:2px solid rgba(0,229,255,0.2);color:#00e5ff"><x-icon :name="$feature['icon']" class="size-5" /></span>
                            <h3 class="font-extrabold text-white" style="font-family:'Nunito',sans-serif">{{ $feature['title'] }}</h3>
                            <span class="ml-auto px-2 py-1 rounded-full text-[10px] font-extrabold" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">{{ $feature['tag'] }}</span>
                        </div>
                        <p class="mt-4 text-sm leading-relaxed" style="color:#8b98ab">{{ $feature['text'] }}</p>
                        <p class="mt-4 pt-3" style="border-top:2px solid #233044;font-family:'Space Mono',monospace;font-size:10px;color:rgba(0,229,255,0.8)">{{ $feature['code'] }}</p>
                    </article>
                @endforeach
            </div>
        </section>

        {{-- ALUR --}}
        <section id="alur" class="mx-auto max-w-6xl px-6 pb-14">
            <div class="text-center"><span class="inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Metodologi Belajar</span><h2 class="mt-4 text-2xl sm:text-3xl font-extrabold text-white" style="font-family:'Bricolage Grotesque',sans-serif">Alur Pembelajaran Terstruktur</h2><p class="mx-auto mt-2 max-w-lg text-sm" style="color:#8b98ab">Tiga fase sistematis untuk menguasai konsep keamanan informasi dari fundamental hingga tindakan kuratif.</p></div>
            <div class="mt-8 grid gap-5 md:grid-cols-3">
                @foreach ([
                    ['no'=>'01','label'=>'Learn','icon'=>'book-open','title'=>'Pahami Fundamental','text'=>'Pahami konsep fundamental ancaman siber, prinsip kerentanan, dan mekanisme protokol secara teori interaktif dan modul ringkas.','foot'=>'Tahap teori & anatomi serangan'],
                    ['no'=>'02','label'=>'Detect','icon'=>'search','title'=>'Inspeksi & Deteksi','text'=>'Amati pola log mencurigakan, inspeksi lalu lintas simulasi, dan identifikasi anomali serangan secara langsung melalui layar telemetri.','foot'=>'Tahap analisis log & anomali'],
                    ['no'=>'03','label'=>'Defend','icon'=>'shield-check','title'=>'Terapkan Mitigasi','text'=>'Terapkan aturan mitigasi, perbaiki celah dummy code, dan amankan sistem dengan standar praktik keamanan web & database terbaik.','foot'=>'Tahap implementasi proteksi'],
                ] as $step)
                    <article class="p-6" style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08)">
                        <div class="flex items-center justify-between"><span style="font-family:'Space Mono',monospace;font-size:11px;font-weight:700;letter-spacing:0.12em;color:#00e5ff">{{ $step['no'] }}. {{ $step['label'] }}</span><x-icon :name="$step['icon']" class="size-4" style="color:#00e5ff" /></div>
                        <h3 class="mt-4 font-extrabold text-white" style="font-family:'Nunito',sans-serif">{{ $step['title'] }}</h3>
                        <p class="mt-2 text-sm leading-relaxed" style="color:#8b98ab">{{ $step['text'] }}</p>
                        <p class="mt-4" style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#34d399">▸ {{ $step['foot'] }}</p>
                    </article>
                @endforeach
            </div>
        </section>

        {{-- LABS --}}
        <section id="skenario" class="mx-auto max-w-6xl px-6 pb-14">
            <span class="inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Modul Praktik Terpadu</span>
            <div class="mt-4 flex flex-wrap items-end justify-between gap-3">
                <div><h2 class="text-2xl sm:text-3xl font-extrabold text-white" style="font-family:'Bricolage Grotesque',sans-serif">Skenario Edukasi Keamanan Siber</h2><p class="mt-2 max-w-lg text-sm" style="color:#8b98ab">Eksplorasi modul skenario simulasi terisolasi untuk memahami cara kerja dan mitigasi ancaman secara praktis.</p></div>
                <span class="flex items-center gap-1.5" style="font-family:'Space Mono',monospace;font-size:10px;color:#34d399"><span class="size-1.5 rounded-full" style="background:#34d399;box-shadow:0 0 8px rgba(52,211,153,0.5)"></span> Semua target beroperasi dalam sandbox dummy</span>
            </div>
            <div class="mt-8 grid gap-5 md:grid-cols-3">
                @foreach ($labs as $lab)
                    <x-lab-card :lab="$lab" />
                @endforeach
            </div>
        </section>

        {{-- CTA --}}
        <section class="mx-auto max-w-5xl px-6 pb-14">
            <div class="p-8 sm:p-10" style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08);overflow:hidden">
                <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div class="max-w-md"><span class="inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Universitas Sebelas Maret PSDKU Madiun</span><h2 class="mt-4 text-3xl font-extrabold leading-tight text-white" style="font-family:'Bricolage Grotesque',sans-serif">Siap mulai belajar cybersecurity?</h2><p class="mt-3 text-sm" style="color:#8b98ab">Masuki lingkungan simulasi edukatif bersama Security Cat dan asah keterampilan pertahanan digital Anda hari ini.</p></div>
                    <a href="{{ route('dashboard') }}" class="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] text-sm font-extrabold shrink-0" style="background:#ffd23a;color:#1a1400;border:2.5px solid #e6b800;box-shadow:0 5px 0 #e6b800,0 10px 22px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.4);font-family:'Nunito',sans-serif">Buka Dashboard <x-icon name="terminal" /></a>
                </div>
            </div>
        </section>
    </main>
    <x-footer />
</x-layouts.app>
