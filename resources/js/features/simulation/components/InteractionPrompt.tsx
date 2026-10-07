import type { FC } from "react";
interface InteractionPromptProps { visible: boolean; label?: string; className?: string; }
export const InteractionPrompt: FC<InteractionPromptProps> = ({ visible, label = "Interaksi", className }) => {
  if (!visible) return null;
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 z-20 px-4 sm:px-5 py-2 sm:py-2.5 bg-cat-card/95 backdrop-blur border border-cat-cyan/30 text-slate-100 rounded-full sm:rounded-xl text-xs sm:text-sm font-medium shadow-[0_8px_24px_rgba(0,229,255,0.15)] flex items-center gap-2 sm:gap-3 animate-pulse ${className || ""}`} style={{ bottom: "10px" }}>
      <span className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-md bg-cat-cyan text-cat-bg font-mono text-[11px] font-bold shrink-0">E</span>
      <span className="whitespace-nowrap">Tekan <span className="sm:hidden font-bold">E</span> untuk {label}</span>
      <span className="hidden sm:inline w-px h-4 bg-cat-line" />
      <span className="hidden sm:inline font-mono text-[11px] text-cat-muted whitespace-nowrap">Enter juga bisa</span>
    </div>
  );
};
