@php
    $user = auth()->user();
    $isLanding = request()->routeIs('landing');
    $progression = $user ? $user->progression() : null;
    $badgeLabels = ['beginner' => 'Pemula', 'suhu' => 'Suhu Sandbox'];
    $isAdmin = $user && $user->role === 'admin';

    $links = [
        ['label' => 'Home', 'href' => route('landing'), 'active' => $isLanding],
        ['label' => 'About', 'href' => route('about'), 'active' => request()->routeIs('about')],
        ['label' => 'Learning', 'href' => route('learning'), 'active' => request()->routeIs('learning')],
        ['label' => 'Simulasi', 'href' => route('simulasi.index'), 'active' => request()->routeIs('simulasi.*')],
    ];

    if ($user) {
        $links[] = ['label' => 'Dashboard', 'href' => route('dashboard'), 'active' => request()->routeIs('dashboard')];
        $links[] = ['label' => 'Chat-AI', 'href' => route('chat-ai'), 'active' => request()->routeIs('chat-ai')];
        $links[] = ['label' => 'Log', 'href' => route('security-log'), 'active' => request()->routeIs('security-log')];

        if ($user->can('manage-knowledge-base')) {
            $links[] = ['label' => 'Admin KB', 'href' => route('admin.knowledge-base.index'), 'active' => request()->routeIs('admin.knowledge-base.*')];
        }

        if ($isAdmin) {
            $links[] = ['label' => 'Panel Admin', 'href' => route('admin.dashboard'), 'active' => request()->routeIs('admin.*')];
        }
    }
@endphp

<header class="sc-nav">
    <div class="sc-nav__inner">
        <a href="{{ route('landing') }}" class="sc-nav__brand" aria-label="Security Cat — beranda">
            <span class="sc-nav__tile"><img src="{{ asset('assets/img/logo.svg') }}" alt="" width="22" height="22"></span>
            <span class="sc-nav__wordmark">Security&nbsp;Cat</span>
        </a>

        <nav class="sc-nav__links" aria-label="Navigasi utama">
            @foreach ($links as $link)
                <a href="{{ $link['href'] }}" @class(['sc-nav__link' => true, 'is-active' => $link['active']])>{{ $link['label'] }}</a>
            @endforeach
        </nav>

        <div class="sc-nav__end">
            {{-- Jam live WIB --}}
            <span class="sc-nav__clock" aria-label="Waktu sekarang">
                <span class="sc-nav__dot" aria-hidden="true"></span>
                <b data-live-clock>--:--:--</b>
                <em>WIB</em>
            </span>

            @auth
                <details class="relative">
                    <summary class="flex cursor-pointer list-none items-center gap-2 rounded-full border-2 border-clay-line bg-clay-inset px-2 py-1.5" aria-label="Menu pengguna">
                        <span class="sc-nav__avatar">
                            {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                        </span>
                        <span class="hidden text-start sm:block">
                            <span class="block max-w-[120px] truncate text-xs font-bold leading-tight text-white">{{ $user->callsign ?? $user->name }}</span>
                            <span class="block font-mono text-[10px] leading-tight text-clay-sage">Lv.{{ $progression['level'] }} · {{ $progression['rank'] }}</span>
                        </span>
                        <x-icon name="chevron-down" class="size-4 text-slate-400" />
                    </summary>

                    <div class="sc-nav__menu">
                        <div class="px-3 pt-2 pb-3">
                            <p class="truncate text-sm font-bold text-white">{{ $user->name }}</p>
                            <p class="truncate font-mono text-[10px] text-clay-sage">@{{ $user->callsign }}</p>
                            <div class="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-clay-sage">
                                <span>Lv.{{ $progression['level'] }} · {{ $progression['rank'] }}</span>
                                <span class="flex items-center gap-1 text-cyan-300"><x-icon name="bolt" class="size-3" /> {{ $progression['xp'] }} XP</span>
                            </div>
                            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-clay-bg">
                                <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style="width: {{ $progression['percentToNext'] }}%"></div>
                            </div>
                            @if ($progression['level'] < 7)
                                <p class="mt-1.5 font-mono text-[10px] text-slate-400">
                                    {{ $progression['xp'] - $progression['xpForLevel'] }} / {{ $progression['xpNextLevel'] - $progression['xpForLevel'] }} XP ke Lv.{{ $progression['level'] + 1 }}
                                </p>
                            @else
                                <p class="mt-1.5 font-mono text-[10px] text-emerald-300">Level maksimum tercapai</p>
                            @endif
                        </div>

                        <div class="flex flex-wrap gap-1.5 px-3 pb-3">
                            @forelse ($progression['badges'] as $badge)
                                <span class="inline-flex items-center gap-1 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-300">
                                    <x-icon name="award" class="size-3" /> {{ $badgeLabels[$badge] ?? $badge }}
                                </span>
                            @empty
                                <span class="font-mono text-[10px] text-slate-400">Belum ada badge tercetak</span>
                            @endforelse
                        </div>

                        <div class="border-t border-clay-line pt-1">
                            @if ($isAdmin)
                                <a href="{{ route('admin.dashboard') }}"><x-icon name="shield-check" class="size-4" /> Panel Admin</a>
                            @endif
                            <a href="{{ route('profile.edit') }}"><x-icon name="user" class="size-4" /> Profil</a>
                            <a href="{{ route('profile.edit') }}"><x-icon name="settings" class="size-4" /> Pengaturan</a>
                            <form method="POST" action="{{ route('logout') }}" class="sc-nav__menu--danger">
                                @csrf
                                <button type="submit"><x-icon name="logout" class="size-4" /> Keluar</button>
                            </form>
                        </div>
                    </div>
                </details>
            @else
                @if (Route::has('login'))
                    <a href="{{ route('login') }}" class="cat-btn-ghost py-1.5">Masuk</a>
                @endif
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="cat-btn-primary py-1.5">Daftar</a>
                @endif
            @endauth

            {{-- Menu mobile --}}
            <details class="relative lg:hidden">
                <summary class="sc-nav__burger" aria-label="Menu navigasi">
                    <x-icon name="menu" class="size-5" />
                </summary>
                <div class="sc-nav__mobile absolute end-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border-2 border-clay-line bg-clay-surface shadow-2xl shadow-black/50">
                    <p class="sc-nav__mobile-label">Jam</p>
                    <p class="flex items-center gap-2 px-3 pb-2 font-mono text-sm font-bold text-white">
                        <span class="sc-nav__dot" aria-hidden="true"></span>
                        <span data-live-clock>--:--:--</span>
                        <span class="text-[10px] tracking-widest text-slate-400">WIB</span>
                    </p>
                    <p class="sc-nav__mobile-label">Menu</p>
                    @foreach ($links as $link)
                        <a href="{{ $link['href'] }}" @class(['is-active' => $link['active']])>{{ $link['label'] }}</a>
                    @endforeach

                    <div class="mt-1 border-t border-clay-line pt-1">
                        @auth
                            <div class="flex items-center gap-2 px-3 py-2">
                                <span class="sc-nav__avatar">{{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}</span>
                                <div class="min-w-0 leading-tight">
                                    <p class="truncate text-xs font-semibold text-white">{{ $user->callsign ?? $user->name }}</p>
                                    <p class="truncate font-mono text-[9px] text-clay-sage">{{ $progression['rank'] }} · Lv.{{ $progression['level'] }}</p>
                                </div>
                            </div>
                            <a href="{{ route('profile.edit') }}"><x-icon name="user" class="size-4" /> Profil</a>
                            <form method="POST" action="{{ route('logout') }}" class="sc-nav__menu--danger">
                                @csrf
                                <button type="submit"><x-icon name="logout" class="size-4" /> Keluar</button>
                            </form>
                        @else
                            @if (Route::has('login'))
                                <a href="{{ route('login') }}">Masuk</a>
                            @endif
                            @if (Route::has('register'))
                                <a href="{{ route('register') }}">Daftar</a>
                            @endif
                        @endauth
                    </div>
                </div>
            </details>
        </div>
    </div>
</header>

@once
    <script>
        (function () {
            var fmt = new Intl.DateTimeFormat('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            var tick = function () {
                var text = fmt.format(new Date());
                document.querySelectorAll('[data-live-clock]').forEach(function (el) {
                    el.textContent = text;
                });
            };

            tick();
            setInterval(tick, 1000);
        })();
    </script>
@endonce
