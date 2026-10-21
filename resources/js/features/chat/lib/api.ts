import type {
    ChatMessage,
    ChatSendResponse,
    ChatSessionSummary,
} from "@/features/chat/types";

export function csrfToken(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? "";
}

export async function requestJson<T>(url: string, method: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
        method,
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": csrfToken(),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
        let message = "Permintaan gagal diproses.";
        try {
            const data = (await response.json()) as { message?: string; errors?: Record<string, string[]> };
            message = data.message ?? data.errors?.question?.[0] ?? message;
        } catch {
            // Respons non-JSON tetap memakai pesan umum.
        }
        throw new Error(message);
    }

    return (await response.json()) as T;
}

export function messageOf(error: unknown): string {
    return error instanceof Error ? error.message : "Terjadi kesalahan. Coba lagi.";
}

export function createChatSession(): Promise<{ session: ChatSessionSummary }> {
    return requestJson("/chat/sessions", "POST", {});
}

export function fetchChatMessages(sessionId: number): Promise<{ messages: ChatMessage[] }> {
    return requestJson(`/chat/sessions/${sessionId}/messages`, "GET");
}

export function sendChatMessage(sessionId: number, question: string): Promise<ChatSendResponse> {
    return requestJson(`/chat/sessions/${sessionId}/messages`, "POST", { question });
}

export function deleteChatSession(sessionId: number): Promise<{ deleted: boolean }> {
    return requestJson(`/chat/sessions/${sessionId}`, "DELETE");
}

export function sendChatFeedback(messageId: number, feedback: 0 | 1): Promise<{ message: ChatMessage }> {
    return requestJson(`/chat/messages/${messageId}/feedback`, "PATCH", { feedback });
}

export function formatSessionDate(value: string | null): string {
    if (!value) {
        return "";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "";
    }
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
}
