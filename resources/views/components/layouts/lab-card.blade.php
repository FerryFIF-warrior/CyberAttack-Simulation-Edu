@props(['lab'])
<article style="background:#162030;border:3px solid #233044;border-radius:28px;box-shadow:0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08);overflow:hidden" class="group transition">
    <div class="h-36" style="background:linear-gradient(135deg, rgba(0,229,255,0.14), #0f1828 60%, #070b14)">
        @if (file_exists(public_path('images/labs/'.$lab['slug'].'.jpg')))
            <img src="{{ asset('images/labs/'.$lab['slug'].'.jpg') }}" alt="{{ $lab['lab_name'] }}" class="h-full w-full object-cover opacity-50">
        @endif
    </div>
    <div class="space-y-3 p-5">
        <p style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.12em;color:#00e5ff;text-transform:uppercase">{{ $lab['vector'] }}</p>
        <h3 class="text-lg font-extrabold text-white" style="font-family:'Nunito',sans-serif">{{ $lab['lab_name'] }}</h3>
        <p class="text-sm leading-relaxed" style="color:#8b98ab">{{ $lab['lab_summary'] }}</p>
        <p style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#34d399">Safe dummy simulation · No real targets</p>
        <a href="{{ route('simulasi.detail', ['simulation' => $lab['slug']]) }}" class="inline-flex w-full items-center justify-between px-4 py-2.5 rounded-full text-sm font-extrabold text-white" style="background:#0f1828;border:2px solid rgba(255,255,255,0.07);box-shadow:inset 0 1px 0 rgba(255,255,255,0.05);font-family:'Nunito',sans-serif">{{ $lab['lab_cta'] }} <x-icon name="arrow-right" /></a>
    </div>
</article>
