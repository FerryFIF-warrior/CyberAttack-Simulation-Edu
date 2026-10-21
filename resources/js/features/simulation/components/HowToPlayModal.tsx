import type { FC } from "react";

interface HowToPlayModalProps {
    open: boolean;
    onClose: () => void;
}

const STORAGE_PREFIX = "sc-howto:";

export function hasSeenHowToPlay(simulationId: string): boolean {
    if (typeof window === "undefined") {
        return false;
    }
    try {
        return window.localStorage.getItem(STORAGE_PREFIX + simulationId) === "1";
    } catch {
        return false;
    }
}

export function markHowToPlaySeen(simulationId: string): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        window.localStorage.setItem(STORAGE_PREFIX + simulationId, "1");
    } catch {
        // localStorage tidak tersedia — auto-tampil akan muncul kembali.
    }
}

function SectionTitle({ children }: { children: string }) {
    return (
        <p
            className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8b98ab]"
            style={{ fontFamily: "'Space Mono',monospace" }}
        >
            {children}
        </p>
    );
}

export const HowToPlayModal: FC<HowToPlayModalProps> = ({ open, onClose }) => {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[65] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="how-to-play-title"
            onClick={onClose}
        >
            <div
                className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-clay-line bg-clay-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <span
                            className="inline-flex items-center gap-2 rounded-full border border-clay-line bg-clay-inset px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] text-[#8b98ab]"
                            style={{ fontFamily: "'Space Mono',monospace" }}
                        >
                            PANDUAN
                        </span>
                        <h2
                            id="how-to-play-title"
                            className="mt-2.5 text-[20px] font-bold text-white"
                            style={{ fontFamily: "'Nunito',sans-serif" }}
                        >
                            Cara Bermain
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup panduan"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8b98ab] transition hover:bg-white/5 hover:text-white"
                        style={{ background: "#0f1828", border: "2px solid rgba(255,255,255,0.07)" }}
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
                        </svg>
                    </button>
                </div>

                <div className="mt-5 space-y-4">
                    <div className="rounded-xl border border-clay-line bg-clay-inset/60 p-4">
                        <SectionTitle>Kontrol</SectionTitle>
                        <ul className="mt-2 space-y-2 text-[13px] leading-6 text-slate-200">
                            <li className="flex gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" />
                                <span>
                                    Gerak: tombol <strong className="font-semibold text-white">panah</strong> atau{" "}
                                    <strong className="font-semibold text-white">WASD</strong> di laptop. Di HP gunakan D-Pad di pojok kiri bawah.
                                </span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00e5ff]" />
                                <span>
                                    Interaksi: dekati objek sampai prompt muncul, lalu tekan{" "}
                                    <strong className="font-semibold text-white">E</strong> atau{" "}
                                    <strong className="font-semibold text-white">Enter</strong>. Objek tidak dapat diklik langsung.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-clay-line bg-clay-inset/60 p-4">
                        <SectionTitle>Alur Satu Floor</SectionTitle>
                        <ol className="mt-2 space-y-2 text-[13px] leading-6 text-slate-200">
                            <li className="flex gap-2.5">
                                <span
                                    className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-clay-surface text-[10px] font-bold text-[#00e5ff]"
                                    style={{ border: "1px solid #233044", fontFamily: "'Space Mono',monospace" }}
                                >
                                    1
                                </span>
                                <span>Jelajahi map dan dekati objek interaktif.</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span
                                    className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-clay-surface text-[10px] font-bold text-[#00e5ff]"
                                    style={{ border: "1px solid #233044", fontFamily: "'Space Mono',monospace" }}
                                >
                                    2
                                </span>
                                <span>Baca narasi, lanjutkan sampai pertanyaan muncul.</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span
                                    className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-clay-surface text-[10px] font-bold text-[#00e5ff]"
                                    style={{ border: "1px solid #233044", fontFamily: "'Space Mono',monospace" }}
                                >
                                    3
                                </span>
                                <span>Pilih satu dari tiga tindakan yang tersedia.</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span
                                    className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-clay-surface text-[10px] font-bold text-[#00e5ff]"
                                    style={{ border: "1px solid #233044", fontFamily: "'Space Mono',monospace" }}
                                >
                                    4
                                </span>
                                <span>Lihat narasi hasil dan poin, lalu lanjut ke floor berikutnya.</span>
                            </li>
                        </ol>
                    </div>

                    <div className="rounded-xl border border-clay-line bg-clay-inset/60 p-4">
                        <SectionTitle>Poin &amp; Level</SectionTitle>
                        <ul className="mt-2 space-y-2 text-[13px] leading-6 text-slate-200">
                            <li className="flex gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffd23a]" />
                                <span>Poin hanya muncul setelah memilih. Nilai bisa positif, nol, atau negatif.</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffd23a]" />
                                <span>Total poin level hanya ditampilkan di floor terakhir, dengan rentang 0 sampai 20.</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffd23a]" />
                                <span>Level berikutnya terbuka setelah level sebelumnya selesai dengan skor minimal 15.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="mt-5 w-full rounded-[16px] px-5 py-3 text-sm font-extrabold transition hover:brightness-110"
                    style={{
                        background: "#ffd23a",
                        color: "#1a1400",
                        border: "2.5px solid #e6b800",
                        boxShadow: "0 4px 0 #e6b800, 0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.35)",
                        fontFamily: "'Nunito',sans-serif",
                    }}
                >
                    Mengerti
                </button>
            </div>
        </div>
    );
};
