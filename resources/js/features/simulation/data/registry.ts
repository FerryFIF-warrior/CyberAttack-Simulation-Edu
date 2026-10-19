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
import { sqliLevel1Floor1 } from "./sqli/level-1/floor-1";
import { sqliLevel1Floor2 } from "./sqli/level-1/floor-2";
import { sqliLevel1Floor3 } from "./sqli/level-1/floor-3";
import { sqliLevel1Floor4 } from "./sqli/level-1/floor-4";
import { sqliLevel1Floor5 } from "./sqli/level-1/floor-5";
import { authLevel1Floor1 } from "./auth/level-1/floor-1";
import { authLevel1Floor2 } from "./auth/level-1/floor-2";
import { authLevel1Floor3 } from "./auth/level-1/floor-3";
import { authLevel1Floor4 } from "./auth/level-1/floor-4";
import { authLevel1Floor5 } from "./auth/level-1/floor-5";
import { phishingLevel2Floor1 } from "./phishing/level-2/floor-1";
import { phishingLevel2Floor2 } from "./phishing/level-2/floor-2";
import { phishingLevel2Floor3 } from "./phishing/level-2/floor-3";
import { phishingLevel2Floor4 } from "./phishing/level-2/floor-4";
import { phishingLevel2Floor5 } from "./phishing/level-2/floor-5";
import { bruteforceLevel2Floor1 } from "./bruteforce/level-2/floor-1";
import { bruteforceLevel2Floor2 } from "./bruteforce/level-2/floor-2";
import { bruteforceLevel2Floor3 } from "./bruteforce/level-2/floor-3";
import { bruteforceLevel2Floor4 } from "./bruteforce/level-2/floor-4";
import { bruteforceLevel2Floor5 } from "./bruteforce/level-2/floor-5";
import { sqliLevel2Floor1 } from "./sqli/level-2/floor-1";
import { sqliLevel2Floor2 } from "./sqli/level-2/floor-2";
import { sqliLevel2Floor3 } from "./sqli/level-2/floor-3";
import { sqliLevel2Floor4 } from "./sqli/level-2/floor-4";
import { sqliLevel2Floor5 } from "./sqli/level-2/floor-5";
import { authLevel2Floor1 } from "./auth/level-2/floor-1";
import { authLevel2Floor2 } from "./auth/level-2/floor-2";
import { authLevel2Floor3 } from "./auth/level-2/floor-3";
import { authLevel2Floor4 } from "./auth/level-2/floor-4";
import { authLevel2Floor5 } from "./auth/level-2/floor-5";

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
  sqliLevel1Floor1,
  sqliLevel1Floor2,
  sqliLevel1Floor3,
  sqliLevel1Floor4,
  sqliLevel1Floor5,
  authLevel1Floor1,
  authLevel1Floor2,
  authLevel1Floor3,
  authLevel1Floor4,
  authLevel1Floor5,
  phishingLevel2Floor1,
  phishingLevel2Floor2,
  phishingLevel2Floor3,
  phishingLevel2Floor4,
  phishingLevel2Floor5,
  bruteforceLevel2Floor1,
  bruteforceLevel2Floor2,
  bruteforceLevel2Floor3,
  bruteforceLevel2Floor4,
  bruteforceLevel2Floor5,
  sqliLevel2Floor1,
  sqliLevel2Floor2,
  sqliLevel2Floor3,
  sqliLevel2Floor4,
  sqliLevel2Floor5,
  authLevel2Floor1,
  authLevel2Floor2,
  authLevel2Floor3,
  authLevel2Floor4,
  authLevel2Floor5,
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

export function hasFloorContent(
  simulationId: string,
  levelNumber: number,
  floorNumber: number,
): boolean {
  return findFloorContent(simulationId, levelNumber, floorNumber) !== null;
}

export function hasAnyFloorContent(simulationId: string): boolean {
  return allFloors.some((floor) => floor.simulationId === simulationId);
}
