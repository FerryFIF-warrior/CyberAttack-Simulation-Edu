import { useEffect, useRef } from "react";

export function useGameLoop(
  callback: (deltaTime: number) => void,
  deps: React.DependencyList = []
): void {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    previousTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = currentTime;
      }
      const deltaTime = currentTime - previousTimeRef.current;
      previousTimeRef.current = currentTime;

      callback(deltaTime / 1000);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}