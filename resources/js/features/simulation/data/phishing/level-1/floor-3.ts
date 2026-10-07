import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor3: FloorContent = {
  id: "phishing_level_1_floor_3",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 3,
  title: "Lampiran Berbahaya",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-amber-100 to-orange-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "decoration_office_1", x: 80, y: 25, scale: 1.5 },
      { id: "decoration_tree_3", x: 10, y: 30, scale: 1.3 },
    ],
    object: {
      id: "object_laptop_1",
      label: "Laptop Kerja",
      x: 60,
      y: 45,
      interactionRadius: 8,
    },
  },
  story: {
    intro: [
      { text: "Kucing membuka laptop kerja." },
      { text: "Ada email dari HRD-Perusahaan dengan lampiran Slip_Gaji_2026.zip." },
      { text: "Kucing biasanya tidak pernah menerima slip gaji lewat lampiran zip dari HRD." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      {
        id: "safe",
        label: "Hapus email dan konfirmasi ke HRD via jalur resmi.",
        points: 4,
        result: [
          { text: "Kucing menelepon HRD langsung via nomor resmi." },
          { text: "HRD mengonfirmasi tidak pernah mengirim email itu." },
          { text: "Serangan lewat lampiran berhasil dicegah." },
        ],
      },
      {
        id: "neutral",
        label: "Biarkan email tanpa dibuka.",
        points: 1,
        result: [
          { text: "Email dibiarkan begitu saja di inbox." },
          { text: "Risiko tetap ada jika nanti terklik tidak sengaja." },
        ],
      },
      {
        id: "risky",
        label: "Ekstrak dan buka file zip.",
        points: -2,
        result: [
          { text: "Kucing mengekstrak file zip tersebut." },
          { text: "File berisi malware yang mengenkripsi laptop." },
          { text: "Data kerja kucing terancam ransomware." },
        ],
      },
    ],
  },
};
