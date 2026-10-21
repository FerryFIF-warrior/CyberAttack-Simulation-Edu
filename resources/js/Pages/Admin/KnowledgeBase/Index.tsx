import { Head, router, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import type { FlashMessage } from "@/features/chat/types";

interface KnowledgeDocument {
    id: string;
    judul: string;
    sumber: string;
    chunk_count: number;
    status: string;
    indexed_at: string | null;
}

interface AiHealth {
    status: string;
    kb_chunks: number;
    model_llm: string | null;
    embedding: string | null;
}

interface KnowledgeBaseProps {
    documents: KnowledgeDocument[];
    aiError: string | null;
    health: AiHealth;
    flash?: FlashMessage | null;
}

function formatDate(value: string | null): string {
    if (!value) {
        return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function KnowledgeBaseIndex({ documents, aiError, health, flash }: KnowledgeBaseProps) {
    const form = useForm({
        judul: "",
        sumber: "",
        teks: "",
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post("/admin/knowledge-base", {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const reindex = () => {
        if (window.confirm("Index ulang seluruh dokumen knowledge base?")) {
            router.post("/admin/knowledge-base/reindex", {}, { preserveScroll: true });
        }
    };

    const remove = (document: KnowledgeDocument) => {
        if (window.confirm(`Hapus dokumen "${document.judul}" dari knowledge base?`)) {
            router.delete(`/admin/knowledge-base/${encodeURIComponent(document.id)}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{
                background:
                    "radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%),radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%),#070b14",
            }}
        >
            <Head title="Admin Knowledge Base" />

            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
                <header
                    className="p-5 sm:p-6"
                    style={{
                        background: "#162030",
                        border: "3px solid #233044",
                        borderRadius: 28,
                        boxShadow:
                            "0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08),inset 0 -3px 0 rgba(0,0,0,0.35)",
                    }}
                >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <span
                                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[0.14em]"
                                style={{
                                    background: "#0f1828",
                                    border: "2px solid rgba(255,255,255,0.07)",
                                    color: "rgba(255,255,255,0.6)",
                                    fontFamily: "'Space Mono',monospace",
                                }}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ background: health.status === "ok" ? "#34d399" : "#f87171" }} />
                                ADMIN · KNOWLEDGE BASE
                            </span>
                            <h1 className="mt-3 text-[24px] font-extrabold leading-tight text-white sm:text-[30px]" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>
                                Kelola sumber materi Chat-AI.
                            </h1>
                            <p className="mt-2 max-w-[620px] text-[13px] leading-6" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>
                                Registry dokumen, chunk, dan embedding dikelola AI Service (ChromaDB), bukan MySQL. Setiap perubahan langsung memengaruhi retrieval Chat-AI.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={reindex}
                            className="inline-flex items-center gap-2 rounded-[14px] px-4 py-3 text-[12px] font-extrabold transition active:translate-y-[2px]"
                            style={{
                                background: "#0f1828",
                                color: "#a9f3fa",
                                border: "2px solid rgba(0,229,255,0.2)",
                                boxShadow: "0 4px 0 rgba(0,0,0,0.35)",
                                fontFamily: "'Nunito',sans-serif",
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5" />
                            </svg>
                            Reindex Semua
                        </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            { label: "Dokumen", value: String(documents.length) },
                            { label: "Chunk", value: String(health.kb_chunks) },
                            { label: "Model LLM", value: health.model_llm ?? "-" },
                            { label: "Embedding", value: health.embedding ?? "-" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="px-3 py-3"
                                style={{
                                    background: "#0f1828",
                                    border: "2px solid rgba(255,255,255,0.06)",
                                    borderRadius: 16,
                                    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.45)",
                                }}
                            >
                                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#8b98ab]" style={{ fontFamily: "'Space Mono',monospace" }}>
                                    {stat.label}
                                </p>
                                <p className="mt-1 truncate text-[13px] font-extrabold text-white" title={stat.value}>
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </header>

                {(aiError || flash?.error) && (
                    <div
                        role="alert"
                        className="mt-4 rounded-[16px] px-4 py-3 text-[12px] font-bold leading-5"
                        style={{ background: "rgba(248,113,113,0.09)", border: "2px solid rgba(248,113,113,0.25)", color: "#fca5a5" }}
                    >
                        {flash?.error ?? aiError}
                    </div>
                )}

                {flash?.status && (
                    <div
                        className="mt-4 rounded-[16px] px-4 py-3 text-[12px] font-bold"
                        style={{ background: "rgba(52,211,153,0.08)", border: "2px solid rgba(52,211,153,0.2)", color: "#86efac" }}
                    >
                        {flash.status}
                    </div>
                )}

                <div className="mt-4 grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
                    <section
                        className="p-4 sm:p-5"
                        style={{
                            background: "#162030",
                            border: "3px solid #233044",
                            borderRadius: 24,
                            boxShadow: "0 18px 36px rgba(0,0,0,0.45),inset 0 1.5px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        <h2 className="text-[15px] font-extrabold text-white" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>
                            Ingest Dokumen
                        </h2>
                        <p className="mt-1 text-[11px] font-bold leading-5 text-white/40">
                            Teks dipecah 70 kata dengan overlap 15 kata, lalu di-embed dan disimpan ke ChromaDB.
                        </p>

                        <form onSubmit={submit} className="mt-4 space-y-3">
                            <div>
                                <label htmlFor="kb-judul" className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-[#8b98ab]" style={{ fontFamily: "'Space Mono',monospace" }}>
                                    Judul
                                </label>
                                <input
                                    id="kb-judul"
                                    value={form.data.judul}
                                    onChange={(event) => form.setData("judul", event.target.value)}
                                    maxLength={200}
                                    className="w-full rounded-[12px] px-3 py-2.5 text-[12px] font-bold text-white outline-none"
                                    style={{ background: "#0f1828", border: "2px solid rgba(255,255,255,0.07)" }}
                                    placeholder="Contoh: Dasar Phishing"
                                />
                                {form.errors.judul && <p className="mt-1 text-[10px] font-bold text-red-300">{form.errors.judul}</p>}
                            </div>

                            <div>
                                <label htmlFor="kb-sumber" className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-[#8b98ab]" style={{ fontFamily: "'Space Mono',monospace" }}>
                                    Sumber
                                </label>
                                <input
                                    id="kb-sumber"
                                    value={form.data.sumber}
                                    onChange={(event) => form.setData("sumber", event.target.value)}
                                    maxLength={200}
                                    className="w-full rounded-[12px] px-3 py-2.5 text-[12px] font-bold text-white outline-none"
                                    style={{ background: "#0f1828", border: "2px solid rgba(255,255,255,0.07)" }}
                                    placeholder="Nama file atau modul"
                                />
                                {form.errors.sumber && <p className="mt-1 text-[10px] font-bold text-red-300">{form.errors.sumber}</p>}
                            </div>

                            <div>
                                <label htmlFor="kb-teks" className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-[#8b98ab]" style={{ fontFamily: "'Space Mono',monospace" }}>
                                    Teks Materi
                                </label>
                                <textarea
                                    id="kb-teks"
                                    value={form.data.teks}
                                    onChange={(event) => form.setData("teks", event.target.value)}
                                    rows={8}
                                    className="w-full resize-y rounded-[12px] px-3 py-2.5 text-[12px] font-bold leading-5 text-white outline-none"
                                    style={{ background: "#0f1828", border: "2px solid rgba(255,255,255,0.07)" }}
                                    placeholder="Tempel isi materi yang akan dijadikan sumber jawaban..."
                                />
                                {form.errors.teks && <p className="mt-1 text-[10px] font-bold text-red-300">{form.errors.teks}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] px-4 py-3 text-[12px] font-extrabold transition active:translate-y-[2px] disabled:opacity-50"
                                style={{
                                    background: "#00e5ff",
                                    color: "#041016",
                                    border: "2px solid #00b8cc",
                                    boxShadow: "0 4px 0 #00b8cc, 0 8px 18px rgba(0,0,0,0.3)",
                                    fontFamily: "'Nunito',sans-serif",
                                }}
                            >
                                {form.processing ? "Meng-index..." : "Simpan & Index"}
                            </button>
                        </form>
                    </section>

                    <section
                        className="p-4 sm:p-5"
                        style={{
                            background: "#162030",
                            border: "3px solid #233044",
                            borderRadius: 24,
                            boxShadow: "0 18px 36px rgba(0,0,0,0.45),inset 0 1.5px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-[15px] font-extrabold text-white" style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}>
                                    Dokumen Terindeks
                                </h2>
                                <p className="mt-1 text-[11px] font-bold text-white/40">Registry AI Service · status indexing per dokumen</p>
                            </div>
                            <span className="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#8b98ab]" style={{ background: "#0f1828", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Space Mono',monospace" }}>
                                {documents.length} DOKUMEN
                            </span>
                        </div>

                        <div className="mt-4 space-y-2">
                            {documents.length === 0 && (
                                <div className="rounded-[16px] px-4 py-8 text-center" style={{ background: "#0f1828", border: "1px dashed rgba(255,255,255,0.09)" }}>
                                    <p className="text-[13px] font-extrabold text-white/60">Belum ada dokumen terindeks</p>
                                    <p className="mt-1 text-[11px] font-bold text-white/30">
                                        Tambahkan materi lewat form, atau jalankan seed_documents.py pada AI Service.
                                    </p>
                                </div>
                            )}

                            {documents.map((document) => (
                                <article
                                    key={document.id}
                                    className="flex flex-wrap items-start justify-between gap-3 rounded-[16px] px-3 py-3"
                                    style={{ background: "#0f1828", border: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="truncate text-[13px] font-extrabold text-white">{document.judul}</p>
                                            <span
                                                className="rounded-full px-2 py-0.5 text-[8px] font-extrabold tracking-widest"
                                                style={{
                                                    background: document.status === "indexed" ? "rgba(52,211,153,0.1)" : "rgba(250,204,21,0.1)",
                                                    border: `1px solid ${document.status === "indexed" ? "rgba(52,211,153,0.25)" : "rgba(250,204,21,0.25)"}`,
                                                    color: document.status === "indexed" ? "#86efac" : "#fde68a",
                                                    fontFamily: "'Space Mono',monospace",
                                                }}
                                            >
                                                {document.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[10px] font-bold text-white/35">
                                            {document.sumber} · {document.chunk_count} chunk · {formatDate(document.indexed_at)}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => remove(document)}
                                        className="grid h-8 w-8 place-items-center rounded-full text-white/25 transition hover:bg-red-500/10 hover:text-red-300"
                                        aria-label={`Hapus dokumen ${document.judul}`}
                                        title="Hapus dokumen"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v6m4-6v6" />
                                        </svg>
                                    </button>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
