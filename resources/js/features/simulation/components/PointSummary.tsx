import type { FC } from "react";

interface PointSummaryProps {
  floorPoints: number;
  isLastFloor: boolean;
  totalLevelPoints?: number;
  maxLevelPoints?: number;
  level: number;
  nextFloor?: number;
  onContinue: () => void;
  className?: string;
}

export const PointSummary: FC<PointSummaryProps> = ({
  floorPoints,
  isLastFloor,
  totalLevelPoints,
  maxLevelPoints,
  level,
  nextFloor,
  onContinue,
  className,
}) => {
  const pointsClass = floorPoints > 0 ? "text-cat-cyan" : floorPoints < 0 ? "text-red-400" : "text-cat-muted";
  const pointsPrefix = floorPoints > 0 ? "+" : "";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 ${className || ""}`}
      style={{ height: "33%" }}
    >
      <div className="absolute inset-0 bg-cat-card border-t border-cat-line shadow-[0_-8px_30px_rgba(0,0,0,0.4)]" />
      <div className="relative max-w-4xl mx-auto h-full p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <p className="text-lg font-semibold text-slate-200">
            Poin Floor: <span className={pointsClass}>{pointsPrefix}{floorPoints}</span>
          </p>
        </div>

        {isLastFloor && totalLevelPoints !== undefined && maxLevelPoints !== undefined && (
          <div className="mb-4 p-4 bg-cat-surface border border-cat-line rounded-xl w-full max-w-md">
            <p className="font-mono text-[11px] tracking-widest uppercase text-cat-muted">Total Level {level}</p>
            <p className="text-xl font-bold text-white mt-1">
              {Math.max(0, Math.min(totalLevelPoints, maxLevelPoints))} <span className="text-cat-muted font-normal text-base">/ {maxLevelPoints}</span>
            </p>
          </div>
        )}

        <div className="flex gap-3 w-full max-w-md justify-center mt-3">
          {nextFloor ? (
            <button
              type="button"
              onClick={onContinue}
              className="flex-1 px-6 py-3 bg-cat-cyan text-cat-bg rounded-lg font-semibold hover:brightness-110 transition shadow-[0_0_20px_rgba(0,229,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cat-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cat-card"
            >
              Lanjut ke Floor {nextFloor}
            </button>
          ) : (
            <button
              type="button"
              onClick={onContinue}
              className="flex-1 px-6 py-3 bg-white/[0.06] border border-cat-line text-slate-200 rounded-lg font-semibold hover:bg-white/[0.08] transition"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
};