import type { FC } from "react";
import { useEffect, useState } from "react";

interface MobileDPadProps {
  onMove: (direction: "up" | "down" | "left" | "right") => void;
  disabled?: boolean;
  className?: string;
}

export const MobileDPad: FC<MobileDPadProps> = ({
  onMove,
  disabled = false,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (disabled || !isMobile) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 ${className || ""}`}
      style={{ touchAction: "none" }}
    >
      <div className="grid grid-cols-3 gap-1.5">
        <div className="col-span-1" />
        <button
          onClick={() => onMove("up")}
          onTouchStart={(e) => {
            e.preventDefault();
            onMove("up");
          }}
          className="w-14 h-14 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-t-xl flex items-center justify-center text-2xl shadow-md active:scale-95 transition-transform"
        >
          ▲
        </button>
        <div className="col-span-1" />

        <button
          onClick={() => onMove("left")}
          onTouchStart={(e) => {
            e.preventDefault();
            onMove("left");
          }}
          className="w-14 h-14 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-l-xl flex items-center justify-center text-2xl shadow-md active:scale-95 transition-transform"
        >
          ◀
        </button>
        <div className="w-14 h-14" />
        <button
          onClick={() => onMove("right")}
          onTouchStart={(e) => {
            e.preventDefault();
            onMove("right");
          }}
          className="w-14 h-14 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-r-xl flex items-center justify-center text-2xl shadow-md active:scale-95 transition-transform"
        >
          ▶
        </button>

        <div className="col-span-1" />
        <button
          onClick={() => onMove("down")}
          onTouchStart={(e) => {
            e.preventDefault();
            onMove("down");
          }}
          className="w-14 h-14 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-b-xl flex items-center justify-center text-2xl shadow-md active:scale-95 transition-transform"
        >
          ▼
        </button>
        <div className="col-span-1" />
      </div>
    </div>
  );
};