import { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import { modules, type LearningModule, type ModuleId } from "./materials";

/* ──────────────────────────────────────────────────────────────
 * Halaman Learning — mengikuti STYLE-GUIDE-Eksperimen-1 (Clay Dark)
 * - clayCard / clayInset / clayPill: disalin persis dari Simulations/Index.tsx
 * - Warna aksen per modul dari materials.ts (token section 2.2, tidak diubah)
 * - Animasi: stagger 60ms * index (section 6.2), tanpa FLIP, tanpa bounce/rotate
 * ────────────────────────────────────────────────────────────── */

const clayCard: React.CSSProperties = {
  background: "#162030",
  border: "3px solid #233044",
  borderRadius: 28,
  boxShadow:
    "0 18px 36px rgba(0,0,0,0.55), 0 6px 14px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.08), inset 0 -3px 0 rgba(0,0,0,0.35)",
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
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)",
};

const FONT_DISPLAY = "font-['Bricolage_Grotesque','Nunito',sans-serif]";
const FONT_MONO = "font-['Space_Mono',monospace]";
const FONT_DESC = "font-['Nunito',sans-serif]";

const staggerStyle = (i: number): React.CSSProperties => ({ transitionDelay: `${i * 60}ms` });

/* ── Ikon modul (stroke 1.9, w-6 h-6) ── */
function ModuleIcon({ id }: { id: ModuleId }) {
  const common = {
    className: "w-6 h-6",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "phishing":
      return (
        <svg {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
          <path d="m3.5 7.5 8.5 6 8.5-6" />
        </svg>
      );
    case "bruteforce":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <path d="M12 14.5v2" />
        </svg>
      );
    case "sqli":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "auth":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}

/* ── Wrapper stagger ── */
function Enter({ i, run, children, className = "" }: { i: number; run: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={`clay-enter ${run ? "clay-enter--run" : ""} ${className}`} style={staggerStyle(i)}>
      {children}
    </div>
  );
}

/* ── Label section ── */
function SectionLabel({ no, children, accent }: { no: string; children: React.ReactNode; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1`}
        style={{ ...clayPill, color: accent }}
      >
        {no}
      </span>
      <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[20px] sm:text-[24px]`}>{children}</h2>
    </div>
  );
}

/* ── Kartu pilihan modul ── */
function ModuleTab({ m, active, onSelect }: { m: LearningModule; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className="relative text-left overflow-hidden p-4 sm:p-5 transition hover:brightness-[1.04] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      style={{
        ...clayCard,
        border: active ? `3px solid ${m.accent}55` : "3px solid #2a3446",
        opacity: active ? 1 : 0.92,
      }}
    >
      {active && (
        <div
          className="absolute top-0 left-6 right-6 h-[4px] rounded-full"
          style={{ background: m.accent, boxShadow: `0 2px 10px ${m.accent}55` }}
        />
      )}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className="w-[52px] h-[52px] rounded-[18px] grid place-items-center shrink-0"
          style={{
            background: m.iconBg,
            border: `2.5px solid ${m.accent}28`,
            boxShadow:
              "0 8px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.35)",
            color: m.accent,
          }}
        >
          <ModuleIcon id={m.id} />
        </div>
        <div className="min-w-0">
          <div className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase`} style={{ color: "rgba(255,255,255,0.55)" }}>
            MODUL {m.no}
          </div>
          <div className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[17px] leading-tight truncate`}>{m.name}</div>
        </div>
      </div>
    </button>
  );
}

/* ── Halaman ── */
export default function LearningIndex() {
  const [activeId, setActiveId] = useState<ModuleId>("phishing");
  const [run, setRun] = useState(false);
  const [openSources, setOpenSources] = useState(false);

  const m = useMemo(() => modules.find((x) => x.id === activeId)!, [activeId]);
  const srcById = useMemo(() => Object.fromEntries(m.sources.map((s) => [s.id, s])), [m]);

  // Jalankan ulang stagger saat modul berganti (pola 6.2: dua rAF setelah state berubah)
  useEffect(() => {
    setRun(false);
    setOpenSources(false);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setRun(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [activeId]);

  return (
    <>
      <Head title="Learning" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        .clay-enter { opacity: 0; transform: translateY(10px); }
        .clay-enter--run { opacity: 1; transform: translateY(0); transition: opacity 420ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1); }
        @media (prefers-reduced-motion: reduce) {
          .clay-enter, .clay-enter--run { transition: none !important; animation: none !important; opacity: 1 !important; transform: none !important; }
          * { scroll-behavior: auto !important; }
        }
      `}</style>

      <div
        className="min-h-screen text-white relative overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%), radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%), radial-gradient(700px 500px at 50% 100%, #0e1e36 0%, #080d18 60%), #070b14",
        }}
      >
        <main className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header halaman */}
          <header className="mb-6 sm:mb-8">
            <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase`} style={{ color: "rgba(255,255,255,0.55)" }}>
              LEARNING
            </span>
            <h1 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[32px] sm:text-[44px] leading-[1.1] mt-1`}>
              Materi Serangan Siber
            </h1>
            <p className={`${FONT_DESC} text-[14px] mt-2 max-w-[60ch]`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "24px" }}>
              Pelajari konsep, tanda, dan pertahanan tiap serangan sebelum masuk ke simulasi. Isi materi disusun dari paper penelitian yang dicantumkan di bagian sumber.
            </p>
          </header>

          {/* Pilih modul */}
          <nav aria-label="Pilih modul" className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {modules.map((x) => (
              <div key={x.id} className="lg:col-span-3">
                <ModuleTab m={x} active={x.id === activeId} onSelect={() => setActiveId(x.id)} />
              </div>
            ))}
          </nav>

          {/* Kartu utama modul */}
          <article
            key={`learn-${m.id}`}
            className="relative overflow-hidden p-5 sm:p-8"
            style={{ ...clayCard, border: `3px solid ${m.accent}55` }}
          >
            <div
              className="absolute top-0 left-6 right-6 h-[4px] rounded-full"
              style={{ background: m.accent, boxShadow: `0 2px 10px ${m.accent}55` }}
            />
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-[0.06]"
              style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
            />

            <div className="relative flex flex-col gap-8 sm:gap-10">
              {/* 0 — Judul modul */}
              <Enter i={0} run={run}>
                <div className="flex items-start gap-4">
                  <div
                    className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-[18px] grid place-items-center shrink-0"
                    style={{
                      background: m.iconBg,
                      border: `2.5px solid ${m.accent}28`,
                      boxShadow:
                        "0 8px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.35)",
                      color: m.accent,
                    }}
                  >
                    <ModuleIcon id={m.id} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`${FONT_MONO} rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-widest`} style={{ ...clayPill, color: "rgba(255,255,255,0.55)" }}>
                        MODUL {m.no}
                      </span>
                      <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase`} style={{ color: m.accent }}>
                        {m.vector}
                      </span>
                    </div>
                    <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[28px] sm:text-[36px] leading-[1.1]`}>{m.name}</h2>
                    <p className={`${FONT_DESC} text-[14px] mt-1.5`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "24px" }}>
                      {m.tagline}
                    </p>
                  </div>
                </div>
              </Enter>

              {/* 1 — Pengantar */}
              <Enter i={1} run={run}>
                <div className="p-4 sm:p-5 flex flex-col gap-3" style={clayInset}>
                  {m.intro.map((p, i) => (
                    <p key={i} className="text-[14px] sm:text-[15px] leading-[1.7] text-slate-300">
                      {p}
                    </p>
                  ))}
                </div>
              </Enter>

              {/* 2 — Cara kerja / jenis */}
              <Enter i={2} run={run}>
                <SectionLabel no="A" accent={m.accent}>
                  {m.howItWorks.heading}
                </SectionLabel>
                <div className="grid sm:grid-cols-2 gap-3">
                  {m.howItWorks.items.map((t) => (
                    <div key={t.title} className="p-4" style={clayInset}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[16px] leading-tight`}>{t.title}</h3>
                        {t.tag && (
                          <span className={`${FONT_MONO} shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-widest`} style={{ ...clayPill, color: "rgba(255,255,255,0.55)" }}>
                            {t.tag}
                          </span>
                        )}
                      </div>
                      <p className={`${FONT_DESC} text-[13px]`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "22px" }}>
                        {t.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Enter>

              {/* 3 — Tanda deteksi */}
              <Enter i={3} run={run}>
                <SectionLabel no="B" accent={m.accent}>
                  {m.signs.heading}
                </SectionLabel>
                <ul className="p-4 sm:p-5 flex flex-col gap-2.5" style={clayInset}>
                  {m.signs.items.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-[14px] leading-[1.6] text-slate-300">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.accent, boxShadow: `0 0 8px ${m.accent}88` }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Enter>

              {/* 4 — Pertahanan */}
              <Enter i={4} run={run}>
                <SectionLabel no="C" accent={m.accent}>
                  {m.defense.heading}
                </SectionLabel>
                <div className="grid sm:grid-cols-2 gap-3">
                  {m.defense.items.map((t) => (
                    <div key={t.title} className="p-4" style={clayInset}>
                      <h3 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[16px] leading-tight mb-1.5`}>{t.title}</h3>
                      <p className={`${FONT_DESC} text-[13px]`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "22px" }}>
                        {t.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Enter>

              {/* 5 — Temuan riset */}
              <Enter i={5} run={run}>
                <SectionLabel no="D" accent={m.accent}>
                  {m.research.heading}
                </SectionLabel>
                <p className={`${FONT_DESC} text-[13px] mb-3`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "22px" }}>
                  {m.research.intro}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {m.research.facts.map((f, i) => (
                    <div key={i} className="p-4" style={clayInset}>
                      <div className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[24px] sm:text-[28px] leading-none`} style={{ color: m.accent }}>
                        {f.value}
                      </div>
                      <p className={`${FONT_DESC} text-[12px] mt-2`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "20px" }}>
                        {f.label}
                      </p>
                      <p className={`${FONT_MONO} text-[9px] tracking-widest uppercase mt-2`} style={{ color: "rgba(255,255,255,0.4)" }}>
                        {srcById[f.src]?.cite ?? f.src}
                      </p>
                    </div>
                  ))}
                </div>
              </Enter>

              {/* 6 — Poin penting + sumber */}
              <Enter i={6} run={run}>
                <SectionLabel no="E" accent={m.accent}>
                  Poin penting
                </SectionLabel>
                <ol className="p-4 sm:p-5 flex flex-col gap-3 mb-6" style={clayInset}>
                  {m.takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.7] text-slate-300">
                      <span
                        className={`${FONT_MONO} text-[10px] font-bold w-6 h-6 rounded-full grid place-items-center shrink-0 mt-[2px]`}
                        style={{ ...clayPill, color: m.accent }}
                      >
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>

                <button
                  type="button"
                  onClick={() => setOpenSources((v) => !v)}
                  aria-expanded={openSources}
                  className={`${FONT_DESC} w-full rounded-[16px] px-4 py-3.5 text-[14px] font-extrabold hover:brightness-110 active:translate-y-[3px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20`}
                  style={{
                    background: m.accent,
                    color: "#0a0e15",
                    border: `2.5px solid ${m.accentDark}`,
                    boxShadow: `0 5px 0 ${m.accentDark}, 0 10px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)`,
                  }}
                >
                  {openSources ? "Sembunyikan sumber" : `Lihat ${m.sources.length} sumber paper`}
                </button>

                {openSources && (
                  <ul className="mt-5 flex flex-col gap-3">
                    {m.sources.map((s) => (
                      <li key={s.id} className="p-4" style={clayInset}>
                        <div className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase mb-1`} style={{ color: m.accent }}>
                          {s.cite}
                        </div>
                        <div className={`${FONT_DISPLAY} font-extrabold tracking-tight text-white text-[15px] leading-snug`}>{s.title}</div>
                        <div className="font-mono text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {s.venue}
                        </div>
                        <p className={`${FONT_DESC} text-[13px] mt-2`} style={{ color: "rgba(255,255,255,0.58)", lineHeight: "22px" }}>
                          {s.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </Enter>
            </div>
          </article>
        </main>
      </div>
    </>
  );
}