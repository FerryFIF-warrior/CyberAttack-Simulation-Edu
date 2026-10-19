import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel2Floor4: FloorContent = {
  id: "phishing_level_2_floor_4",
  simulationId: "phishing",
  levelNumber: 2,
  floorNumber: 4,
  title: "Serangan yang Mengenal Namamu",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-rose-100 to-red-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_2", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "cabinet_1", icon: "cabinet", x: 85, y: 22, scale: 1.3 },
      { id: "clock_2", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "laptop_spear_1",
      label: "Laptop Kerja",
      icon: "laptop",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kejadian transfer palsu kemarin membuat seluruh kantor lebih waspada. Namun sore ini, sebuah email baru datang, dan kali ini terasa berbeda, jauh lebih personal." },
      { text: "Email itu menyebut nama lengkap Kael, jabatannya yang tepat, bahkan nama proyek yang sedang ia kerjakan minggu ini, detail yang seharusnya hanya diketahui orang dalam." },
      { text: "Isinya meminta Kael membuka dokumen revisi proyek yang terlampir, karena ada perubahan mendesak dari klien yang harus segera ditinjau sebelum rapat sore ini." },
      { text: "Kael merasa ngeri sekaligus bingung. Bagaimana mungkin seseorang di luar sana tahu detail sedetail itu tentang pekerjaannya? Rasa percaya dirinya mulai goyah." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Tetap memverifikasi pengirim lewat jalur lain, meski email itu tahu banyak detail pribadi.",
        points: 4,
        result: [
          { text: "Kael mengingatkan dirinya sendiri: sebanyak apa pun detail yang diketahui pengirim, itu tidak serta-merta membuktikan identitasnya." },
          { text: "Ia menghubungi rekan tim proyek lewat aplikasi internal untuk memastikan apakah memang ada revisi dari klien hari ini." },
          { text: "Ternyata tidak ada revisi apa pun. Detail pribadi Kael kemungkinan bocor dari sumber lain, dan email itu memang dirancang khusus untuk menyasar dirinya." },
        ],
      },
      {
        id: "neutral",
        label: "Membuka lampiran dengan hati-hati menggunakan mode pratinjau tanpa mengunduhnya.",
        points: 0,
        result: [
          { text: "Kael mencoba membuka lampiran lewat mode pratinjau, berharap itu lebih aman." },
          { text: "Pratinjau sempat termuat sebentar sebelum error, dan Kael tidak yakin apakah sistemnya benar-benar aman atau tidak." },
        ],
      },
      {
        id: "risky",
        label: "Langsung membuka lampiran karena yakin pengirimnya memang orang dalam.",
        points: -4,
        result: [
          { text: "Karena detailnya terasa begitu meyakinkan, Kael membuka lampiran itu tanpa ragu." },
          { text: "Laptopnya tiba-tiba melambat drastis, dan beberapa program asing mulai berjalan di latar belakang." },
          { text: "Tim IT kantor segera memisahkan laptop Kael dari jaringan untuk mencegah penyebaran lebih luas." },
        ],
      },
    ],
  },
};
