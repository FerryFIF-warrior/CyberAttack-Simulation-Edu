@php
    $links = [
        ['label' => 'Home', 'href' => route('landing'), 'active' => request()->routeIs('landing')],
        ['label' => 'About', 'href' => route('landing').'#fitur', 'active' => false],
        ['label' => 'Learning', 'href' => route('landing').'#alur', 'active' => false],
        ['label' => 'Dashboard', 'href' => route('dashboard'), 'active' => request()->routeIs('dashboard')],
    ];
@endphp

<header class="sticky top-0 z-50 border-b border-cat-line/60 bg-cat-bg/80 backdrop-blur">
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="{{ route('landing') }}" class="flex items-center gap-2">
            <x-icon name="cat" class="size-6 text-cat-cyan" />
            <span class="font-semibold text-white">Security Cat</span>
            <span class="cat-tag hidden sm:inline-flex">Edu Simulator</span>
        </a>

        <nav class="hidden items-center gap-1 rounded-lg border border-cat-line bg-cat-surface p-1 text-sm md:flex">
            @foreach ($links as $link)
                <a href="{{ $link['href'] }}"
                   @class([
                       'rounded-md px-3 py-1 transition',
                       'bg-white/10 text-white' => $link['active'],
                       'text-cat-muted hover:text-white' => ! $link['active'],
                   ])>{{ $link['label'] }}</a>
            @endforeach
        </nav>

        <div class="hidden items-center gap-2 md:flex">
            @if (Route::has('login'))
                <a href="{{ route('login') }}" class="cat-btn-ghost py-1.5">Login</a>
            @endif
            <a href="{{ route('dashboard') }}" class="cat-btn-primary py-1.5">Mulai Belajar</a>
        </div>

        {{-- Menu mobile tanpa JS --}}
        <details class="relative md:hidden">
            <summary class="flex cursor-pointer list-none items-center rounded-lg border border-cat-line p-2 text-slate-200">
                <x-icon name="menu" class="size-5" />
            </summary>
            <div class="absolute right-0 mt-2 w-48 rounded-xl border border-cat-line bg-cat-card p-2 text-sm shadow-xl">
                @foreach ($links as $link)
                    <a href="{{ $link['href'] }}" class="block rounded-md px-3 py-2 hover:bg-white/5">{{ $link['label'] }}</a>
                @endforeach
                <a href="{{ route('dashboard') }}" class="cat-btn-primary mt-2 w-full py-1.5">Mulai Belajar</a>
            </div>
        </details>
    </div>
</header>
