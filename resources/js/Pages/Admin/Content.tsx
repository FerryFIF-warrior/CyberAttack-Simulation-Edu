import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import AdminShell, { clayCard, clayInset, clayPill, FONT_DESC, FONT_DISPLAY, FONT_MONO, MUTED, CYAN, type AdminTab } from "./AdminShell";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "lines" | "file";
  options?: string[];
  help?: string;
}
interface Props {
  resource: { key: string; title: string; description: string; columns: string[]; fields: Field[] };
  items: Record<string, any>[];
}

const inputCls =
  `${FONT_DESC} w-full px-4 py-3 text-[14px] text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20`;

export default function Content({ resource, items }: Props) {
  const labelOf = (name: string) => resource.fields.find((f) => f.name === name)?.label ?? name;

  const emptyForm = () =>
    Object.fromEntries(
      resource.fields.map((f) => [f.name, f.type === "select" ? f.options?.[0] ?? "" : f.type === "number" ? "0" : ""])
    ) as Record<string, string>;

  const [form, setForm] = useState<Record<string, string>>(emptyForm());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [removeDoc, setRemoveDoc] = useState(false);
  const [editingDoc, setEditingDoc] = useState("");

  // Reset form saat pindah antara Materi / Kuis / Badge
  useEffect(() => {
    setForm(emptyForm());
    setEditingId(null);
    setErrors({});
    setFiles({});
    setRemoveDoc(false);
    setEditingDoc("");
  }, [resource.key]);

  const reset = () => {
    setForm(emptyForm());
    setEditingId(null);
    setErrors({});
    setFiles({});
    setRemoveDoc(false);
    setEditingDoc("");
  };

  const startEdit = (row: Record<string, any>) => {
    setEditingId(row.id);
    setForm(Object.fromEntries(resource.fields.map((f) => [f.name, String(row[f.name] ?? "")])));
    setErrors({});
    setFiles({});
    setRemoveDoc(false);
    setEditingDoc(String(row.document_name ?? ""));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const base = `/admin/content/${resource.key}`;
    const opts = {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errs: Record<string, string>) => setErrors(errs),
      onFinish: () => setSaving(false),
      forceFormData: true,
    };
    // Kirim file: field file diambil dari state files, bukan dari form teks
    const payload: Record<string, any> = { ...form };
    resource.fields.filter((f) => f.type === "file").forEach((f) => delete payload[f.name]);
    Object.entries(files).forEach(([k, file]) => {
      if (file) payload[k] = file;
    });
    if (removeDoc) payload.remove_document = true;

    // PUT tidak bisa membawa file, jadi memakai POST dengan _method=put
    if (editingId) router.post(`${base}/${editingId}`, { ...payload, _method: "put" }, opts);
    else router.post(base, payload, opts);
  };

  const remove = (row: Record<string, any>) => {
    if (!window.confirm("Hapus data ini? Tindakan ini tidak bisa dibatalkan.")) return;
    router.delete(`/admin/content/${resource.key}/${row.id}`, { preserveScroll: true });
  };

  return (
    <AdminShell title={resource.title} active={resource.key as AdminTab}>
      <p className={`${FONT_DESC} text-[14px] mb-5 max-w-[70ch]`} style={{ color: MUTED, lineHeight: "24px" }}>
        {resource.description}
      </p>

      {/* Form tambah / ubah */}
      <section className="p-5 sm:p-6 mb-6" style={clayCard}>
        <h2 className={`${FONT_DISPLAY} font-extrabold tracking-tight text-[20px] mb-4`}>
          {editingId ? "Ubah data" : "Tambah data baru"}
        </h2>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          {resource.fields.map((f) => {
            const wide = f.type === "textarea" || f.type === "lines" || f.type === "file";
            return (
              <label key={f.name} className={wide ? "sm:col-span-2" : ""}>
                <span className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase block mb-1.5`} style={{ color: MUTED }}>
                  {f.label}
                </span>
                {f.type === "file" ? (
                  <div className="p-3 flex flex-wrap items-center gap-3" style={clayInset}>
                    <span
                      className={`${FONT_DESC} relative cursor-pointer text-[13px] font-extrabold rounded-full px-4 py-2 hover:brightness-110 transition focus-within:ring-2 focus-within:ring-white/20`}
                      style={{ ...clayPill, color: "#fff" }}
                    >
                      Pilih file
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setFiles({ ...files, [f.name]: e.target.files?.[0] ?? null })}
                      />
                    </span>
                    <span className={`${FONT_DESC} text-[13px] min-w-0 break-all`} style={{ color: MUTED }}>
                      {files[f.name]?.name ?? (editingDoc && !removeDoc ? `Saat ini: ${editingDoc}` : "Belum ada file dipilih")}
                    </span>
                    {editingId && editingDoc && (
                      <label className={`${FONT_DESC} flex items-center gap-2 text-[12px] cursor-pointer`} style={{ color: MUTED }}>
                        <input type="checkbox" checked={removeDoc} onChange={(e) => setRemoveDoc(e.target.checked)} />
                        Hapus dokumen saat ini
                      </label>
                    )}
                  </div>
                ) : f.type === "select" ? (
                  <select value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className={inputCls} style={clayInset}>
                    {f.options?.map((o) => (
                      <option key={o} value={o} className="bg-[#0f1828]">{o}</option>
                    ))}
                  </select>
                ) : wide ? (
                  <textarea
                    rows={f.type === "lines" ? 4 : 3}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className={inputCls}
                    style={clayInset}
                  />
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className={inputCls}
                    style={clayInset}
                  />
                )}
                {f.help && <span className={`${FONT_DESC} text-[12px] block mt-1`} style={{ color: "rgba(255,255,255,0.45)" }}>{f.help}</span>}
                {(errors[f.name] || errors[`${f.name}.0`]) && (
                  <span className={`${FONT_DESC} text-[12px] block mt-1`} style={{ color: "#ff6b6b" }}>{errors[f.name] || errors[`${f.name}.0`]}</span>
                )}
              </label>
            );
          })}
          <div className="sm:col-span-2 flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className={`${FONT_DESC} rounded-[16px] px-6 py-3 text-[14px] font-extrabold hover:brightness-110 active:translate-y-[3px] transition disabled:opacity-60`}
              style={{ background: CYAN, color: "#0a0e15", border: "2.5px solid #00b8cc", boxShadow: "0 4px 0 #00b8cc" }}
            >
              {saving ? "Menyimpan…" : editingId ? "Simpan perubahan" : "Tambah"}
            </button>
            {editingId && (
              <button type="button" onClick={reset} className={`${FONT_DESC} rounded-[16px] px-5 py-3 text-[14px] font-extrabold hover:brightness-110`} style={{ ...clayPill, color: "#fff" }}>
                Batal
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Daftar */}
      <section className="p-5 sm:p-6" style={clayCard}>
        <div className={`${FONT_MONO} text-[10px] font-bold tracking-widest uppercase mb-3`} style={{ color: MUTED }}>
          {items.length} data
        </div>
        <ul className="flex flex-col gap-2.5">
          {items.length === 0 && (
            <li className={`${FONT_DESC} text-[14px] p-4`} style={{ ...clayInset, color: MUTED }}>Belum ada data. Tambahkan lewat form di atas.</li>
          )}
          {items.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5" style={clayInset}>
              <div className="min-w-0 flex-1">
                <div className={`${FONT_DISPLAY} font-extrabold text-[15px] leading-snug`}>
                  {String(row[resource.columns.find((c) => ["title", "question", "name"].includes(c)) ?? resource.columns[0]])}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {resource.columns
                    .filter((c) => !["title", "question", "name"].includes(c))
                    .map((c) => (
                      <span key={c} className={`${FONT_MONO} text-[9px] font-bold tracking-widest uppercase rounded-full px-2 py-0.5`} style={{ ...clayPill, color: MUTED }}>
                        {labelOf(c)}: {String(row[c] ?? "-").slice(0, 40)}
                      </span>
                    ))}
                  {row.document_name && (
                    <a
                      href={`/admin/content/${resource.key}/${row.id}/document`}
                      className={`${FONT_MONO} text-[9px] font-bold tracking-widest uppercase rounded-full px-2 py-0.5 hover:brightness-125 transition`}
                      style={{ ...clayPill, color: CYAN }}
                    >
                      Dokumen: {String(row.document_name).slice(0, 40)}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => startEdit(row)} className={`${FONT_DESC} text-[12px] font-extrabold rounded-full px-3.5 py-1.5 hover:brightness-110 transition`} style={{ ...clayPill, color: "#fff" }}>
                  Ubah
                </button>
                <button type="button" onClick={() => remove(row)} className={`${FONT_DESC} text-[12px] font-extrabold rounded-full px-3.5 py-1.5 hover:brightness-110 transition`} style={{ ...clayPill, color: "#ff6b6b" }}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AdminShell>
  );
}
