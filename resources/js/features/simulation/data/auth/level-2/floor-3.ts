import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel2Floor3: FloorContent = {
  id: "auth_level_2_floor_3",
  simulationId: "auth",
  levelNumber: 2,
  floorNumber: 3,
  title: "Tahap 3: Lencana yang Tak Pernah Kedaluwarsa",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_3", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_3", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "session_panel_1",
      label: "Panel Sesi Aktif",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Saat memeriksa pengaturan sistem lebih dalam, Kael menemukan sesuatu yang membuatnya terdiam lama: lencana sesi yang diberikan saat login ternyata tidak pernah kedaluwarsa, sama sekali, bahkan setelah berbulan-bulan tidak digunakan." },
      { text: "Ia memeriksa riwayat sesi aktif dan menemukan lencana milik seorang anggota lama yang sudah tidak pernah login sejak enam bulan lalu, tetapi lencananya masih tercatat valid dan bisa dipakai untuk masuk kapan saja." },
      { text: "Bayangan paling mengkhawatirkan muncul di benak Kael: jika lencana lama semacam itu pernah bocor, lewat perangkat yang hilang, warnet umum, atau cara lain, pemiliknya tidak akan pernah tahu bahwa aksesnya masih bisa disalahgunakan bertahun-tahun kemudian." },
      { text: "Ini bukan soal mencuri lencana baru lagi, melainkan soal lencana lama yang terlupakan, tapi tetap berbahaya selama masih berlaku tanpa batas waktu." },
    ],
    question: "Apa yang akan dilakukan Kael terhadap temuan ini?",
    choices: [
      {
        id: "safe",
        label: "Mencatat seluruh sesi yang sudah lama tidak aktif sebagai bukti, lalu merekomendasikan batas waktu kedaluwarsa otomatis untuk setiap lencana.",
        points: 4,
        result: [
          { text: "Kael mendata seluruh sesi aktif yang sudah tidak digunakan selama berbulan-bulan sebagai bukti nyata dari risiko ini." },
          { text: "Dalam catatannya, ia merekomendasikan agar setiap lencana sesi diberi batas waktu kedaluwarsa otomatis, dan dipaksa login ulang setelah periode tertentu tanpa aktivitas." },
          { text: "Pemilik forum menerapkan kebijakan itu, membuat lencana lama yang terlupakan tidak lagi menjadi pintu belakang yang bisa dipakai bertahun-tahun kemudian." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya menghapus manual sesi-sesi lama yang ia temukan, tanpa mengubah sistem kedaluwarsanya.",
        points: 1,
        result: [
          { text: "Kael menghapus manual beberapa sesi lama yang ia temukan saat pengujian." },
          { text: "Masalahnya belum benar-benar selesai, karena tanpa aturan kedaluwarsa otomatis, sesi-sesi baru akan mengalami masalah yang sama di masa depan." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena anggap saja anggota lama itu tidak akan pernah kembali ke forum.",
        points: -2,
        result: [
          { text: "Kael menganggap remeh temuan ini, beralasan anggota lama itu kemungkinan tidak akan pernah kembali." },
          { text: "Ia lupa bahwa yang berbahaya bukan apakah pemilik asli akan kembali, melainkan apakah lencana lamanya bisa dipakai orang lain yang menemukannya." },
          { text: "Beberapa bulan kemudian, sebuah lencana lama yang terlupakan digunakan untuk mengakses forum tanpa sepengetahuan siapa pun." },
        ],
      },
    ],
  },
};
