import type { SimulationId } from "@/features/simulation/types/simulation";

export type { SimulationId };

export interface AttemptResponse {
    success: boolean;
    floor_points: number;
    level_raw_score: number;
    level_score: number;
    level_completed: boolean;
    next_level_unlocked: boolean;
    message?: string;
}

const API_BASE = "/api";

async function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-CSRF-TOKEN": token || "",
            ...options.headers,
        },
        credentials: "same-origin",
    });
}

export async function submitFloorAttempt(
    simulationId: SimulationId,
    levelNumber: number,
    floorNumber: number,
    choiceId: "safe" | "neutral" | "risky"
): Promise<AttemptResponse> {
    const response = await fetchWithCsrf(
        `${API_BASE}/simulations/${simulationId}/levels/${levelNumber}/floors/${floorNumber}/attempt`,
        {
            method: "POST",
            body: JSON.stringify({ choice_id: choiceId }),
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}