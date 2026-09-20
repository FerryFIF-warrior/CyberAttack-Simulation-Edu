@props(['lab'])

{{-- Taruh gambar di public/images/labs/{slug}.jpg bila ingin thumbnail asli --}}
<article class="cat-card group overflow-hidden transition hover:border-cat-cyan/40">
    <div class="h-36 bg-linear-to-br from-cat-cyan/15 via-cat-surface to-cat-bg">
        @if (file_exists(public_path('images/labs/'.$lab['slug'].'.jpg')))
            <img src="{{ asset('images/labs/'.$lab['slug'].'.jpg') }}" alt="{{ $lab['lab_name'] }}"
                 class="h-full w-full object-cover opacity-60 blur-[1px]">
        @endif
    </div>
    <div class="space-y-3 p-5">
        <p class="cat-label text-[10px]">{{ $lab['vector'] }}</p>
        <h3 class="text-lg font-semibold text-white">{{ $lab['lab_name'] }}</h3>
        <p class="text-sm leading-relaxed text-cat-muted">{{ $lab['lab_summary'] }}</p>
        <p class="font-mono text-[10px] uppercase tracking-wider text-cat-green">Safe dummy simulation · No real targets</p>
        <a href="#" class="cat-btn-ghost w-full justify-between">
            {{ $lab['lab_cta'] }}
            <x-icon name="arrow-right" />
        </a>
    </div>
</article>
