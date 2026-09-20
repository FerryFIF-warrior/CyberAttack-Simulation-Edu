import type { FloorContent, ChoiceId } from "@/features/simulation/types/simulation";

export function getChoicePoints(floorContent: FloorContent, choiceId: ChoiceId): number {
  const choice = floorContent.story.choices.find((c) => c.id === choiceId);
  return choice?.points ?? 0;
}

export function getChoiceResult(floorContent: FloorContent, choiceId: ChoiceId): { text: string }[] {
  const choice = floorContent.story.choices.find((c) => c.id === choiceId);
  return choice?.result ?? [];
}

export function getMaxPoints(floorContent: FloorContent): number {
  return floorContent.maxPoints;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function calculateLevelRawScore(floorScores: number[]): number {
  return floorScores.reduce((sum, score) => sum + score, 0);
}

export function calculateLevelScore(rawScore: number, maxScore: number = 20): number {
  return clamp(rawScore, 0, maxScore);
}

export function calculateCompletionPercent(completedCount: number, totalCount: number): number {
  return Math.round((completedCount / totalCount) * 100);
}

export function calculateMasteryPercent(totalScore: number, maxScore: number): number {
  return Math.round((totalScore / maxScore) * 100);
}

export function formatPoints(points: number): string {
  if (points > 0) return `+${points}`;
  if (points < 0) return `${points}`;
  return "0";
}

export function isLevelUnlocked(
  previousLevelCompleted: boolean,
  previousLevelScore: number,
  unlockThreshold: number = 15
): boolean {
  return previousLevelCompleted && previousLevelScore >= unlockThreshold;
}