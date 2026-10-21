import { Head } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatComposer } from "@/features/chat/components/ChatComposer";
import { LoadingDots } from "@/features/chat/components/LoadingDots";
import { MessageBubble } from "@/features/chat/components/MessageBubble";
import {
    createChatSession,
    deleteChatSession,
    fetchChatMessages,
    formatSessionDate,
    messageOf,
    sendChatFeedback,
    sendChatMessage,
} from "@/features/chat/lib/api";
import type {
    ChatMessage,
    ChatSessionSummary,
    FlashMessage,
} from "@/features/chat/types";

interface ChatAIIndexProps {
    sessions: ChatSessionSummary[];
    flash?: FlashMessage | null;
}

const FALLBACK_MESSAGE = "AI sedang tidak tersedia — materi & simulator tetap dapat digunakan.";
const SAMPLE_QUESTIONS = [
    "Apa itu phishing dan bagaimana mengenalinya?",
    "Bagaimana MFA melindungi akun dari credential stuffing?",
    "Mengapa prepared statement mencegah SQL Injection?",
];

export default function ChatAIIndex({ sessions, flash }: ChatAIIndexProps) {
    const [sessionList, setSessionList] = useState<ChatSessionSummary[]>(sessions);
    const [activeSessionId, setActiveSessionId] = useState<number | null>(sessions[0]?.id ?? null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [draft, setDraft] = useState("");
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sending, setSending] = useState(false);
    const [creating, setCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [feedbackPendingId, setFeedbackPendingId] = useState<number | null>(null);
    const [banner, setBanner] = useState<string | null>(flash?.error ?? null);
    const [notice, setNotice] = useState<string | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);

    const loadMessages = useCallback(async (sessionId: number) => {
        setLoadingMessages(true);
        setBanner(null);
        try {
            const data = await fetchChatMessages(sessionId);
            setMessages(data.messages);
        } catch (error) {
            setMessages([]);
            setBanner(messageOf(error));
        } finally {
            setLoadingMessages(false);
        }
    }, []);

    useEffect(() => {
        if (activeSessionId === null) {
            setMessages([]);
            return;
        }
        void loadMessages(activeSessionId);
    }, [activeSessionId, loadMessages]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [messages, sending]);

    const handleNewChat = async () => {
        if (creating) {
            return;
        }
        setCreating(true);
        setBanner(null);
        setNotice(null);
        try {
            const data = await createChatSession();
            setSessionList((previous) => [data.session, ...previous]);
            setActiveSessionId(data.session.id);
            setMessages([]);
            setDraft("");
        } catch (error) {
            setBanner(messageOf(error));
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (sessionId: number) => {
        if (deletingId !== null || !window.confirm("Hapus sesi ini beserta seluruh pesannya?")) {
            return;
        }
        setDeletingId(sessionId);
        try {
            await deleteChatSession(sessionId);
            const remaining = sessionList.filter((session) => session.id !== sessionId);
            setSessionList(remaining);
            if (activeSessionId === sessionId) {
                setActiveSessionId(remaining[0]?.id ?? null);
                setMessages([]);
            }
        } catch (error) {
            setBanner(messageOf(error));
        } finally {
            setDeletingId(null);
        }
    };

    const handleSend = async () => {
        const question = draft.trim();
        if (!activeSessionId || sending || question === "") {
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
            const data = await sendChatMessage(activeSessionId, question);

            setMessages((previous) => [
                ...previous.filter((message) => message.id !== temporaryId),
                data.user_message,
                data.assistant_message,
            ]);
            setSessionList((previous) =>
                previous.map((session) =>
                    session.id === data.session.id ? data.session : session,
                ),
            );

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

    const hasSession = activeSessionId !== null;
    const isEmptyThread = !loadingMessages && messages.length === 0;

    return (
        <div
            className="min-h-screen"
            style={{
                background:
                    "radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%),radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%),#070b14",
            }}
        >
            <Head title="Chat-AI Tutor" />

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
                                <span className="h-2 w-2 rounded-full" style={{ background: "#34d399", boxShadow: "0 0 10px rgba(52,211,153,0.8)" }} />
                                CHAT-AI TUTOR
                            </span>
                            <h1
                                className="mt-3 text-[24px] font-extrabold leading-tight text-white sm:text-[30px]"
                                style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}
                            >
                                Tanya materi, bukan menyerang sistem.
                            </h1>
                            <p className="mt-2 max-w-[620px] text-[13px] leading-6" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>
                                Jawaban diambil hanya dari knowledge base Security Cat. Setiap jawaban menyertakan sumber materi yang dapat ditelusuri.
                            </p>
                        </div>
                        <div
                            className="rounded-[18px] px-4 py-3 text-[10px] font-bold leading-5"
                            style={{
                                background: "#0f1828",
                                border: "2px solid rgba(255,255,255,0.06)",
                                color: "rgba(255,255,255,0.45)",
                                fontFamily: "'Space Mono',monospace",
                            }}
                        >
                            RAG · k=3 · cosine
                            <br />
                            Groq · gpt-oss-20b
                        </div>
                    </div>
                </header>

                {banner && (
                    <div
                        role="alert"
                        className="mt-4 flex items-start gap-2 rounded-[16px] px-4 py-3 text-[12px] font-bold leading-5"
                        style={{
                            background: "rgba(248,113,113,0.09)",
                            border: "2px solid rgba(248,113,113,0.25)",
                            color: "#fca5a5",
                        }}
                    >
                        <span className="mt-0.5">!</span>
                        <span>{banner}</span>
                    </div>
                )}

                {flash?.status && !banner && (
                    <div
                        className="mt-4 rounded-[16px] px-4 py-3 text-[12px] font-bold"
                        style={{
                            background: "rgba(52,211,153,0.08)",
                            border: "2px solid rgba(52,211,153,0.2)",
                            color: "#86efac",
                        }}
                    >
                        {flash.status}
                    </div>
                )}

                <div className="mt-4 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <aside
                        className="p-3 sm:p-4"
                        style={{
                            background: "#162030",
                            border: "3px solid #233044",
                            borderRadius: 24,
                            boxShadow: "0 18px 36px rgba(0,0,0,0.45),inset 0 1.5px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={handleNewChat}
                            disabled={creating}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] px-4 py-3 text-[12px] font-extrabold transition active:translate-y-[2px] disabled:opacity-50"
                            style={{
                                background: "#ffd23a",
                                color: "#1a1400",
                                border: "2px solid #e6b800",
                                boxShadow: "0 4px 0 #b88c00, 0 8px 18px rgba(0,0,0,0.25)",
                                fontFamily: "'Nunito',sans-serif",
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                            </svg>
                            {creating ? "Membuat sesi..." : "New Chat"}
                        </button>

                        <p className="mt-4 px-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/30" style={{ fontFamily: "'Space Mono',monospace" }}>
                            Sesi Percakapan
                        </p>

                        <div className="mt-2 max-h-[420px] space-y-1 overflow-y-auto pr-1">
                            {sessionList.length === 0 && (
                                <p className="rounded-[14px] px-3 py-4 text-[11px] font-bold leading-5 text-white/35" style={{ background: "#0f1828" }}>
                                    Belum ada sesi. Mulai percakapan baru.
                                </p>
                            )}

                            {sessionList.map((session) => {
                                const active = session.id === activeSessionId;
                                return (
                                    <div
                                        key={session.id}
                                        className="group flex items-center gap-1 rounded-[12px] transition"
                                        style={{
                                            background: active ? "#0d2a33" : "transparent",
                                            border: active ? "2px solid rgba(0,229,255,0.2)" : "2px solid transparent",
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setActiveSessionId(session.id);
                                                setBanner(null);
                                                setNotice(null);
                                            }}
                                            className="min-w-0 flex-1 px-2.5 py-2 text-left"
                                        >
                                            <span className={`block truncate text-[12px] font-bold ${active ? "text-[#a9f3fa]" : "text-white/70"}`}>
                                                {session.title}
                                            </span>
                                            <span className="mt-0.5 block text-[9px] font-bold text-white/25" style={{ fontFamily: "'Space Mono',monospace" }}>
                                                {session.messages_count} pesan · {formatSessionDate(session.updated_at)}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(session.id)}
                                            disabled={deletingId === session.id}
                                            aria-label={`Hapus sesi ${session.title}`}
                                            title="Hapus sesi"
                                            className="mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/25 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-40"
                                        >
                                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v6m4-6v6" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    <section
                        className="flex min-h-[560px] flex-col p-3 sm:p-5"
                        style={{
                            background: "#162030",
                            border: "3px solid #233044",
                            borderRadius: 28,
                            boxShadow: "0 18px 36px rgba(0,0,0,0.5),inset 0 1.5px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        <div className="flex items-center justify-between gap-3 border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8b98ab]" style={{ fontFamily: "'Space Mono',monospace" }}>
                                    Percakapan
                                </p>
                                <p className="mt-1 text-[11px] font-bold text-white/35">
                                    {hasSession ? "Riwayat tersimpan otomatis per sesi." : "Buat sesi baru untuk mulai bertanya."}
                                </p>
                            </div>
                            <span className="rounded-full px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#8b98ab]" style={{ background: "#0f1828", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Space Mono',monospace" }}>
                                {messages.length} PESAN
                            </span>
                        </div>

                        <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: "58vh", minHeight: 300 }}>
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

                            {loadingMessages && <LoadingDots label="Memuat riwayat" />}

                            {isEmptyThread && !loadingMessages && (
                                <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
                                    <div
                                        className="grid h-14 w-14 place-items-center rounded-[20px] text-[#00e5ff]"
                                        style={{ background: "#0e2a33", border: "2px solid rgba(0,229,255,0.18)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                                    >
                                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A8.9 8.9 0 0 1 21 12Z" />
                                        </svg>
                                    </div>
                                    <p className="mt-3 text-[15px] font-extrabold text-white">
                                        {hasSession ? "Sesi masih kosong" : "Mulai percakapan pertama"}
                                    </p>
                                    <p className="mt-1 max-w-[360px] text-[12px] font-bold leading-5 text-white/40">
                                        {hasSession
                                            ? "Ajukan pertanyaan tentang phishing, MFA, SQL Injection, atau brute force."
                                            : "Klik New Chat di sidebar, lalu tanyakan materi keamanan siber yang ingin dipelajari."}
                                    </p>

                                    {hasSession && (
                                        <div className="mt-4 flex w-full max-w-[460px] flex-col gap-2">
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
                                    )}
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

                        <ChatComposer
                            value={draft}
                            onChange={setDraft}
                            onSubmit={handleSend}
                            disabled={sending || !hasSession}
                        />
                    </section>
                </div>

                <p className="mt-4 text-center text-[9px] font-bold tracking-widest text-white/20" style={{ fontFamily: "'Space Mono',monospace" }}>
                    Modul & simulator tetap berfungsi bila AI Service tidak tersedia.
                </p>
            </main>
        </div>
    );
}
