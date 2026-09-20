import type { FloorContent } from "@/features/simulation/types/simulation";

export const floorTemplate: FloorContent = {
  id: "isi_id_floor",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 1,
  title: "Isi judul floor",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-sky-200 to-green-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "decoration_1", x: 10, y: 20, scale: 1 },
    ],
    object: {
      id: "object_1",
      label: "Nama Objek",
      x: 60,
      y: 45,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Isi narasi panel pertama." },
      { text: "Isi narasi panel kedua." },
      { text: "Isi narasi panel ketiga." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      {
        id: "safe",
        label: "Isi tindakan paling aman.",
        points: 4,
        result: [{ text: "Isi hasil dari tindakan aman." }],
      },
      {
        id: "neutral",
        label: "Isi tindakan netral.",
        points: 1,
        result: [{ text: "Isi hasil dari tindakan netral." }],
      },
      {
        id: "risky",
        label: "Isi tindakan paling berisiko.",
        points: -2,
        result: [{ text: "Isi hasil dari tindakan berisiko." }],
      },
    ],
  },
};