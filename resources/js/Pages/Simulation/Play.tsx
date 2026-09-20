import { Head } from "@inertiajs/react";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState, useCallback, useRef, KeyboardEventHandler } from "react";
import type { FloorContent, StoryChoice, SimulationId, LevelConfig } from "@/features/simulation/types/simulation";
import { phishingLevel1Floor1 } from "@/features/simulation/data/phishing/level-1";
import { GameContainer } from "@/features/simulation/components/GameContainer";
import { MapView } from "@/features/simulation/components/MapView";
import { PlayerSprite } from "@/features/simulation/components/PlayerSprite";
import { useKeyboardMovement } from "@/features/simulation/engine/useKeyboardMovement";
import { MobileDPad } from "@/features/simulation/components/MobileDPad";
import { clampPosition } from "@/features/simulation/engine/distance";
import { InteractionPrompt } from "@/features/simulation/components/InteractionPrompt";
import { useInteraction } from "@/features/simulation/engine/useInteraction";
import { useSimulationStore } from "@/features/simulation/store/useSimulationStore";
import { NarrativeCat } from "@/features/simulation/components/NarrativeCat";
import { NarrativePanel } from "@/features/simulation/components/NarrativePanel";
import { ChoicePanel } from "@/features/simulation/components/ChoicePanel";
import { PointSummary } from "@/features/simulation/components/PointSummary";
import { SIMULATION_LEVEL_CONFIG } from "@/features/simulation/types/simulation";
import { submitFloorAttempt } from "@/features/simulation/lib/api";

interface PlayFloorProps {
  simulationId: string;
  level: number;
  floor: number;
}

const MOVEMENT_STEP = 3; // percentage per key press

function getLevelConfig(level: number): LevelConfig {
  return SIMULATION_LEVEL_CONFIG.find((c) => c.level === level) ?? SIMULATION_LEVEL_CONFIG[0];
}

export default function PlayFloor({ simulationId, level, floor }: PlayFloorProps) {
  const [floorContent, setFloorContent] = useState<FloorContent | null>(null);
  const levelConfig = getLevelConfig(level);
  const isLastFloor = floor === levelConfig.floorCount;

  // Game state from store
  const {
    phase,
    playerPosition,
    movementLocked,
    setPhase,
    setPlayerPosition,
    setMovementLocked,
    setActiveNarrative,
    setActivePanel,
    setSelectedChoice,
    setResultNarrative,
    setCurrentFloorContent,
    currentFloorContent,
    activeNarrative,
    activePanel,
    selectedChoice,
    resultNarrative,
  } = useSimulationStore();

  const playerStartRef = useRef({ x: 20, y: 70 });

  // Use refs for latest values to avoid callback recreation
  const playerPositionRef = useRef(playerPosition);
  const movementLockedRef = useRef(movementLocked);
  const setPlayerPositionRef = useRef(setPlayerPosition);

  playerPositionRef.current = playerPosition;
  movementLockedRef.current = movementLocked;
  setPlayerPositionRef.current = setPlayerPosition;

  // Stable handleMove using refs
  const handleMove = useCallback((direction: "up" | "down" | "left" | "right") => {
    console.log('[handleMove] Called with direction:', direction, 'movementLockedRef:', movementLockedRef.current); // Debug
    if (movementLockedRef.current) return;

    let newX = playerPositionRef.current.x;
    let newY = playerPositionRef.current.y;

    switch (direction) {
      case "up":
        newY -= MOVEMENT_STEP;
        break;
      case "down":
        newY += MOVEMENT_STEP;
        break;
      case "left":
        newX -= MOVEMENT_STEP;
        break;
      case "right":
        newX += MOVEMENT_STEP;
        break;
    }

    // Clamp to boundaries from PRD (4-96% X, 10-90% Y)
    const clamped = clampPosition(newX, newY, 4, 96, 10, 90);
    console.log('[handleMove] New position:', clamped); // Debug
    setPlayerPositionRef.current(clamped);
  }, []);

  // Keyboard movement hook - always called
  useKeyboardMovement(handleMove, true);

  // Handle keydown on game container for focus
  const handleGameKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback((event) => {
    const key = event.key.toLowerCase();
    if (["arrowup", "w", "arrowdown", "s", "arrowleft", "a", "arrowright", "d"].includes(key)) {
      event.preventDefault();
    }
  }, []);

  // Interaction system
  const handleInteract = useCallback(() => {
    if (currentFloorContent && phase === "exploring") {
      // Start pre-narrative phase
      setMovementLocked(true);
      setPhase("preNarrative");
      setActiveNarrative(currentFloorContent.story.intro);
      setActivePanel(0);
    }
  }, [currentFloorContent, phase, setMovementLocked, setPhase, setActiveNarrative, setActivePanel]);

  // Use interaction hook
  const { showPrompt } = useInteraction(
    playerPosition,
    currentFloorContent?.map.object ?? { x: 0, y: 0, interactionRadius: 8, id: "", label: "" },
    handleInteract,
    phase === "exploring",
    movementLocked
  );

  // Narrative panel navigation
  const handleNextPanel = useCallback(() => {
    if (!currentFloorContent) return;

    if (phase === "preNarrative" && activeNarrative) {
      if (activePanel < activeNarrative.length - 1) {
        setActivePanel(activePanel + 1);
      } else {
        // Move to choosing phase
        setPhase("choosing");
        setActiveNarrative([{ text: currentFloorContent.story.question }]);
        setActivePanel(0);
      }
    } else if (phase === "choosing" && activeNarrative) {
      // Should not happen - choosing uses ChoicePanel
    } else if (phase === "resultNarrative" && resultNarrative) {
      if (activePanel < resultNarrative.length - 1) {
        setActivePanel(activePanel + 1);
      } else {
        // Move to floorCompleted phase
        setPhase("floorCompleted");
      }
    }
  }, [phase, activeNarrative, resultNarrative, activePanel, currentFloorContent, setActivePanel, setPhase, setActiveNarrative]);

  // Choice selection
  const handleChoiceSelect = useCallback((choiceId: string) => {
    if (!currentFloorContent) return;

    const choice = currentFloorContent.story.choices.find((c: StoryChoice) => c.id === choiceId);
    if (!choice) return;

    setSelectedChoice(choiceId as "safe" | "neutral" | "risky");
    setResultNarrative(choice.result);
    setActiveNarrative(choice.result);
    setActivePanel(0);
    setPhase("resultNarrative");
  }, [currentFloorContent, setSelectedChoice, setResultNarrative, setActiveNarrative, setActivePanel, setPhase]);

  // Floor completion - update progress via API and navigate
  const handleFloorComplete = useCallback(async () => {
    if (!currentFloorContent || !selectedChoice) return;

    // Update progress via API
    try {
      await submitFloorAttempt(simulationId as SimulationId, level, floor, selectedChoice as "safe" | "neutral" | "risky");
    } catch (error) {
      console.error("Failed to save progress:", error);
      // Continue anyway for UX
    }

    // Reset game state for next floor
    setPhase("exploring");
    setMovementLocked(false);
    setSelectedChoice(null);
    setResultNarrative(null);
    setActiveNarrative(null);
    setActivePanel(0);
    setPlayerPosition(playerStartRef.current);
    setCurrentFloorContent(null);

    // Navigate to next floor or back to level detail
    if (isLastFloor) {
      router.visit(`/simulasi/${simulationId}/level/${level}`);
    } else {
      router.visit(`/simulasi/${simulationId}/level/${level}/floor/${floor + 1}`);
    }
  }, [
    currentFloorContent,
    selectedChoice,
    floor,
    isLastFloor,
    simulationId,
    level,
    setPhase,
    setMovementLocked,
    setSelectedChoice,
    setResultNarrative,
    setActiveNarrative,
    setActivePanel,
    setPlayerPosition,
    setCurrentFloorContent,
  ]);

  useEffect(() => {
    if (simulationId === "phishing" && level === 1 && floor === 1) {
      setFloorContent(phishingLevel1Floor1);
      setPlayerPosition({ x: phishingLevel1Floor1.map.playerStart.x, y: phishingLevel1Floor1.map.playerStart.y });
      playerStartRef.current = { x: phishingLevel1Floor1.map.playerStart.x, y: phishingLevel1Floor1.map.playerStart.y };
      setCurrentFloorContent(phishingLevel1Floor1);
    }
  }, [simulationId, level, floor, setFloorContent, setPlayerPosition, setCurrentFloorContent]);

  if (!floorContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Head title="Loading..." />
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat floor...</p>
        </div>
      </div>
    );
  }

  // Phase-based rendering
  const showMap = phase === "exploring";
  const showNarrativeCat = phase !== "exploring" && phase !== "floorCompleted";
  const catPosition = phase === "choosing" ? "left" : "center";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head title={`${floorContent.title} - Level ${level} Floor ${floor}`} />

      {/* Fixed Header - Navigation at top */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">{floorContent.title}</h1>
          <Link
            href={`/simulasi/${simulationId}/level/${level}`}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm shadow-sm"
          >
            Kembali ke Level
          </Link>
        </div>
      </header>

      {/* Game Area - Fixed Screen Layout, centered vertically */}
      <main className="flex-1 flex items-center justify-center pt-4 pb-24 px-4 overflow-hidden relative z-10">
        <GameContainer aspectRatio="16 / 9" onKeyDown={handleGameKeyDown}>
          <MapView floorContent={floorContent} />

          {/* Player Sprite - only in exploring phase */}
          {showMap && (
            <PlayerSprite
              x={playerPosition.x}
              y={playerPosition.y}
              data-testid="player-sprite"
            />
          )}

          {/* Narrative Cat - in narrative phases */}
          {showNarrativeCat && (
            <NarrativeCat
              position={catPosition}
              visible={true}
            />
          )}

          {/* Interaction Prompt - only in exploring phase */}
          <InteractionPrompt
            visible={showPrompt && phase === "exploring"}
            label={currentFloorContent?.map.object.label ?? "Objek"}
          />
        </GameContainer>

        {/* Mobile D-Pad - only on mobile, fixed bottom inside game area */}
        <MobileDPad onMove={handleMove} disabled={movementLocked} />
      </main>

      {/* Phase-based bottom panels */}
      {phase === "preNarrative" && activeNarrative && (
        <NarrativePanel
          panels={activeNarrative}
          currentPanel={activePanel}
          onNext={handleNextPanel}
          nextLabel={activePanel === activeNarrative.length - 1 ? "Lanjut" : "Selanjutnya"}
        />
      )}

      {phase === "choosing" && activeNarrative && currentFloorContent && (
        <>
          <NarrativePanel
            panels={activeNarrative}
            currentPanel={activePanel}
            onNext={() => {}} // Disabled in choosing phase
            nextLabel=""
          />
          <ChoicePanel
            choices={currentFloorContent.story.choices}
            onSelect={handleChoiceSelect}
          />
        </>
      )}

      {phase === "resultNarrative" && resultNarrative && (
        <NarrativePanel
          panels={resultNarrative}
          currentPanel={activePanel}
          onNext={handleNextPanel}
          nextLabel={activePanel === resultNarrative.length - 1 ? "Selesai" : "Selanjutnya"}
        />
      )}

      {phase === "floorCompleted" && currentFloorContent && selectedChoice && (
        <PointSummary
          floorPoints={currentFloorContent.story.choices.find((c: StoryChoice) => c.id === selectedChoice)?.points ?? 0}
          isLastFloor={isLastFloor}
          totalLevelPoints={currentFloorContent.story.choices.find((c: StoryChoice) => c.id === selectedChoice)?.points ?? 0}
          maxLevelPoints={levelConfig.maxScore}
          simulationId={simulationId}
          level={level}
          nextFloor={isLastFloor ? undefined : floor + 1}
          onContinue={handleFloorComplete}
        />
      )}

      {/* Debug Info Panel - fixed bottom, scrollable internally if needed */}
      <aside className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-t shadow-lg max-h-[40vh] overflow-y-auto">
        <details className="max-w-6xl mx-auto p-4 text-sm">
          <summary className="cursor-pointer font-semibold mb-2 text-gray-700">
            Debug: {floorContent.title}
          </summary>
          <div className="space-y-1 text-gray-600">
            <p><strong>Level:</strong> {level} | <strong>Floor:</strong> {floor}</p>
            <p><strong>Max Points:</strong> {floorContent.maxPoints}</p>
            <p>
              <strong>Object:</strong> {floorContent.map.object.label} ({floorContent.map.object.x}%, {floorContent.map.object.y}%)
            </p>
            <p>
              <strong>Player Position:</strong> ({playerPosition.x.toFixed(1)}%, {playerPosition.y.toFixed(1)}%)
            </p>
            <p><strong>Decorations:</strong> {floorContent.map.decorations.length}</p>
            <p><strong>Phase:</strong> {phase}</p>
            <p><strong>Movement Locked:</strong> {movementLocked ? "Yes" : "No"}</p>
            <p><strong>Show Prompt:</strong> {showPrompt ? "Yes" : "No"}</p>
            <p><strong>Active Panel:</strong> {activePanel}</p>
            <p><strong>Selected Choice:</strong> {selectedChoice ?? "none"}</p>
          </div>
        </details>
      </aside>
    </div>
  );
}