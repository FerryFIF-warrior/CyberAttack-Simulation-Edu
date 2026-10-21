import type { SourceRef } from "@/features/chat/types";

export function SourceChips({ sources }: { sources: SourceRef[] }) {
    if (sources.length === 0) {
        return null;
    }

    return (
        <div className="mt-3 flex flex-wrap gap-1.5">
            {sources.map((source, index) => (
                <span
                    key={`${source.id}-${source.halaman ?? "materi"}-${index}`}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{
                        background: "rgba(0,229,255,0.08)",
                        border: "1px solid rgba(0,229,255,0.18)",
                        color: "#7de8f2",
                        fontFamily: "'Space Mono',monospace",
                    }}
                >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
                    </svg>
                    {source.judul}
                    {source.halaman !== null && source.halaman > 0 ? ` · Hal. ${source.halaman}` : " · Materi"}
                </span>
            ))}
        </div>
    );
}
