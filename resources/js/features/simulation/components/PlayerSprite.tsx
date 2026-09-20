import type { FC } from "react";

interface PlayerSpriteProps {
  x: number;
  y: number;
  className?: string;
}

const CatBody = () => (
  <g transform="translate(0, 0)">
    {/* Body */}
    <ellipse cx="24" cy="36" rx="16" ry="14" fill="#ffaa44" />
    {/* Head */}
    <circle cx="24" cy="18" r="13" fill="#ffaa44" />
    {/* Ears */}
    <polygon points="14,8 10,0 22,4" fill="#ffaa44" />
    <polygon points="34,8 38,0 26,4" fill="#ffaa44" />
    {/* Inner ears */}
    <polygon points="16,6 14,2 20,6" fill="#ff8822" />
    <polygon points="32,6 34,2 28,6" fill="#ff8822" />
    {/* Eyes */}
    <circle cx="19" cy="16" r="3" fill="#222" />
    <circle cx="29" cy="16" r="3" fill="#222" />
    {/* Eye highlights */}
    <circle cx="18" cy="15" r="1" fill="#fff" />
    <circle cx="28" cy="15" r="1" fill="#fff" />
    {/* Nose */}
    <ellipse cx="24" cy="21" rx="2" ry="1.5" fill="#ff6688" />
    {/* Mouth */}
    <path d="M24 23 Q20 26 24 28 Q28 26 24 23" fill="none" stroke="#222" strokeWidth="1.5" />
    {/* Whiskers */}
    <line x1="12" y1="20" x2="4" y2="18" stroke="#222" strokeWidth="1" />
    <line x1="12" y1="22" x2="4" y2="24" stroke="#222" strokeWidth="1" />
    <line x1="36" y1="20" x2="44" y2="18" stroke="#222" strokeWidth="1" />
    <line x1="36" y1="22" x2="44" y2="24" stroke="#222" strokeWidth="1" />
    {/* Paws */}
    <ellipse cx="14" cy="46" rx="6" ry="4" fill="#ffaa44" />
    <ellipse cx="34" cy="46" rx="6" ry="4" fill="#ffaa44" />
    {/* Tail */}
    <path d="M40 32 Q50 28 55 35 Q50 42 45 38" fill="none" stroke="#ffaa44" strokeWidth="8" strokeLinecap="round" />
  </g>
);

export const PlayerSprite: FC<PlayerSpriteProps> = ({ x, y, className }) => (
  <div
    className={`absolute z-10 transition-all duration-300 hover:scale-105 ${className || ""}`}
    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", width: "48px", height: "56px" }}
  >
    <svg viewBox="0 0 48 56" width="48" height="56" aria-hidden="true">
      <CatBody />
    </svg>
  </div>
);