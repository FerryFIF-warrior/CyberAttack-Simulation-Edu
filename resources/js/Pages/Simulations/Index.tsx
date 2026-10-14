import { Head, router } from "@inertiajs/react";
import { useRef, useState } from "react";

type SimStatus = "not_started" | "in_progress" | "completed";

interface SimProgressItem {
    id: string;
    completionPercent: number;
    totalScore: number;
    maxScore: number;
    completedLevels: number;
    totalLevels: number;
    completedFloors: number;
    totalFloors: number;
    status: SimStatus;
    earnedBadges: string[];
}

import type { LabMeta } from "@/features/simulation/types/simulation";
interface SimulationsIndexProps {
    phishingProgress: { completionPercent: number; totalScore: number; maxScore: number; earnedBadges: string[] } | null;
    simulations?: SimProgressItem[];
    labs?: Record<string, LabMeta>;
}

const baseSims = [
    {
        id: "phishing",
        desc: "Email spoofed, URL palsu & lampiran menjebak — asah insting sebelum klik.",
        href: "/simulasi/phishing", accent: "#00e5ff", accentDark: "#00b8cc", iconBg: "#0e2a33",
        Icon: (q: { className?: string }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
        ready: true,
    },
    {
        id: "bruteforce",
        desc: "Burst login & log telemetry — susun rate limit & lockout yang benar.",
        href: "/simulasi/bruteforce", accent: "#ffb020", accentDark: "#d48c00", iconBg: "#2b2110",
        Icon: (q: { className?: string }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><rect x="3" y="11" width="18" height="11" rx="2.5"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.3"/></svg>),
        ready: true,
    },
    {
        id: "sqli",
        desc: "Input tanpa sanitasi & error DB dummy — praktikkan prepared statement.",
        href: "/simulasi/sqli", accent: "#a78bfa", accentDark: "#7c5bd6", iconBg: "#211e33",
        Icon: (q: { className?: string }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v8c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 13v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>),
        ready: false,
    },
    {
        id: "auth",
        desc: "Credential stuffing & MFA hardening — kunci sesi di sandbox.",
        href: "/simulasi/auth", accent: "#34d399", accentDark: "#1fa87a", iconBg: "#132620",
        Icon: (q: { className?: string }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={q.className} aria-hidden><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>),
        ready: false,
    },
] as const;

function ClayProgress({ value, accent, accentDark }: { value: number; accent: string; accentDark: string }) {
    return (
        <div className="w-full rounded-full p-[3px]" style={{ background: "#0a1220", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.06)" }}>
            <div className="h-[14px] rounded-full relative overflow-hidden transition-all duration-1000" style={{ width: value + "%", background: "linear-gradient(180deg, " + accent + " 0%, " + accentDark + " 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 12px " + accent + "55" }}>
                <span className="absolute inset-x-1 top-[2px] h-[4px] rounded-full bg-white/30 blur-[0.5px]" />
            </div>
        </div>
    );
}

function ClayRing({ value, accent, size = 58 }: { value: number; accent: string; size?: number }) {
    const sw = 5, r = (size - sw) / 2, c = 2 * Math.PI * r, off = c * (1 - value / 100);
    return (
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
            <div className="absolute inset-0 rounded-full" style={{ background: "#0f1a2e", boxShadow: "inset 0 3px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.06)" }} />
            <svg width={size} height={size} className="relative" style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
                <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={accent} strokeWidth={sw} strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px " + accent + "88)", transition: "stroke-dashoffset 1s ease" }} />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-extrabold text-white" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif", fontSize: size * 0.22 }}>{Math.round(value)}%</span>
        </div>
    );
}

function statusTheme(status: SimStatus) {
    if (status === "completed") return { accent: "#22c55e", accentDark: "#16a34a", label: "SELESAI", chipBg: "rgba(34,197,94,0.14)", chipBorder: "rgba(34,197,94,0.22)" };
    if (status === "in_progress") return { accent: "#facc15", accentDark: "#ca8a04", label: "PROGRES", chipBg: "rgba(250,204,21,0.14)", chipBorder: "rgba(250,204,21,0.22)" };
    return { accent: "#6b7280", accentDark: "#4b5563", label: "BELUM MULAI", chipBg: "rgba(107,114,128,0.12)", chipBorder: "rgba(107,114,128,0.18)" };
}

export default function SimulationsIndex({ phishingProgress, simulations, labs }: SimulationsIndexProps) {
    // Metadata (name/lab/vector/code) dari server — single source of truth (H1)
    const sims = baseSims.map((s) => {
        const meta = labs?.[s.id];
        return {
            ...s,
            name: meta?.name ?? s.id,
            lab: meta?.lab ?? "",
            vector: meta?.vector ?? "",
            code: meta?.code ?? "",
        };
    });
    const progress = phishingProgress ?? { completionPercent: 0, totalScore: 0, maxScore: 100, earnedBadges: [] as string[] };
    const hasBeginner = progress.earnedBadges.includes("beginner"); const hasSuhu = progress.earnedBadges.includes("suhu");

    const progMap = new Map<string, SimProgressItem>();
    if (simulations) simulations.forEach(s => progMap.set(s.id, s));

    const getStatus = (id: string): SimStatus => {
        const p = progMap.get(id);
        if (p) return p.status;
        if (id === "phishing") {
            if (progress.completionPercent >= 100) return "completed";
            if (progress.completionPercent > 0 || progress.totalScore > 0) return "in_progress";
            return "not_started";
        }
        return "not_started";
    };
    const getProgress = (id: string) => {
        const p = progMap.get(id);
        if (p) return { pct: p.completionPercent, score: p.totalScore, max: p.maxScore, completedLevels: p.completedLevels, totalLevels: p.totalLevels };
        if (id === "phishing") return { pct: progress.completionPercent, score: progress.totalScore, max: progress.maxScore, completedLevels: 0, totalLevels: 5 };
        return { pct: 0, score: 0, max: 100, completedLevels: 0, totalLevels: 5 };
    };

    const [order, setOrder] = useState<string[]>(() => sims.map(s => s.id));
    const [isAnimating, setIsAnimating] = useState(false);
    const [mainKey, setMainKey] = useState(0);
    const [enterTick, setEnterTick] = useState(0);
    const cardRefs = useRef<Record<string, HTMLElement | null>>({});

    const clayCard: React.CSSProperties = {
        background: "#162030",
        border: "3px solid #233044",
        borderRadius: 28,
        boxShadow: "0 18px 36px rgba(0,0,0,0.55), 0 6px 14px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.08), inset 0 -3px 0 rgba(0,0,0,0.35)",
    };
    const clayInset: React.CSSProperties = {
        background: "#0f1828",
        border: "2px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        boxShadow: "inset 0 3px 10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
    };
    const clayPill: React.CSSProperties = {
        background: "#0f1828",
        border: "2px solid rgba(255,255,255,0.07)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)",
    };

    const simById = Object.fromEntries(sims.map(s => [s.id, s])) as Record<string, typeof sims[number]>;
    const mainId = order[0];

    // FLIP: lambatkan ke 780ms agar mata mengikuti tapi tidak lelet
    const FLIP_MS = 780;

    const swapToMain = (selectedId: string) => {
        if (isAnimating) return;
        if (selectedId === mainId) return;
        const before = new Map<string, DOMRect>();
        order.forEach(id => {
            const el = cardRefs.current[id];
            if (el) before.set(id, el.getBoundingClientRect());
        });
        const oldMain = order[0];
        const idx = order.indexOf(selectedId);
        const newOrder = [...order];
        newOrder[0] = selectedId;
        newOrder[idx] = oldMain;
        setIsAnimating(true);
        setOrder(newOrder);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                newOrder.forEach(id => {
                    const el = cardRefs.current[id];
                    const b = before.get(id);
                    if (!el || !b) return;
                    const a = el.getBoundingClientRect();
                    const dx = b.left - a.left;
                    const dy = b.top - a.top;
                    const sx = b.width / a.width;
                    const sy = b.height / a.height;
                    el.style.transition = "none";
                    el.style.transformOrigin = "top left";
                    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
                    (el.style as any).willChange = "transform";
                });
                void document.body.offsetHeight;
                newOrder.forEach(id => {
                    const el = cardRefs.current[id];
                    if (!el) return;
                    el.style.transition = `transform ${FLIP_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                    el.style.transform = "translate(0,0) scale(1,1)";
                });
                window.setTimeout(() => {
                    newOrder.forEach(id => {
                        const el = cardRefs.current[id];
                        if (!el) return;
                        el.style.transition = "";
                        el.style.transform = "";
                        el.style.transformOrigin = "";
                        (el.style as any).willChange = "";
                    });
                    setIsAnimating(false);
                    // trigger inner enter anim sekali saja setelah FLIP selesai
                    setMainKey(k => k + 1);
                    setEnterTick(k => k + 1);
                }, FLIP_MS + 20);
            });
        });
    };

    const handleCardActivate = (id: string) => {
        if (isAnimating) return;
        swapToMain(id);
    };

    const handleMainButton = (id: string) => {
        if (isAnimating) return;
        const sim = simById[id];
        if (id !== mainId) {
            swapToMain(id);
            return;
        }
        router.visit(sim.href);
    };

    return (
        <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%), radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%), radial-gradient(700px 500px at 50% 100%, #0e1e36 0%, #080d18 60%), #070b14" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
@keyframes clayMainIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: none; } }
.clay-enter { opacity:0; }
.clay-enter--run { animation: clayMainIn 420ms cubic-bezier(0.22,1,0.36,1) both; }
@media (prefers-reduced-motion: reduce) { .clay-enter, .clay-enter--run { animation: none !important; opacity:1 !important; transform:none !important; } }
`}</style>

            <div className="pointer-events-none absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-[2px] opacity-25" style={{ background: "radial-gradient(circle at 30% 30%, #2a3a5a 0%, #162030 55%, transparent 70%)", border: "3px solid rgba(255,255,255,0.04)" }} />
            <div className="pointer-events-none absolute -bottom-32 -right-24 w-[560px] h-[560px] rounded-full blur-[1px] opacity-20" style={{ background: "radial-gradient(circle at 40% 40%, #1e2e4a 0%, #0f1828 60%, transparent 72%)" }} />

            <Head title="Simulasi Keamanan" />
            <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                <div className="relative overflow-hidden p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-6" style={clayCard}>
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
                    <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{ boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.06)" }} />
                    <div className="flex-1 min-w-0">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold tracking-wide" style={{ ...clayPill, fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.75)" }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34d399", boxShadow: "0 0 10px rgba(52,211,153,0.9)" }} /> LAB_OS v1
                            <span className="w-px h-3 bg-white/10 hidden sm:block" /> <span className="hidden sm:inline opacity-50">4 modul · tema gelap clay</span>
                        </div>
                        <h1 className="mt-4 leading-[0.85] tracking-[-0.03em]" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>
                            <span className="block text-[30px] sm:text-[40px] lg:text-[46px] font-extrabold">Pilih medan</span>
                            <span className="block text-[30px] sm:text-[40px] lg:text-[46px] font-extrabold" style={{ color: "#ffd23a", textShadow: "0 2px 0 #b88c00, 0 6px 18px rgba(255,210,58,0.25)" }}>latihan</span>
                            <span className="block text-[30px] sm:text-[40px] lg:text-[46px] font-extrabold">kamu.</span>
                        </h1>
                        <p className="mt-3 text-[13px] sm:text-[14px] leading-6 max-w-[520px]" style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
                            Bentuknya empuk, isinya serius. Tiap modul = peta 5 floor. Jelajahi, dekati objek, ambil keputusan — skor per floor.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide" style={{ ...clayPill, fontFamily: "'Nunito',sans-serif", color: "rgba(255,255,255,0.65)" }}>5 LEVEL × 5 FLOOR</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] font-extrabold" style={{ background: "#ffd23a", color: "#1a1400", border: "2px solid #e6b800", borderRadius: 999, boxShadow: "0 4px 0 #b88c00, 0 6px 14px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.45)", fontFamily: "'Nunito',sans-serif" }}>★ dark clay</span>
                        </div>
                    </div>

                    <div className="shrink-0 w-full lg:w-[320px] rounded-[22px] p-4 sm:p-5 flex flex-col gap-3" style={clayInset}>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold tracking-[0.14em]" style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.5)" }}>SYSTEM STATUS</span>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#34d399", boxShadow: "0 0 10px rgba(52,211,153,0.9), inset 0 1px 0 rgba(255,255,255,0.5)" }} />
                        </div>
                        <div className="flex items-center gap-4">
                            <ClayRing value={progress.completionPercent} accent="#00e5ff" size={62} />
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-extrabold tracking-widest" style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.45)" }}>PHISHING PROGRESS</p>
                                <p className="leading-none mt-1" style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}><span className="text-[22px] font-extrabold">{progress.totalScore}</span><span className="text-white/30 mx-1">/</span><span className="text-[15px] font-bold text-white/60">{progress.maxScore}</span></p>
                                <p className="text-[11px] font-bold mt-1" style={{ fontFamily: "'Nunito',sans-serif", color: "rgba(255,255,255,0.45)" }}>{progress.completionPercent}% complete</p>
                            </div>
                        </div>
                        <ClayProgress value={progress.completionPercent} accent="#00e5ff" accentDark="#00b8cc" />
                        <div className="flex gap-2">
                            <span className="flex-1 text-center px-2 py-1.5 rounded-full text-[11px] font-extrabold" style={{ fontFamily: "'Nunito',sans-serif", background: hasBeginner ? "#00e5ff" : "#1a2535", color: hasBeginner ? "#002a33" : "rgba(255,255,255,0.35)", border: hasBeginner ? "2px solid #00b8cc" : "2px solid rgba(255,255,255,0.06)", boxShadow: hasBeginner ? "0 3px 0 #0090a8, inset 0 1px 0 rgba(255,255,255,0.35)" : "inset 0 1px 0 rgba(255,255,255,0.04)" }}>Beginner</span>
                            <span className="flex-1 text-center px-2 py-1.5 rounded-full text-[11px] font-extrabold" style={{ fontFamily: "'Nunito',sans-serif", background: hasSuhu ? "#ffd23a" : "#1a2535", color: hasSuhu ? "#1a1400" : "rgba(255,255,255,0.35)", border: hasSuhu ? "2px solid #e6b800" : "2px solid rgba(255,255,255,0.06)", boxShadow: hasSuhu ? "0 3px 0 #b88c00, inset 0 1px 0 rgba(255,255,255,0.35)" : "inset 0 1px 0 rgba(255,255,255,0.04)" }}>Suhu</span>
                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
                    {(() => {
                        const mainSim = simById[mainId];
                        const smallIds = order.slice(1);
                        const mainProg = getProgress(mainSim.id);
                        const mainStatus = getStatus(mainSim.id);
                        const mainTheme = statusTheme(mainStatus);
                        // stagger helper: hanya jalan sekali setelah enterTick berubah — tidak re-trigger oleh FLIP scale
                        const staggerStyle = (i: number): React.CSSProperties => ({
                            animationDelay: `${90 + i * 70}ms`,
                        });

                        const MainInner = () => {
                            const accent = mainTheme.accent;
                            const accentDark = mainTheme.accentDark;
                            return (
                                <div
                                    key={`main-inner-${mainSim.id}-${mainKey}-${enterTick}`}
                                    className="flex flex-col flex-1"
                                >
                                    <div className={isAnimating ? "clay-enter" : "clay-enter--run"} style={staggerStyle(0)}>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[18px] grid place-items-center shrink-0" style={{ background: mainSim.iconBg, border: "2.5px solid " + accent + "28", boxShadow: "0 8px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.35)", color: accent }}>
                                                <mainSim.Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5 text-right">
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style={{ ...clayPill, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.55)" }}>MODUL {mainSim.code}</span>
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style={{ background: mainTheme.chipBg, border: "2px solid " + mainTheme.chipBorder, color: accent, borderRadius: 999, fontFamily: "'Space Mono',monospace", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>{mainSim.vector}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className={isAnimating ? "clay-enter mt-4 text-[22px] sm:text-[26px] font-extrabold leading-none tracking-tight" : "clay-enter--run mt-4 text-[22px] sm:text-[26px] font-extrabold leading-none tracking-tight"} style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif", ...staggerStyle(1) }}>{mainSim.name}</h2>
                                    <p className={isAnimating ? "clay-enter text-[11px] font-extrabold tracking-wide mt-1" : "clay-enter--run text-[11px] font-extrabold tracking-wide mt-1"} style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.38)", ...staggerStyle(2) }}>{mainSim.lab}</p>
                                    <p className={isAnimating ? "clay-enter mt-2 text-[13px] sm:text-[14px] leading-6" : "clay-enter--run mt-2 text-[13px] sm:text-[14px] leading-6"} style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.58)", ...staggerStyle(3) }}>{mainSim.desc}</p>

                                    <div className={isAnimating ? "clay-enter mt-4 rounded-[18px] p-4 flex items-center gap-4" : "clay-enter--run mt-4 rounded-[18px] p-4 flex items-center gap-4"} style={{ ...clayInset, ...staggerStyle(4) }}>
                                        <ClayRing value={mainProg.pct} accent={accent} size={56} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <div className="flex items-baseline gap-1.5" style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                                                    <span className="text-[18px] font-extrabold">{mainProg.score}</span><span className="text-white/25">/</span><span className="text-[13px] font-bold text-white/60">{mainProg.max}</span><span className="text-[11px] font-bold text-white/35 ml-1" style={{ fontFamily: "'Nunito',sans-serif" }}>poin</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest" style={{ background: mainTheme.chipBg, border: "1.5px solid " + mainTheme.chipBorder, color: accent, fontFamily: "'Space Mono',monospace" }}>{mainTheme.label}</span>
                                            </div>
                                            <div className="mt-1 text-[11px] font-bold" style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.38)" }}>{mainProg.completedLevels}/{mainProg.totalLevels} level selesai</div>
                                            <div className="mt-2"><ClayProgress value={mainProg.pct} accent={accent} accentDark={accentDark} /></div>
                                        </div>
                                    </div>

                                    <div className={isAnimating ? "clay-enter mt-4" : "clay-enter--run mt-4"} style={staggerStyle(5)}>
                                        <button
                                            type="button"
                                            disabled={isAnimating}
                                            onClick={() => handleMainButton(mainSim.id)}
                                            className="inline-flex w-full items-center justify-center gap-2 px-4 py-3.5 rounded-[16px] text-[14px] font-extrabold transition active:translate-y-[3px] disabled:opacity-60 disabled:cursor-wait"
                                            style={{
                                                fontFamily: "'Nunito',sans-serif",
                                                background: accent,
                                                color: mainStatus === "not_started" ? "#f8fafc" : "#0a0e15",
                                                border: "2.5px solid " + accentDark,
                                                boxShadow: "0 5px 0 " + accentDark + ", 0 10px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
                                            }}
                                        >
                                            Mulai Simulasi
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                        </button>
                                    </div>

                                    <div className={isAnimating ? "clay-enter mt-3 flex items-center justify-between" : "clay-enter--run mt-3 flex items-center justify-between"} style={{ fontFamily: "'Space Mono',monospace", ...staggerStyle(6) }}>
                                        <span className="text-[10px] font-bold tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>5 LEVEL · 25 FLOOR</span>
                                        <span className="text-[10px] font-bold" style={{ color: accent, opacity: 0.9 }}>{mainStatus === "completed" ? "✓ selesai" : mainStatus === "in_progress" ? "● progres " + mainProg.pct + "%" : "○ belum mulai"}</span>
                                    </div>
                                </div>
                            );
                        };

                        return (
                            <>
                                <article
                                    key={mainSim.id}
                                    ref={el => { cardRefs.current[mainSim.id] = el; }}
                                    className="lg:col-span-12 group relative"
                                    style={{ opacity: isAnimating ? 0.98 : 1 }}
                                    aria-label={`${mainSim.name} — card utama`}
                                >
                                    <div className="h-full flex flex-col p-5 sm:p-6 relative overflow-hidden" style={{ ...clayCard, borderColor: mainStatus === "not_started" ? "#2a3446" : mainTheme.accent + "55" }}>
                                        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
                                        <div className="absolute top-0 left-6 right-6 h-[4px] rounded-full opacity-80" style={{ background: mainTheme.accent, boxShadow: "0 2px 10px " + mainTheme.accent + "55" }} />
                                        <MainInner />
                                    </div>
                                </article>

                                {smallIds.map(sId => {
                                    const s = simById[sId];
                                    const prog = getProgress(s.id);
                                    const status = getStatus(s.id);
                                    const theme = statusTheme(status);
                                    return (
                                        <article
                                            key={s.id}
                                            ref={el => { cardRefs.current[s.id] = el; }}
                                            className="lg:col-span-4 group relative"
                                            style={{ opacity: isAnimating ? 0.98 : 1 }}
                                        >
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`Pilih ${s.name} sebagai simulasi utama`}
                                                onClick={() => handleCardActivate(s.id)}
                                                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardActivate(s.id); } }}
                                                className="h-full flex flex-col p-5 sm:p-6 relative overflow-hidden cursor-pointer transition hover:brightness-[1.04] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                                                style={{ ...clayCard, borderColor: status === "not_started" ? "#2a3446" : theme.accent + "55" }}
                                            >
                                                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }} />
                                                <div className="absolute top-0 left-6 right-6 h-[4px] rounded-full opacity-80" style={{ background: theme.accent, boxShadow: "0 2px 10px " + theme.accent + "55" }} />

                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[18px] grid place-items-center shrink-0" style={{ background: s.iconBg, border: "2.5px solid " + theme.accent + "28", boxShadow: "0 8px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.35)", color: theme.accent }}>
                                                        <s.Icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1.5 text-right">
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style={{ ...clayPill, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.55)" }}>MODUL {s.code}</span>
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest" style={{ background: theme.chipBg, border: "2px solid " + theme.chipBorder, color: theme.accent, borderRadius: 999, fontFamily: "'Space Mono',monospace", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>{s.vector}</span>
                                                    </div>
                                                </div>

                                                <h2 className="mt-4 text-[18px] sm:text-[20px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>{s.name}</h2>
                                                <p className="text-[11px] font-extrabold tracking-wide mt-1" style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.38)" }}>{s.lab}</p>
                                                <p className="mt-2 text-[13px] leading-6" style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.58)" }}>{s.desc}</p>

                                                <div className="mt-4 rounded-[18px] p-4 flex items-center gap-4" style={clayInset}>
                                                    <ClayRing value={prog.pct} accent={theme.accent} size={48} />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-1.5 flex-wrap">
                                                            <span className="text-[15px] font-extrabold" style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}>{prog.score}</span><span className="text-white/25">/</span><span className="text-[12px] font-bold text-white/60">{prog.max}</span>
                                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest" style={{ background: theme.chipBg, border: "1.5px solid " + theme.chipBorder, color: theme.accent, fontFamily: "'Space Mono',monospace" }}>{theme.label}</span>
                                                        </div>
                                                        <div className="mt-1 text-[10px] font-bold" style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.38)" }}>{prog.completedLevels}/{prog.totalLevels} level</div>
                                                        <div className="mt-2"><ClayProgress value={prog.pct} accent={theme.accent} accentDark={theme.accentDark} /></div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    disabled={isAnimating}
                                                    onClick={e => { e.stopPropagation(); handleMainButton(s.id); }}
                                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-3.5 rounded-[16px] text-[14px] font-extrabold transition active:translate-y-[3px] disabled:opacity-60 disabled:cursor-wait"
                                                    style={{
                                                        fontFamily: "'Nunito',sans-serif",
                                                        background: theme.accent,
                                                        color: status === "not_started" ? "#f8fafc" : "#0a0e15",
                                                        border: "2.5px solid " + theme.accentDark,
                                                        boxShadow: "0 5px 0 " + theme.accentDark + ", 0 10px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
                                                    }}
                                                >
                                                    Mulai Simulasi
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                                </button>

                                                <div className="mt-3 flex items-center justify-between" style={{ fontFamily: "'Space Mono',monospace" }}>
                                                    <span className="text-[10px] font-bold tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>5 LEVEL · 25 FLOOR</span>
                                                    <span className="text-[10px] font-bold" style={{ color: theme.accent, opacity: 0.85 }}>{status === "completed" ? "✓ selesai" : status === "in_progress" ? "● " + prog.pct + "%" : "○ belum mulai"}</span>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </>
                        );
                    })()}
                </div>

                <p className="mt-6 text-center text-[11px] font-bold tracking-wide" style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.28)" }}>
                    Tip: ketuk card kecil atau tombolnya — card naik membesar ke atas (780ms), yang atas turun mengecil. Setelah animasi selesai, tekan Mulai Simulasi untuk masuk.
                </p>

                <div className="mt-4 flex justify-center">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ ...clayPill, fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.25)" }}>clay dark · FLIP 780ms · status abu/kuning/hijau · phishing template konsisten · hanya Index.tsx</span>
                </div>
            </div>
        </div>
    );
}
