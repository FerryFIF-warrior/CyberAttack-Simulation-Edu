import type { SimulationId } from "@/features/simulation/types/simulation";
import type { SecurityLogEntry, SecurityLogsResponse } from "@/features/security-log/types";

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

export class FloorLockedError extends Error {
    requiredFloor: number;

    constructor(requiredFloor: number, message: string) {
        super(message);
        this.name = "FloorLockedError";
        this.requiredFloor = requiredFloor;
    }
}

interface AttemptErrorBody {
    success?: boolean;
    code?: string;
    required_floor?: number;
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
        const error: AttemptErrorBody = await response.json().catch(() => ({ message: "Request failed" }));

        if (response.status === 403 && error.code === "floor_locked") {
            throw new FloorLockedError(
                typeof error.required_floor === "number" ? error.required_floor : floorNumber - 1,
                error.message || "Floor belum terbuka.",
            );
        }

        if (response.status === 401) {
            // Sesi habis — arahkan ke login agar user bisa autentikasi ulang
            window.location.href = "/login";
            throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
        }

        if (response.status === 419) {
            throw new Error("Sesi CSRF kedaluwarsa. Muat ulang halaman dan coba lagi.");
        }

        if (response.status === 429) {
            throw new Error("Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.");
        }

        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function fetchSecurityLogs(simulationId?: SimulationId): Promise<SecurityLogEntry[]> {
    const query = simulationId ? `?simulation_id=${encodeURIComponent(simulationId)}` : "";
    const response = await fetchWithCsrf(`${API_BASE}/me/security-logs${query}`, {
        method: "GET",
    });

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/login";
            throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
        }
        throw new Error(`HTTP ${response.status}`);
    }

    const body: SecurityLogsResponse = await response.json();

    return body.logs ?? [];
}