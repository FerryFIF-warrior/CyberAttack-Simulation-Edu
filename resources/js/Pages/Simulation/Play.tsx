import { Head } from "@inertiajs/react";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState, useCallback, useRef, KeyboardEventHandler } from "react";
import type { StoryChoice, SimulationId } from "@/features/simulation/types/simulation";
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
import { submitFloorAttempt, FloorLockedError } from "@/features/simulation/lib/api";
import type { AttemptResponse } from "@/features/simulation/lib/api";

interface PlayFloorProps {
  simulationId: string;
  level: number;
  floor: number;
  floorCount: number;
  maxScore: number;
  floorPlayable: boolean;
  requiredFloor: number | null;
}

const MOVEMENT_STEP = 3; // percentage per key press

export default function PlayFloor({
  simulationId,
  level,
  floor,
  floorCount,
  maxScore,
  floorPlayable,
  requiredFloor,
}: PlayFloorProps) {
  const [contentUnavailable, setContentUnavailable] = useState(
    () => findFloorContent(simulationId, level, floor) === null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attemptResult, setAttemptResult] = useState<AttemptResponse | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [postLockedFloor, setPostLockedFloor] = useState<number | null>(null);
  const submittingRef = useRef(false);
  const isLastFloor = floor === floorCount;
  const nextFloorHasContent = !isLastFloor && findFloorContent(simulationId, level, floor + 1) !== null;
  const lockedRequiredFloor = !floorPlayable ? (requiredFloor ?? floor - 1) : postLockedFloor;

  // Game state from store — currentFloorContent adalah satu-satunya sumber floor content (H6)
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

  const floorContent = currentFloorContent;

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
    if (lockedRequiredFloor !== null) return;
    if (currentFloorContent && phase === "exploring") {
      // Start pre-narrative phase
      setMovementLocked(true);
      setPhase("preNarrative");
      setActiveNarrative(currentFloorContent.story.intro);
      setActivePanel(0);
    }
  }, [lockedRequiredFloor, currentFloorContent, phase, setMovementLocked, setPhase, setActiveNarrative, setActivePanel]);

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

  // Save attempt ke server (dipanggil otomatis saat floorCompleted, atau ulang saat error)
  const submitAttempt = useCallback(async (): Promise<boolean> => {
    if (!currentFloorContent || !selectedChoice || submittingRef.current) return false;

    submittingRef.current = true;
    setSubmitError(null);
    setSubmitState("saving");
    try {
      const result = await submitFloorAttempt(
        simulationId as SimulationId,
        level,
        floor,
        selectedChoice as "safe" | "neutral" | "risky",
      );
      setAttemptResult(result);
      setSubmitState("saved");
      return true;
    } catch (error) {
      if (error instanceof FloorLockedError) {
        setPostLockedFloor(error.requiredFloor);
        setSubmitState("idle");
        return false;
      }
      const message = error instanceof Error && error.message
        ? error.message
        : "Gagal menyimpan progress.";
      setSubmitError(message);
      setSubmitState("error");
      console.error("Failed to save progress:", error);
      return false;
    } finally {
      submittingRef.current = false;
    }
  }, [currentFloorContent, selectedChoice, simulationId, level, floor]);

  // Auto-submit begitu narasi hasil selesai (fase floorCompleted) sesuai alur PRD
  useEffect(() => {
    if (phase === "floorCompleted" && selectedChoice && submitState === "idle" && lockedRequiredFloor === null) {
      void submitAttempt();
    }
  }, [phase, selectedChoice, submitState, lockedRequiredFloor, submitAttempt]);

  // Lanjut ke floor berikutnya / kembali ke level detail
  const handleContinue = useCallback(async () => {
    if (submitState === "saving") return;
    if (submitState !== "saved") {
      const saved = await submitAttempt();
      if (!saved) return;
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
    submitState,
    submitAttempt,
    isLastFloor,
    nextFloorHasContent,
    simulationId,
    level,
    floor,
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
    setContentUnavailable(content === null);
    setSubmitError(null);
    setAttemptResult(null);
    setSubmitState("idle");
    setPostLockedFloor(null);
    if (content) {
      setPlayerPosition({ x: content.map.playerStart.x, y: content.map.playerStart.y });
      playerStartRef.current = { x: content.map.playerStart.x, y: content.map.playerStart.y };
      setCurrentFloorContent(content);
    }
  }, [simulationId, level, floor, resetGameState, setPlayerPosition, setCurrentFloorContent]);

  // Kunci gerakan selama popup floor terkunci tampil; lepas kunci saat popup hilang (H7)
  useEffect(() => {
    setMovementLocked(lockedRequiredFloor !== null);
  }, [lockedRequiredFloor, setMovementLocked]);

  // Popup floor terkunci (GET langsung ke floor terkunci, atau POST ditolak server)
  const floorLockedPopup = lockedRequiredFloor !== null ? (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="floor-locked-title"
    >
      <div className="w-full max-w-sm rounded-2xl border border-clay-line bg-clay-surface p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] text-center">
        <div className="w-12 h-12 rounded-full bg-clay-inset border border-clay-line flex items-center justify-center mx-auto text-[#8b98ab] mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11V9a2 2 0 10-2 2v2" /><rect x="7" y="11" width="10" height="8" rx="1.5" /></svg>
        </div>
        <h2 id="floor-locked-title" className="text-lg font-bold text-white">Floor terkunci</h2>
        <p className="text-sm text-[#8b98ab] mt-2 leading-6">
          Selesaikan Floor {lockedRequiredFloor} terlebih dahulu untuk membuka Floor {floor}.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={`/simulasi/${simulationId}/level/${level}/floor/${lockedRequiredFloor}`}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#ffd23a] text-[#1a1400] text-sm font-semibold hover:brightness-110 transition"
          >
            Ke Floor {lockedRequiredFloor}
          </Link>
          <Link
            href={`/simulasi/${simulationId}/level/${level}`}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-clay-inset border border-clay-line text-slate-200 text-sm font-medium hover:border-[#00e5ff]/20 transition"
          >
            Kembali ke Peta Level
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  if (contentUnavailable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-clay-bg">
        <Head title="Floor Belum Tersedia" />
        {floorLockedPopup}
        <div className="text-center max-w-md px-6">
          <p className="text-2xl font-bold text-white mb-2">Konten belum tersedia</p>
          <p className="text-[#8b98ab] mb-6">
            Floor ini belum memiliki konten. Silakan kembali ke halaman level.
          </p>
          <Link
            href={`/simulasi/${simulationId}/level/${level}`}
            className="inline-block px-6 py-3 bg-[#ffd23a] text-[#1a1400] rounded-lg hover:brightness-110 transition-colors font-semibold shadow-sm"
          >
            Kembali ke Level
          </Link>
        </div>
      </div>
    );
  }

  if (!floorContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-clay-bg">
        <Head title="Loading..." />
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00e5ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8b98ab]">Memuat floor...</p>
        </div>
      </div>
    );
  }

  // Phase-based rendering
  const showMap = phase === "exploring";
  const showNarrativeCat = phase !== "exploring" && phase !== "floorCompleted";
  const catPosition = phase === "choosing" ? "left" : "center";

  return (
    <div className="min-h-screen bg-clay-bg flex flex-col">
      <Head title={`${floorContent.title} - Level ${level} Floor ${floor}`} />

      {/* Fixed Header - Navigation at top */}
      <header className="sticky top-0 z-50 bg-clay-surface/80 backdrop-blur border-b border-clay-line px-3 sm:px-4 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-[960px] mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0"><p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#00e5ff]">LV {level} · FL {String(floor).padStart(2,"0")}</p><h1 className="text-[14px] sm:text-[15px] font-semibold text-white leading-tight truncate">{floorContent.title}</h1></div>
          <Link
            href={`/simulasi/${simulationId}/level/${level}`}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-clay-inset border border-clay-line text-slate-200 rounded-lg hover:border-[#00e5ff]/20 transition-colors text-xs sm:text-sm font-medium"
          >
            Kembali ke Level
          </Link>
        </div>
      </header>

      {/* Game Area - Fixed Screen Layout, centered vertically */}
      <main className="flex-1 flex items-center justify-center pt-3 sm:pt-4 pb-24 sm:pb-28 px-3 sm:px-4 overflow-hidden relative z-10">
        <GameContainer aspectRatio="16 / 9" onKeyDown={handleGameKeyDown}>
          <MapView floorContent={floorContent} onInteract={handleInteract} />

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
            onInteract={handleInteract}
          />
        </GameContainer>

        {/* Mobile D-Pad - only on mobile, fixed bottom inside game area; tombol E muncul saat dekat objek */}
        <MobileDPad onMove={handleMove} disabled={movementLocked} onInteract={showPrompt && phase === "exploring" ? handleInteract : undefined} />
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
          className="fixed left-0 right-0 z-40 bg-clay-surface border-y border-red-500/30 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.4)] text-center"
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
          totalLevelPoints={attemptResult?.level_score}
          maxLevelPoints={maxScore}
          level={level}
          nextFloor={nextFloorHasContent ? floor + 1 : undefined}
          busy={submitState === "saving"}
          onContinue={handleContinue}
        />
      )}

      {floorLockedPopup}
    </div>
  );
}