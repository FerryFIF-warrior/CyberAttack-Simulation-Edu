import type { SimulationId, BadgeId } from "./simulation";
import { SIMULATION_LEVEL_CONFIG } from "./simulation";

export type FloorProgress = {
  floorId: string;
  levelNumber: number;
  floorNumber: number;
  completed: boolean;
  bestPoints: number;
  maxPoints: number;
};

export type LevelProgress = {
  levelNumber: number;
  completed: boolean;
  mastered: boolean;
  unlocked: boolean;
  rawScore: number;
  levelScore: number;
  maxScore: number;
  floors: FloorProgress[];
};

export type SimulationProgress = {
  simulationId: SimulationId;
  completedFloorCount: number;
  totalFloorCount: number;
  completionPercent: number;
  totalScore: number;
  maxScore: number;
  masteryPercent: number;
  earnedBadges: BadgeId[];
  levels: LevelProgress[];
};

export function createInitialFloorProgress(
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

export function createInitialLevelProgress(
  levelNumber: number,
  maxScore: number,
  floorCount: number
): LevelProgress {
  const floors: FloorProgress[] = [];
  for (let i = 1; i <= floorCount; i++) {
    floors.push(
      createInitialFloorProgress(
        `${levelNumber}-${i}`,
        levelNumber,
        i,
        0
      )
    );
  }

  return {
    levelNumber,
    completed: false,
    mastered: false,
    unlocked: levelNumber === 1,
    rawScore: 0,
    levelScore: 0,
    maxScore,
    floors,
  };
}

export function createInitialSimulationProgress(
  simulationId: SimulationId
): SimulationProgress {
  const levels: LevelProgress[] = SIMULATION_LEVEL_CONFIG.map((config) =>
    createInitialLevelProgress(config.level, config.maxScore, config.floorCount)
  );

  return {
    simulationId,
    completedFloorCount: 0,
    totalFloorCount: 30,
    completionPercent: 0,
    totalScore: 0,
    maxScore: 100,
    masteryPercent: 0,
    earnedBadges: [],
    levels,
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function calculateLevelScore(
  floorProgresses: FloorProgress[]
): { rawScore: number; levelScore: number } {
  const rawScore = floorProgresses.reduce(
    (sum, fp) => sum + fp.bestPoints,
    0
  );
  const levelScore = clamp(rawScore, 0, 20);
  return { rawScore, levelScore };
}

export function calculateSimulationProgress(
  progress: SimulationProgress
): SimulationProgress {
  const updatedLevels = progress.levels.map((level) => {
    const { rawScore, levelScore } = calculateLevelScore(level.floors);
    const completed = level.floors.every((f) => f.completed);
    const mastered = levelScore === level.maxScore;

    let nextLevel = progress.levels.find((l) => l.levelNumber === level.levelNumber + 1);
    if (nextLevel) {
      nextLevel.unlocked = completed && levelScore >= 15;
    }

    return {
      ...level,
      rawScore,
      levelScore,
      completed,
      mastered,
    };
  });

  const completedFloorCount = updatedLevels.reduce(
    (sum, level) => sum + level.floors.filter((f) => f.completed).length,
    0
  );

  const totalScore = updatedLevels.reduce((sum, level) => sum + level.levelScore, 0);
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

export function isBeginnerBadgeEarned(levels: LevelProgress[]): boolean {
  const level1 = levels.find((level) => level.levelNumber === 1);
  const level2 = levels.find((level) => level.levelNumber === 2);

  return Boolean(
    level1?.levelScore === 20 &&
    level2?.levelScore === 20
  );
}

export function isSuhuBadgeEarned(levels: LevelProgress[]): boolean {
  return levels.every((level) => level.levelScore === 20);
}