import { create } from "zustand";
import type { FloorContent } from "@/features/simulation/types/simulation";

interface GameState {
  phase: "exploring" | "preNarrative" | "choosing" | "resultNarrative" | "floorCompleted";
  playerPosition: { x: number; y: number };
  activeNarrative: { text: string }[] | null;
  activePanel: number;
  selectedChoice: "safe" | "neutral" | "risky" | null;
  resultNarrative: { text: string }[] | null;
  movementLocked: boolean;
  currentFloorContent: FloorContent | null;
  setPhase: (phase: GameState["phase"]) => void;
  setPlayerPosition: (position: { x: number; y: number }) => void;
  setActiveNarrative: (narrative: { text: string }[] | null) => void;
  setActivePanel: (panel: number) => void;
  setSelectedChoice: (choice: "safe" | "neutral" | "risky" | null) => void;
  setResultNarrative: (narrative: { text: string }[] | null) => void;
  setMovementLocked: (locked: boolean) => void;
  setCurrentFloorContent: (content: FloorContent | null) => void;
  resetGameState: () => void;
}

const initialGameState = {
  phase: "exploring" as const,
  playerPosition: { x: 20, y: 70 },
  activeNarrative: null,
  activePanel: 0,
  selectedChoice: null,
  resultNarrative: null,
  movementLocked: false,
  currentFloorContent: null,
};

export const useSimulationStore = create<GameState>()((set) => ({
  ...initialGameState,
  setPhase: (phase) => set({ phase }),
  setPlayerPosition: (position) => set({ playerPosition: position }),
  setActiveNarrative: (narrative) => set({ activeNarrative: narrative, activePanel: 0 }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setSelectedChoice: (choice) => set({ selectedChoice: choice }),
  setResultNarrative: (narrative) => set({ resultNarrative: narrative }),
  setMovementLocked: (locked) => set({ movementLocked: locked }),
  setCurrentFloorContent: (content) => set({ currentFloorContent: content }),
  resetGameState: () => set(initialGameState),
}));