import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor3: FloorContent = {
  id: "sqli_level_4_floor_3",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 3,
  title: "Celah yang Sudah Diperbaiki Sebagian",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_3", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_3", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "patch_note_1",
      label: "Catatan Tambalan Lama",
      icon: "report",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael membaca catatan tambalan keamanan lama milik sistem ini, dan menemukan bahwa teknik lama yang dulu sering ia pakai, menyisipkan tanda baca tidak wajar di kolom pencarian, kini sudah tidak lagi berhasil sama sekali." },
      { text: "Saat dicoba, sistem langsung menolaknya dengan pesan jelas: karakter tidak diizinkan. Tambalan ini terlihat benar-benar menutup celah lama yang dulu pernah ditemukan." },
      { text: "Kael hampir menyimpulkan bahwa formulir pencarian ini sudah sepenuhnya aman, sampai ia memeriksa satu formulir lain yang jarang digunakan: fitur ekspor data ke berkas, yang ternyata memproses kata kunci pencarian yang sama persis, tapi lewat jalur kode yang sepenuhnya berbeda dari formulir pencarian utama." },
      { text: "Tambalan yang diterapkan ternyata hanya menutup celah di jalur formulir pencarian utama, sementara jalur ekspor data yang memproses kata kunci serupa tidak pernah ikut diperbaiki sama sekali." },
    ],
    question: "Bagaimana Kael menyikapi kesan 'sudah aman' yang muncul dari tambalan formulir pencarian utama ini?",
    choices: [
      {
        id: "safe",
        label: "Menelusuri seluruh jalur kode lain yang memproses kata kunci serupa, tidak berhenti hanya karena formulir utama sudah ditambal.",
        points: 3,
        result: [
          { text: "Kael tidak langsung puas dengan hasil pengujian di formulir pencarian utama, meski tambalannya terbukti berhasil menolak teknik lama." },
          { text: "Ia menelusuri jalur-jalur lain yang mungkin memproses data serupa, dan menemukan fitur ekspor data yang ternyata belum tersentuh perbaikan sama sekali." },
          { text: "Teknik lama yang gagal di formulir utama ternyata masih berhasil sempurna di fitur ekspor data, membuktikan bahwa satu tambalan tidak selalu berarti seluruh sistem sudah aman." },
        ],
      },
      {
        id: "neutral",
        label: "Menyimpulkan sistem sudah aman karena teknik lama terbukti gagal di formulir pencarian utama.",
        points: -2,
        result: [
          { text: "Kael menyimpulkan sistem ini sudah aman secara keseluruhan, karena teknik lama yang ia coba terbukti gagal di formulir pencarian utama." },
          { text: "Kesimpulan itu terburu-buru, karena ia tidak sempat memeriksa apakah ada jalur kode lain yang memproses data serupa tanpa perlindungan yang sama." },
        ],
      },
      {
        id: "risky",
        label: "Menutup pengujian lebih awal dan melanjutkan ke bagian sistem lain yang belum pernah diuji sama sekali.",
        points: -3,
        result: [
          { text: "Kael menganggap pengujian formulir pencarian ini sudah selesai dan segera beralih ke bagian sistem lain yang belum pernah disentuh." },
          { text: "Fitur ekspor data yang sebenarnya masih rentan luput dari pengujian sama sekali, tersembunyi di balik kesan bahwa formulir utamanya sudah aman." },
          { text: "Celah di fitur ekspor data baru ditemukan belakangan, setelah sempat dimanfaatkan tanpa disadari siapa pun." },
        ],
      },
    ],
  },
};
