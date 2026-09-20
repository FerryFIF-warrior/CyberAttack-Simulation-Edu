import { FloorContent } from "@/features/simulation/types/simulation";

interface MapViewProps {
  floorContent: FloorContent;
}

const TreeIcon = () => (
  <svg viewBox="0 0 40 48" width="40" height="48" aria-hidden="true">
    {/* Trunk */}
    <rect x="17" y="30" width="6" height="18" fill="#8b5a2b" rx="2" />
    {/* Foliage layers */}
    <ellipse cx="20" cy="22" rx="16" ry="12" fill="#2d7d2d" />
    <ellipse cx="20" cy="14" rx="14" ry="10" fill="#3a9d3a" />
    <ellipse cx="20" cy="8" rx="10" ry="8" fill="#4ade4a" />
  </svg>
);

const HouseIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    {/* House body */}
    <rect x="4" y="18" width="40" height="28" fill="#d4a574" rx="2" />
    {/* Roof */}
    <polygon points="2,18 24,2 46,18" fill="#b83a3a" />
    {/* Door */}
    <rect x="20" y="32" width="8" height="14" fill="#5d3a1a" rx="1" />
    <circle cx="26" cy="39" r="1" fill="#c9a84c" />
    {/* Windows */}
    <rect x="8" y="24" width="10" height="10" fill="#87ceeb" rx="1" stroke="#fff" strokeWidth="1" />
    <rect x="30" y="24" width="10" height="10" fill="#87ceeb" rx="1" stroke="#fff" strokeWidth="1" />
    {/* Chimney */}
    <rect x="34" y="6" width="6" height="14" fill="#8b5a2b" rx="1" />
  </svg>
);

const MailboxIcon = () => (
  <svg viewBox="0 0 40 56" width="40" height="56" aria-hidden="true">
    {/* Post */}
    <rect x="18" y="30" width="4" height="26" fill="#666" />
    {/* Box body */}
    <rect x="4" y="8" width="32" height="24" fill="#1a5f1a" rx="2" />
    {/* Flag */}
    <polygon points="36,18 36,10 28,14" fill="#dc2626" />
    {/* Door */}
    <rect x="8" y="12" width="20" height="16" fill="#0d440d" rx="1" stroke="#2d7d2d" strokeWidth="1" />
    {/* Handle */}
    <circle cx="26" cy="20" r="1.5" fill="#c9a84c" />
  </svg>
);

function getDecorationIcon(id: string) {
  if (id.includes("tree")) return <TreeIcon />;
  if (id.includes("house")) return <HouseIcon />;
  return <TreeIcon />;
}

function getObjectIcon(id: string) {
  if (id.includes("mailbox")) return <MailboxIcon />;
  return <MailboxIcon />;
}

export function MapView({ floorContent }: MapViewProps) {
  const { map } = floorContent;
  const { backgroundClass, decorations, object } = map;

  return (
    <div className="relative w-full h-full">
      {/* Map Background */}
      <div
        className={`${backgroundClass} w-full h-full absolute inset-0`}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Decorations Layer - visual only, no collision */}
      {decorations.map((decoration) => (
        <div
          key={decoration.id}
          className="absolute pointer-events-none transition-transform duration-200 hover:scale-110"
          style={{
            left: `${decoration.x}%`,
            top: `${decoration.y}%`,
            transform: `translate(-50%, -50%) scale(${decoration.scale || 1})`,
            lineHeight: 1,
          }}
        >
          {getDecorationIcon(decoration.id)}
        </div>
      ))}

      {/* Interactive Object */}
      <div
        className="absolute cursor-pointer transition-transform duration-200 hover:scale-110"
        style={{
          left: `${object.x}%`,
          top: `${object.y}%`,
          transform: "translate(-50%, -50%)",
          lineHeight: 1,
        }}
        title={object.label}
        data-testid="interactive-object"
      >
        {getObjectIcon(object.id)}
      </div>
    </div>
  );
}