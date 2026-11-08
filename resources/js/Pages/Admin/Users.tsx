import { useState } from "react";
import { router } from "@inertiajs/react";
import AdminShell, { clayCard, clayInset, clayPill, FONT_DESC, FONT_DISPLAY, FONT_MONO, MUTED, CYAN } from "./AdminShell";

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin" | string;
  created_at: string;
}
interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}
interface Props {
  users: { data: UserRow[]; links: PageLink[]; total: number };
  filters: { search: string };
  meId: number;
}

const cleanLabel = (l: string) =>
  l.replace(/<[^>]*>/g, "").replace("&laquo;", "«").replace("&raquo;", "»").replace("Previous", "Sebelumnya").replace("Next", "Berikutnya");

export default function Users({ users, filters, meId }: Props) {
  const [search, setSearch] = useState(filters.search ?? "");

  const doSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get("/admin/users", { search }, { preserveState: true, replace: true });
  };

  const toggleRole = (u: UserRow) => {
    const next = u.role === "admin" ? "user" : "admin";
    if (!window.confirm(`Ubah role ${u.name} menjadi "${next}"?`)) return;
    router.patch(`/admin/users/${u.id}/role`, { role: next }, { preserveScroll: true });
  };

  const remove = (u: UserRow) => {
    if (!window.confirm(`Hapus akun ${u.name}? Tindakan ini tidak bisa dibatalkan.`)) return;
    router.delete(`/admin/users/${u.id}`, { preserveScroll: true });
  };

  return (
    <AdminShell title="Kelola Pengguna" active="users">
      <section className="p-5 sm:p-6" style={clayCard}>
        <form onSubmit={doSearch} className="flex gap-2 mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email…"
            className={`${FONT_DESC} flex-1 min-w-0 px-4 py-3 text-[14px] text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20`}
            style={clayInset}
          />
          <button
            type="submit"
            className={`${FONT_DESC} rounded-[16px] px-5 text-[14px] font-extrabold hover:brightness-110 active:translate-y-[3px] transition`}
            style={{ background: CYAN, color: "#0a0e15", border: "2.5px solid #00b8cc", boxShadow: "0 4px 0 #00b8cc" }}
          >
            Cari
          </button>
        </form>

        <div className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase mb-3`} style={{ color: MUTED }}>
          {users.total} pengguna
        </div>

        <ul className="flex flex-col gap-2.5">
          {users.data.length === 0 && (
            <li className={`${FONT_DESC} text-[14px] p-4`} style={{ ...clayInset, color: MUTED }}>Tidak ada pengguna yang cocok.</li>
          )}
          {users.data.map((u) => {
            const isMe = u.id === meId;
            return (
              <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5" style={clayInset}>
                <div className="min-w-0">
                  <div className={`${FONT_DISPLAY} font-extrabold text-[15px] truncate`}>
                    {u.name} {isMe && <span className="text-[12px]" style={{ color: CYAN }}>(kamu)</span>}
                  </div>
                  <div className="font-mono text-[12px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{u.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1`} style={{ ...clayPill, color: u.role === "admin" ? "#a78bfa" : MUTED }}>
                    {u.role}
                  </span>
                  <button
                    type="button"
                    disabled={isMe}
                    onClick={() => toggleRole(u)}
                    className={`${FONT_DESC} text-[12px] font-extrabold rounded-full px-3.5 py-1.5 transition hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed`}
                    style={{ ...clayPill, color: "#fff" }}
                  >
                    {u.role === "admin" ? "Jadikan user" : "Jadikan admin"}
                  </button>
                  <button
                    type="button"
                    disabled={isMe}
                    onClick={() => remove(u)}
                    className={`${FONT_DESC} text-[12px] font-extrabold rounded-full px-3.5 py-1.5 transition hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed`}
                    style={{ ...clayPill, color: "#ff6b6b" }}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {users.links.length > 3 && (
          <nav className="flex flex-wrap gap-2 mt-5" aria-label="Halaman">
            {users.links.map((l, i) => (
              <button
                key={i}
                type="button"
                disabled={!l.url || l.active}
                onClick={() => l.url && router.get(l.url, {}, { preserveState: true, preserveScroll: true })}
                className={`${FONT_MONO} text-[11px] font-bold rounded-full px-3.5 py-2 transition hover:brightness-110 disabled:cursor-default`}
                style={l.active ? { background: CYAN, color: "#0a0e15" } : { ...clayPill, color: l.url ? "#fff" : "rgba(255,255,255,0.3)" }}
              >
                {cleanLabel(l.label)}
              </button>
            ))}
          </nav>
        )}
      </section>
    </AdminShell>
  );
}
