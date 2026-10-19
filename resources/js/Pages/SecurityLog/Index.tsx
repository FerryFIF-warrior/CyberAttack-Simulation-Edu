import { Head, Link } from "@inertiajs/react";
import { SecurityLogList } from "@/features/security-log/components/SecurityLogList";
import type { SecurityLogLabMeta } from "@/features/security-log/components/SecurityLogList";
import type { SecurityLogEntry } from "@/features/security-log/types";

interface SecurityLogIndexProps {
    logs: SecurityLogEntry[];
    labs?: Record<string, SecurityLogLabMeta>;
}

export default function SecurityLogIndex({ logs, labs = {} }: SecurityLogIndexProps) {
    const totalPoints = logs.reduce((sum, log) => sum + log.points, 0);
    const activeModules = new Set(logs.map((log) => log.simulation_id)).size;

    return (
        <div
            className="min-h-screen"
            style={{
                background:
                    "radial-gradient(900px 600px at 20% -10%, #1a2a44 0%, transparent 60%),radial-gradient(800px 600px at 95% 10%, #1e2a4a 0%, transparent 55%),#070b14",
            }}
        >
            <Head title="Security Log" />

            <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-5">
                <header
                    className="p-5 sm:p-7"
                    style={{
                        background: "#162030",
                        border: "3px solid #233044",
                        borderRadius: 28,
                        boxShadow:
                            "0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08),inset 0 -3px 0 rgba(0,0,0,0.35)",
                    }}
                >
                    <span
                        className="inline-flex px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest"
                        style={{
                            background: "#0f1828",
                            border: "2px solid rgba(255,255,255,0.07)",
                            color: "rgba(255,255,255,0.55)",
                            fontFamily: "'Space Mono',monospace",
                        }}
                    >
                        Security Log
                    </span>
                    <h1
                        className="mt-3 text-[24px] sm:text-[28px] font-extrabold text-white"
                        style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}
                    >
                        Jejak Aktivitas Sandbox
                    </h1>
                    <p
                        className="mt-2 text-[13px] leading-6 max-w-[560px]"
                        style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}
                    >
                        Catatan real-time setiap aksi simulasi pada environment dummy. Hanya aktivitas milik akun Anda yang ditampilkan.
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                        {[
                            { label: "Total Aksi", value: String(logs.length) },
                            { label: "Modul Disentuh", value: String(activeModules) },
                            { label: "Akumulasi Poin", value: String(totalPoints) },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="px-3 py-3 text-center"
                                style={{
                                    background: "#0f1828",
                                    border: "2px solid rgba(255,255,255,0.06)",
                                    borderRadius: 20,
                                    boxShadow: "inset 0 3px 10px rgba(0,0,0,0.55)",
                                }}
                            >
                                <p
                                    className="text-[10px] font-extrabold tracking-[0.12em] uppercase"
                                    style={{ color: "#8b98ab", fontFamily: "'Space Mono',monospace" }}
                                >
                                    {stat.label}
                                </p>
                                <p
                                    className="mt-1 text-[20px] font-extrabold text-white"
                                    style={{ fontFamily: "'Bricolage Grotesque','Nunito',sans-serif" }}
                                >
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </header>

                <section
                    className="p-4 sm:p-5"
                    style={{
                        background: "#162030",
                        border: "3px solid #233044",
                        borderRadius: 28,
                        boxShadow:
                            "0 18px 36px rgba(0,0,0,0.55),inset 0 1.5px 0 rgba(255,255,255,0.08)",
                    }}
                >
                    <SecurityLogList
                        logs={logs}
                        labs={labs}
                        emptyText="Belum ada aktivitas. Jalankan simulator untuk mengisi log."
                    />

                    {logs.length === 0 && (
                        <div className="mt-5 text-center">
                            <Link
                                href="/simulasi"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] text-sm font-extrabold"
                                style={{
                                    background: "#00e5ff",
                                    color: "#0a0e15",
                                    border: "2.5px solid #00b8cc",
                                    boxShadow: "0 5px 0 #00b8cc,0 10px 22px rgba(0,0,0,0.3)",
                                    fontFamily: "'Nunito',sans-serif",
                                }}
                            >
                                Buka Simulator
                            </Link>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
