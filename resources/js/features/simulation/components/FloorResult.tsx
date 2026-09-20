import type { FC } from "react";

interface FloorResultProps {
  resultPanels: { text: string }[];
  currentPanel: number;
  onNext: () => void;
  onComplete: () => void;
  className?: string;
}

export const FloorResult: FC<FloorResultProps> = ({
  resultPanels,
  currentPanel,
  onNext,
  onComplete,
  className,
}) => {
  if (resultPanels.length === 0) return null;

  const panel = resultPanels[currentPanel];
  const isLastPanel = currentPanel === resultPanels.length - 1;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-[33%] bg-white/95 border-t border-gray-200 p-4 z-30 ${className || ""}`}
    >
      <div className="max-w-4xl mx-auto h-full overflow-y-auto">
        <p className="text-lg leading-relaxed text-gray-800">
          {panel.text}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {currentPanel + 1} / {resultPanels.length}
          </div>
          <button
            onClick={isLastPanel ? onComplete : onNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {isLastPanel ? "Selesai" : "Selanjutnya"}
          </button>
        </div>
      </div>
    </div>
  );
};