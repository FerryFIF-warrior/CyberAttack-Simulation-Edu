<x-layouts.app title="Security Cat — Tentang">
    <x-navbar />
    <main class="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center" style="background:radial-gradient(700px 400px at 50% 0%, #1a2a44 0%, transparent 60%),#070b14">
        <span class="flex size-16 items-center justify-center" style="background:#162030;border:3px solid #233044;border-radius:24px;box-shadow:0 12px 24px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.08);color:#00e5ff"><x-icon name="settings" class="size-8" /></span>
        <span class="mt-6 inline-flex px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:#00e5ff;font-family:'Space Mono',monospace">Status: Dalam Pengembangan</span>
        <h1 class="mt-5 text-3xl sm:text-4xl font-extrabold text-white" style="font-family:'Bricolage Grotesque',sans-serif">Halaman About Segera Hadir</h1>
        <p class="mt-4 max-w-xl text-sm leading-relaxed" style="color:#8b98ab">Halaman ini masih dalam tahap pengembangan dan belum dapat diakses. Tim sedang menyiapkan konten terbaik untuk Anda. Silakan kembali lagi nanti.</p>
        <a href="{{ route('dashboard') }}" class="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-[16px] text-sm font-extrabold" style="background:#00e5ff;color:#0a0e15;border:2.5px solid #00b8cc;box-shadow:0 5px 0 #00b8cc,0 10px 22px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.3);font-family:'Nunito',sans-serif">Kembali ke Beranda <x-icon name="arrow-right" /></a>
    </main>
</x-layouts.app>
