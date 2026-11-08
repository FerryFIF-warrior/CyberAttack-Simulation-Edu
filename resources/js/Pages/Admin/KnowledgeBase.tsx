import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AdminShell, { clayCard, clayInset, clayPill, FONT_DESC, FONT_DISPLAY, FONT_MONO, MUTED, CYAN } from "./AdminShell";

interface Doc {
  id: string | number;
  title: string;
  source?: string;
  status?: string;
  chunks?: number;
  created_at?: string;
}
interface Props {
  connected: boolean;
  message: string | null;
  documents: Doc[];
}

const inputCls = `${FONT_DESC} w-full px-4 py-3 text-[14px] text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20`;

const statusColor = (s?: string) =>
  s === "indexed" ? "#34d399" : s === "failed" ? "#ff6b6b" : s === "indexing" ? "#ffb020" : "rgba(255,255,255,0.5)";

export default function KnowledgeBase({ connected, message, documents }: Props) {
  const { errors } = usePage().props as { errors?: Record<string, string> };
  const [form, setForm] = useState({ title: "", source: "", content: "" });
  const [busy, setBusy] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    router.post("/admin/knowledge-base", form, {
      preserveScroll: true,
      onSuccess: () => setForm({ title: "", source: "", content: "" }),
      onFinish: () => setBusy(false),
    });
  };

  const remove = (d: Doc) => {
    if (!window.confirm(`Hapus dokumen "${d.title}" dari knowledge base?`)) return;
    router.delete(`/admin/knowledge-base/${d.id}`, { preserveScroll: true });
  };

  const reindex = () => {
    if (!window.confirm("Mulai indexing ulang seluruh dokumen?")) return;
    router.post("/admin/knowledge-base/reindex", {}, { preserveScroll: true });
  };

  return (
    <AdminShell title="Knowledge Base AI" active="kb">
      <p className={`${FONT_DESC} text-[14px] mb-5 max-w-[70ch]`} style={{ color: MUTED, lineHeight: "24px" }}>
        Kelola sumber materi yang dipakai Chat-AI Tutor (FR-16). Dokumen dan embedding disimpan di AI Service, dan kunci API hanya ada di server.
      </p>

      {/* Status koneksi */}
      <div className="flex flex-wrap items-center gap-3 p-4 mb-6" style={{ ...clayCard, border: `3px solid ${connected ? "#34d39955" : "#ffb02055"}` }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: connected ? "#34d399" : "#ffb020", boxShadow: `0 0 10px ${connected ? "#34d399" : "#ffb020"}88` }} />
        <span className={`${FONT_MONO} text-[11px] font-bold tracking-widest uppercase`}>
          {connected ? "AI Service terhubung" : "AI Service tidak terhubung"}
        </span>
        {!connected && message && <span className={`${FONT_DESC} text-[13px]`} style={{ color: MUTED }}>{message}</span>}
        {connected && (
          <button type="button" onClick={reindex} className={`${FONT_DESC} ml-auto text-[12px] font-extrabold rounded-full px-4 py-2 hover:brightness-110 transition`} style={{ ...clayPill, color: "#fff" }}>
            Indexing ulang
          </button>
        )}
      </div>

      {errors?.service && (
        <div className={`${FONT_DESC} text-[13px] p-4 mb-6`} style={{ ...clayInset, color: "#ff6b6b" }}>{errors.service}</div>
      )}

      {/* Form tambah dokumen */}
      <section className="p-5 sm:p-6 mb-6" style={clayCard}>
        <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[20px] mb-4`}>Tambah sumber materi</h2>
        <form onSubmit={add} className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label>
              <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase block mb-1.5`} style={{ color: MUTED }}>Judul</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} style={clayInset} disabled={!connected} />
              {errors?.title && <span className="text-[12px] block mt-1" style={{ color: "#ff6b6b" }}>{errors.title}</span>}
            </label>
            <label>
              <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase block mb-1.5`} style={{ color: MUTED }}>Sumber (opsional)</span>
              <input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className={inputCls} style={clayInset} disabled={!connected} />
            </label>
          </div>
          <label>
            <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase block mb-1.5`} style={{ color: MUTED }}>Isi dokumen</span>
            <textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputCls} style={clayInset} disabled={!connected} />
            {errors?.content && <span className="text-[12px] block mt-1" style={{ color: "#ff6b6b" }}>{errors.content}</span>}
          </label>
          <div>
            <button
              type="submit"
              disabled={!connected || busy}
              className={`${FONT_DESC} rounded-[16px] px-6 py-3 text-[14px] font-extrabold hover:brightness-110 active:translate-y-[3px] transition disabled:opacity-40 disabled:cursor-not-allowed`}
              style={{ background: CYAN, color: "#0a0e15", border: "2.5px solid #00b8cc", boxShadow: "0 4px 0 #00b8cc" }}
            >
              {busy ? "Mengirim…" : "Tambahkan"}
            </button>
          </div>
        </form>
      </section>

      {/* Daftar dokumen */}
      <section className="p-5 sm:p-6" style={clayCard}>
        <div className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase mb-3`} style={{ color: MUTED }}>{documents.length} dokumen</div>
        <ul className="flex flex-col gap-2.5">
          {documents.length === 0 && (
            <li className={`${FONT_DESC} text-[14px] p-4`} style={{ ...clayInset, color: MUTED }}>
              {connected ? "Belum ada dokumen di knowledge base." : "Daftar dokumen akan tampil setelah AI Service terhubung."}
            </li>
          )}
          {documents.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5" style={clayInset}>
              <div className="min-w-0 flex-1">
                <div className={`${FONT_DISPLAY} font-extrabold text-[15px]`}>{d.title}</div>
                <div className="font-mono text-[12px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {d.source || "tanpa sumber"} · {d.chunks ?? 0} chunk
                </div>
              </div>
              <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1`} style={{ ...clayPill, color: statusColor(d.status) }}>
                {d.status ?? "unknown"}
              </span>
              <button type="button" onClick={() => remove(d)} className={`${FONT_DESC} text-[12px] font-extrabold rounded-full px-3.5 py-1.5 hover:brightness-110 transition`} style={{ ...clayPill, color: "#ff6b6b" }}>
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
