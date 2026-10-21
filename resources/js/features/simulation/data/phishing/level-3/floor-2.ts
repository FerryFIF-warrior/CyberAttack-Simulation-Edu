import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel3Floor2: FloorContent = {
  id: "phishing_level_3_floor_2",
  simulationId: "phishing",
  levelNumber: 3,
  floorNumber: 2,
  title: "Kampanye, Bukan Email Tunggal",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-100 to-blue-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_2", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "monitor_wall_1", icon: "monitor", x: 85, y: 22, scale: 1.3 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "incident_board_1",
      label: "Papan Insiden Tim IT",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Seperti dugaan Kael, email-email aneh mulai berdatangan, tapi bukan hanya satu dua orang yang melaporkannya. Dalam satu pagi, tujuh karyawan dari divisi berbeda melaporkan email mencurigakan sekaligus." },
      { text: "Kael mengumpulkan ketujuh laporan itu di papan insiden tim IT. Isinya berbeda-beda, ada yang soal tagihan tak terbayar, ada yang soal undangan seminar, ada yang soal perubahan kebijakan HR." },
      { text: "Tapi saat diperiksa lebih dekat, semuanya mengarah ke satu domain pengirim yang serupa, dan waktunya dikirim hampir bersamaan, dalam rentang kurang dari satu jam." },
      { text: "Ini bukan tujuh serangan terpisah yang kebetulan terjadi bersamaan. Ini adalah satu kampanye besar yang sengaja disebar dengan kedok berbeda-beda ke banyak sasaran sekaligus." },
    ],
    question: "Bagaimana Kael menangani temuan kampanye terkoordinasi ini?",
    choices: [
      {
        id: "safe",
        label: "Mengirim peringatan menyeluruh ke seluruh karyawan dengan ciri-ciri umum kampanye, bukan hanya ke tujuh pelapor.",
        points: 4,
        result: [
          { text: "Kael menyusun ciri-ciri umum dari ketujuh email berbeda itu, domain pengirim serupa, pola waktu pengiriman, dan nada mendesak yang konsisten." },
          { text: "Peringatan menyeluruh dikirim ke seluruh karyawan perusahaan, bukan hanya ke mereka yang kebetulan sudah melaporkan." },
          { text: "Beberapa karyawan yang baru akan menerima email serupa jadi langsung waspada begitu pesannya masuk, kampanye itu kehilangan banyak targetnya." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya menangani ketujuh laporan yang sudah masuk satu per satu.",
        points: 1,
        result: [
          { text: "Kael menangani ketujuh laporan itu satu demi satu, memastikan masing-masing pelapor aman." },
          { text: "Namun karena tidak ada peringatan menyeluruh, karyawan lain yang belum menerima email serupa tetap rentan ketika giliran mereka tiba." },
        ],
      },
      {
        id: "risky",
        label: "Menganggap ini tujuh kasus kebetulan yang tidak saling berkaitan.",
        points: -2,
        result: [
          { text: "Kael menangani ketujuh laporan itu sebagai kasus-kasus terpisah tanpa mencari pola yang menghubungkannya." },
          { text: "Karena tidak ada peringatan dini, kampanye itu terus menyebar diam-diam ke divisi lain sepanjang hari." },
          { text: "Menjelang sore, jumlah laporan serupa melonjak jauh lebih banyak dari yang seharusnya bisa dicegah sejak pagi." },
        ],
      },
    ],
  },
};
