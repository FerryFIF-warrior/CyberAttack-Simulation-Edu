import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel1Floor1: FloorContent = {
  id: "sqli_level_1_floor_1",
  simulationId: "sqli",
  levelNumber: 1,
  floorNumber: 1,
  title: "Tahap 1: Mengintai Gerbang Arsip",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_1", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "pillar_2", icon: "pillar", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "gate_1",
      label: "Gerbang Arsip",
      icon: "gate",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pemilik Arsip Kota, sebuah forum diskusi tua yang menyimpan ribuan catatan anggota, meminta Kael untuk menguji keamanan gerbang pendaftarannya sebelum dibuka untuk umum. Izin pengujian sudah ditandatangani resmi." },
      { text: "Di depan gerbang, penjaga meminta setiap pengunjung menuliskan nama mereka di sebuah formulir deklarasi singkat sebelum diizinkan masuk." },
      { text: "Sebagai percobaan pertama, Kael menuliskan nama acak di formulir itu. Penjaga membalas dengan pesan kesalahan yang sangat rinci, menyebutkan persis bagian mana dari deklarasinya yang dianggap tidak dikenal." },
      { text: "Pesan kesalahan serinci itu adalah tanda bahwa penjaga membaca formulir apa adanya, tanpa benar-benar memeriksa bentuknya terlebih dahulu." },
    ],
    question: "Langkah pengintaian apa yang akan Kael lakukan selanjutnya?",
    choices: [
      {
        id: "safe",
        label: "Menuliskan satu tanda baca yang tidak wajar di kolom nama, untuk melihat apakah penjaga kebingungan membaca formulirnya.",
        points: 4,
        result: [
          { text: "Kael menuliskan satu tanda kutip tunggal yang sengaja diletakkan tidak pada tempatnya di kolom nama." },
          { text: "Penjaga langsung kebingungan dan membalas dengan pesan kesalahan yang menyebutkan formulirnya rusak di bagian itu." },
          { text: "Kael mencatat temuan ini: gerbang tidak memeriksa bentuk tulisan tamu sebelum membacanya. Ini adalah celah yang perlu dilaporkan." },
        ],
      },
      {
        id: "neutral",
        label: "Memeriksa papan petunjuk gerbang untuk melihat bagaimana formulir itu disusun.",
        points: 1,
        result: [
          { text: "Kael membaca papan petunjuk yang menjelaskan format formulir pendaftaran secara umum." },
          { text: "Informasinya berguna, tapi Kael belum benar-benar menguji apakah penjaga memeriksa isi formulir dengan ketat atau tidak." },
        ],
      },
      {
        id: "risky",
        label: "Langsung menuliskan deklarasi rumit yang mengaku sebagai anggota lama, tanpa pengintaian lebih dulu.",
        points: 0,
        result: [
          { text: "Kael langsung mencoba deklarasi rumit tanpa memahami dulu bagaimana penjaga memeriksa formulir." },
          { text: "Penjaga membalas dengan pesan kesalahan umum yang tidak jelas maksudnya." },
          { text: "Kael tidak mendapat informasi apa pun tentang cara kerja gerbang, dan harus mengulang dari awal." },
        ],
      },
    ],
  },
};
