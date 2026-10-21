@php
    $isLanding = request()->routeIs('landing');
    $user = auth()->user();

    if ($isLanding) {
        $links = [
            ['label' => 'Home', 'href' => route('landing'), 'active' => true],
            ['label' => 'About', 'href' => route('about'), 'active' => request()->routeIs('about')],
            ['label' => 'Learning', 'href' => route('learning'), 'active' => request()->routeIs('learning')],
            ['label' => 'Simulasi', 'href' => route('simulasi.index'), 'active' => request()->routeIs('simulasi.*')],
            ['label' => 'Dashboard', 'href' => route('dashboard'), 'active' => false],
        ];
    } else {
        $links = [
            ['label' => 'Home', 'href' => route('dashboard'), 'active' => request()->routeIs('dashboard')],
            ['label' => 'About', 'href' => route('about'), 'active' => request()->routeIs('about')],
            ['label' => 'Learning', 'href' => route('learning'), 'active' => request()->routeIs('learning')],
            ['label' => 'Simulasi', 'href' => route('simulasi.index'), 'active' => request()->routeIs('simulasi.*')],
        ];

        if ($user) {
            $links[] = ['label' => 'Log', 'href' => route('security-log'), 'active' => request()->routeIs('security-log')];
            $links[] = ['label' => 'Chat-AI', 'href' => route('chat-ai'), 'active' => request()->routeIs('chat-ai')];

            if ($user->can('manage-knowledge-base')) {
                $links[] = ['label' => 'Admin KB', 'href' => route('admin.knowledge-base.index'), 'active' => request()->routeIs('admin.knowledge-base.*')];
            }
        }
    }

    $progression = $user ? $user->progression() : null;
    $badgeLabels = ['beginner' => 'Pemula', 'suhu' => 'Suhu Sandbox'];
@endphp

<header class="sticky top-0 z-50 animate-enter-nav backdrop-blur-xl" style="background:rgba(7,11,20,0.82);border-bottom:3px solid #233044;box-shadow:0 8px 24px rgba(0,0,0,0.35)">
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="{{ route('landing') }}" class="flex items-center gap-2">
            <img src="{{ asset('assets/img/logo.png') }}" alt="Security Cat" class="h-6 w-auto" />
            <span class="font-semibold text-white">Security Cat</span>
            <span class="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.55);font-family:'Space Mono',monospace">Edu Simulator</span>
        </a>

        @if ($isLanding)
            <nav class="hidden items-center md:flex">
                <span class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8b98ab]">
                    <x-icon name="shield-check" class="size-3.5 text-[#00e5ff]" />
                    Cyber Attack Education
                </span>
            </nav>
        @else
            <nav class="hidden items-center gap-1 rounded-full p-1 text-sm md:flex" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);box-shadow:inset 0 2px 8px rgba(0,0,0,0.4)">
                @foreach ($links as $link)
                    <a href="{{ $link['href'] }}"
                       @class([
                           'rounded-md px-3 py-1 transition',
                           'text-white' => $link['active'],
                           'text-[#8b98ab] hover:text-white' => ! $link['active'],
                       ])>{{ $link['label'] }}</a>
                @endforeach
            </nav>
        @endif

        <div class="hidden items-center gap-2 md:flex">
            @auth
                <details class="group relative">
                    <summary class="flex cursor-pointer list-none items-center gap-2 rounded-full px-2.5 py-1.5 transition" style="background:#162030;border:3px solid #233044;box-shadow:0 6px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)" aria-label="Menu pengguna">
                        <span class="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5ff] to-[#34d399] font-mono text-[11px] font-bold text-[#070b14]">
                            {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                        </span>
                        <span class="hidden text-left leading-tight lg:block">
                            <span class="block max-w-[120px] truncate text-xs font-semibold text-white">{{ $user->callsign ?? $user->name }}</span>
                            <span class="block font-mono text-[9px] uppercase tracking-wider text-[#00e5ff]">{{ $progression['rank'] }} · Lv.{{ $progression['level'] }}</span>
                        </span>
                        <x-icon name="chevron-down" class="size-3.5 text-[#8b98ab] transition-transform group-open:rotate-180" />
                    </summary>

                    <div class="absolute right-0 mt-2 w-64 animate-fade-in-up overflow-hidden rounded-xl border border-[#233044] bg-[#162030] shadow-2xl shadow-black/40">
                        {{-- Identitas --}}
                        <div class="border-b border-[#233044] bg-[#0f1828]/60 px-4 py-3">
                            <div class="flex items-center gap-3">
                                <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5ff] to-[#34d399] font-mono text-sm font-bold text-[#070b14]">
                                    {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                                </span>
                                <div class="min-w-0 leading-tight">
                                    <p class="truncate text-sm font-semibold text-white">{{ $user->name }}</p>
                                    <p class="truncate font-mono text-[10px] text-[#8b98ab]">@{{ $user->callsign }}</p>
                                </div>
                            </div>
                        </div>

                        {{-- Level & XP --}}
                        <div class="px-4 py-3">
                            <div class="flex items-center justify-between text-[11px]">
                                <span class="font-mono uppercase tracking-wider text-[#8b98ab]">Lv.{{ $progression['level'] }} · {{ $progression['rank'] }}</span>
                                <span class="flex items-center gap-1 font-mono text-[#00e5ff]"><x-icon name="bolt" class="size-3" /> {{ $progression['xp'] }} XP</span>
                            </div>
                            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-[#070b14]">
                                <div class="h-full rounded-full bg-gradient-to-r from-[#00e5ff] to-[#34d399]" style="width: {{ $progression['percentToNext'] }}%"></div>
                            </div>
                            @if ($progression['level'] < 7)
                                <p class="mt-1.5 font-mono text-[10px] text-[#8b98ab]">
                                    {{ $progression['xp'] - $progression['xpForLevel'] }} / {{ $progression['xpNextLevel'] - $progression['xpForLevel'] }} XP ke Lv.{{ $progression['level'] + 1 }}
                                </p>
                            @else
                                <p class="mt-1.5 font-mono text-[10px] text-[#34d399]">Level maksimum tercapai</p>
                            @endif
                        </div>

                        {{-- Badges --}}
                        <div class="flex flex-wrap gap-1.5 px-4 pb-3">
                            @forelse ($progression['badges'] as $badge)
                                <span class="inline-flex items-center gap-1 rounded-md border border-[#00e5ff]/20 bg-[#00e5ff]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#00e5ff]">
                                    <x-icon name="award" class="size-3" /> {{ $badgeLabels[$badge] ?? $badge }}
                                </span>
                            @empty
                                <span class="font-mono text-[10px] text-[#8b98ab]">Belum ada badge tercetak</span>
                            @endforelse
                        </div>

                        {{-- Menu --}}
                        <div class="border-t border-[#233044] p-1.5">
                            <a href="{{ route('profile.edit') }}" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5">
                                <x-icon name="user" class="size-4 text-[#8b98ab]" /> Profil
                            </a>
                            <a href="{{ route('profile.edit') }}" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5">
                                <x-icon name="settings" class="size-4 text-[#8b98ab]" /> Pengaturan
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
            <summary class="flex cursor-pointer list-none items-center rounded-lg border border-[#233044] p-2 text-slate-200" aria-label="Menu navigasi">
                <x-icon name="menu" class="size-5" />
            </summary>
            <div class="absolute right-0 mt-2 w-56 rounded-xl border border-[#233044] bg-[#162030] p-2 text-sm shadow-xl">
                @foreach ($links as $link)
                    <a href="{{ $link['href'] }}"
                       @class([
                           'block rounded-md px-3 py-2 hover:bg-white/5',
                           'text-white' => $link['active'],
                           'text-slate-200' => ! $link['active'],
                       ])>{{ $link['label'] }}</a>
                @endforeach

                @auth
                    <div class="mt-2 border-t border-[#233044] pt-2">
                        <div class="flex items-center gap-2 px-2 py-1">
                            <span class="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5ff] to-[#34d399] font-mono text-[11px] font-bold text-[#070b14]">
                                {{ strtoupper(substr($user->callsign ?? $user->name, 0, 1)) }}
                            </span>
                            <div class="min-w-0 leading-tight">
                                <p class="truncate text-xs font-semibold text-white">{{ $user->callsign ?? $user->name }}</p>
                                <p class="font-mono text-[9px] uppercase tracking-wider text-[#00e5ff]">{{ $progression['rank'] }} · Lv.{{ $progression['level'] }}</p>
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