export type ChatRole = "user" | "assistant";

export type ChatStatus = "ok" | "not_found" | "unsafe" | "error";

export interface SourceRef {
    id: string;
    judul: string;
    halaman: number | null;
}

export interface ChatMessage {
    id: number;
    role: ChatRole;
    message: string;
    source_refs: SourceRef[];
    feedback: number | null;
    created_at: string;
}

export interface ChatSessionSummary {
    id: number;
    title: string;
    messages_count: number;
    updated_at: string | null;
}

export interface ChatSendResponse {
    status: ChatStatus;
    distance: number | null;
    session: ChatSessionSummary;
    user_message: ChatMessage;
    assistant_message: ChatMessage;
}

export interface FlashMessage {
    status?: string | null;
    error?: string | null;
}
