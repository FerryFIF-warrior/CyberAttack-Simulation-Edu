import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor4: FloorContent = {
  id: "sqli_level_4_floor_4",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 4,
  title: "Serangan Berantai Antar-Layanan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_4", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "network_board_1", icon: "board", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "service_chain_panel_1",
      label: "Panel Rantai Layanan",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Sistem arsip ini sebenarnya terdiri dari beberapa layanan kecil yang saling terhubung: satu layanan menangani pencarian, satu layanan lain menangani statistik kunjungan, dan satu layanan lagi menangani rekomendasi arsip terkait." },
      { text: "Kael menguji layanan statistik kunjungan sendirian, dan hasilnya sangat aman, setiap input diperiksa dengan baik sebelum diproses layanan itu." },
      { text: "Namun saat memeriksa bagaimana layanan rekomendasi bekerja, ia menemukan sesuatu yang mengkhawatirkan: layanan rekomendasi mengambil data mentah dari layanan statistik tanpa memeriksanya ulang, karena menganggap data dari 'layanan internal yang sudah tepercaya' pasti aman." },
      { text: "Jika seseorang bisa menyisipkan sesuatu yang bermasalah lewat layanan statistik, meski layanan itu sendiri tampak aman dari luar, masalah itu bisa menjalar ke layanan rekomendasi yang mempercayainya tanpa pemeriksaan tambahan." },
    ],
    question: "Bagaimana Kael menangani risiko rantai antar-layanan yang saling mempercayai tanpa verifikasi ini?",
    choices: [
      {
        id: "safe",
        label: "Merekomendasikan agar setiap layanan tetap memvalidasi data yang diterima dari layanan internal lain, bukan mempercayainya begitu saja.",
        points: 3,
        result: [
          { text: "Kael menjelaskan bahwa 'berasal dari layanan internal' tidak sama dengan 'pasti aman', karena data itu pada akhirnya tetap bisa dipengaruhi oleh input dari luar." },
          { text: "Ia merekomendasikan agar layanan rekomendasi tetap memvalidasi data yang diterimanya dari layanan statistik, bukan langsung mempercayainya tanpa pemeriksaan." },
          { text: "Rantai kepercayaan antar-layanan yang tadinya rapuh kini diperkuat, menutup jalur yang bisa dipakai untuk menjalar dari satu layanan ke layanan lain." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya memperketat validasi di layanan statistik, membiarkan layanan rekomendasi tetap mempercayainya tanpa verifikasi tambahan.",
        points: -1,
        result: [
          { text: "Kael memperketat validasi hanya di layanan statistik, berpikir itu sudah cukup menghentikan masalah sejak sumbernya." },
          { text: "Namun layanan rekomendasi tetap tidak pernah memvalidasi ulang data yang diterimanya, sehingga jika ada celah lain di layanan statistik di masa depan, risikonya tetap bisa menjalar tanpa hambatan." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena masing-masing layanan, diuji satu per satu, sudah terbukti aman secara individual.",
        points: -3,
        result: [
          { text: "Kael menganggap karena setiap layanan sudah terbukti aman saat diuji satu per satu, tidak ada yang perlu dikhawatirkan dari hubungan antar-layanan." },
          { text: "Ia tidak menyadari bahwa amannya setiap layanan secara individual tidak menjamin amannya seluruh rantai jika salah satu layanan mempercayai layanan lain tanpa verifikasi." },
          { text: "Celah yang tidak pernah ditemukan di pengujian individual akhirnya muncul lewat jalur rantai antar-layanan yang tidak pernah diperiksa menyeluruh." },
        ],
      },
    ],
  },
};
