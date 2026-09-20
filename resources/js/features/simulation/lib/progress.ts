import type { SimulationId, BadgeId, LevelConfig } from "@/features/simulation/types/simulation";
import type { SimulationProgress, LevelProgress, FloorProgress } from "@/features/simulation/types/progress";
import { SIMULATION_LEVEL_CONFIG } from "@/features/simulation/types/simulation";

export function createFloorProgress(
  floorId: string,
  levelNumber: number,
  floorNumber: number,
  maxPoints: number
): FloorProgress {
  return {
    floorId,
    levelNumber,
    floorNumber,
    completed: false,
    bestPoints: 0,
    maxPoints,
  };
}

export function createLevelProgress(
  levelConfig: LevelConfig,
  floorMaxPoints: number[]
): LevelProgress {
  const floors: FloorProgress[] = levelConfig.floorCount > 0
    ? Array.from({ length: levelConfig.floorCount }, (_, i) =>
        createFloorProgress(
          `${levelConfig.level}-${i + 1}`,
          levelConfig.level,
          i + 1,
          floorMaxPoints[i] ?? 4
        )
      )
    : [];

  return {
    levelNumber: levelConfig.level,
    completed: false,
    mastered: false,
    unlocked: levelConfig.level === 1,
    rawScore: 0,
    levelScore: 0,
    maxScore: levelConfig.maxScore,
    floors,
  };
}

export function createSimulationProgress(
  simulationId: SimulationId,
  levelConfigs: LevelConfig[]
): SimulationProgress {
  return {
    simulationId,
    completedFloorCount: 0,
    totalFloorCount: levelConfigs.reduce((sum, c) => sum + c.floorCount, 0),
    completionPercent: 0,
    totalScore: 0,
    maxScore: levelConfigs.reduce((sum, c) => sum + c.maxScore, 0),
    masteryPercent: 0,
    earnedBadges: [],
    levels: levelConfigs.map((config) => createLevelProgress(config, [])),
  };
}

export function updateFloorBestScore(
  progress: SimulationProgress,
  _simulationId: SimulationId,
  levelNumber: number,
  floorNumber: number,
  newPoints: number,
  maxPoints: number
): SimulationProgress {
  const levelIndex = progress.levels.findIndex((l) => l.levelNumber === levelNumber);
  if (levelIndex === -1) return progress;

  const level = progress.levels[levelIndex];
  const floorIndex = level.floors.findIndex((f) => f.floorNumber === floorNumber);
  if (floorIndex === -1) return progress;

  const floor = level.floors[floorIndex];
  const updatedBestPoints = Math.max(floor.bestPoints, newPoints);

  const updatedFloor: FloorProgress = {
    ...floor,
    completed: true,
    bestPoints: updatedBestPoints,
    maxPoints: floor.maxPoints || maxPoints,
  };

  const updatedLevelFloors = [...level.floors];
  updatedLevelFloors[floorIndex] = updatedFloor;

  const updatedLevel: LevelProgress = {
    ...level,
    floors: updatedLevelFloors,
  };

  const updatedLevels = [...progress.levels];
  updatedLevels[levelIndex] = updatedLevel;

  return recalculateProgress({
    ...progress,
    levels: updatedLevels,
  });
}

function recalculateProgress(progress: SimulationProgress): SimulationProgress {
  let completedFloorCount = 0;
  let totalScore = 0;

  const updatedLevels = progress.levels.map((level) => {
    const rawScore = level.floors.reduce((sum, f) => sum + f.bestPoints, 0);
    const levelScore = Math.min(Math.max(rawScore, 0), level.maxScore);
    const completed = level.floors.every((f) => f.completed);
    const mastered = levelScore === level.maxScore;

    completedFloorCount += level.floors.filter((f) => f.completed).length;
    totalScore += levelScore;

    return {
      ...level,
      rawScore,
      levelScore,
      completed,
      mastered,
    };
  });

  const nextLevel = updatedLevels.find((l) => !l.unlocked && l.levelNumber > 1);
  if (nextLevel) {
    const prevLevel = updatedLevels.find((l) => l.levelNumber === nextLevel.levelNumber - 1);
    if (prevLevel) {
      nextLevel.unlocked = prevLevel.completed && prevLevel.levelScore >= 15;
    }
  }

  const completionPercent = Math.round((completedFloorCount / progress.totalFloorCount) * 100);
  const masteryPercent = Math.round((totalScore / progress.maxScore) * 100);

  const earnedBadges: BadgeId[] = [];
  const level1 = updatedLevels.find((l) => l.levelNumber === 1);
  const level2 = updatedLevels.find((l) => l.levelNumber === 2);
  if (level1?.levelScore === 20 && level2?.levelScore === 20) {
    earnedBadges.push("beginner");
  }
  if (updatedLevels.every((l) => l.levelScore === 20)) {
    earnedBadges.push("suhu");
  }

  return {
    ...progress,
    levels: updatedLevels,
    completedFloorCount,
    totalScore,
    completionPercent,
    masteryPercent,
    earnedBadges,
  };
}

export function getPhishingProgress(progress: SimulationProgress | null): SimulationProgress {
  if (progress) return progress;
  return createSimulationProgress("phishing", SIMULATION_LEVEL_CONFIG);
}