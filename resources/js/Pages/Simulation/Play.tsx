import { Head } from "@inertiajs/react";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState, useCallback, useRef, KeyboardEventHandler } from "react";
import type { FloorContent, StoryChoice, SimulationId, LevelConfig } from "@/features/simulation/types/simulation";
import { findFloorContent } from "@/features/simulation/data/registry";
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
import type { AttemptResponse } from "@/features/simulation/lib/api";

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
  const [floorContent, setFloorContent] = useState<FloorContent | null>(() =>
    findFloorContent(simulationId, level, floor),
  );
  const [contentUnavailable, setContentUnavailable] = useState(
    () => findFloorContent(simulationId, level, floor) === null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attemptResult, setAttemptResult] = useState<AttemptResponse | null>(null);
  const levelConfig = getLevelConfig(level);
  const isLastFloor = floor === levelConfig.floorCount;
  const nextFloorHasContent = !isLastFloor && findFloorContent(simulationId, level, floor + 1) !== null;

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
    resetGameState,
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
    setSubmitError(null);
    setAttemptResult(null);
    try {
      const result = await submitFloorAttempt(simulationId as SimulationId, level, floor, selectedChoice as "safe" | "neutral" | "risky");
      setAttemptResult(result);
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : "Gagal menyimpan progress.";
      setSubmitError(message);
      console.error("Failed to save progress:", error);
      return;
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
    if (isLastFloor || !nextFloorHasContent) {
      router.visit(`/simulasi/${simulationId}/level/${level}`);
    } else {
      router.visit(`/simulasi/${simulationId}/level/${level}/floor/${floor + 1}`);
    }
  }, [
    currentFloorContent,
    selectedChoice,
    floor,
    isLastFloor,
    nextFloorHasContent,
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
    resetGameState();
    const content = findFloorContent(simulationId, level, floor);
    setFloorContent(content);
    setContentUnavailable(content === null);
    setSubmitError(null);
    if (content) {
      setPlayerPosition({ x: content.map.playerStart.x, y: content.map.playerStart.y });
      playerStartRef.current = { x: content.map.playerStart.x, y: content.map.playerStart.y };
      setCurrentFloorContent(content);
    }
  }, [simulationId, level, floor, resetGameState, setFloorContent, setPlayerPosition, setCurrentFloorContent]);

  if (contentUnavailable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cat-bg">
        <Head title="Floor Belum Tersedia" />
        <div className="text-center max-w-md px-6">
          <p className="text-2xl font-bold text-white mb-2">Konten belum tersedia</p>
          <p className="text-cat-muted mb-6">
            Floor ini belum memiliki konten. Silakan kembali ke halaman level.
          </p>
          <Link
            href={`/simulasi/${simulationId}/level/${level}`}
            className="inline-block px-6 py-3 bg-cat-cyan text-cat-bg rounded-lg hover:brightness-110 transition-colors font-semibold shadow-sm"
          >
            Kembali ke Level
          </Link>
        </div>
      </div>
    );
  }

  if (!floorContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cat-bg">
        <Head title="Loading..." />
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cat-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cat-muted">Memuat floor...</p>
        </div>
      </div>
    );
  }

  // Phase-based rendering
  const showMap = phase === "exploring";
  const showNarrativeCat = phase !== "exploring" && phase !== "floorCompleted";
  const catPosition = phase === "choosing" ? "left" : "center";

  return (
    <div className="min-h-screen bg-cat-bg flex flex-col">
      <Head title={`${floorContent.title} - Level ${level} Floor ${floor}`} />

      {/* Fixed Header - Navigation at top */}
      <header className="sticky top-0 z-50 bg-cat-card/80 backdrop-blur border-b border-cat-line px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-[960px] mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0"><p className="font-mono text-[10px] tracking-[0.16em] uppercase text-cat-cyan">LV {level} · FL {String(floor).padStart(2,"0")}</p><h1 className="text-[14px] sm:text-[15px] font-semibold text-white leading-tight truncate">{floorContent.title}</h1></div>
          <Link
            href={`/simulasi/${simulationId}/level/${level}`}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-cat-surface border border-cat-line text-slate-200 rounded-lg hover:border-cat-cyan/20 transition-colors text-xs sm:text-sm font-medium"
          >
            Kembali ke Level
          </Link>
        </div>
      </header>

      {/* Game Area - Fixed Screen Layout, centered vertically */}
      <main className="flex-1 flex items-center justify-center pt-3 sm:pt-4 pb-24 sm:pb-28 px-3 sm:px-4 overflow-hidden relative z-10">
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

      {phase === "floorCompleted" && submitError && (
        <div
          className="fixed left-0 right-0 z-40 bg-cat-card border-y border-red-500/30 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.4)] text-center"
          style={{ bottom: "33%" }}
        >
          <p className="text-red-400 font-semibold">{submitError}</p>
          <p className="text-sm text-red-400/80 mt-1">
            Progress belum tersimpan. Klik kembali "Lanjut" untuk mencoba menyimpan lagi.
          </p>
        </div>
      )}

      {phase === "floorCompleted" && currentFloorContent && selectedChoice && (
        <PointSummary
          floorPoints={currentFloorContent.story.choices.find((c: StoryChoice) => c.id === selectedChoice)?.points ?? 0}
          isLastFloor={isLastFloor}
          totalLevelPoints={attemptResult?.level_score ?? currentFloorContent.story.choices.find((c: StoryChoice) => c.id === selectedChoice)?.points ?? 0}
          maxLevelPoints={levelConfig.maxScore}
          level={level}
          nextFloor={nextFloorHasContent ? floor + 1 : undefined}
          onContinue={handleFloorComplete}
        />
      )}


    </div>
  );
}