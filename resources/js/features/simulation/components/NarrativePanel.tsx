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
      className={`fixed bottom-0 left-0 right-0 h-[33%] bg-cat-card/95 backdrop-blur border-t border-cat-line p-4 z-30 shadow-[0_-8px_30px_rgba(0,0,0,0.4)] ${className || ""}`}
    >
      <div className="max-w-4xl mx-auto h-full overflow-y-auto flex flex-col">
        <p className="text-[15px] leading-[1.7] text-slate-200">
          {panel.text}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-[11px] tracking-widest uppercase text-cat-muted">
            {(String(currentPanel + 1).padStart(2, "0"))} / {String(panels.length).padStart(2, "0")}
          </span>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-cat-cyan text-cat-bg rounded-lg font-semibold text-sm hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cat-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cat-card"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
};