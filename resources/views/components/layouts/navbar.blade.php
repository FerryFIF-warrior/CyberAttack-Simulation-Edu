@php
    $isLanding = request()->routeIs('landing');

    $links = $isLanding
        ? [
            ['label' => 'Home', 'href' => route('landing'), 'active' => true],
            ['label' => 'About', 'href' => route('about'), 'active' => request()->routeIs('about')],
            ['label' => 'Learning', 'href' => route('learning'), 'active' => request()->routeIs('learning')],
            ['label' => 'Simulasi', 'href' => route('simulasi.index'), 'active' => request()->routeIs('simulasi.*')],
            ['label' => 'Dashboard', 'href' => route('dashboard'), 'active' => false],
        ]
        : [
            ['label' => 'Home', 'href' => route('dashboard'), 'active' => request()->routeIs('dashboard')],
            ['label' => 'About', 'href' => route('about'), 'active' => request()->routeIs('about')],
            ['label' => 'Learning', 'href' => route('learning'), 'active' => request()->routeIs('learning')],
            ['label' => 'Simulasi', 'href' => route('simulasi.index'), 'active' => request()->routeIs('simulasi.*')],
        ];

    $user = auth()->user();
    $progression = $user ? $user->progression() : null;
    $badgeLabels = ['beginner' => 'Pemula', 'suhu' => 'Suhu Sandbox'];
@endphp

<header class="sticky top-0 z-50 animate-enter-nav border-b border-cat-line/60 bg-cat-bg/80 backdrop-blur">
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="{{ route('landing') }}" class="flex items-center gap-2">
            <img src="{{ asset('assets/img/logo.png') }}" alt="Security Cat" class="h-6 w-auto" />
            <span class="font-semibold text-white">Security Cat</span>
            <span class="cat-tag hidden sm:inline-flex">Edu Simulator</span>
        </a>

        @if ($isLanding)
            <nav class="hidden items-center md:flex">
                <span class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-cat-muted">
                    <x-icon name="shield-check" class="size-3.5 text-cat-cyan" />
                    Cyber Attack Education
                </span>
            </nav>
        @else
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
        @endif

        <div class="hidden items-center gap-2 md:flex">
            @auth
                <details class="group relative">
                    <summary class="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-cat-line bg-cat-card px-2.5 py-1.5 hover:border-cat-cyan/40 transition" aria-label="Menu pengguna">
                        <span class="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-cat-cyan to-cat-green font-mono text-[11px] font-bold text-cat-bg">
                            {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                        </span>
                        <span class="hidden text-left leading-tight lg:block">
                            <span class="block max-w-[120px] truncate text-xs font-semibold text-white">{{ $user->callsign ?? $user->name }}</span>
                            <span class="block font-mono text-[9px] uppercase tracking-wider text-cat-cyan">{{ $progression['rank'] }} · Lv.{{ $progression['level'] }}</span>
                        </span>
                        <x-icon name="chevron-down" class="size-3.5 text-cat-muted transition-transform group-open:rotate-180" />
                    </summary>

                    <div class="absolute right-0 mt-2 w-64 animate-fade-in-up overflow-hidden rounded-xl border border-cat-line bg-cat-card shadow-2xl shadow-black/40">
                        {{-- Identitas --}}
                        <div class="border-b border-cat-line bg-cat-surface/60 px-4 py-3">
                            <div class="flex items-center gap-3">
                                <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cat-cyan to-cat-green font-mono text-sm font-bold text-cat-bg">
                                    {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                                </span>
                                <div class="min-w-0 leading-tight">
                                    <p class="truncate text-sm font-semibold text-white">{{ $user->name }}</p>
                                    <p class="truncate font-mono text-[10px] text-cat-muted">@{{ $user->callsign }}</p>
                                </div>
                            </div>
                        </div>

                        {{-- Level & XP --}}
                        <div class="px-4 py-3">
                            <div class="flex items-center justify-between text-[11px]">
                                <span class="font-mono uppercase tracking-wider text-cat-muted">Lv.{{ $progression['level'] }} · {{ $progression['rank'] }}</span>
                                <span class="flex items-center gap-1 font-mono text-cat-cyan"><x-icon name="bolt" class="size-3" /> {{ $progression['xp'] }} XP</span>
                            </div>
                            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-cat-bg">
                                <div class="h-full rounded-full bg-gradient-to-r from-cat-cyan to-cat-green" style="width: {{ $progression['percentToNext'] }}%"></div>
                            </div>
                            @if ($progression['level'] < 7)
                                <p class="mt-1.5 font-mono text-[10px] text-cat-muted">
                                    {{ $progression['xp'] - $progression['xpForLevel'] }} / {{ $progression['xpNextLevel'] - $progression['xpForLevel'] }} XP ke Lv.{{ $progression['level'] + 1 }}
                                </p>
                            @else
                                <p class="mt-1.5 font-mono text-[10px] text-cat-green">Level maksimum tercapai</p>
                            @endif
                        </div>

                        {{-- Badges --}}
                        <div class="flex flex-wrap gap-1.5 px-4 pb-3">
                            @forelse ($progression['badges'] as $badge)
                                <span class="inline-flex items-center gap-1 rounded-md border border-cat-cyan/20 bg-cat-cyan/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cat-cyan">
                                    <x-icon name="award" class="size-3" /> {{ $badgeLabels[$badge] ?? $badge }}
                                </span>
                            @empty
                                <span class="font-mono text-[10px] text-cat-muted">Belum ada badge tercetak</span>
                            @endforelse
                        </div>

                        {{-- Menu --}}
                        <div class="border-t border-cat-line p-1.5">
                            <a href="{{ route('profile.edit') }}" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5">
                                <x-icon name="user" class="size-4 text-cat-muted" /> Profil
                            </a>
                            <a href="{{ route('profile.edit') }}" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5">
                                <x-icon name="settings" class="size-4 text-cat-muted" /> Pengaturan
                            </a>
                            <form method="POST" action="{{ route('logout') }}" class="flex">
                                @csrf
                                <button type="submit" class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10">
                                    <x-icon name="logout" class="size-4" /> Keluar
                                </button>
                            </form>
                        </div>
                    </div>
                </details>
            @else
                @if (Route::has('login'))
                    <a href="{{ route('login') }}" class="cat-btn-ghost py-1.5">Login</a>
                @endif
                <a href="{{ route('dashboard') }}" class="cat-btn-primary py-1.5">Mulai Belajar</a>
            @endauth
        </div>

        {{-- Menu mobile tanpa JS --}}
        <details class="relative md:hidden">
            <summary class="flex cursor-pointer list-none items-center rounded-lg border border-cat-line p-2 text-slate-200" aria-label="Menu navigasi">
                <x-icon name="menu" class="size-5" />
            </summary>
            <div class="absolute right-0 mt-2 w-56 rounded-xl border border-cat-line bg-cat-card p-2 text-sm shadow-xl">
                @foreach ($links as $link)
                    <a href="{{ $link['href'] }}"
                       @class([
                           'block rounded-md px-3 py-2 hover:bg-white/5',
                           'bg-white/10 text-white' => $link['active'],
                           'text-slate-200' => ! $link['active'],
                       ])>{{ $link['label'] }}</a>
                @endforeach

                @auth
                    <div class="mt-2 border-t border-cat-line pt-2">
                        <div class="flex items-center gap-2 px-2 py-1">
                            <span class="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-cat-cyan to-cat-green font-mono text-[11px] font-bold text-cat-bg">
                                {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                            </span>
                            <div class="min-w-0 leading-tight">
                                <p class="truncate text-xs font-semibold text-white">{{ $user->callsign ?? $user->name }}</p>
                                <p class="font-mono text-[9px] uppercase tracking-wider text-cat-cyan">{{ $progression['rank'] }} · Lv.{{ $progression['level'] }}</p>
                            </div>
                        </div>
                        <a href="{{ route('profile.edit') }}" class="mt-1 block rounded-md px-3 py-2 hover:bg-white/5">Profil</a>
                        <form method="POST" action="{{ route('logout') }}" class="flex">
                            @csrf
                            <button type="submit" class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-300 hover:bg-red-500/10">
                                <x-icon name="logout" class="size-4" /> Keluar
                            </button>
                        </form>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="cat-btn-ghost mt-2 w-full py-1.5">Login</a>
                    <a href="{{ route('dashboard') }}" class="cat-btn-primary mt-2 w-full py-1.5">Mulai Belajar</a>
                @endauth
            </div>
        </details>
    </div>
</header>