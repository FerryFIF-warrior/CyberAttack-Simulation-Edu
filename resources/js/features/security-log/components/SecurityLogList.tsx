import type { SecurityLogEntry } from "@/features/security-log/types";

export interface SecurityLogLabMeta {
    name?: string;
    competency?: string;
    code?: string;
}

const EVENT_LABELS: Record<string, string> = {
    floor_attempt: "Percobaan Floor",
};

const CHOICE_LABELS: Record<string, string> = {
    safe: "Aman",
    neutral: "Netral",
    risky: "Berisiko",
};

const CHOICE_COLORS: Record<string, string> = {
    safe: "#34d399",
    neutral: "#8b98ab",
    risky: "#f87171",
};

export function formatLogTime(value: string | null): string {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function logChoiceLabel(choiceId: string | null): string {
    if (!choiceId) return "-";
    return CHOICE_LABELS[choiceId] ?? choiceId;
}

interface SecurityLogListProps {
    logs: SecurityLogEntry[];
    labs?: Record<string, SecurityLogLabMeta>;
    emptyText?: string;
    className?: string;
}

export function SecurityLogList({
    logs,
    labs = {},
    emptyText = "Belum ada aktivitas tercatat.",
    className,
}: SecurityLogListProps) {
    if (logs.length === 0) {
        return (
            <p
                className={"text-sm text-[#8b98ab] py-6 text-center " + (className || "")}
                style={{ fontFamily: "'Nunito',system-ui,sans-serif", fontWeight: 700 }}
            >
                {emptyText}
            </p>
        );
    }

    return (
        <ul className={"flex flex-col gap-2 " + (className || "")}>
            {logs.map((log) => {
                const lab = labs[log.simulation_id];
                const label = lab?.competency ?? lab?.name ?? log.simulation_id;
                const pointsColor = log.points > 0 ? "#00e5ff" : log.points < 0 ? "#f87171" : "#8b98ab";
                const pointsPrefix = log.points > 0 ? "+" : "";

                return (
                    <li
                        key={log.id}
                        className="flex items-center gap-3 px-3 py-2.5"
                        style={{
                            background: "#0f1828",
                            border: "2px solid rgba(255,255,255,0.06)",
                            borderRadius: 16,
                            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)",
                        }}
                    >
                        <span
                            className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider"
                            style={{
                                background: "#070b14",
                                border: "1.5px solid rgba(255,255,255,0.08)",
                                color: "#00e5ff",
                                fontFamily: "'Space Mono',monospace",
                            }}
                        >
                            {lab?.code ?? log.simulation_id.slice(0, 2).toUpperCase()}
                        </span>

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-white truncate">
                                {EVENT_LABELS[log.event] ?? log.event} · {label}
                            </p>
                            <p
                                className="text-[11px] text-[#8b98ab] truncate"
                                style={{ fontFamily: "'Space Mono',monospace" }}
                            >
                                LV {log.level_number} · FL {log.floor_number} ·{" "}
                                <span style={{ color: CHOICE_COLORS[log.choice_id ?? ""] ?? "#8b98ab" }}>
                                    {logChoiceLabel(log.choice_id)}
                                </span>{" "}
                                · {formatLogTime(log.created_at)}
                            </p>
                        </div>

                        <span
                            className="shrink-0 text-sm font-extrabold"
                            style={{ color: pointsColor, fontFamily: "'Nunito',sans-serif" }}
                        >
                            {pointsPrefix}
                            {log.points}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
