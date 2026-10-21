import type { ChatMessage } from "@/features/chat/types";
import { SourceChips } from "@/features/chat/components/SourceChips";

interface MessageBubbleProps {
    message: ChatMessage;
    onFeedback: (messageId: number, feedback: 0 | 1) => void;
    feedbackPending?: boolean;
}

function formatTime(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ message, onFeedback, feedbackPending = false }: MessageBubbleProps) {
    const isUser = message.role === "user";
    const isTemporary = message.id < 0;

    return (
        <article className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            <div
                className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold"
                style={{
                    background: isUser ? "#00e5ff" : "#1b2a3f",
                    color: isUser ? "#041016" : "#8eeaf2",
                    border: isUser ? "2px solid #00b8cc" : "2px solid #2a3b52",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                    fontFamily: "'Space Mono',monospace",
                }}
                aria-hidden="true"
            >
                {isUser ? "ME" : "AI"}
            </div>

            <div className={`min-w-0 max-w-[86%] ${isUser ? "items-end text-right" : "items-start"}`}>
                <div
                    className="px-4 py-3 text-left text-[13px] leading-6"
                    style={{
                        background: isUser ? "#0d2a33" : "#0f1828",
                        border: isUser ? "2px solid rgba(0,229,255,0.22)" : "2px solid rgba(255,255,255,0.06)",
                        borderRadius: isUser ? "18px 18px 6px 18px" : "18px 18px 18px 6px",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                        color: isUser ? "#d9fbff" : "rgba(255,255,255,0.82)",
                        fontFamily: "'Nunito',system-ui,sans-serif",
                        fontWeight: 600,
                        opacity: isTemporary ? 0.7 : 1,
                    }}
                >
                    <p className="whitespace-pre-wrap break-words">{message.message}</p>
                    <SourceChips sources={message.source_refs ?? []} />
                </div>

                <div className={`mt-1 flex items-center gap-2 px-1 ${isUser ? "justify-end" : "justify-start"}`}>
                    <span className="text-[9px] font-bold tracking-widest text-white/25" style={{ fontFamily: "'Space Mono',monospace" }}>
                        {isTemporary ? "MENGIRIM..." : formatTime(message.created_at)}
                    </span>

                    {!isUser && !isTemporary && (
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                disabled={feedbackPending}
                                onClick={() => onFeedback(message.id, 1)}
                                aria-label="Jawaban membantu"
                                title="Jawaban membantu"
                                className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-white/10 disabled:opacity-40"
                                style={{
                                    color: message.feedback === 1 ? "#34d399" : "rgba(255,255,255,0.35)",
                                    border: message.feedback === 1 ? "1px solid rgba(52,211,153,0.35)" : "1px solid transparent",
                                }}
                            >
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 10v10H4V10h3Zm0 0 4-7a2 2 0 0 1 2 2v3h5a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                disabled={feedbackPending}
                                onClick={() => onFeedback(message.id, 0)}
                                aria-label="Jawaban kurang tepat"
                                title="Jawaban kurang tepat"
                                className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-white/10 disabled:opacity-40"
                                style={{
                                    color: message.feedback === 0 ? "#f87171" : "rgba(255,255,255,0.35)",
                                    border: message.feedback === 0 ? "1px solid rgba(248,113,113,0.35)" : "1px solid transparent",
                                }}
                            >
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14V4h3v10h-3Zm0 0-4 7a2 2 0 0 1-2-2v-3H6a2 2 0 0 1-2-2.3l1.2-6A2 2 0 0 1 7.2 4H17" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
