import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel2Floor4: FloorContent = {
  id: "sqli_level_2_floor_4",
  simulationId: "sqli",
  levelNumber: 2,
  floorNumber: 4,
  title: "Tahap 4: Arsip Terlarang",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_4", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "vault_1", icon: "vault", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "search_box_4",
      label: "Kotak Pencarian Arsip",
      icon: "search",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dengan teknik membaca dari keheningan yang telah ia kuasai, Kael melangkah ke pertanyaan paling krusial: seberapa jauh celah ini bisa menyingkap data yang benar-benar sensitif, bukan sekadar judul arsip biasa." },
      { text: "Ia teringat, di balik gerbang utama tersimpan satu ruang arsip terlarang, berisi data pribadi anggota yang hanya boleh diakses petugas tingkat tinggi." },
      { text: "Dengan teknik tanya-jawab benar-salah yang sama, Kael perlahan menguji apakah struktur data arsip terlarang itu juga bisa terjangkau lewat kotak pencarian publik yang sama." },
      { text: "Jantungnya berdebar lebih kencang dari biasanya. Jika celah ini benar-benar menjangkau arsip terlarang, ini adalah temuan paling serius yang pernah ia laporkan." },
    ],
    question: "Bagaimana Kael menguji apakah arsip terlarang ikut terjangkau celah ini?",
    choices: [
      {
        id: "safe",
        label: "Menguji dengan pertanyaan benar-salah yang hanya memastikan keberadaan struktur data terlarang, tanpa menyingkap isinya.",
        points: 4,
        result: [
          { text: "Kael menyusun pertanyaan benar-salah yang hanya bertujuan memastikan apakah struktur data arsip terlarang bisa dijangkau dari kotak pencarian, tanpa benar-benar membaca isinya." },
          { text: "Jawaban dari sistem mengonfirmasi: ya, struktur arsip terlarang itu ikut terjangkau celah yang sama." },
          { text: "Kael segera menghentikan pengujian di titik itu, cukup untuk membuktikan risikonya tanpa perlu menyingkap satu pun data pribadi anggota." },
        ],
      },
      {
        id: "neutral",
        label: "Menguji keberadaannya saja tanpa memastikan apakah benar-benar bisa dijangkau atau hanya kebetulan.",
        points: 1,
        result: [
          { text: "Kael menguji sekilas tanpa benar-benar memastikan konsistensi hasilnya." },
          { text: "Ia mendapat indikasi yang belum sepenuhnya meyakinkan, sehingga butuh pengujian ulang sebelum bisa dilaporkan dengan yakin." },
        ],
      },
      {
        id: "risky",
        label: "Menyingkap beberapa baris data pribadi anggota untuk 'membuktikan' separah apa celah ini.",
        points: -2,
        result: [
          { text: "Didorong rasa ingin tahu, Kael menyingkap beberapa baris data pribadi anggota dari arsip terlarang." },
          { text: "Meski bukti celahnya makin jelas, tindakan ini melampaui kebutuhan pengujian dan menyentuh data yang seharusnya tidak pernah dibuka tanpa alasan mendesak." },
          { text: "Pemilik arsip mengingatkan Kael bahwa batas antara membuktikan celah dan menyalahgunakannya sangatlah tipis." },
        ],
      },
    ],
  },
};
