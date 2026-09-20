import type { FC } from "react";
import type { FloorDecoration } from "@/features/simulation/types/simulation";

interface DecorationLayerProps {
  decorations: FloorDecoration[];
}

export const DecorationLayer: FC<DecorationLayerProps> = ({ decorations }) => (
  <>
    {decorations.map((decoration) => (
      <div
        key={decoration.id}
        className="absolute"
        style={{
          left: `${decoration.x}%`,
          top: `${decoration.y}%`,
          transform: `translate(-50%, -50%) scale(${decoration.scale || 1})`,
          fontSize: "3rem",
        }}
      >
        {decoration.icon || "🌳"}
      </div>
    ))}
  </>
);