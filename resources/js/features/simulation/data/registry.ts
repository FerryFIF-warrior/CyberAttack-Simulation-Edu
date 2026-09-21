import type { FloorContent } from "@/features/simulation/types/simulation";
import { phishingLevel1Floor1 } from "./phishing/level-1/floor-1";

const allFloors: FloorContent[] = [
  phishingLevel1Floor1,
];

export function findFloorContent(
  simulationId: string,
  levelNumber: number,
  floorNumber: number,
): FloorContent | null {
  return (
    allFloors.find(
      (floor) =>
        floor.simulationId === simulationId &&
        floor.levelNumber === levelNumber &&
        floor.floorNumber === floorNumber,
    ) ?? null
  );
}