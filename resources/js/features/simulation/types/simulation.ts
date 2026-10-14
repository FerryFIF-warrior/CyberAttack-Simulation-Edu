export type SimulationId =
  | "phishing"
  | "bruteforce"
  | "sqli"
  | "auth";

export type ChoiceId =
  | "safe"
  | "neutral"
  | "risky";

export type StoryPanel = {
  text: string;
};

export type StoryChoice = {
  id: ChoiceId;
  label: string;
  points: number;
  result: StoryPanel[];
};

export type FloorDecoration = {
  id: string;
  icon?: string;
  x: number;
  y: number;
  scale?: number;
};

export type FloorObject = {
  id: string;
  label: string;
  icon?: string;
  x: number;
  y: number;
  interactionRadius: number;
};

export type FloorContent = {
  id: string;
  simulationId: SimulationId;
  levelNumber: number;
  floorNumber: number;
  title: string;
  maxPoints: number;

  map: {
    backgroundClass: string;
    playerStart: {
      x: number;
      y: number;
    };
    decorations: FloorDecoration[];
    object: FloorObject;
  };

  story: {
    intro: StoryPanel[];
    question: string;
    choices: StoryChoice[];
  };
};

export type FloorPhase =
  | "exploring"
  | "preNarrative"
  | "choosing"
  | "resultNarrative"
  | "floorCompleted";

export type LevelConfig = {
  level: number;
  floorCount: number;
  maxScore: number;
};

export type LabMeta = {
  name: string;
  lab: string;
  vector: string;
  code: string;
  tags: string[];
};