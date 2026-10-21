import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel3Floor6: FloorContent = {
  id: "sqli_level_3_floor_6",
  simulationId: "sqli",
  levelNumber: 3,
  floorNumber: 6,
  title: "Ujian Akhir: Laporan Rantai Lanjutan",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_6", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "final_desk_1",
      label: "Meja Laporan Jaringan Arsip",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pengujian menyeluruh selesai. Kael duduk di hadapan dewan pengelola jaringan arsip gabungan, siap menyampaikan laporan paling kompleks yang pernah ia susun: injeksi tertunda, eskalasi label kewenangan, eksfiltrasi lewat jalur notifikasi, jejak pihak tak dikenal, hingga dilema penggunaan alat otomatis." },
      { text: "Dewan pengelola tampak gelisah. Mereka menduga perbaikan di satu titik selalu cukup, tapi laporan Kael menunjukkan sebaliknya, celah selalu muncul kembali di tempat lain yang tidak pernah mereka duga." },
      { text: "Kael menyadari, rekomendasi kali ini tidak bisa lagi sekadar menambal satu per satu formulir. Dibutuhkan perubahan cara berpikir tentang bagaimana seluruh jaringan arsip gabungan ini dirancang dan dipantau dari awal." },
      { text: "Ia menata seluruh temuannya menjadi satu kesimpulan akhir yang akan menentukan arah keamanan jaringan ini untuk tahun-tahun mendatang." },
    ],
    question: "Apa rekomendasi akhir yang akan Kael sampaikan kepada dewan pengelola?",
    choices: [
      {
        id: "safe",
        label: "Menerapkan validasi ulang di setiap titik pemrosesan data, pemisahan hak akses yang lebih granular, dan pemantauan berkelanjutan terhadap jalur data yang keluar dari sistem.",
        points: 2,
        result: [
          { text: "Kael menjelaskan bahwa akar dari seluruh temuan minggu ini adalah asumsi bahwa data yang sudah tersimpan aman tidak perlu diperiksa lagi ketika dipakai di tempat lain." },
          { text: "Ia merekomendasikan tiga perubahan mendasar: validasi ulang data di setiap titik pemrosesan, bukan hanya saat pertama kali masuk; pemisahan hak akses yang lebih granular antar bagian sistem; dan pemantauan berkelanjutan terhadap jalur mana pun yang bisa membawa data keluar dari sistem." },
          { text: "Dewan pengelola menerima dan menerapkan seluruh rekomendasi itu, membangun ulang arsitektur keamanan jaringan arsip dari fondasinya, bukan sekadar menambal gejala yang tampak di permukaan." },
          { text: "Level 3 SQL Injection selesai. Kael kini memahami bahwa pada tingkat lanjutan, keamanan sejati berarti merancang ulang sistem agar tahan terhadap celah yang bahkan belum pernah ditemukan." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan perbaikan hanya pada formulir dan sistem yang sudah terbukti bermasalah selama pengujian.",
        points: 1,
        result: [
          { text: "Kael hanya merekomendasikan perbaikan pada formulir dan sistem yang sudah terbukti bermasalah selama pengujian." },
          { text: "Perbaikan itu memang menutup celah yang sudah ditemukan, tapi bagian sistem lain yang belum sempat diuji tetap berisiko menyimpan kelemahan serupa di masa depan." },
        ],
      },
      {
        id: "risky",
        label: "Menyatakan jaringan arsip sudah aman sepenuhnya karena seluruh celah yang ditemukan sudah ditambal.",
        points: -5,
        result: [
          { text: "Merasa seluruh temuan sudah ditangani, Kael menyatakan jaringan arsip ini kini sudah aman sepenuhnya kepada dewan pengelola." },
          { text: "Pernyataan itu membuat dewan merasa terlalu tenang, mengurangi anggaran keamanan untuk tahun berikutnya karena menganggap masalahnya sudah selesai total." },
          { text: "Kael menyesali pernyataannya, menyadari bahwa tidak ada sistem yang pernah benar-benar selesai diamankan, hanya terus diperbaiki dari waktu ke waktu." },
        ],
      },
    ],
  },
};
