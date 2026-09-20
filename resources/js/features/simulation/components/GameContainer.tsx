import { ReactNode, useRef, useEffect, useState, KeyboardEventHandler } from "react";

interface GameContainerProps {
  children: ReactNode;
  aspectRatio?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export function GameContainer({ children, aspectRatio = "16 / 9", onKeyDown }: GameContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    container?.focus();

    // Ensure click on game area focuses it for keyboard
    container?.addEventListener('click', () => container.focus());
  }, []);

  // 1cm ≈ 37.8px at 96 DPI, use calc for responsive viewport sizing
  const widthStyle = { width: "calc(100vw - 2cm)", maxWidth: "100%" };
  const heightStyle = { height: "calc(100vh - 2cm)", maxHeight: "100%" };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative mx-auto bg-gray-100 overflow-hidden focus:outline-none transition-all duration-200 rounded-3xl shadow-2xl ${
        isFocused ? 'ring-2 ring-indigo-400 ring-offset-2' : ''
      }`}
      style={{
        ...widthStyle,
        ...heightStyle,
        aspectRatio
      }}
      onKeyDown={onKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
      {/* Focus hint */}
      {!isFocused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-xl text-sm">
            Klik area ini lalu gunakan Arrow Keys / WASD
          </div>
        </div>
      )}
    </div>
  );
}
