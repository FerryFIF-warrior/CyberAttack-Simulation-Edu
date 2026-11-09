import { Link } from "@inertiajs/react";
import AdminShell, { clayCard, clayInset, clayPill, FONT_DESC, FONT_DISPLAY, FONT_MONO, MUTED } from "./AdminShell";

interface RecentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}
interface Props {
  stats: { totalUsers: number; totalAdmins: number; newThisWeek: number };
  registrations: { date: string; count: number }[];
  levels: { label: string; total: number }[];
  content: { materi: number; kuis: number; badge: number };
  recentUsers: RecentUser[];
}

const statCards = [
  { key: "totalUsers", label: "Total pengguna", accent: "#00e5ff" },
  { key: "newThisWeek", label: "Baru 7 hari terakhir", accent: "#34d399" },
  { key: "totalAdmins", label: "Administrator", accent: "#a78bfa" },
] as const;

const contentCards = [
  { key: "materi", label: "Materi", href: "/admin/content/materi", accent: "#00e5ff" },
  { key: "kuis", label: "Soal kuis", href: "/admin/content/kuis", accent: "#ffb020" },
  { key: "badge", label: "Badge", href: "/admin/content/badge", accent: "#34d399" },
] as const;

export default function Dashboard({ stats, registrations, levels, content, recentUsers }: Props) {
  const max = Math.max(1, ...registrations.map((r) => r.count));
  const maxLevel = Math.max(1, ...levels.map((l) => l.total));

  return (
    <AdminShell title="Dashboard Administrator" active="dashboard">
      {/* Statistik pengguna */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statCards.map((c) => (
          <div key={c.key} className="relative overflow-hidden p-5" style={{ ...clayCard, border: `3px solid ${c.accent}55` }}>
            <div className="absolute top-0 left-6 right-6 h-[4px] rounded-full" style={{ background: c.accent, boxShadow: `0 2px 10px ${c.accent}55` }} />
            <div className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase`} style={{ color: MUTED }}>
              {c.label}
            </div>
            <div className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[40px] leading-none mt-3`} style={{ color: c.accent }}>
              {stats[c.key]}
            </div>
          </div>
        ))}
      </div>

      {/* Grafik pendaftaran + sebaran level */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <section className="lg:col-span-8 p-5 sm:p-6" style={clayCard}>
          <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[20px] mb-1`}>Pendaftaran 14 hari terakhir</h2>
          <p className={`${FONT_DESC} text-[13px] mb-4`} style={{ color: MUTED }}>Jumlah akun baru per hari.</p>
          <div className="flex items-end gap-1.5 h-[140px] p-3" style={clayInset} role="img" aria-label="Grafik pendaftaran pengguna">
            {registrations.map((r) => (
              <div key={r.date} className="flex-1 flex flex-col items-center justify-end h-full gap-1 min-w-0">
                <span className={`${FONT_MONO} text-[9px]`} style={{ color: MUTED }}>{r.count > 0 ? r.count : ""}</span>
                <div
                  className="w-full rounded-t-[6px]"
                  style={{ height: `${Math.max(4, (r.count / max) * 100)}%`, background: r.count > 0 ? "#00e5ff" : "rgba(255,255,255,0.08)" }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1.5 px-3 mt-1.5">
            {registrations.map((r, i) => (
              <span key={r.date} className={`${FONT_MONO} flex-1 text-center text-[8px] min-w-0`} style={{ color: "rgba(255,255,255,0.4)" }}>
                {i % 2 === 0 ? r.date : ""}
              </span>
            ))}
          </div>
        </section>

        <section className="lg:col-span-4 p-5 sm:p-6" style={clayCard}>
          <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[20px] mb-4`}>Sebaran level</h2>
          {levels.length === 0 ? (
            <p className={`${FONT_DESC} text-[13px]`} style={{ color: MUTED, lineHeight: "22px" }}>
              Kolom level belum ditemukan di tabel pengguna, jadi data ini belum tampil.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {levels.map((l) => (
                <li key={l.label}>
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className={FONT_DESC}>Level {l.label}</span>
                    <span className={FONT_MONO} style={{ color: MUTED }}>{l.total}</span>
                  </div>
                  <div className="h-2.5 rounded-full" style={clayInset}>
                    <div className="h-full rounded-full" style={{ width: `${(l.total / maxLevel) * 100}%`, background: "#a78bfa" }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Konten yang dikelola */}
      <section className="p-5 sm:p-6 mb-6" style={clayCard}>
        <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[20px] mb-4`}>Konten yang dikelola</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {contentCards.map((c) => (
            <Link key={c.key} href={c.href} className="p-4 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20" style={clayInset}>
              <div className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[32px] leading-none`} style={{ color: c.accent }}>
                {content[c.key]}
              </div>
              <div className={`${FONT_DESC} text-[13px] mt-2`} style={{ color: MUTED }}>{c.label} · kelola →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pengguna terbaru */}
      <section className="p-5 sm:p-6" style={clayCard}>
        <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[20px] mb-4`}>Pengguna terbaru</h2>
        <ul className="flex flex-col gap-2.5">
          {recentUsers.length === 0 && (
            <li className={`${FONT_DESC} text-[14px]`} style={{ color: MUTED }}>Belum ada pengguna.</li>
          )}
          {recentUsers.map((u) => (
            <li key={u.id} className="flex items-center justify-between gap-3 px-4 py-3" style={clayInset}>
              <div className="min-w-0">
                <div className={`${FONT_DISPLAY} font-extrabold text-[15px] truncate`}>{u.name}</div>
                <div className="font-mono text-[12px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{u.email}</div>
              </div>
              <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1 shrink-0`} style={{ ...clayPill, color: u.role === "admin" ? "#a78bfa" : MUTED }}>
                {u.role}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
