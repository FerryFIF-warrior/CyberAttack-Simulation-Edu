import type { LevelConfig } from "@/features/simulation/types/simulation";

export const PHISHING_LEVEL_CONFIG: LevelConfig[] = [
  { level: 1, floorCount: 5, maxScore: 20 },
  { level: 2, floorCount: 5, maxScore: 20 },
  { level: 3, floorCount: 6, maxScore: 20 },
  { level: 4, floorCount: 7, maxScore: 20 },
  { level: 5, floorCount: 7, maxScore: 20 },
];

export function getPhishingLevelConfig(level: number): LevelConfig | undefined {
  return PHISHING_LEVEL_CONFIG.find((config) => config.level === level);
}

export function getPhishingTotalFloors(): number {
  return PHISHING_LEVEL_CONFIG.reduce((sum, config) => sum + config.floorCount, 0);
}

export function getPhishingMaxTotalScore(): number {
  return PHISHING_LEVEL_CONFIG.reduce((sum, config) => sum + config.maxScore, 0);
}