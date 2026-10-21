import { ChatPanel } from "@/features/chat/components/ChatPanel";

interface FloatingCatProps {
    open: boolean;
    onToggle: () => void;
}

export function FloatingCat({ open, onToggle }: FloatingCatProps) {
    return (
        <>
            <style>{`@keyframes catChatPulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.12) } }
@media (prefers-reduced-motion: reduce) { [style*="catChatPulse"] { animation: none !important } }`}</style>
            {!open && (
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label="Buka Chat-AI"
                    aria-expanded={open}
                    className="fixed right-4 top-1/2 z-[55] grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full transition active:scale-95 hover:brightness-110"
                    style={{
                        background: "#162030",
                        border: "3px solid #233044",
                        boxShadow: "0 12px 26px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.08)",
                    }}
                >
                    <img src="/assets/img/Logo_happy_content.webp" alt="Logo happy content" className="h-9 w-9 rounded-full object-cover" />
                    <span
                        className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full"
                        style={{
                            background: "#00e5ff",
                            border: "2px solid #041016",
                            boxShadow: "0 4px 10px rgba(0,229,255,0.4)",
                            animation: "catChatPulse 2.4s ease-in-out infinite",
                        }}
                    >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#041016" strokeWidth={2.4} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A8.9 8.9 0 0 1 21 12Z" />
                        </svg>
                    </span>
                </button>
            )}
            <ChatPanel open={open} onClose={onToggle} />
        </>
    );
}
