import type { FC } from "react";
import type { StoryChoice } from "@/features/simulation/types/simulation";

interface ChoicePanelProps {
  choices: StoryChoice[];
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
  className?: string;
}

export const ChoicePanel: FC<ChoicePanelProps> = ({
  choices,
  onSelect,
  disabled = false,
  className,
}) => (
  <div
    className={`absolute left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 ${className || ""}`}
    style={{ bottom: "calc(33% + 16px)" }}
  >
    <div className="space-y-2.5">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => !disabled && onSelect(choice.id)}
          disabled={disabled}
          className="w-full px-4 py-3.5 bg-cat-card border border-cat-line rounded-xl text-left hover:border-cat-cyan/30 hover:bg-white/[0.03] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cat-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cat-bg group"
        >
          <p className="text-sm font-medium text-slate-200 leading-relaxed group-hover:text-white">{choice.label}</p>
        </button>
      ))}
    </div>
  </div>
);
