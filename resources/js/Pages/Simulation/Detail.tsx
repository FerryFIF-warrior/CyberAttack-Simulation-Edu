import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Card } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";

interface SimulationDetailProps {
    simulationId: string;
    levels: {
        level: number;
        floorCount: number;
        maxScore: number;
        unlocked: boolean;
        completed: boolean;
        levelScore?: number;
    }[];
}

const simulationInfo: Record<string, { name: string; color: string; bgColor: string; borderColor: string; gradient: string; icon: React.ReactNode; description: string }> = {
    phishing: {
        name: "Phishing",
        color: "indigo",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        gradient: "to-indigo-50",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-indigo-600" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M3 21l9-9" />
                <path d="M9 12l6 6" />
                <path d="M15 12l-6 6" />
            </svg>
        ),
        description: "Belajar mengenali dan menghindari serangan phishing melalui simulasi interaktif.",
    },
    bruteforce: {
        name: "Brute Force",
        color: "orange",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        gradient: "to-orange-50",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-orange-600" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
                <path d="M8 8l8 8" />
                <path d="M16 8l-8 8" />
            </svg>
        ),
        description: "Pelajari cara melindungi akun dari serangan brute force dan credential stuffing.",
    },
    sqli: {
        name: "SQL Injection",
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        gradient: "to-red-50",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-red-600" aria-hidden="true">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="8" y1="16" x2="16" y2="16" />
                <line x1="8" y1="20" x2="12" y2="20" />
            </svg>
        ),
        description: "Memahami kerentanan SQL injection dan cara mencegahnya di aplikasi web.",
    },
    auth: {
        name: "Authentication Attack",
        color: "purple",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        gradient: "to-purple-50",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-purple-600" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M12 10v4" />
                <path d="M10 12h4" />
                <path d="M8 16h8" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        description: "Eksplorasi berbagai teknik serangan autentikasi dan strategi pertahanannya.",
    },
};

function ProgressRing({ progress, size = 48, strokeWidth = 5 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress / 100);

    return (
        <svg width={size} height={size} role="img" aria-label={`Progress: ${progress}%`} className="flex-shrink-0">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-gray-200"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-1000 ease-out"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
            <text
                x={size / 2}
                y={size / 2 + 3}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.16}
                fontWeight="bold"
                fill="currentColor"
                className="text-gray-800"
            >
                {Math.round(progress)}%
            </text>
        </svg>
    );
}

function StatusBadge({ status }: { status: "completed" | "available" | "locked" }) {
    const configs = {
        completed: { bg: "bg-green-100", text: "text-green-800", label: "Selesai", icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
        )},
        available: { bg: "bg-indigo-100", text: "text-indigo-800", label: "Tersedia", icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        )},
        locked: { bg: "bg-gray-100", text: "text-gray-600", label: "Terkunci", icon: (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M12 10v4" />
                <path d="M10 12h4" />
            </svg>
        )},
    };
    const cfg = configs[status];
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
            {cfg.icon}
            {cfg.label}
        </span>
    );
}

export default function SimulationDetail({ simulationId, levels }: SimulationDetailProps) {
    const info = simulationInfo[simulationId] || simulationInfo.phishing;
    const completedLevels = levels.filter(l => l.completed).length;
    const totalLevels = levels.length;
    const totalScore = levels.reduce((sum, l) => sum + (l.levelScore || 0), 0);
    const maxTotalScore = levels.reduce((sum, l) => sum + l.maxScore, 0);
    const overallProgress = maxTotalScore > 0 ? Math.round((totalScore / maxTotalScore) * 100) : 0;

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white ${info.gradient} py-12 px-4 sm:px-6 lg:px-8`}>
            <Head title={`Simulasi ${info.name}`} />
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/simulasi"
                        className="mb-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar Simulasi
                    </Link>
                    <div className={`flex items-center gap-4 p-6 rounded-2xl ${info.bgColor} ${info.borderColor} shadow-lg`}>
                        <div className={`p-4 rounded-xl ${info.bgColor.replace("50", "100")} ${info.borderColor}`}>
                            {info.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{info.name}</h1>
                            <p className="text-gray-600 mt-1">{info.description}</p>
                        </div>
                    </div>
                </div>

                {/* Overall Progress */}
                <Card className="mb-8 shadow-lg" padding="lg">
                    <div className="flex items-center gap-6">
                        <ProgressRing progress={overallProgress} size={72} strokeWidth={6} />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Progress Keseluruhan</span>
                                <span className="text-lg font-bold text-gray-900">{overallProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {completedLevels}/{totalLevels} Level Selesai
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    {totalScore}/{maxTotalScore} Poin Total
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Levels Grid */}
                <div className="space-y-4">
                    {levels.map((level) => (
                        <article
                            key={level.level}
                            className={`transition-all duration-300 ${level.unlocked ? "hover:shadow-md hover:-translate-y-1" : "opacity-60"}`}
                        >
                            <Card className={`h-full ${level.unlocked ? "" : "grayscale"} rounded-3xl shadow-lg transition-shadow duration-300`} padding="lg">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    {/* Level Info */}
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${level.completed ? "bg-green-100" : level.unlocked ? "bg-indigo-100" : "bg-gray-100"} shadow-sm`}>
                                            <span className={`text-2xl font-bold ${level.completed ? "text-green-700" : level.unlocked ? "text-indigo-700" : "text-gray-400"}`}>
                                                {level.level}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h2 className="text-lg font-semibold text-gray-900 truncate">Level {level.level}</h2>
                                                <StatusBadge status={level.completed ? "completed" : level.unlocked ? "available" : "locked"} />
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {level.floorCount} Floor • Max Score: {level.maxScore}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Score & Action */}
                                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                                        {level.completed && level.levelScore !== undefined && (
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Best Score</p>
                                                <p className="text-2xl font-bold text-gray-900">{level.levelScore} / {level.maxScore}</p>
                                            </div>
                                        )}
                                        {level.unlocked && !level.completed && (
                                            <p className="text-sm text-gray-500 text-right">Belum dimulai</p>
                                        )}
                                        {level.unlocked && (
                                            <Link href={`/simulasi/${simulationId}/level/${level.level}`}>
                                                <Button variant="primary" className="w-full sm:w-auto px-6 py-3 text-lg">
                                                    {level.completed ? "Lihat Detail" : "Mulai Level"}
                                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </Button>
                                            </Link>
                                        )}
                                        {!level.unlocked && (
                                            <Button variant="ghost" className="w-full sm:w-auto text-gray-400 border-gray-200" disabled>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <rect x="2" y="2" width="20" height="20" rx="2" />
                                                    <path d="M12 10v4" />
                                                    <path d="M10 12h4" />
                                                </svg>
                                                Terkunci
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Unlock requirement hint for locked levels */}
                                {!level.unlocked && level.level > 1 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Selesaikan Level {level.level - 1} dengan skor minimal 15 untuk membuka</span>
                                    </div>
                                )}
                            </Card>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}