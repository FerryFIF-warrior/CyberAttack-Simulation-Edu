export interface SecurityLogEntry {
    id: number;
    simulation_id: string;
    level_number: number;
    floor_number: number;
    event: string;
    choice_id: "safe" | "neutral" | "risky" | null;
    points: number;
    created_at: string | null;
}

export interface SecurityLogsResponse {
    success: boolean;
    logs: SecurityLogEntry[];
}
