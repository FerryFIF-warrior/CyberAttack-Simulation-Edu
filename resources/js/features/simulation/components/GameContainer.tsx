import { ReactNode, useRef, useEffect, useState, KeyboardEventHandler } from "react";
interface GameContainerProps { children: ReactNode; aspectRatio?: string; onKeyDown?: KeyboardEventHandler<HTMLDivElement>; }

export function GameContainer({ children, aspectRatio = "16 / 9", onKeyDown }: GameContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    el?.focus();
    const h = () => el?.focus();
    el?.addEventListener("click", h);
    return () => el?.removeEventListener("click", h);
  }, []);
  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative w-full max-w-[960px] mx-auto bg-cat-surface border border-cat-line overflow-hidden focus:outline-none transition-all duration-200 rounded-xl sm:rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] ${isFocused ? "ring-2 ring-cat-cyan ring-offset-2 ring-offset-cat-bg" : ""}`}
      style={{ aspectRatio }}
      onKeyDown={onKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
      {!isFocused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 p-4">
          <div className="bg-cat-card/90 backdrop-blur border border-cat-line text-cat-muted px-3 sm:px-5 py-2 sm:py-2.5 rounded-full sm:rounded-lg text-[11px] sm:text-sm font-mono tracking-wide shadow-lg text-center">
            <span className="hidden sm:inline">klik area lalu WASD / arrow — Enter/E untuk interaksi</span>
            <span className="sm:hidden">tap area lalu pakai D-Pad</span>
          </div>
        </div>
      )}
    </div>
  );
}
