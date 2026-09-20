import { useEffect } from "react";

export function useKeyboardMovement(
  onMove: (direction: "up" | "down" | "left" | "right") => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      console.log('[useKeyboardMovement] Key pressed:', key, 'enabled:', enabled); // Debug

      if (["arrowup", "w"].includes(key)) {
        event.preventDefault();
        onMove("up");
      } else if (["arrowdown", "s"].includes(key)) {
        event.preventDefault();
        onMove("down");
      } else if (["arrowleft", "a"].includes(key)) {
        event.preventDefault();
        onMove("left");
      } else if (["arrowright", "d"].includes(key)) {
        event.preventDefault();
        onMove("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMove, enabled]);
}