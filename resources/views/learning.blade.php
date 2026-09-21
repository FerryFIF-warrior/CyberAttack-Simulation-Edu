<x-layouts.app title="Security Cat — Alur Belajar | Sedang Dikembangkan">
    <x-navbar />

    <main class="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <span class="flex size-16 items-center justify-center rounded-2xl border border-cat-line bg-cat-card text-cat-cyan">
            <x-icon name="book-open" class="size-8" />
        </span>
        <span class="cat-tag mt-6 border-cat-cyan/30 bg-cat-cyan/10 text-cat-cyan">Status: Dalam Pengembangan</span>
        <h1 class="mt-5 text-3xl font-bold text-white sm:text-4xl">Halaman Alur Belajar Segera Hadir</h1>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-cat-muted">
            Halaman ini masih dalam tahap pengembangan dan belum dapat diakses.
            Tim sedang menyiapkan alur pembelajaran terstruktur untuk Anda. Silakan kembali lagi nanti.
        </p>
        <a href="{{ route('dashboard') }}" class="cat-btn-primary mt-8">
            Kembali ke Beranda <x-icon name="arrow-right" />
        </a>
    </main>
</x-layouts.app>