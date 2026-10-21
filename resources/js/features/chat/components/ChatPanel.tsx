import { useCallback, useEffect, useRef, useState } from "react";
import { ChatComposer } from "@/features/chat/components/ChatComposer";
import { LoadingDots } from "@/features/chat/components/LoadingDots";
import { MessageBubble } from "@/features/chat/components/MessageBubble";
import {
    createChatSession,
    messageOf,
    sendChatFeedback,
    sendChatMessage,
} from "@/features/chat/lib/api";
import type { ChatMessage } from "@/features/chat/types";

interface ChatPanelProps {
    open: boolean;
    onClose: () => void;
}

const FALLBACK_MESSAGE = "AI sedang tidak tersedia — materi & simulator tetap dapat digunakan.";
const SAMPLE_QUESTIONS = [
    "Apa itu phishing dan bagaimana mengenalinya?",
    "Bagaimana MFA melindungi akun dari credential stuffing?",
    "Mengapa prepared statement mencegah SQL Injection?",
];

export function ChatPanel({ open, onClose }: ChatPanelProps) {
    const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [draft, setDraft] = useState("");
    const [sending, setSending] = useState(false);
    const [banner, setBanner] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [feedbackPendingId, setFeedbackPendingId] = useState<number | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) {
            return;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [messages, sending]);

    const handleNewChat = useCallback(() => {
        setActiveSessionId(null);
        setMessages([]);
        setDraft("");
        setBanner(null);
        setNotice(null);
    }, []);

    const handleSend = async () => {
        const question = draft.trim();
        if (sending || question === "") {
            return;
        }

        const temporaryId = -Date.now();
        const optimisticMessage: ChatMessage = {
            id: temporaryId,
            role: "user",
            message: question,
            source_refs: [],
            feedback: null,
            created_at: new Date().toISOString(),
        };

        setMessages((previous) => [...previous, optimisticMessage]);
        setDraft("");
        setSending(true);
        setBanner(null);
        setNotice(null);

        try {
            let sessionId = activeSessionId;
            if (sessionId === null) {
                const created = await createChatSession();
                sessionId = created.session.id;
                setActiveSessionId(sessionId);
            }

            const data = await sendChatMessage(sessionId, question);

            setMessages((previous) => [
                ...previous.filter((message) => message.id !== temporaryId),
                data.user_message,
                data.assistant_message,
            ]);

            if (data.status === "error") {
                setBanner(FALLBACK_MESSAGE);
            } else if (data.status === "not_found") {
                setNotice("Pertanyaan berada di luar cakupan materi knowledge base.");
            } else if (data.status === "unsafe") {
                setNotice("Permintaan ditolak karena mengarah ke serangan nyata. Chat-AI hanya membahas sisi pertahanan.");
            }
        } catch (error) {
            setMessages((previous) => previous.filter((message) => message.id !== temporaryId));
            setDraft(question);
            setBanner(messageOf(error));
        } finally {
            setSending(false);
        }
    };

    const handleFeedback = async (messageId: number, feedback: 0 | 1) => {
        const target = messages.find((message) => message.id === messageId);
        if (!target || feedbackPendingId !== null) {
            return;
        }

        setFeedbackPendingId(messageId);
        setMessages((previous) =>
            previous.map((message) =>
                message.id === messageId ? { ...message, feedback } : message,
            ),
        );

        try {
            await sendChatFeedback(messageId, feedback);
        } catch (error) {
            setMessages((previous) =>
                previous.map((message) =>
                    message.id === messageId ? { ...message, feedback: target.feedback } : message,
                ),
            );
            setBanner(messageOf(error));
        } finally {
            setFeedbackPendingId(null);
        }
    };

    const isEmptyThread = messages.length === 0;

    return (
        <div
            role="dialog"
            aria-label="Chat-AI"
            aria-hidden={!open}
            className={`fixed right-4 top-1/2 z-[60] flex w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden transition-all duration-300 ${
                open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
            }`}
            style={{
                height: "min(560px, 74vh)",
                background: "#162030",
                border: "3px solid #233044",
                borderRadius: 24,
                transform: open ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(1.5rem)",
                boxShadow: "0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08)",
            }}
        >
            <div
                className="flex items-center justify-between gap-2 border-b px-3 py-2.5"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
                <div className="min-w-0">
                    <p
                        className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em]"
                        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Space Mono',monospace" }}
                    >
                        <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: "#34d399", boxShadow: "0 0 10px rgba(52,211,153,0.8)" }}
                        />
                        Chat-AI Tutor
                    </p>
                    <p className="mt-0.5 truncate text-[11px] font-bold text-white/35">
                        Tanya materi keamanan siber.
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                    <button
                        type="button"
                        onClick={handleNewChat}
                        disabled={sending}
                        title="Chat baru"
                        aria-label="Chat baru"
                        className="grid h-8 w-8 place-items-center rounded-full transition hover:brightness-110 disabled:opacity-50"
                        style={{
                            background: "#ffd23a",
                            color: "#1a1400",
                            border: "2px solid #e6b800",
                            boxShadow: "0 3px 0 #b88c00",
                        }}
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup Chat-AI"
                        className="grid h-8 w-8 place-items-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                        style={{ background: "#0f1828", border: "2px solid rgba(255,255,255,0.07)" }}
                    >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
                        </svg>
                    </button>
                </div>
            </div>

            {banner && (
                <div
                    role="alert"
                    className="mx-3 mt-3 flex items-start gap-2 rounded-[14px] px-3 py-2 text-[11px] font-bold leading-5"
                    style={{
                        background: "rgba(248,113,113,0.09)",
                        border: "2px solid rgba(248,113,113,0.25)",
                        color: "#fca5a5",
                    }}
                >
                    <span>!</span>
                    <span>{banner}</span>
                </div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
                {notice && (
                    <div
                        className="rounded-[14px] px-3 py-2.5 text-[11px] font-bold leading-5"
                        style={{
                            background: "rgba(250,204,21,0.08)",
                            border: "1px solid rgba(250,204,21,0.2)",
                            color: "#fde68a",
                        }}
                    >
                        {notice}
                    </div>
                )}

                {isEmptyThread && !sending && (
                    <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
                        <div
                            className="grid h-12 w-12 place-items-center rounded-[18px] text-[#00e5ff]"
                            style={{ background: "#0e2a33", border: "2px solid rgba(0,229,255,0.18)" }}
                        >
                            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A8.9 8.9 0 0 1 21 12Z" />
                            </svg>
                        </div>
                        <p className="mt-3 text-[14px] font-extrabold text-white">Ada yang bisa ditanyakan?</p>
                        <p className="mt-1 max-w-[300px] text-[11px] font-bold leading-5 text-white/40">
                            Jawaban diambil dari knowledge base Security Cat beserta sumber materinya.
                        </p>
                        <div className="mt-4 flex w-full flex-col gap-2">
                            {SAMPLE_QUESTIONS.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    onClick={() => setDraft(question)}
                                    className="rounded-[12px] px-3 py-2 text-left text-[11px] font-bold leading-5 text-white/60 transition hover:text-white"
                                    style={{ background: "#0f1828", border: "1px solid rgba(255,255,255,0.06)" }}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        onFeedback={handleFeedback}
                        feedbackPending={feedbackPendingId === message.id}
                    />
                ))}

                {sending && <LoadingDots />}
                <div ref={endRef} />
            </div>

            <div className="px-3 pb-3">
                <ChatComposer
                    value={draft}
                    onChange={setDraft}
                    onSubmit={handleSend}
                    disabled={sending}
                />
            </div>
        </div>
    );
}
