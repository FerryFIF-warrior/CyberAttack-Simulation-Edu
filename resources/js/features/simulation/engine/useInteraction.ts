import { useEffect, useRef } from "react";
import type { FloorObject } from "@/features/simulation/types/simulation";
import { calculateDistance } from "@/features/simulation/engine/distance";

export function useInteraction(
  playerPosition: { x: number; y: number },
  object: FloorObject,
  onInteract: () => void,
  enabled: boolean = true,
  movementLocked: boolean = false
): { showPrompt: boolean } {
  const showPromptRef = useRef(false);

  useEffect(() => {
    if (!enabled || movementLocked) {
      showPromptRef.current = false;
      return;
    }

    const distance = calculateDistance(
      playerPosition.x,
      playerPosition.y,
      object.x,
      object.y
    );

    const showPrompt = distance <= object.interactionRadius;
    showPromptRef.current = showPrompt;

    if (showPrompt) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === "e") {
          event.preventDefault();
          onInteract();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [playerPosition, object, movementLocked, enabled, onInteract]);

  return { showPrompt: showPromptRef.current };
}