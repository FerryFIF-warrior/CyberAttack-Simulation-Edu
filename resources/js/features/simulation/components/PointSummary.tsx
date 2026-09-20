import type { FC } from "react";
import { Link } from "@inertiajs/react";

interface PointSummaryProps {
  floorPoints: number;
  isLastFloor: boolean;
  totalLevelPoints?: number;
  maxLevelPoints?: number;
  simulationId: string;
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
  simulationId,
  level,
  nextFloor,
  onContinue,
  className,
}) => {
  const pointsClass = floorPoints > 0 ? "text-green-600" : floorPoints < 0 ? "text-red-600" : "text-gray-600";
  const pointsPrefix = floorPoints > 0 ? "+" : "";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 ${className || ""}`}
      style={{ height: "33%" }}
    >
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]" />
      <div className="relative max-w-4xl mx-auto h-full p-4 md:p-6 flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-800">
            Poin Floor: <span className={pointsClass}>{pointsPrefix}{floorPoints}</span>
          </p>
        </div>

        {isLastFloor && totalLevelPoints !== undefined && maxLevelPoints !== undefined && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 w-full max-w-md">
            <p className="text-lg font-semibold text-blue-800">
              Total Poin Level {level}: <span className="text-2xl">{Math.max(0, Math.min(totalLevelPoints, maxLevelPoints))}</span> / {maxLevelPoints}
            </p>
          </div>
        )}

        <div className="flex gap-3 w-full max-w-md justify-center">
          {isLastFloor ? (
            <Link
              href={`/simulasi/${simulationId}/level/${level}`}
              onClick={onContinue}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center font-medium shadow-sm"
            >
              Kembali ke Level
            </Link>
          ) : nextFloor ? (
            <button
              type="button"
              onClick={onContinue}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Lanjut ke Floor {nextFloor}
            </button>
          ) : (
            <Link
              href={`/simulasi/${simulationId}/level/${level}`}
              onClick={onContinue}
              className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center font-medium shadow-sm"
            >
              Kembali ke Level
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};