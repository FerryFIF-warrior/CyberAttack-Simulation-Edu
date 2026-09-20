import type { FC } from "react";

interface NarrativePanelProps {
  panels: { text: string }[];
  currentPanel: number;
  onNext: () => void;
  nextLabel?: string;
  className?: string;
}

export const NarrativePanel: FC<NarrativePanelProps> = ({
  panels,
  currentPanel,
  onNext,
  nextLabel = "Lanjut",
  className,
}) => {
  if (panels.length === 0 || currentPanel >= panels.length) return null;

  const panel = panels[currentPanel];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-[33%] bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-30 shadow-sm ${className || ""}`}
    >
      <div className="max-w-4xl mx-auto h-full overflow-y-auto">
        <p className="text-lg leading-relaxed text-gray-800">
          {panel.text}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Panel {currentPanel + 1} dari {panels.length}
          </div>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
};