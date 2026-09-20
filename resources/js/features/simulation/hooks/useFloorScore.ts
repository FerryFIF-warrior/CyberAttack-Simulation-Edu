import { useMemo } from "react";
import type { FloorProgress } from "@/features/simulation/types/progress";

export function useFloorScore(
  floorProgress: FloorProgress | undefined
): { bestPoints: number; maxPoints: number; completed: boolean; displayPoints: string } {
  return useMemo(() => {
    if (!floorProgress) {
      return { bestPoints: 0, maxPoints: 0, completed: false, displayPoints: "0" };
    }

    const formatPoints = (points: number): string => {
      if (points > 0) return `+${points}`;
      if (points < 0) return `${points}`;
      return "0";
    };

    return {
      bestPoints: floorProgress.bestPoints,
      maxPoints: floorProgress.maxPoints,
      completed: floorProgress.completed,
      displayPoints: formatPoints(floorProgress.bestPoints),
    };
  }, [floorProgress]);
}

export function useLevelScore(
  levelProgress: { floors: FloorProgress[]; maxScore: number } | undefined
): { rawScore: number; levelScore: number; maxScore: number; completed: boolean; mastered: boolean; displayScore: string } {
  return useMemo(() => {
    if (!levelProgress) {
      return { rawScore: 0, levelScore: 0, maxScore: 20, completed: false, mastered: false, displayScore: "0/20" };
    }

    const rawScore = levelProgress.floors.reduce((sum, f) => sum + f.bestPoints, 0);
    const levelScore = Math.min(Math.max(rawScore, 0), levelProgress.maxScore);
    const completed = levelProgress.floors.every((f) => f.completed);
    const mastered = levelScore === levelProgress.maxScore;

    return {
      rawScore,
      levelScore,
      maxScore: levelProgress.maxScore,
      completed,
      mastered,
      displayScore: `${levelScore}/${levelProgress.maxScore}`,
    };
  }, [levelProgress]);
}

export function useSimulationScore(
  simulationProgress: { levels: { levelScore: number; maxScore: number }[]; maxScore: number } | undefined
): { totalScore: number; maxScore: number; masteryPercent: number; displayScore: string } {
  return useMemo(() => {
    if (!simulationProgress) {
      return { totalScore: 0, maxScore: 100, masteryPercent: 0, displayScore: "0/100" };
    }

    const totalScore = simulationProgress.levels.reduce((sum, l) => sum + l.levelScore, 0);
    const masteryPercent = Math.round((totalScore / simulationProgress.maxScore) * 100);

    return {
      totalScore,
      maxScore: simulationProgress.maxScore,
      masteryPercent,
      displayScore: `${totalScore}/${simulationProgress.maxScore}`,
    };
  }, [simulationProgress]);
}