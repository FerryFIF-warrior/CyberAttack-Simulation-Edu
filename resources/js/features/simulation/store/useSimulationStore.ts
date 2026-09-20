import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SimulationId, FloorContent } from "@/features/simulation/types/simulation";
import type { SimulationProgress } from "@/features/simulation/types/progress";
import {
  createInitialSimulationProgress,
  calculateSimulationProgress,
} from "@/features/simulation/types/progress";

interface GameState {
  phase: "exploring" | "preNarrative" | "choosing" | "resultNarrative" | "floorCompleted";
  playerPosition: { x: number; y: number };
  activeNarrative: { text: string }[] | null;
  activePanel: number;
  selectedChoice: "safe" | "neutral" | "risky" | null;
  resultNarrative: { text: string }[] | null;
  movementLocked: boolean;
  currentFloorId: string | null;
  currentFloorContent: FloorContent | null;
  setPhase: (phase: GameState["phase"]) => void;
  setPlayerPosition: (position: { x: number; y: number }) => void;
  setActiveNarrative: (narrative: { text: string }[] | null) => void;
  setActivePanel: (panel: number) => void;
  setSelectedChoice: (choice: "safe" | "neutral" | "risky" | null) => void;
  setResultNarrative: (narrative: { text: string }[] | null) => void;
  setMovementLocked: (locked: boolean) => void;
  setCurrentFloorId: (id: string | null) => void;
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
  currentFloorId: null,
  currentFloorContent: null,
};

export const useSimulationStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialGameState,
      setPhase: (phase) => set({ phase }),
      setPlayerPosition: (position) => set({ playerPosition: position }),
      setActiveNarrative: (narrative) => set({ activeNarrative: narrative, activePanel: 0 }),
      setActivePanel: (panel) => set({ activePanel: panel }),
      setSelectedChoice: (choice) => set({ selectedChoice: choice }),
      setResultNarrative: (narrative) => set({ resultNarrative: narrative }),
      setMovementLocked: (locked) => set({ movementLocked: locked }),
      setCurrentFloorId: (id) => set({ currentFloorId: id }),
      setCurrentFloorContent: (content) => set({ currentFloorContent: content }),
      resetGameState: () => set(initialGameState),
    }),
    {
      name: "security-cat-game-v1",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        phase: state.phase,
        playerPosition: state.playerPosition,
        activeNarrative: state.activeNarrative,
        activePanel: state.activePanel,
        selectedChoice: state.selectedChoice,
        resultNarrative: state.resultNarrative,
        movementLocked: state.movementLocked,
        currentFloorId: state.currentFloorId,
        currentFloorContent: state.currentFloorContent,
      }),
    }
  )
);

interface ProgressState {
  progress: Record<SimulationId, SimulationProgress>;
  initializeProgress: (simulationId: SimulationId) => void;
  updateFloorProgress: (
    simulationId: SimulationId,
    levelNumber: number,
    floorNumber: number,
    points: number,
    maxPoints: number
  ) => void;
  getProgress: (simulationId: SimulationId) => SimulationProgress | null;
  resetProgress: (simulationId: SimulationId) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {} as Record<SimulationId, SimulationProgress>,
      initializeProgress: (simulationId) => set((state) => ({
        progress: {
          ...state.progress,
          [simulationId]: state.progress[simulationId] || createInitialSimulationProgress(simulationId),
        },
      })),
      updateFloorProgress: (simulationId, levelNumber, floorNumber, points, _maxPoints) => set((state) => {
        const currentProgress = state.progress[simulationId];
        if (!currentProgress) return state;

        const levelIndex = currentProgress.levels.findIndex((l) => l.levelNumber === levelNumber);
        if (levelIndex === -1) return state;

        const level = currentProgress.levels[levelIndex];
        const floorIndex = level.floors.findIndex((f) => f.floorNumber === floorNumber);
        if (floorIndex === -1) return state;

        const floor = level.floors[floorIndex];
        const newBestPoints = Math.max(floor.bestPoints, points);

        const updatedFloor = {
          ...floor,
          completed: true,
          bestPoints: newBestPoints,
        };

        const updatedLevelFloors = [...level.floors];
        updatedLevelFloors[floorIndex] = updatedFloor;

        const updatedLevel = {
          ...level,
          floors: updatedLevelFloors,
        };

        const updatedLevels = [...currentProgress.levels];
        updatedLevels[levelIndex] = updatedLevel;

        const updatedProgress = calculateSimulationProgress({
          ...currentProgress,
          levels: updatedLevels,
        });

        return {
          progress: {
            ...state.progress,
            [simulationId]: updatedProgress,
          },
        };
      }),
      getProgress: (simulationId) => get().progress[simulationId] || null,
      resetProgress: (simulationId) => set((state) => {
        const newProgress = { ...state.progress };
        delete newProgress[simulationId];
        return { progress: newProgress };
      }),
    }),
    {
      name: "security-cat-progress-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);