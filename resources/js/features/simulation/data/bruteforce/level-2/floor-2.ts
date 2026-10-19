import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel2Floor2: FloorContent = {
  id: "bruteforce_level_2_floor_2",
  simulationId: "bruteforce",
  levelNumber: 2,
  floorNumber: 2,
  title: "Serangan yang Menyamar jadi Satu Percobaan",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_2", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "monitor_2", icon: "monitor", x: 15, y: 28, scale: 1 },
      { id: "lamp_2", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "log_panel_1",
      label: "Panel Log Sistem",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Reset massal kemarin berhasil menghentikan serangan credential stuffing, tapi Kael tahu penyerang semacam ini jarang menyerah begitu saja. Benar saja, pagi ini log sistem menunjukkan pola baru yang lebih licin." },
      { text: "Kali ini bukan satu akun yang dicoba berkali-kali, melainkan satu kata sandi umum, yang dicoba ke ribuan akun berbeda, masing-masing hanya sekali." },
      { text: "Karena setiap akun hanya dicoba satu kali, rate limiting yang membatasi percobaan per akun tidak pernah terpicu sama sekali. Serangan ini sengaja dirancang untuk bersembunyi di balik batasan yang sudah ada." },
      { text: "Kael menatap layar dengan cemas. Pertahanan yang ia banggakan sejak Level 1 ternyata punya titik buta yang belum pernah ia pikirkan." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menambahkan batasan berdasarkan jumlah percobaan dari satu kata sandi yang sama ke banyak akun, bukan hanya per akun.",
        points: 4,
        result: [
          { text: "Kael menyadari batasan lama hanya menghitung percobaan per akun, padahal serangan ini menyebar ke banyak akun sekaligus." },
          { text: "Ia menambahkan aturan baru: jika satu kata sandi yang sama dicoba ke banyak akun berbeda dalam waktu singkat, sistem akan menandainya sebagai pola mencurigakan." },
          { text: "Serangan password spraying itu langsung terdeteksi sejak percobaan-percobaan awal, jauh sebelum sempat membobol satu akun pun." },
        ],
      },
      {
        id: "neutral",
        label: "Memperketat rate limiting per akun menjadi lebih ketat lagi.",
        points: 1,
        result: [
          { text: "Kael memperketat batas percobaan per akun, berharap itu cukup menghalangi serangan." },
          { text: "Sayangnya, karena serangan ini hanya mencoba sekali per akun, pengetatan itu sama sekali tidak berpengaruh." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena tidak ada satu akun pun yang menunjukkan percobaan berulang.",
        points: -2,
        result: [
          { text: "Kael mengira tidak ada yang perlu dikhawatirkan karena tidak satu pun akun menunjukkan percobaan berulang." },
          { text: "Dengan kata sandi umum yang dicoba ke ribuan akun, cepat atau lambat beberapa di antaranya pasti cocok." },
          { text: "Beberapa akun dengan kata sandi lemah berhasil ditembus tanpa ada alarm yang berbunyi." },
        ],
      },
    ],
  },
};
