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
      { id: "office_1", icon: "office", x: 80, y: 25, scale: 1.5 },
      { id: "tree_3", icon: "tree", x: 10, y: 30, scale: 1.3 },
      { id: "coffee_1", icon: "coffee", x: 45, y: 85, scale: 1 },
      { id: "lamp_3", icon: "lamp", x: 30, y: 15, scale: 1 },
    ],
    object: {
      id: "laptop_1",
      label: "Laptop Kerja",
      icon: "laptop",
      x: 60,
      y: 45,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Keesokan harinya di kantor, Kael membuka laptop kerjanya seperti biasa." },
      { text: "Satu email masuk dari pengirim bernama HRD-Perusahaan, dengan lampiran bernama Slip_Gaji_2026.zip." },
      { text: "Kael mengernyit. Selama ini slip gaji selalu dikirim lewat portal internal perusahaan, bukan lampiran email." },
      { text: "Ia teringat pelajaran dari email hadiah dan SMS bank kemarin: penipu suka menyamar sebagai pihak yang dipercaya." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Tidak membuka lampiran, lalu konfirmasi ke HRD melalui jalur resmi.",
        points: 4,
        result: [
          { text: "Kael tidak menyentuh lampiran itu sama sekali." },
          { text: "Ia menelepon HRD lewat nomor resmi yang tertera di portal internal perusahaan." },
          { text: "HRD mengonfirmasi tidak pernah mengirim email tersebut. Email itu segera dilaporkan ke tim IT." },
        ],
      },
      {
        id: "neutral",
        label: "Membiarkan email tanpa dibuka.",
        points: 1,
        result: [
          { text: "Kael membiarkan email itu begitu saja di kotak masuk, tanpa membuka maupun melaporkannya." },
          { text: "Risikonya belum hilang. Jika suatu hari ia lupa dan mengklik lampiran itu tanpa sengaja, ancamannya tetap ada." },
        ],
      },
      {
        id: "risky",
        label: "Mengekstrak dan membuka file zip.",
        points: -6,
        result: [
          { text: "Karena penasaran dan terburu-buru, Kael langsung mengekstrak file zip tersebut." },
          { text: "Ternyata file itu berisi program jahat yang langsung mengenkripsi seluruh berkas di laptopnya." },
          { text: "Semua dokumen kerja Kael terkunci, dan muncul pesan permintaan tebusan di layar." },
        ],
      },
    ],
  },
};
