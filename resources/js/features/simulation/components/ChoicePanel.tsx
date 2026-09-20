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
    <div className="space-y-3">
      {choices.map((choice) => (
        <button
          key={choice.id}
          type="button"
          onClick={() => !disabled && onSelect(choice.id)}
          disabled={disabled}
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-left hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <p className="text-base font-medium text-gray-800 leading-relaxed">{choice.label}</p>
        </button>
      ))}
    </div>
  </div>
);