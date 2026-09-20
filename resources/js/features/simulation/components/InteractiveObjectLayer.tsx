import type { FC } from "react";
import type { FloorObject } from "@/features/simulation/types/simulation";

interface InteractiveObjectLayerProps {
  object: FloorObject;
  onInteract: () => void;
  className?: string;
}

export const InteractiveObjectLayer: FC<InteractiveObjectLayerProps> = ({
  object,
  onInteract,
  className,
}) => (
  <div
    className={`absolute cursor-pointer transition-transform hover:scale-110 ${className || ""}`}
    style={{
      left: `${object.x}%`,
      top: `${object.y}%`,
      transform: "translate(-50%, -50%)",
      fontSize: "4rem",
    }}
    onClick={onInteract}
    title={object.label}
  >
    {object.icon || "📮"}
  </div>
);