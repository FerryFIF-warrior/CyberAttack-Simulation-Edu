import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

type SimStatus = "not_started" | "in_progress" | "completed";
interface SimProgressItem { id: string; completionPercent: number; totalScore: number; maxScore: number; completedLevels: number; totalLevels: number; completedFloors: number; totalFloors: number; status: SimStatus; earnedBadges: string[]; }
interface SimulationsIndexProps { phishingProgress: { completionPercent: number; totalScore: number; maxScore: number; earnedBadges: string[] } | null; simulations?: SimProgressItem[]; }

const sims = [
  { id: "phishing", name: "Phishing", lab: "Phishing Detection Lab", vector: "SOCIAL ENGINEERING", code: "01", coord: "ALFA_CRUCIS", pos: { t: "18%", l: "44%" }, desc: "Email spoofed, URL palsu & lampiran menjebak — asah insting sebelum klik.", href: "/simulasi/phishing", accent: "#22d3ee", accent2: "#0891b2", glow: "rgba(34,211,238,0.32)", iconBg: "rgba(34,211,238,0.12)", Icon: (q:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>), ready: true },
  { id: "bruteforce", name: "Brute Force", lab: "Brute Force Defense Lab", vector: "AUTHENTICATION", code: "02", coord: "BETA_CRUCIS", pos: { t: "42%", l: "22%" }, desc: "Burst login & log telemetry — susun rate limit & lockout yang benar.", href: "/simulasi/bruteforce", accent: "#f59e0b", accent2: "#b45309", glow: "rgba(245,158,11,0.30)", iconBg: "rgba(245,158,11,0.13)", Icon: (q:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><rect x="3" y="11" width="18" height="11" rx={2.6}/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx={12} cy={16} r={1.25}/></svg>), ready: true },
  { id: "sqli", name: "SQL Injection", lab: "SQL Injection Analysis Lab", vector: "QUERY INJECTION", code: "03", coord: "GAMMA_CRUCIS", pos: { t: "40%", l: "66%" }, desc: "Input tanpa sanitasi & error DB dummy — praktikkan prepared statement.", href: "/simulasi/sqli", accent: "#a78bfa", accent2: "#7c3aed", glow: "rgba(167,139,250,0.32)", iconBg: "rgba(167,139,250,0.12)", Icon: (q:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><ellipse cx={12} cy={5} rx={7} ry={3}/><path d="M5 5v8c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 13v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>), ready: false },
  { id: "auth", name: "Authentication", lab: "Authentication Defense Lab", vector: "IDENTITY", code: "04", coord: "DELTA_CRUCIS", pos: { t: "62%", l: "42%" }, desc: "Credential stuffing & MFA hardening — kunci sesi di sandbox.", href: "/simulasi/auth", accent: "#34d399", accent2: "#059669", glow: "rgba(52,211,153,0.28)", iconBg: "rgba(52,211,153,0.11)", Icon: (q:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><circle cx={12} cy={7} r={4}/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>), ready: false },
] as const;

function MapRing({ value, accent, size = 52 }: { value: number; accent: string; size?: number }) {
  const sw = 4, r = (size - sw) / 2, c = 2 * Math.PI * r, off = c * (1 - value / 100);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -6px 14px rgba(0,0,0,0.32)" }} />
      <svg width={size} height={size} className="relative block" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={accent} strokeWidth={sw} strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 7px ${accent}aa)`, transition: "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)" }} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-extrabold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif", fontSize: size * 0.22 }}>{Math.round(value)}%</span>
    </div>
  );
}
function MapBar({ value, accent, accent2 }: { value: number; accent: string; accent2: string }) {
  return (
    <div className="w-full rounded-full p-[2px]" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
      <div className="h-[8px] rounded-full relative overflow-hidden" style={{ width: value + "%", background: `linear-gradient(90deg, ${accent} 0%, ${accent2} 100%)`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.38), 0 0 12px ${accent}66`, transition: "width 900ms cubic-bezier(0.16,1,0.3,1)" }}>
        <span className="absolute inset-x-1 top-[1px] h-[2.5px] rounded-full bg-white/35" />
      </div>
    </div>
  );
}
function statusTheme(status: SimStatus, fallbackAccent: string, fallbackDark: string, fallbackGlow: string) {
  if (status === "completed") return { accent: "#22c55e", accentDark: "#16a34a", glow: "rgba(34,197,94,0.28)", label: "SELESAI", dot: "●" };
  if (status === "in_progress") return { accent: "#facc15", accentDark: "#ca8a04", glow: "rgba(250,204,21,0.26)", label: "PROGRES", dot: "◐" };
  return { accent: fallbackAccent, accentDark: fallbackDark, glow: fallbackGlow, label: "STANDBY", dot: "○" };
}

export default function SimulationsIndex({ phishingProgress, simulations }: SimulationsIndexProps) {
  const progress = phishingProgress ?? { completionPercent: 0, totalScore: 0, maxScore: 100, earnedBadges: [] as string[] };
  const progMap = new Map<string, SimProgressItem>(); if (simulations) simulations.forEach(s => progMap.set(s.id, s));
  const getStatus = (id: string): SimStatus => { const p = progMap.get(id); if (p) return p.status; if (id === "phishing") { if (progress.completionPercent >= 100) return "completed"; if (progress.completionPercent > 0 || progress.totalScore > 0) return "in_progress"; return "not_started"; } return "not_started"; };
  const getProg = (id: string) => { const p = progMap.get(id); if (p) return { pct: p.completionPercent, score: p.totalScore, max: p.maxScore, cl: p.completedLevels, tl: p.totalLevels }; if (id === "phishing") return { pct: progress.completionPercent, score: progress.totalScore, max: progress.maxScore, cl: 0, tl: 5 }; return { pct: 0, score: 0, max: 100, cl: 0, tl: 5 }; };
  const hasBeginner = progress.earnedBadges.includes("beginner"); const hasSuhu = progress.earnedBadges.includes("suhu");
  const [selected, setSelected] = useState<string>(() => sims[0].id);
  const [inspectorKey, setInspectorKey] = useState(0);
  const [pageEnter, setPageEnter] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const simById = Object.fromEntries(sims.map(s => [s.id, s])) as Record<string, typeof sims[number]>;
  const sel = simById[selected];
  const selProg = getProg(selected);
  const selStatus = getStatus(selected);
  const selTheme = statusTheme(selStatus, sel.accent, sel.accent2, sel.glow);

  const [cruxLive, setCruxLive] = useState(false);
  const [cruxKey, setCruxKey] = useState(0);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => { const t = window.setTimeout(() => { setPageEnter(true); setCruxLive(true); }, 40); return () => window.clearTimeout(t); }, []);
  useEffect(() => {
    const el = bottomSentinelRef.current; if (!el) return;
    let fired = false;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !fired) { fired = true; setCruxKey((k) => k + 1); setCruxLive(false); requestAnimationFrame(() => requestAnimationFrame(() => setCruxLive(true))); }
    }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = mapRef.current; if (!el) return;
      const r = el.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      setParallax({ x: (e.clientX - cx) / r.width, y: (e.clientY - cy) / r.height });
    };
    window.addEventListener("mousemove", onMove); return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const selectNode = (id: string) => {
    if (id === selected) return;
    setSelected(id); setInspectorKey(k => k + 1);
  };

  const glass: React.CSSProperties = { background: "rgba(14,20,36,0.72)", backdropFilter: "blur(18px) saturate(1.12)", WebkitBackdropFilter: "blur(18px) saturate(1.12)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 44px -16px rgba(0,0,0,0.62), 0 10px 20px -10px rgba(0,0,0,0.44), inset 0 1px 0 rgba(255,255,255,0.07)" };
  const glassInset: React.CSSProperties = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -8px 16px rgba(0,0,0,0.26)" };

  return (
    <div className="min-h-screen text-white relative overflow-hidden selection:bg-white/20" style={{ background: "#060A14" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Geist+Mono:wght@400;500;600&display=swap');
@keyframes nodeIn { from { opacity:0; transform: scale(0.72) translateY(14px) } to { opacity:1; transform: scale(1) translateY(0) } }
@keyframes inspectorIn { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
@keyframes frameIn { from { opacity:0; transform: scale(0.985); clip-path: inset(6% 6% 6% 6% round 24px) } to { opacity:1; transform: scale(1); clip-path: inset(0 0 0 0 round 24px) } }
@keyframes contentIn { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
@keyframes saberDraw { from { stroke-dashoffset: 540 } to { stroke-dashoffset: 0 } }
@keyframes cruxDraw { from { stroke-dashoffset: 520 } to { stroke-dashoffset: 0 } }
@keyframes pulseRing { 0%,100% { transform: scale(1); opacity:0.42 } 50% { transform: scale(1.22); opacity:0.10 } }
@keyframes scanV { 0% { transform: translateY(-100%) } 100% { transform: translateY(260%) } }
@keyframes hudBlink { 0%,42%,100%{opacity:1} 48%{opacity:0.28} }
@keyframes starTwinkle { 0%,100% { opacity:1; transform: scale(1) } 50% { opacity:0.62; transform: scale(0.92) } }
@keyframes cruxGlow { 0%,100% { opacity:0.95 } 50% { opacity:0.55 } }
@media (prefers-reduced-motion: reduce) { [style*="nodeIn"], [style*="routeDraw"], [style*="pulseRing"], [style*="scanV"], [style*="frameIn"], [style*="contentIn"], [style*="saberDraw"] { animation:none !important; opacity:1 !important; transform:none !important } }
`}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(900px 560px at 18% 6%, rgba(34,211,238,0.13) 0%, transparent 62%), radial-gradient(820px 520px at 88% 16%, rgba(167,139,250,0.12) 0%, transparent 60%), radial-gradient(860px 680px at 50% 110%, rgba(245,158,11,0.07) 0%, transparent 58%), linear-gradient(180deg, #080D1E 0%, #060A14 55%, #050914 100%)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(900px 600px at 50% 18%, black 38%, transparent 76%)" }} />
        <div className="absolute -top-28 -left-28 w-[520px] h-[520px] rounded-full blur-[1px]" style={{ background: "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0.06) 38%, transparent 70%)", opacity: 0.85 }} />
        <div className="absolute -bottom-40 -right-32 w-[620px] h-[620px] rounded-full blur-[1px]" style={{ background: "radial-gradient(circle at 40% 40%, rgba(167,139,250,0.16) 0%, rgba(167,139,250,0.05) 42%, transparent 72%)", opacity: 0.8 }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(1100px 700px at 50% 12%, transparent 44%, rgba(0,0,0,0.52) 100%)" }} />
      </div>

      <Head title="Simulasi Keamanan — Cyber Map" />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0 rounded-[22px] px-5 sm:px-6 py-5 relative overflow-hidden" style={glass}>
            <div className="absolute inset-0 rounded-[22px] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%)" }} />
            <div className="relative flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.14em]" style={{ fontFamily: "'Geist Mono',monospace", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.80)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#34d399", boxShadow: "0 0 12px rgba(52,211,153,0.9)", animation: "hudBlink 2.2s ease-in-out infinite" }} /> CYBER_MAP // TACTICAL
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.12em]" style={{ fontFamily: "'Geist Mono',monospace", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.44)" }}>04 NODES · GRID 12×8 · ROUTE MESH</span>
              <span className="ml-auto hidden lg:inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em]" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.30)" }}><span className="w-1.5 h-1.5 rounded-full bg-white/30" /> hover parallax · click node to inspect</span>
            </div>
            <h1 className="relative mt-3 leading-[0.88] tracking-[-0.03em]" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>
              <span className="block text-[30px] sm:text-[42px] font-extrabold text-white">Peta taktis</span>
              <span className="block text-[30px] sm:text-[42px] font-extrabold" style={{ background: "linear-gradient(90deg, #22d3ee 0%, #a78bfa 52%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>latihan siber</span>
            </h1>
            <p className="relative mt-2.5 text-[13px] sm:text-[13.5px] leading-6 max-w-[620px]" style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.48)" }}>
              4 simulasi = 4 bintang. Lightsaber menghubungkan rasi Gubuk Penceng.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-[340px] rounded-[22px] p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden" style={glass}>
            <div className="absolute inset-0 rounded-[22px] pointer-events-none opacity-60" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 52%)" }} />
            <div className="relative flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-[0.14em]" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.42)" }}>SYSTEM STATUS</span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#34d399", boxShadow: "0 0 12px rgba(52,211,153,0.95), inset 0 1px 0 rgba(255,255,255,0.6)" }} />
            </div>
            <div className="relative flex items-center gap-4">
              <MapRing value={progress.completionPercent} accent="#22d3ee" size={62} />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-[0.14em]" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.44)" }}>PHISHING PROGRESS</p>
                <p className="leading-none mt-1" style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}><span className="text-[21px] font-extrabold">{progress.totalScore}</span><span className="text-white/25 mx-1">/</span><span className="text-[14px] font-bold text-white/55">{progress.maxScore}</span></p>
                <p className="text-[11px] font-bold mt-1" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.42)" }}>{progress.completionPercent}% · {progMap.get("phishing")?.completedLevels ?? 0}/5 level</p>
              </div>
            </div>
            <MapBar value={progress.completionPercent} accent="#22d3ee" accent2="#0891b2" />
            <div className="relative flex gap-2">
              <span className="flex-1 text-center px-2 py-1.5 rounded-full text-[11px] font-extrabold" style={{ fontFamily: "'Nunito',sans-serif", background: hasBeginner ? "rgba(34,211,238,0.16)" : "rgba(255,255,255,0.06)", color: hasBeginner ? "#22d3ee" : "rgba(255,255,255,0.32)", border: `1px solid ${hasBeginner ? "rgba(34,211,238,0.22)" : "rgba(255,255,255,0.07)"}`, boxShadow: hasBeginner ? "0 0 16px rgba(34,211,238,0.18)" : "none" }}>Beginner</span>
              <span className="flex-1 text-center px-2 py-1.5 rounded-full text-[11px] font-extrabold" style={{ fontFamily: "'Nunito',sans-serif", background: hasSuhu ? "rgba(245,158,11,0.16)" : "rgba(255,255,255,0.06)", color: hasSuhu ? "#fbbf24" : "rgba(255,255,255,0.32)", border: `1px solid ${hasSuhu ? "rgba(245,158,11,0.22)" : "rgba(255,255,255,0.07)"}`, boxShadow: hasSuhu ? "0 0 16px rgba(245,158,11,0.16)" : "none" }}>Suhu</span>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5">
          <div ref={mapRef} className="xl:col-span-8 rounded-[24px] relative" style={{ ...glass, minHeight: "620px", padding: 0, overflow: "visible" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 36%)" }} />
            <div className="absolute top-0 left-5 right-5 h-[1.5px] rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.55), rgba(167,139,250,0.45), transparent)", opacity: 0.9 }} />
            <div aria-hidden className="absolute left-2 right-2 top-2 h-[1px] opacity-30" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 14px)" }} />
            <div aria-hidden className="absolute left-2 right-2 bottom-2 h-[1px] opacity-20" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 6px, transparent 6px 14px)" }} />

            <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[9px] font-semibold tracking-[0.14em]" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.28)" }}>
              <span>GRID 12×8 · SCALE 1:2400</span>
              <span className="hidden sm:inline">ROUTE MESH · TACTICAL LAYER 03</span>
              <span>LAT 07°14′ · LON 111°31′</span>
            </div>
            <div className="absolute left-3 top-8 bottom-8 w-[1px] opacity-18 hidden sm:block" style={{ background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 14px)" }} aria-hidden />
            <div className="absolute right-3 top-8 bottom-8 w-[1px] opacity-18 hidden sm:block" style={{ background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 14px)" }} aria-hidden />

            <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.06)" }} />
            <div className="absolute left-3 top-3 w-5 h-5 pointer-events-none" style={{ borderLeft: "1.5px solid rgba(255,255,255,0.18)", borderTop: "1.5px solid rgba(255,255,255,0.18)", borderTopLeftRadius: 8 }} />
            <div className="absolute right-3 top-3 w-5 h-5 pointer-events-none" style={{ borderRight: "1.5px solid rgba(255,255,255,0.18)", borderTop: "1.5px solid rgba(255,255,255,0.18)", borderTopRightRadius: 8 }} />
            <div className="absolute left-3 bottom-3 w-5 h-5 pointer-events-none" style={{ borderLeft: "1.5px solid rgba(255,255,255,0.18)", borderBottom: "1.5px solid rgba(255,255,255,0.18)", borderBottomLeftRadius: 8 }} />
            <div className="absolute right-3 bottom-3 w-5 h-5 pointer-events-none" style={{ borderRight: "1.5px solid rgba(255,255,255,0.18)", borderBottom: "1.5px solid rgba(255,255,255,0.18)", borderBottomRightRadius: 8 }} />

            <div className="absolute inset-[14px] top-[28px] rounded-[18px] overflow-hidden pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "radial-gradient(700px 420px at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 62%)" }}>
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.9) 1px, transparent 1px)", backgroundSize: "112px 112px" }} />
              <div className="absolute inset-x-0 h-[36%] -top-[8%]" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)", animation: pageEnter ? "scanV 3.6s linear infinite" : "none", opacity: 0.55 }} />
            </div>

            <svg key={cruxKey} className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden style={{ opacity: pageEnter ? 1 : 0, transition: "opacity 520ms ease" }}>
              {/* GUBUK PENCENG — lightsaber kite, semua sisi 2000ms SERENTAK */}
              <defs>
                <linearGradient id="saberCore" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="white" stopOpacity="1"/><stop offset="100%" stopColor="white" stopOpacity="1"/></linearGradient>
                <linearGradient id="saberCyan" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#60e7ff"/></linearGradient>
                <filter id="saberGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="0.55" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#saberGlow)">
                {/* outer bloom 2000ms serentak */}
                <path d="M 44 18 L 22 42" stroke="rgba(96,231,255,0.22)" strokeWidth="0.95" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.16,1,0.3,1) 80ms both" : "none" }} />
                <path d="M 22 42 L 42 62" stroke="rgba(96,231,255,0.22)" strokeWidth="0.95" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.16,1,0.3,1) 80ms both" : "none" }} />
                <path d="M 42 62 L 66 40" stroke="rgba(96,231,255,0.22)" strokeWidth="0.95" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.16,1,0.3,1) 80ms both" : "none" }} />
                <path d="M 66 40 L 44 18" stroke="rgba(96,231,255,0.22)" strokeWidth="0.95" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.16,1,0.3,1) 80ms both" : "none" }} />
                {/* core putih — lightsaber */}
                <path d="M 44 18 L 22 42" stroke="white" strokeWidth="0.42" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.22,1,0.36,1) 80ms both" : "none" }} />
                <path d="M 22 42 L 42 62" stroke="white" strokeWidth="0.42" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.22,1,0.36,1) 80ms both" : "none" }} />
                <path d="M 42 62 L 66 40" stroke="white" strokeWidth="0.42" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.22,1,0.36,1) 80ms both" : "none" }} />
                <path d="M 66 40 L 44 18" stroke="white" strokeWidth="0.42" strokeDasharray="540" strokeDashoffset={cruxLive ? 0 : 540} style={{ animation: cruxLive ? "saberDraw 2000ms cubic-bezier(0.22,1,0.36,1) 80ms both" : "none" }} />
              </g>
              {/* bintang = node simulasi sendiri di bawah — tidak render titik ganda */}
            </svg>

            <div className="relative w-full h-[620px] sm:h-[620px]">
              {sims.map((s, idx) => {
                const prog = getProg(s.id); const status = getStatus(s.id); const theme = statusTheme(status, s.accent, s.accent2, s.glow);
                const isSel = s.id === selected;
                const drift = parallax.x * (1.1 - idx * 0.18); const driftY = parallax.y * (0.9 - idx * 0.14);
                return (
                  <div
                    key={s.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      top: s.pos.t, left: s.pos.l, right: "auto",
                      transform: `translateZ(0) translate(${drift}px, ${driftY}px)`,
                      opacity: pageEnter ? 1 : 0,
                      animation: pageEnter ? `nodeIn 560ms cubic-bezier(0.16,1,0.3,1) ${120 + idx * 110}ms both` : "none",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 68%)`, filter: "blur(6px)", opacity: isSel ? 0.95 : 0.55, transform: isSel ? "scale(1.08)" : "scale(1)", transition: "opacity 320ms, transform 320ms" }} />
                      <div className="absolute -inset-2 rounded-full pointer-events-none" style={{ border: `1px solid ${theme.accent}22`, animation: isSel ? "pulseRing 2.4s ease-in-out infinite" : "pulseRing 3.2s ease-in-out infinite", opacity: isSel ? 0.9 : 0.45 }} />

                      <button
                        type="button"
                        onClick={() => selectNode(s.id)}
                        aria-label={`Pilih ${s.name} di ${s.coord}`}
                        aria-pressed={isSel}
                        className="relative w-[72px] h-[72px] sm:w-[78px] sm:h-[78px] rounded-full grid place-items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                        style={{
                          background: `radial-gradient(140% 140% at 30% 20%, ${s.iconBg} 0%, rgba(18,24,42,0.96) 58%, rgba(10,14,28,0.98) 100%)`,
                          border: `1.5px solid ${isSel ? theme.accent : "rgba(255,255,255,0.09)"}`,
                          boxShadow: isSel ? `0 0 0 1px ${theme.accent}33 inset, 0 10px 24px rgba(0,0,0,0.42), 0 0 22px ${theme.glow}` : `0 8px 20px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 14px ${theme.glow}`,
                          color: theme.accent, transform: isSel ? "scale(1.04)" : "scale(1)",
                        }}
                      >
                        <div className="absolute inset-[1px] rounded-full pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.11) 0%, transparent 42%)" }} />
                        <s.Icon className="w-[28px] h-[28px] relative" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full grid place-items-center text-[10px] font-extrabold leading-none" style={{ background: isSel ? theme.accent : "rgba(255,255,255,0.08)", color: isSel ? "#0a0e15" : "rgba(255,255,255,0.72)", border: `1px solid ${isSel ? theme.accent : "rgba(255,255,255,0.10)"}`, boxShadow: isSel ? `0 0 10px ${theme.glow}` : "none", fontFamily: "'Geist Mono',monospace" }}>{s.code}</span>
                        {isSel && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }} />}
                      </button>

                      <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[8px] font-semibold tracking-[0.12em] whitespace-nowrap" style={{ fontFamily: "'Geist Mono',monospace", background: "rgba(8,12,24,0.88)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.48)", boxShadow: "0 4px 10px rgba(0,0,0,0.35)" }}>{s.coord}</span>
                    </div>

                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => selectNode(s.id)}
                      onKeyDown={e => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); selectNode(s.id); } }}
                      className={`mt-3 w-[148px] sm:w-[168px] rounded-[16px] px-3 py-3 text-center cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15 ${isSel ? "brightness-[1.06]" : "hover:brightness-[1.04]"}`}
                      style={{
                        background: isSel ? "rgba(18,24,42,0.88)" : "rgba(14,20,36,0.62)",
                        border: `1px solid ${isSel ? theme.accent + "2a" : "rgba(255,255,255,0.06)"}`,
                        boxShadow: isSel ? `0 12px 24px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 16px ${theme.glow}` : "0 8px 18px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
                        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                      }}
                    >
                      <p className="text-[12px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>{s.name}</p>
                      <p className="mt-0.5 text-[9px] font-semibold tracking-[0.10em] truncate" style={{ fontFamily: "'Geist Mono',monospace", color: isSel ? theme.accent : "rgba(255,255,255,0.38)" }}>{s.vector} · {s.coord}</p>
                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 8px ${theme.accent}` }} />
                        <span className="text-[10px] font-bold tracking-wide" style={{ fontFamily: "'Geist Mono',monospace", color: theme.accent }}>{theme.label}</span>
                        <span className="text-[10px] font-medium" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.32)" }}>· {prog.pct}%</span>
                      </div>
                      <div className="mt-2"><MapBar value={prog.pct} accent={theme.accent} accent2={theme.accentDark} /></div>
                      <p className="mt-1.5 text-[10px] font-medium" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.32)" }}>{prog.cl}/{prog.tl} level · {prog.score}/{prog.max}</p>
                    </div>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex flex-col items-center gap-1 opacity-[0.07]">
                <div className="w-[88px] h-[88px] rounded-full border border-white/40" style={{ borderStyle: "dashed" }} />
                <div className="w-[54px] h-[54px] rounded-full border border-white/30 -mt-6" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 -mt-1" />
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[9px] font-medium whitespace-nowrap px-2.5 py-1 rounded-full" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}><span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.55)" }} /> GUBUK PENCENG · 4 NODE · SERENTAK 2000ms</div>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-4 min-h-0">
            <div key={`inspector-${selected}-${inspectorKey}`} className="rounded-[24px] p-6 sm:p-7 relative overflow-hidden flex flex-col" style={{ ...glass, borderColor: `${selTheme.accent}1f`, boxShadow: `0 24px 44px -16px rgba(0,0,0,0.60), 0 10px 20px -10px rgba(0,0,0,0.44), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 22px ${selTheme.glow}`, animation: "frameIn 380ms cubic-bezier(0.16,1,0.3,1) both" }}>
              <div className="absolute top-0 left-5 right-5 h-[1.5px] rounded-full" style={{ background: selTheme.accent, boxShadow: `0 0 12px ${selTheme.accent}88`, opacity: 0.95 }} />
              <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 38%)" }} />
              <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-20" style={{ background: `radial-gradient(circle, ${selTheme.accent} 0%, transparent 68%)` }} />

              <div className="relative flex items-start gap-3" style={{ animation: "contentIn 360ms cubic-bezier(0.16,1,0.3,1) 220ms both" }}>
                <div className="w-[52px] h-[52px] rounded-[14px] grid place-items-center shrink-0 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${sel.iconBg} 0%, rgba(255,255,255,0.02) 100%)`, border: `1px solid ${selTheme.accent}22`, boxShadow: `0 10px 20px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.06)`, color: selTheme.accent }}>
                  <div className="absolute inset-0 rounded-[14px] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 44%)" }} />
                  <sel.Icon className="w-[24px] h-[24px] relative" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em]" style={{ fontFamily: "'Geist Mono',monospace", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.60)" }}>MODUL {sel.code}</span>
                    <span className="px-2 py-1 rounded-full text-[10px] font-semibold tracking-[0.10em]" style={{ fontFamily: "'Geist Mono',monospace", background: selTheme.accent === "#6b7280" ? "rgba(255,255,255,0.06)" : `${selTheme.accent}18`, border: `1px solid ${selTheme.accent}22`, color: selTheme.accent }}>{sel.vector}</span>
                  </div>
                  <h2 className="mt-1.5 text-[20px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>{sel.name}</h2>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em] shrink-0" style={{ fontFamily: "'Geist Mono',monospace", background: `${selTheme.accent}14`, border: `1px solid ${selTheme.accent}20`, color: selTheme.accent }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: selTheme.accent, boxShadow: `0 0 8px ${selTheme.accent}` }} /> {selTheme.label}
                </span>
              </div>

              <p className="relative mt-4 text-[13px] leading-7" style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.54)", animation: "contentIn 360ms cubic-bezier(0.16,1,0.3,1) 280ms both" } as any}>{sel.desc}</p>

              <div className="relative mt-4 rounded-[18px] p-4 flex items-center gap-4 overflow-hidden" style={{ ...glassInset, animation: "contentIn 360ms cubic-bezier(0.16,1,0.3,1) 340ms both" } as any}>
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px] opacity-[0.06]"><div className="absolute inset-y-0 w-[42%] -skew-x-12" style={{ background: `linear-gradient(90deg, transparent, ${selTheme.accent}, transparent)`, animation: "scanV 3.2s linear infinite" as any }} /></div>
                <MapRing value={selProg.pct} accent={selTheme.accent} size={54} />
                <div className="flex-1 min-w-0 relative">
                  <div className="flex items-baseline gap-1.5 flex-wrap" style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                    <span className="text-[18px] font-extrabold">{selProg.score}</span><span className="text-white/22">/</span><span className="text-[13px] font-bold text-white/55">{selProg.max}</span>
                    <span className="text-[11px] font-bold text-white/30 ml-1" style={{ fontFamily: "'Geist Mono',monospace" }}>poin</span>
                  </div>
                  <div className="mt-0.5 text-[11px] font-medium" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.38)" }}>{selProg.cl}/{selProg.tl} level · {selProg.pct}% signal</div>
                  <div className="mt-2.5"><MapBar value={selProg.pct} accent={selTheme.accent} accent2={selTheme.accentDark} /></div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.visit(sel.href)}
                className="relative mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-[13px] rounded-[14px] text-[13.5px] font-extrabold transition active:scale-[0.99] overflow-hidden group/btn"
                style={{ fontFamily: "'Nunito',sans-serif", background: `linear-gradient(180deg, ${selTheme.accent} 0%, ${selTheme.accentDark} 100%)`, color: selTheme.accent === "#6b7280" ? "#f8fafc" : "#0a0e15", border: `1px solid ${selTheme.accentDark}`, boxShadow: `0 10px 22px -8px ${selTheme.glow}, 0 4px 10px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.32)`, animation: "contentIn 360ms cubic-bezier(0.16,1,0.3,1) 400ms both" } as any}
              >
                <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)", transform: "translateX(-100%)", animation: "scanV 1.9s ease-in-out infinite" as any }} />
                <span className="relative">Masuk Simulasi</span>
                <svg className="relative w-4 h-4 transition group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </button>

              <div className="relative mt-3 flex items-center justify-between text-[10px] font-medium" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.26)", animation: "contentIn 360ms cubic-bezier(0.16,1,0.3,1) 460ms both" } as any}>
                <span>5 LEVEL · 25 FLOOR · DEPTH 03</span>
                <span style={{ color: selTheme.accent, opacity: 0.85 }}>{selStatus === "completed" ? "✓ selesai" : selStatus === "in_progress" ? `${selTheme.dot} ${selProg.pct}%` : "○ standby"}</span>
              </div>

              <div className="relative mt-4 grid grid-cols-3 gap-2" style={{ animation: "contentIn 360ms cubic-bezier(0.16,1,0.3,1) 520ms both" }}>
                {sims.filter(s => s.id !== selected).slice(0,3).map(s2 => {
                  const p2 = getProg(s2.id); const st2 = getStatus(s2.id); const th2 = statusTheme(st2, s2.accent, s2.accent2, s2.glow);
                  return (
                    <button key={s2.id} type="button" onClick={() => selectNode(s2.id)} className="rounded-[12px] px-2 py-2.5 text-left transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/15" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${th2.accent}18`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)` }}>
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: th2.accent, boxShadow: `0 0 6px ${th2.accent}` }} /><span className="text-[11px] font-extrabold leading-none truncate" style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}>{s2.name}</span></div>
                      <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}><div className="h-full rounded-full" style={{ width: p2.pct + "%", background: th2.accent }} /></div>
                      <p className="mt-1 text-[9px] font-medium truncate" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.34)" }}>{p2.pct}% · {th2.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[18px] px-4 py-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <span className="text-[10px] font-medium tracking-[0.12em]" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.28)" }}>QUICK JUMP</span>
              <span className="text-[10px] font-medium" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.32)" }}>ketuk chip node</span>
            </div>
          </div>
        </div>

        <div ref={bottomSentinelRef} aria-hidden className="h-[1px] w-full mt-6" />
        <p className="text-center text-[11px] font-medium tracking-wide" style={{ fontFamily: "'Geist Mono',monospace", color: "rgba(255,255,255,0.26)" }}>
          Gubuk Penceng · koneksi serentak 2000ms saat masuk & saat scroll ke bawah · klik bintang untuk inspect
        </p>
      </div>
    </div>
  );
}
