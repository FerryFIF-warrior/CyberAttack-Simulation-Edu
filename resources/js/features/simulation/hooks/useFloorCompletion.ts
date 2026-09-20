import { useCallback } from "react";
import { useProgressStore } from "@/features/simulation/store/useSimulationStore";
import { useSimulationStore } from "@/features/simulation/store/useSimulationStore";
import { getChoicePoints, getChoiceResult } from "@/features/simulation/lib/scoring";
import type { FloorContent, ChoiceId } from "@/features/simulation/types/simulation";

export function useFloorCompletion(
  floorContent: FloorContent,
  onComplete?: (points: number, result: { text: string }[]) => void
) {
  const { updateFloorProgress } = useProgressStore();
  const { setPhase, setResultNarrative, setSelectedChoice, setMovementLocked } = useSimulationStore();

  const handleChoiceSelect = useCallback(
    (choiceId: ChoiceId) => {
      const points = getChoicePoints(floorContent, choiceId);
      const result = getChoiceResult(floorContent, choiceId);

      setSelectedChoice(choiceId);
      setResultNarrative(result);
      setPhase("resultNarrative");

      updateFloorProgress(
        floorContent.simulationId,
        floorContent.levelNumber,
        floorContent.floorNumber,
        points,
        floorContent.maxPoints
      );

      setMovementLocked(true);

      if (onComplete) {
        onComplete(points, result);
      }
    },
    [floorContent, setSelectedChoice, setResultNarrative, setPhase, setMovementLocked, updateFloorProgress, onComplete]
  );

  const handleFloorComplete = useCallback(() => {
    setPhase("floorCompleted");
    setMovementLocked(false);
    setSelectedChoice(null);
    setResultNarrative(null);
  }, [setPhase, setMovementLocked, setSelectedChoice, setResultNarrative]);

  return {
    handleChoiceSelect,
    handleFloorComplete,
  };
}