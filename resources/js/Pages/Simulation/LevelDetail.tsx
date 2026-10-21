import { Head, Link } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { Card } from "@/shared/components/Card";
import { hasFloorContent } from "@/features/simulation/data/registry";
import { HowToPlayModal, hasSeenHowToPlay, markHowToPlaySeen } from "@/features/simulation/components/HowToPlayModal";
import type { LabMeta } from "@/features/simulation/types/simulation";

interface LevelDetailProps {
  simulationId: string;
  level: number;
  maxScore: number;
  unlocked: boolean;
  completed: boolean;
  levelScore?: number;
  unlockThreshold: number;
  lab: LabMeta;
  floors: { floorNumber: number; title: string; completed: boolean; playable: boolean; bestPoints?: number; maxPoints: number }[];
}

function FloorNode({ floor, simulationId, level, isLast }: { floor: LevelDetailProps["floors"][number]; simulationId: string; level: number; isLast: boolean }) {
  const hasContent = hasFloorContent(simulationId, level, floor.floorNumber);
  const state: "done" | "ready" | "locked" | "soon" = floor.completed
    ? "done"
    : !hasContent
      ? "soon"
      : floor.playable
        ? "ready"
        : "locked";
  return (
    <div className="relative flex gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center w-full">
      {/* dot on spine */}
      <div className="relative shrink-0 flex flex-col items-center sm:items-center">
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 transition
          ${state==="done" ? "bg-[#34d399]/15 border-[#34d399] text-[#34d399] shadow-[0_4px_0_rgba(52,211,153,0.2),0_12px_24px_rgba(0,0,0,0.3)]" : state==="ready" ? "bg-[#00e5ff]/10 border-[#00e5ff] text-[#00e5ff] shadow-[0_4px_0_rgba(0,229,255,0.18),0_12px_24px_rgba(0,0,0,0.3)] animate-[pulse_2.5s_ease-in-out_infinite]" : "bg-clay-inset border-clay-line text-[#8b98ab]"}`}>
          {state==="done" ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          ) : state==="locked" || state==="soon" ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11V9a2 2 0 10-2 2v2" /><rect x="7" y="11" width="10" height="8" rx="1.5" /></svg>
          ) : (
            <span>{floor.floorNumber}</span>
          )}
        </div>
        {/* vertical connector down on mobile, hidden on desktop */}
        {!isLast && <div className={`sm:hidden w-px flex-1 min-h-[28px] mt-2 ${state==="done" ? "bg-[#34d399]/50" : "bg-[#233044]"} ${state!=="done" ? "border-l border-dashed border-[#233044]/60 bg-transparent" : ""}`} style={state==="done" ? { background: "repeating-linear-gradient(to bottom, #34d399 0 6px, transparent 6px 10px)" } : undefined} />}
      </div>

      {/* card */}
      <div className={`flex-1 min-w-0 sm:w-full sm:max-w-[200px] p-4 sm:p-4 text-left sm:text-center transition
        ${state==="done" ? "bg-clay-surface border-[#34d399]/20" : state==="ready" ? "bg-clay-surface border-[#00e5ff]/30 shadow-[0_10px_22px_rgba(0,0,0,0.35)]" : "bg-clay-inset/60 border-clay-line opacity-75"}`}>
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8b98ab]">FLOOR {String(floor.floorNumber).padStart(2,"0")}</p>
        <h3 className="text-[13px] sm:text-[13px] font-semibold leading-snug text-white mt-1 line-clamp-2 min-h-[36px]">{floor.title}</h3>
        <div className="mt-2 flex flex-wrap sm:justify-center gap-1.5">
          {state==="done" && <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-full bg-[#34d399]/15 border border-[#34d399]/20 text-[#34d399]"><span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" /> {floor.bestPoints}/{floor.maxPoints}</span>}
          {state==="ready" && <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff]">TERBUKA</span>}
          {state==="locked" && <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-full bg-clay-inset border border-clay-line text-[#8b98ab]">TERKUNCI</span>}
          {state==="soon" && <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-full bg-clay-inset border border-clay-line text-[#8b98ab]">SEGERA HADIR</span>}
        </div>
        <div className="mt-3">
          {state==="done" || state==="ready" ? (
            <Link href={`/simulasi/${simulationId}/level/${level}/floor/${floor.floorNumber}`} className={`inline-flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition ${state==="done" ? "bg-clay-inset border border-clay-line text-slate-200 hover:border-[#00e5ff]/20" : "bg-[#ffd23a] text-[#1a1400] hover:brightness-110 border border-[#e6b800] shadow-[0_4px_0_#e6b800] shadow-[0_0_14px_rgba(0,229,255,0.2)]"}`}>
              {state==="done" ? "Ulangi" : "Masuk"} <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          ) : state==="soon" ? (
            <span className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold bg-clay-inset border border-clay-line text-[#8b98ab]">Segera Hadir</span>
          ) : (
            <span className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold bg-clay-inset border border-clay-line text-[#8b98ab]">Terkunci</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LevelDetail({ simulationId, level, maxScore, unlocked, completed, levelScore, unlockThreshold, lab: meta, floors }: LevelDetailProps) {
  const [howToOpen, setHowToOpen] = useState(() => level === 1 && !hasSeenHowToPlay(simulationId));
  const closeHowToPlay = useCallback(() => {
    setHowToOpen(false);
    markHowToPlaySeen(simulationId);
  }, [simulationId]);

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-clay-bg flex items-center justify-center p-4 sm:p-6">
        <Head title={`Level ${level} Terkunci`} />
        <Card className="max-w-md w-full text-center !p-8">
          <div className="w-12 h-12 rounded-full bg-clay-inset border border-clay-line flex items-center justify-center mx-auto text-[#8b98ab] mb-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11V9a2 2 0 10-2 2v2" /><rect x="7" y="11" width="10" height="8" rx="1.5" /></svg></div>
          <h1 className="text-xl font-bold text-white">Level {level} terkunci</h1>
          <p className="text-sm text-[#8b98ab] mt-2 leading-6">Selesaikan level sebelumnya dengan skor minimal {unlockThreshold} untuk membuka peta ini.</p>
          <Link href={`/simulasi/${simulationId}`} className="mt-6 inline-flex px-5 py-2.5 rounded-lg bg-[#ffd23a] text-[#1a1400] font-semibold text-sm hover:brightness-110">Kembali</Link>
        </Card>
      </div>
    );
  }
  const doneCount = floors.filter(f=>f.completed).length;
  const progress = floors.length ? Math.round((doneCount/floors.length)*100) : 0;
  return (
    <div className="min-h-screen bg-clay-bg relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize:"24px 24px" }} />
      <div className="pointer-events-none absolute -top-28 -right-28 w-[520px] h-[520px] rounded-full blur-[90px] opacity-[0.06] bg-[#ffd23a]" />
      <Head title={`${meta.name} — Level ${level}`} />
      <style>{`@keyframes breachWarp { from { opacity:0; transform: translateY(14px) scale(0.985) } to { opacity:1; transform: none } }
@keyframes floorPop { from { opacity:0; transform: translateY(10px) scale(0.97) } to { opacity:1; transform: none } }
@keyframes scanLine { 0% { transform: translateX(-100%) } 100% { transform: translateX(220%) } }
@media (prefers-reduced-motion: reduce) { [style*="breachWarp"], [style*="floorPop"], [style*="scanLine"] { animation:none !important; opacity:1 !important; transform:none !important } }
`}</style>
      <div className="relative max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <Link href={`/simulasi/${simulationId}`} className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#8b98ab] hover:text-white transition mb-5 sm:mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> Kembali ke {meta.name}
        </Link>

        {/* header — breach enter */}
        <div data-anim="header" style={{ animation: "breachWarp 560ms cubic-bezier(0.16,1,0.3,1) both" }}><div className="rounded-2xl border border-clay-line bg-clay-surface overflow-hidden">
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 rounded bg-clay-inset border border-clay-line text-[#8b98ab]">{meta.code} · {meta.vector}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff]">LEVEL {String(level).padStart(2,"0")}</span>
              {completed && <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-[#34d399]/15 border border-[#34d399]/20 text-[#34d399]">SELESAI</span>}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h1 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-white leading-tight">Peta Level {level} <span className="text-[#8b98ab] font-normal text-[14px] sm:text-[15px]">— {floors.length} floor</span></h1>
                <p className="font-mono text-[11px] text-[#8b98ab] mt-1">{meta.lab} · {meta.name}</p>
                <p className="text-[13px] leading-6 text-[#8b98ab] mt-2 max-w-[560px]">Jelajahi floor berurutan. Dekati objek di peta, jawab skenario, skor 4/1/-2 per floor. Lanjutkan ke floor berikutnya setelah memilih.</p>
              </div>
              <div className="shrink-0 rounded-xl border border-clay-line bg-clay-inset px-4 py-3 sm:min-w-[180px]">
                <p className="font-mono text-[10px] tracking-widest uppercase text-[#8b98ab]">SKOR LEVEL</p>
                <p className="text-[20px] font-bold text-white leading-none mt-1">{levelScore ?? 0} <span className="text-[#8b98ab] font-normal text-sm">/ {maxScore}</span></p>
                <div className="mt-3 h-1.5 w-full bg-clay-surface rounded-full overflow-hidden border border-clay-line"><div className="h-full bg-[#ffd23a] rounded-full transition-all duration-700" style={{ width:`${Math.min(100, Math.max(0, maxScore? ((levelScore??0)/maxScore)*100 : 0))}%` }} /></div>
                <p className="font-mono text-[10px] text-[#8b98ab] mt-2">{doneCount}/{floors.length} floor selesai · {progress}%</p>
              </div>
            </div>
          </div>
        </div></div>

        {/* LEGEND — 140ms */}
        <div data-anim="legend" style={{ animation: "breachWarp 520ms cubic-bezier(0.16,1,0.3,1) 140ms both" }}><div className="mt-4 sm:mt-5 flex flex-wrap gap-2 font-mono text-[10px] tracking-wide text-[#8b98ab]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-clay-surface border border-clay-line"><span className="w-2 h-2 rounded-full bg-[#34d399]" /> Selesai</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-clay-surface border border-clay-line"><span className="w-2 h-2 rounded-full bg-[#ffd23a] animate-pulse" /> Terbuka</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-clay-surface border border-clay-line"><span className="w-2 h-2 rounded-full bg-[#233044]" /> Terkunci</span>
          <span className="ml-auto hidden sm:inline text-[10px] tracking-widest uppercase opacity-60">HP: geser vertikal · Laptop: jalur horizontal</span>
        </div></div>

        {/* PETA — 220ms + scan */}
        <div data-anim="map" style={{ animation: "breachWarp 560ms cubic-bezier(0.16,1,0.3,1) 220ms both" }}><div className="mt-4 sm:mt-5 rounded-2xl border border-clay-line bg-clay-surface p-4 sm:p-6 lg:p-7 overflow-hidden relative">
          {/* spine line */}
          <div className="hidden sm:block absolute left-6 right-6 top-[38px] h-px border-t border-dashed border-[#233044]/60" aria-hidden="true" />
          <div className="sm:hidden absolute left-[20px] sm:left-6 top-6 bottom-6 w-px border-l border-dashed border-[#233044]/50" aria-hidden="true" />

          {/* mobile vertical stack */}
          <div className="flex flex-col gap-0 sm:hidden">
            {floors.map((f, i)=> <div key={f.floorNumber} style={{ animation: "floorPop 460ms cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${280 + i*70}ms` }}><FloorNode floor={f} simulationId={simulationId} level={level} isLast={i===floors.length-1} /></div>)}
          </div>
          {/* desktop horizontal road */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-3 lg:gap-4 relative">
            {floors.map((f, i)=> (
              <div key={f.floorNumber} className="relative">
                {/* horizontal connector between dots */}
                {i < floors.length-1 && <div className={`hidden sm:block absolute top-[22px] -right-[8px] w-[16px] lg:w-[20px] h-px border-t border-dashed ${f.completed ? "border-[#34d399]/60" : "border-[#233044]/50"}`} aria-hidden="true" />}
                <FloorNode floor={f} simulationId={simulationId} level={level} isLast={i===floors.length-1} />
              </div>
            ))}
          </div>

          <p className="sm:hidden mt-4 text-center font-mono text-[10px] tracking-wide text-[#8b98ab]/60">Ketuk Masuk untuk buka simulasi floor. Urutan terkunci sampai floor sebelumnya selesai.</p>
        </div></div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center" style={{ animation: "breachWarp 520ms cubic-bezier(0.16,1,0.3,1) 340ms both" }}>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link href={`/simulasi/${simulationId}`} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-clay-inset border border-clay-line text-slate-200 font-medium text-sm hover:border-[#00e5ff]/20">← Daftar level</Link>
            <button
              type="button"
              onClick={() => setHowToOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-clay-inset border border-clay-line text-slate-200 font-medium text-sm hover:border-[#00e5ff]/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" strokeWidth={1.8} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.6 9.2a2.5 2.5 0 1 1 3.4 2.4c-.7.3-1 .8-1 1.6" /><circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" /></svg>
              Cara Bermain
            </button>
          </div>
          {floors.filter(f=>f.playable && !f.completed && hasFloorContent(simulationId, level, f.floorNumber)).length > 0 && (
            <Link href={`/simulasi/${simulationId}/level/${level}/floor/${floors.find(f=>f.playable && !f.completed && hasFloorContent(simulationId, level, f.floorNumber))!.floorNumber}`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffd23a] text-[#1a1400] font-semibold text-sm hover:brightness-110 shadow-[0_0_18px_rgba(0,229,255,0.18)]">
              Lanjut floor berikutnya <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          )}
        </div>

        <HowToPlayModal open={howToOpen} onClose={closeHowToPlay} />
      </div>
    </div>
  );
}
