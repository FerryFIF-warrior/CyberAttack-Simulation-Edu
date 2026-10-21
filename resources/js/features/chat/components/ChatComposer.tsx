import type { FormEvent, KeyboardEvent } from "react";

interface ChatComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled: boolean;
    maxLength?: number;
}

export function ChatComposer({ value, onChange, onSubmit, disabled, maxLength = 1000 }: ChatComposerProps) {
    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (!disabled && value.trim() !== "") {
            onSubmit();
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (!disabled && value.trim() !== "") {
                onSubmit();
            }
        }
    };

    return (
        <form onSubmit={submit} className="mt-4">
            <div
                className="flex items-end gap-2 p-2"
                style={{
                    background: "#0f1828",
                    border: "2px solid rgba(255,255,255,0.07)",
                    borderRadius: 20,
                    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.45)",
                }}
            >
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={maxLength}
                    rows={2}
                    placeholder="Tanyakan materi keamanan siber... (Enter kirim, Shift+Enter baris baru)"
                    aria-label="Pertanyaan untuk Chat-AI"
                    disabled={disabled}
                    className="min-h-[52px] flex-1 resize-none bg-transparent px-3 py-2 text-[13px] leading-6 text-white outline-none placeholder:text-white/25 disabled:opacity-60"
                />
                <button
                    type="submit"
                    disabled={disabled || value.trim() === ""}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-[14px] px-4 py-3 text-[12px] font-extrabold transition active:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                        background: "#00e5ff",
                        color: "#041016",
                        border: "2px solid #00b8cc",
                        boxShadow: "0 4px 0 #00b8cc, 0 8px 18px rgba(0,0,0,0.3)",
                        fontFamily: "'Nunito',sans-serif",
                    }}
                >
                    {disabled ? "Menunggu..." : "Kirim"}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h15m0 0-6-6m6 6-6 6" />
                    </svg>
                </button>
            </div>
            <div className="mt-1 flex items-center justify-between px-1">
                <span className="text-[9px] font-bold tracking-widest text-white/20" style={{ fontFamily: "'Space Mono',monospace" }}>
                    {value.length}/{maxLength}
                </span>
                <span className="text-[9px] font-bold text-white/20" style={{ fontFamily: "'Space Mono',monospace" }}>
                    RAG · Groq · sumber dapat ditelusuri
                </span>
            </div>
        </form>
    );
}
