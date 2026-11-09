import { Head, Link } from "@inertiajs/react";

/* Gaya Clay Dark — disalin dari STYLE-GUIDE-Eksperimen-1 (sama seperti halaman Learning) */
export const clayCard: React.CSSProperties = {
  background: "#162030",
  border: "3px solid #233044",
  borderRadius: 28,
  boxShadow:
    "0 18px 36px rgba(0,0,0,0.55), 0 6px 14px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.08), inset 0 -3px 0 rgba(0,0,0,0.35)",
};
export const clayInset: React.CSSProperties = {
  background: "#0f1828",
  border: "2px solid rgba(255,255,255,0.06)",
  borderRadius: 20,
  boxShadow: "inset 0 3px 10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
};
export const clayPill: React.CSSProperties = {
  background: "#0f1828",
  border: "2px solid rgba(255,255,255,0.07)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3)",
};
export const FONT_DISPLAY = "font-['Bricolage_Grotesque','Nunito',sans-serif]";
export const FONT_MONO = "font-['Space_Mono',monospace]";
export const FONT_DESC = "font-['Nunito',sans-serif]";
export const MUTED = "rgba(255,255,255,0.58)";
export const CYAN = "#00e5ff";

const tabs = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "users", label: "Pengguna", href: "/admin/users" },
  { key: "materi", label: "Materi", href: "/admin/content/materi" },
  { key: "kuis", label: "Kuis", href: "/admin/content/kuis" },
  { key: "badge", label: "Badge", href: "/admin/content/badge" },
  { key: "kb", label: "Knowledge Base", href: "/admin/knowledge-base" },
] as const;

export type AdminTab = (typeof tabs)[number]["key"];

export default function AdminShell({
  title,
  active,
  children,
}: {
  title: string;
  active: AdminTab;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head title={`Admin · ${title}`} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Nunito:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
      `}</style>
      <div
        className="min-h-screen text-white"
        style={{
          background:
            "radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%), radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%), radial-gradient(700px 500px at 50% 100%, #0e1e36 0%, #080d18 60%), #070b14",
        }}
      >
        <main className="max-w-[1040px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase`} style={{ color: CYAN }}>
                ADMIN PANEL
              </span>
              <h1 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[30px] sm:text-[40px] leading-[1.1] mt-1`}>
                {title}
              </h1>
            </div>
            {/* <a> biasa (bukan Link) karena /dashboard bisa berupa halaman non-Inertia */}
            <a
              href="/dashboard?as=user"
              className={`${FONT_MONO} text-[11px] font-bold tracking-widest uppercase rounded-full px-4 py-2 hover:brightness-110 transition`}
              style={{ ...clayPill, color: MUTED }}
            >
              ← Tampilan pengguna
            </a>
          </header>

          <nav className="flex flex-wrap gap-2 mb-6" aria-label="Menu admin">
            {tabs.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                className={`${FONT_DESC} text-[14px] font-extrabold rounded-full px-5 py-2.5 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20`}
                style={
                  t.key === active
                    ? { background: CYAN, color: "#0a0e15", border: "2px solid #00b8cc", boxShadow: "0 3px 0 #00b8cc" }
                    : { ...clayPill, color: MUTED }
                }
              >
                {t.label}
              </Link>
            ))}
          </nav>

          {children}
        </main>
      </div>
    </>
  );
}
