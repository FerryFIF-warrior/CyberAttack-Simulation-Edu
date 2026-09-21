@props(['student'])

<header class="sticky top-0 z-40 border-b border-cat-line/60 bg-cat-bg/80 backdrop-blur">
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <div class="flex min-w-0 items-center gap-3">
            <a href="{{ route('landing') }}" class="flex items-center gap-2">
                <img src="{{ asset('assets/img/logo.png') }}" alt="Portal Siswa" class="h-6 w-auto" />
                <span class="hidden text-sm font-semibold text-white sm:inline">Portal Siswa Simulasi</span>
            </a>
            <span class="cat-tag hidden sm:inline-flex">Cyber Lab Zone</span>
            <span class="cat-tag border-cat-green/30 bg-cat-green/10 text-cat-green">Sandbox Mode Active</span>
        </div>

        <div class="flex items-center gap-4">
            <button type="button" class="relative text-cat-muted hover:text-white" aria-label="Notifikasi">
                <x-icon name="bell" class="size-5" />
                <span class="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-cat-cyan"></span>
            </button>
            <div class="hidden text-right leading-tight sm:block">
                <p class="text-xs font-semibold text-white">{{ $student['name'] }}</p>
                <p class="font-mono text-[10px] text-cat-muted">NIM. {{ $student['nim'] }}</p>
            </div>
        </div>
    </div>
</header>
