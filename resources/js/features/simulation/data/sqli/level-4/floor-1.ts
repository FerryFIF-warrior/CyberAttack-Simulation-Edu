import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor1: FloorContent = {
  id: "sqli_level_4_floor_1",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 1,
  title: "Celah di Lapisan Cache",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_1", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_1", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "cache_panel_1",
      label: "Panel Penyimpanan Sementara",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael kini dipercaya menguji sistem arsip yang jauh lebih besar, dilengkapi lapisan penyimpanan sementara untuk mempercepat tampilan hasil pencarian yang sering diakses, supaya pengunjung tidak perlu menunggu lama setiap kali mencari arsip yang sama." },
      { text: "Validasi data di database utama sudah sangat ketat sejak perbaikan tahun lalu, setiap permintaan diperiksa dengan benar sebelum diproses. Kael sempat merasa tidak ada lagi yang perlu diuji di bagian ini." },
      { text: "Namun saat memeriksa lapisan penyimpanan sementara itu, ia menemukan sesuatu yang janggal: hasil pencarian lama, yang disimpan sebelum perbaikan validasi tahun lalu diterapkan, ternyata masih tersimpan dan terus ditampilkan ke pengunjung tanpa pernah diperiksa ulang." },
      { text: "Ini berarti, meski database utama sudah aman, data hasil olahan lama yang bermasalah tetap bisa terus beredar lewat lapisan penyimpanan sementara yang tidak pernah ikut diperbarui." },
    ],
    question: "Bagaimana Kael menangani celah yang tersembunyi di lapisan penyimpanan sementara ini?",
    choices: [
      {
        id: "safe",
        label: "Membersihkan seluruh data lama di penyimpanan sementara yang disimpan sebelum perbaikan validasi, lalu memastikan data baru selalu divalidasi ulang sebelum disimpan di sana.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa memperbaiki database utama saja tidak cukup jika data olahan lama masih tersimpan di lapisan terpisah." },
          { text: "Ia membersihkan seluruh data di penyimpanan sementara yang berasal dari sebelum perbaikan validasi diterapkan, lalu memastikan proses penyimpanan baru selalu memvalidasi ulang datanya sebelum disimpan." },
          { text: "Hasil pencarian yang bermasalah dari masa lalu akhirnya benar-benar hilang dari sistem, bukan hanya tersembunyi di balik database utama yang sudah diperbaiki." },
        ],
      },
      {
        id: "neutral",
        label: "Membiarkan data lama tetap ada karena database utamanya sendiri sudah terbukti aman.",
        points: -2,
        result: [
          { text: "Kael menganggap karena database utama sudah aman, data di lapisan penyimpanan sementara tidak terlalu penting untuk ditinjau ulang." },
          { text: "Ia tidak menyadari bahwa penyimpanan sementara itu berjalan terpisah dari database utama, dan bisa terus menampilkan data bermasalah tanpa pernah tersentuh perbaikan apa pun." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena menganggap lapisan penyimpanan sementara hanya untuk mempercepat tampilan, bukan tempat yang bisa disalahgunakan.",
        points: -3,
        result: [
          { text: "Kael menganggap lapisan penyimpanan sementara hanya berfungsi mempercepat tampilan, dan tidak mungkin menjadi tempat yang bisa disalahgunakan." },
          { text: "Ia lupa bahwa data apa pun yang tersimpan dan ditampilkan ulang ke pengunjung, di lapisan mana pun, tetap bisa membawa masalah lama yang belum pernah benar-benar dibersihkan." },
          { text: "Hasil pencarian yang bermasalah dari sebelum perbaikan tahun lalu terus beredar tanpa disadari siapa pun." },
        ],
      },
    ],
  },
};
