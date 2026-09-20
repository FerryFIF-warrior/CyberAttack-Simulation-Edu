export type SimulationId = "phishing" | "bruteforce" | "sqli" | "auth";

export interface AttemptResponse {
    success: boolean;
    floor_points: number;
    level_raw_score: number;
    level_score: number;
    level_completed: boolean;
    next_level_unlocked: boolean;
    message?: string;
}

export interface ProgressResponse {
    success: boolean;
    progress: Record<SimulationId, SimulationProgress>;
}

export interface SimulationProgress {
    simulation_id: string;
    completed_floor_count: number;
    total_floor_count: number;
    completion_percent: number;
    total_score: number;
    max_score: number;
    mastery_percent: number;
    earned_badges: string[];
    levels: LevelProgress[];
}

export interface LevelProgress {
    level_number: number;
    completed: boolean;
    mastered: boolean;
    unlocked: boolean;
    raw_score: number;
    level_score: number;
    max_score: number;
    floors: FloorProgress[];
}

export interface FloorProgress {
    floor_number: number;
    completed: boolean;
    best_points: number;
    max_points: number;
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

export async function fetchSimulationProgress(): Promise<ProgressResponse> {
    const response = await fetchWithCsrf(`${API_BASE}/me/simulation-progress`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}