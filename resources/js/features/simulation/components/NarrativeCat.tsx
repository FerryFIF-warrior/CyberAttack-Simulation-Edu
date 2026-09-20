import type { FC } from "react";

type Position = "center" | "left";

interface NarrativeCatProps {
  position: Position;
  visible: boolean;
  className?: string;
}

const CatBody = () => (
  <g transform="translate(0, 0)">
    {/* Body */}
    <ellipse cx="40" cy="60" rx="28" ry="24" fill="#ffaa44" />
    {/* Head */}
    <circle cx="40" cy="30" r="22" fill="#ffaa44" />
    {/* Ears */}
    <polygon points="24,14 16,0 36,8" fill="#ffaa44" />
    <polygon points="56,14 64,0 44,8" fill="#ffaa44" />
    {/* Inner ears */}
    <polygon points="28,10 24,4 34,12" fill="#ff8822" />
    <polygon points="52,10 56,4 46,12" fill="#ff8822" />
    {/* Eyes - narrative mode: calm/attentive */}
    <circle cx="32" cy="26" r="5" fill="#222" />
    <circle cx="48" cy="26" r="5" fill="#222" />
    {/* Eye highlights */}
    <circle cx="31" cy="25" r="2" fill="#fff" />
    <circle cx="47" cy="25" r="2" fill="#fff" />
    {/* Nose */}
    <ellipse cx="40" cy="35" rx="3" ry="2" fill="#ff6688" />
    {/* Mouth - gentle smile */}
    <path d="M40 38 Q34 44 40 48 Q46 44 40 38" fill="none" stroke="#222" strokeWidth="2" />
    {/* Whiskers */}
    <line x1="18" y1="33" x2="4" y2="29" stroke="#222" strokeWidth="1.5" />
    <line x1="18" y1="37" x2="4" y2="41" stroke="#222" strokeWidth="1.5" />
    <line x1="62" y1="33" x2="76" y2="29" stroke="#222" strokeWeight="1.5" />
    <line x1="62" y1="37" x2="76" y2="41" stroke="#222" strokeWeight="1.5" />
    {/* Paws */}
    <ellipse cx="24" cy="78" rx="10" ry="7" fill="#ffaa44" />
    <ellipse cx="56" cy="78" rx="10" ry="7" fill="#ffaa44" />
    {/* Tail curled */}
    <path d="M68 52 Q85 45 95 58 Q88 70 80 65" fill="none" stroke="#ffaa44" strokeWidth="12" strokeLinecap="round" />
  </g>
);

export const NarrativeCat: FC<NarrativeCatProps> = ({ position, visible, className }) => {
  if (!visible) return null;

  const isCenter = position === "center";

  return (
    <div
      className={`absolute transition-all duration-500 ease-out ${className || ""}`}
      style={{
        left: isCenter ? "50%" : "28%",
        top: "42%",
        transform: "translate(-50%, -50%)",
        zIndex: 20,
        width: "80px",
        height: "100px",
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 100" width="80" height="100">
        <CatBody />
      </svg>
    </div>
  );
};