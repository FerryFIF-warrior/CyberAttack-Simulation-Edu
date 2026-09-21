import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Card } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";

interface SimulationsIndexProps {
    phishingProgress: {
        completionPercent: number;
        totalScore: number;
        maxScore: number;
        earnedBadges: string[];
    } | null;
}

const simulations = [
    {
        id: "phishing",
        name: "Phishing",
        description: "Belajar mengenali dan menghindari serangan phishing melalui simulasi interaktif.",
        icon: PhishingIcon,
        color: "indigo",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        badgeColor: "bg-indigo-100 text-indigo-800",
        progressColor: "bg-indigo-600",
        href: "/simulasi/phishing",
    },
    {
        id: "bruteforce",
        name: "Brute Force",
        description: "Pelajari cara melindungi akun dari serangan brute force dan credential stuffing.",
        icon: BruteForceIcon,
        color: "orange",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        badgeColor: "bg-orange-100 text-orange-800",
        progressColor: "bg-orange-600",
        href: "/simulasi/bruteforce",
    },
    {
        id: "sqli",
        name: "SQL Injection",
        description: "Memahami kerentanan SQL injection dan cara mencegahnya di aplikasi web.",
        icon: SqlInjectionIcon,
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        badgeColor: "bg-red-100 text-red-800",
        progressColor: "bg-red-600",
        href: "/simulasi/sqli",
    },
    {
        id: "auth",
        name: "Authentication Attack",
        description: "Eksplorasi berbagai teknik serangan autentikasi dan strategi pertahanannya.",
        icon: AuthAttackIcon,
        color: "purple",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        badgeColor: "bg-purple-100 text-purple-800",
        progressColor: "bg-purple-600",
        href: "/simulasi/auth",
    },
] as const;

function PhishingIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M3 21l9-9" />
            <path d="M9 12l6 6" />
            <path d="M15 12l-6 6" />
        </svg>
    );
}

function BruteForceIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
            <path d="M8 8l8 8" />
            <path d="M16 8l-8 8" />
        </svg>
    );
}

function SqlInjectionIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="16" y2="16" />
            <line x1="8" y1="20" x2="12" y2="20" />
        </svg>
    );
}

function AuthAttackIcon({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <path d="M12 10v4" />
            <path d="M10 12h4" />
            <path d="M8 16h8" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function ProgressRing({ progress, size = 64, strokeWidth = 6, className = "" }: { progress: number; size?: number; strokeWidth?: number; className?: string }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress / 100);

    return (
        <svg width={size} height={size} className={className} role="img" aria-label={`Progress: ${progress}%`}>
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
                y={size / 2 + 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.18}
                fontWeight="bold"
                fill="currentColor"
                className="text-gray-800"
            >
                {Math.round(progress)}%
            </text>
        </svg>
    );
}

function BadgeIcon({ name, earned, className = "w-5 h-5" }: { name: "beginner" | "suhu"; earned: boolean; className?: string }) {
    if (name === "beginner") {
        return (
            <svg viewBox="0 0 24 24" fill={earned ? "currentColor" : "none"} stroke="currentColor" strokeWidth={earned ? 0 : 2} strokeLinecap="round" strokeLinejoin="round" className={`${className} ${earned ? "text-yellow-500" : "text-gray-300"}`} aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 24 24" fill={earned ? "currentColor" : "none"} stroke="currentColor" strokeWidth={earned ? 0 : 2} strokeLinecap="round" strokeLinejoin="round" className={`${className} ${earned ? "text-orange-500" : "text-gray-300"}`} aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    );
}

export default function SimulationsIndex({ phishingProgress }: SimulationsIndexProps) {
    const progress = phishingProgress ?? {
        completionPercent: 0,
        totalScore: 0,
        maxScore: 100,
        earnedBadges: [],
    };

    const hasBeginner = progress.earnedBadges.includes("beginner");
    const hasSuhu = progress.earnedBadges.includes("suhu");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Simulasi Keamanan" />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Simulasi Keamanan Siber
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Tingkatkan kemampuan keamanan siber Anda melalui simulasi interaktif yang dirancang untuk mengajarkan pengenalan dan pencegahan ancaman nyata.
                    </p>
                </div>

                {/* Simulation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {simulations.map((sim) => (
                        <article
                            key={sim.id}
                            className="relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <Card
                                className={`${sim.bgColor} ${sim.borderColor} h-full flex flex-col rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
                                padding="lg"
                            >
                                {/* Icon Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-3 rounded-2xl ${sim.badgeColor} shadow-sm`}>
                                        <sim.icon className="w-8 h-8" />
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{sim.name}</h2>
                                <p className="text-gray-600 text-sm mb-6 flex-1">{sim.description}</p>

                                {/* Progress Section - Only for Phishing */}
                                {sim.id === "phishing" && (
                                    <div className="space-y-4 mb-6 pt-4 border-t border-gray-100">
                                        {/* Progress Ring & Stats */}
                                        <div className="flex items-center gap-4">
                                            <ProgressRing progress={progress.completionPercent} size={64} strokeWidth={6} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                    <span className="font-medium text-gray-900">{progress.totalScore}</span>
                                                    <span className="text-gray-400">/</span>
                                                    <span className="font-medium text-gray-900">{progress.maxScore}</span>
                                                    <span className="text-gray-400">poin</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                                        style={{ width: `${progress.completionPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Badge:</span>
                                            <button
                                                type="button"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                                    hasBeginner
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-400"
                                                }`}
                                                disabled={!hasBeginner}
                                                aria-label={hasBeginner ? "Badge Beginner earned" : "Badge Beginner locked"}
                                            >
                                                <BadgeIcon name="beginner" earned={hasBeginner} className="w-4 h-4" />
                                                <span>Beginner</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                                    hasSuhu
                                                        ? "bg-orange-100 text-orange-800"
                                                        : "bg-gray-100 text-gray-400"
                                                }`}
                                                disabled={!hasSuhu}
                                                aria-label={hasSuhu ? "Badge Suhu earned" : "Badge Suhu locked"}
                                            >
                                                <BadgeIcon name="suhu" earned={hasSuhu} className="w-4 h-4" />
                                                <span>Suhu</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Action Button */}
                                <div className="mt-auto pt-4">
                                    <Link href={sim.href}>
                                        <Button variant="primary" className="w-full px-6 py-3 text-lg">
                                            Mulai Simulasi
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </article>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center text-sm text-gray-500">
                    <p>Semua modul simulasi terbuka. Konten gameplay interaktif saat ini aktif penuh untuk <strong className="text-indigo-600">Phishing</strong>; modul lainnya sedang diisi bertahap.</p>
                </div>
            </div>
        </div>
    );
}