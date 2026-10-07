import type { FloorContent } from "@/features/simulation/types/simulation";
import { phishingLevel1Floor1 } from "./phishing/level-1/floor-1";
import { phishingLevel1Floor2 } from "./phishing/level-1/floor-2";
import { phishingLevel1Floor3 } from "./phishing/level-1/floor-3";
import { phishingLevel1Floor4 } from "./phishing/level-1/floor-4";
import { phishingLevel1Floor5 } from "./phishing/level-1/floor-5";
import { bruteforceLevel1Floor1 } from "./bruteforce/level-1/floor-1";
import { bruteforceLevel1Floor2 } from "./bruteforce/level-1/floor-2";
import { bruteforceLevel1Floor3 } from "./bruteforce/level-1/floor-3";
import { bruteforceLevel1Floor4 } from "./bruteforce/level-1/floor-4";
import { bruteforceLevel1Floor5 } from "./bruteforce/level-1/floor-5";

const allFloors: FloorContent[] = [
  phishingLevel1Floor1,
  phishingLevel1Floor2,
  phishingLevel1Floor3,
  phishingLevel1Floor4,
  phishingLevel1Floor5,
  bruteforceLevel1Floor1,
  bruteforceLevel1Floor2,
  bruteforceLevel1Floor3,
  bruteforceLevel1Floor4,
  bruteforceLevel1Floor5,
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
