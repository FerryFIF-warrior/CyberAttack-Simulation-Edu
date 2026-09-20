import type { FC } from "react";

interface InteractionPromptProps {
  visible: boolean;
  label?: string;
  className?: string;
}

export const InteractionPrompt: FC<InteractionPromptProps> = ({ visible, label = "Interaksi", className }) => {
  if (!visible) return null;

  return (
    <div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black/80 backdrop-blur-sm text-white rounded-xl text-sm font-medium shadow-lg animate-pulse ${className || ""}`}
    >
      Tekan E untuk {label}
    </div>
  );
};