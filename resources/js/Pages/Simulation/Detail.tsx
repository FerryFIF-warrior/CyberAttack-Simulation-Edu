import { Head, Link } from "@inertiajs/react";
import type { ReactNode } from "react";
import { Card } from "@/shared/components/Card";

interface SimulationDetailProps {
    simulationId: string;
    levels: { level: number; floorCount: number; maxScore: number; unlocked: boolean; completed: boolean; levelScore?: number }[];
}
const simulationInfo: Record<string, { name: string; lab: string; vector: string; code: string; desc: string; tags: string[]; icon: ReactNode }> = {
    phishing: {
        name: "Phishing", lab: "Phishing Detection Lab", vector: "SOCIAL ENGINEERING", code: "MODUL 01",
        desc: "Bedah email spoofed, fake URL & lampiran — latih intuisi sebelum klik.", tags: ["SPF/DKIM Inspection","URL Spoofing"],
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
    },
    bruteforce: {
        name: "Brute Force", lab: "Brute Force Defense Lab", vector: "AUTHENTICATION", code: "MODUL 02",
        desc: "Burst login, password lemah & log telemetry — susun rate limit & lockout.", tags: ["Rate Limiting","Log Telemetry"],
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="16" r="1.2" /></svg>),
    },
    sqli: {
        name: "SQL Injection", lab: "SQL Injection Analysis Lab", vector: "QUERY INJECTION", code: "MODUL 03",
        desc: "Input tanpa sanitasi, error DB dummy & parameterized queries.", tags: ["Query Sanitization","Prepared Statements"],
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v8c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 13v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>),
    },
    auth: {
        name: "Authentication", lab: "Authentication Defense Lab", vector: "IDENTITY", code: "MODUL 04",
        desc: "Credential stuffing, session hijack & MFA hardening di sandbox.", tags: ["MFA Hardening","Session Security"],
        icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a6.5 6.5 0 0 1 13 0" /></svg>),
    },
};
function ProgressRing({ progress, size=56 }: { progress: number; size?: number }) {
    const sw=4, r=(size-sw)/2, c=2*Math.PI*r, off=c*(1-progress/100);
    return (<svg width={size} height={size} role="img" aria-label={`${progress}%`} className="flex-shrink-0"><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={sw} className="text-cat-line" /><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth={sw} strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" className="text-cat-cyan transition-all duration-1000" style={{ transform:"rotate(-90deg)", transformOrigin:"center" }} /><text x={size/2} y={size/2+3} textAnchor="middle" dominantBaseline="middle" fontSize={size*0.20} fontWeight={700} className="fill-white">{Math.round(progress)}%</text></svg>);
}
function StatusBadge({ status }: { status: "completed" | "available" | "locked" }) {
    const map = {
        completed: "bg-cat-green/15 text-cat-green border-cat-green/20",
        available: "bg-cat-cyan/10 text-cat-cyan border-cat-cyan/20",
        locked: "bg-cat-surface text-cat-muted border-cat-line",
    } as const;
    const label = status==="completed" ? "Selesai" : status==="available" ? "Tersedia" : "Terkunci";
    return (<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase font-semibold border ${map[status]}`}><span className={`w-1.5 h-1.5 rounded-full ${status==="completed" ? "bg-cat-green" : status==="available" ? "bg-cat-cyan" : "bg-cat-muted"}`} />{label}</span>);
}
export default function SimulationDetail({ simulationId, levels }: SimulationDetailProps) {
    const info = simulationInfo[simulationId] || simulationInfo.phishing;
    const completedLevels = levels.filter(l => l.completed).length;
    const totalLevels = levels.length;
    const totalScore = levels.reduce((s,l)=>s+(l.levelScore||0),0);
    const maxTotalScore = levels.reduce((s,l)=>s+l.maxScore,0);
    const overallProgress = maxTotalScore>0 ? Math.round((totalScore/maxTotalScore)*100) : 0;
    return (
        <div className="min-h-screen bg-cat-bg relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize:"24px 24px" }} />
            <div className="pointer-events-none absolute -top-28 -right-28 w-[520px] h-[520px] rounded-full blur-[90px] opacity-[0.06] bg-cat-cyan" />
            <Head title={info.name} />
            <div className="relative max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <Link href="/simulasi" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-cat-muted hover:text-white transition mb-5 sm:mb-7">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    Daftar simulasi
                </Link>
                {/* Hero lab card */}
                <div className="rounded-2xl border border-cat-line bg-cat-card overflow-hidden">
                    <div className="p-5 sm:p-7 lg:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-cat-surface border border-cat-line flex items-center justify-center text-cat-cyan shrink-0">{info.icon}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 rounded bg-cat-surface border border-cat-line text-cat-muted">{info.code}</span>
                                <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-1 rounded bg-cat-cyan/10 border border-cat-cyan/20 text-cat-cyan">{info.vector}</span>
                            </div>
                            <h1 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-white leading-tight">{info.name}</h1>
                            <p className="font-mono text-[11px] tracking-wide text-cat-muted -mt-0.5">{info.lab}</p>
                            <p className="text-[13px] sm:text-[14px] leading-6 text-cat-muted mt-2 max-w-[640px]">{info.desc}</p>
                            <div className="flex flex-wrap gap-1.5 mt-3">{info.tags.map(t=> <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-cat-surface border border-cat-line text-cat-muted">{t}</span>)}</div>
                        </div>
                    </div>
                </div>

                {/* Overall progress */}
                <div className="mt-4 sm:mt-5 rounded-2xl border border-cat-line bg-cat-card p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <ProgressRing progress={overallProgress} size={64} />
                        <div className="flex-1 min-w-0 w-full">
                            <div className="flex items-center justify-between gap-3 mb-2">
                                <span className="font-mono text-[11px] tracking-widest uppercase text-cat-muted">PROGRESS KESELURUHAN</span>
                                <span className="text-sm font-bold text-white">{overallProgress}%</span>
                            </div>
                            <div className="h-2 w-full bg-cat-surface rounded-full overflow-hidden border border-cat-line">
                                <div className="h-full bg-cat-cyan rounded-full transition-all duration-1000" style={{ width:`${overallProgress}%` }} />
                            </div>
                            <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 font-mono text-[11px] sm:text-xs text-cat-muted">
                                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cat-green" /> {completedLevels}/{totalLevels} level selesai</span>
                                <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cat-cyan" /> {totalScore}/{maxTotalScore} poin</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Levels — responsive: 1 col hp, 2 col tablet, tetap enak di laptop */}
                <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {levels.map((level)=> (
                        <article key={level.level} className={`group relative ${!level.unlocked ? "opacity-60" : ""}`}>
                            {!level.unlocked && <div className="absolute inset-0 rounded-xl bg-cat-bg/40 pointer-events-none z-10" />}
                            <Card className={`h-full !p-0 overflow-hidden ${level.unlocked ? "hover:border-cat-cyan/20" : ""} transition`} padding="none">
                                <div className="p-5 sm:p-6 flex flex-col gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 border text-lg font-bold ${level.completed ? "bg-cat-green/15 border-cat-green/20 text-cat-green" : level.unlocked ? "bg-cat-cyan/10 border-cat-cyan/20 text-cat-cyan" : "bg-cat-surface border-cat-line text-cat-muted"}`}>{level.level}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-[15px] sm:text-[16px] font-semibold text-white leading-tight">Level {level.level}</h2>
                                                <StatusBadge status={level.completed ? "completed" : level.unlocked ? "available" : "locked"} />
                                            </div>
                                            <p className="font-mono text-[11px] tracking-wide text-cat-muted mt-1">{level.floorCount} peta floor  •  Max {level.maxScore} poin</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pt-3 border-t border-cat-line">
                                        <div className="min-h-[40px] flex flex-col justify-center">
                                            {level.completed && level.levelScore!==undefined ? (<><p className="font-mono text-[10px] tracking-widest uppercase text-cat-muted">BEST SCORE</p><p className="text-[18px] font-bold text-white leading-none">{level.levelScore} <span className="text-cat-muted font-normal text-[13px]">/ {level.maxScore}</span></p></>) : level.unlocked ? (<p className="font-mono text-[11px] text-cat-muted">Belum dimulai — buka peta floor</p>) : (<p className="font-mono text-[11px] text-cat-muted">Skor 15 di level sebelumnya untuk buka</p>)}
                                        </div>
                                        {level.unlocked ? (
                                            <Link href={`/simulasi/${simulationId}/level/${level.level}`} className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shrink-0 w-full sm:w-auto ${level.completed ? "bg-cat-surface border border-cat-line text-slate-200 hover:border-cat-cyan/20" : "bg-cat-cyan text-cat-bg hover:brightness-110 shadow-[0_0_18px_rgba(0,229,255,0.18)]"}`}>
                                                {level.completed ? "Lihat peta" : "Masuk level"} <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                            </Link>
                                        ) : (
                                            <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-cat-surface border border-cat-line text-cat-muted w-full sm:w-auto"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 11V9a2 2 0 10-2 2v2" /><rect x="7" y="11" width="10" height="8" rx="1.5" /></svg> Terkunci</span>
                                        )}
                                    </div>
                                    {!level.unlocked && level.level>1 && (
                                        <p className="font-mono text-[11px] leading-4 text-cat-muted/80 flex gap-2"><svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Selesaikan Level {level.level-1} dengan skor minimal 15 untuk membuka.</p>
                                    )}
                                </div>
                            </Card>
                        </article>
                    ))}
                </div>

                <p className="mt-6 text-center font-mono text-[11px] text-cat-muted/60">Tip HP: geser vertikal. Laptop: grid 2 kolom — semua kontrol tetap jempol-friendly.</p>
            </div>
        </div>
    );
}
