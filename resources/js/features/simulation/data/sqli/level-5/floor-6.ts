import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor6: FloorContent = {
  id: "sqli_level_5_floor_6",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 6,
  title: "Panggilan dari Tim Hukum",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "archive_gate_6", icon: "gate", x: 80, y: 22, scale: 1.4 },
      { id: "scale_1", icon: "scale", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "legal_notice_1",
      label: "Pemberitahuan Resmi dari Regulator",
      icon: "document",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Meski arsitektur verifikasi berlapis sudah berjalan beberapa bulan, satu insiden kecil tetap terjadi: sebuah kesalahan konfigurasi sementara, yang bertahan hanya tiga jam sebelum diperbaiki, sempat membuat sebagian data satu klien bisa diakses lewat permintaan yang seharusnya hanya menjangkau data klien lain." },
      { text: "Klien yang terdampak adalah sebuah lembaga keuangan yang tunduk pada regulasi perlindungan data yang sangat ketat. Tim hukum mereka segera mengirimkan pemberitahuan resmi, meminta laporan insiden lengkap dalam waktu tujuh puluh dua jam, sesuai kewajiban kontrak yang telah disepakati." },
      { text: "Tim hukum Arunika sendiri menyarankan agar laporan yang dikirim dibuat seminim mungkin detail teknisnya, khawatir detail yang terlalu rinci bisa dipakai sebagai dasar tuntutan hukum lebih lanjut jika klien merasa dirugikan." },
      { text: "Kael berada di persimpangan yang sulit: kewajiban kontraktual untuk transparan penuh kepada klien, berhadapan dengan saran hukum internal untuk berhati-hati membatasi apa yang diungkapkan." },
    ],
    question: "Bagaimana Kael menyusun laporan insiden ini di tengah ketegangan antara transparansi dan kehati-hatian hukum?",
    choices: [
      {
        id: "safe",
        label: "Menyusun laporan yang jujur dan teknis akurat tentang apa yang terjadi, dampaknya, dan langkah perbaikan, lalu bekerja sama dengan tim hukum untuk menyampaikannya dengan bahasa yang tepat tanpa menyembunyikan fakta material.",
        points: 3,
        result: [
          { text: "Kael bersikeras laporan insiden harus jujur dan akurat secara teknis tentang apa yang sebenarnya terjadi, data apa yang terdampak, dan langkah perbaikan yang sudah diambil, tanpa menyembunyikan fakta material apa pun." },
          { text: "Ia bekerja sama dengan tim hukum bukan untuk mengurangi substansi laporan, tapi untuk memastikan bahasanya tepat dan profesional tanpa memicu kepanikan yang tidak perlu." },
          { text: "Klien menghargai transparansi penuh ini, dan meski insiden tetap tercatat, hubungan kerja sama kontraktual tetap terjaga karena kepercayaan tidak pernah dikhianati." },
        ],
      },
      {
        id: "neutral",
        label: "Mengikuti saran tim hukum untuk membuat laporan seminim mungkin detail teknisnya, demi mengurangi risiko tuntutan hukum lebih lanjut.",
        points: -4,
        result: [
          { text: "Kael mengikuti saran tim hukum internal, menyusun laporan dengan detail teknis yang sangat minim, berharap ini akan mengurangi risiko tuntutan hukum dari klien." },
          { text: "Klien, yang memiliki tim teknis sendiri, segera menyadari laporan itu tidak cukup rinci untuk memenuhi kewajiban kontraktual, dan mempertanyakan apa yang sebenarnya sedang disembunyikan." },
          { text: "Kecurigaan yang muncul dari laporan yang terlalu minim ini justru memicu pemeriksaan tambahan dari klien yang jauh lebih mendalam dan memakan waktu dibanding jika transparansi penuh diberikan sejak awal." },
        ],
      },
      {
        id: "risky",
        label: "Menunda pengiriman laporan melewati batas waktu tujuh puluh dua jam yang disepakati, demi memastikan narasi laporan benar-benar sempurna sebelum dikirim.",
        points: -7,
        result: [
          { text: "Demi memastikan setiap kalimat dalam laporan benar-benar sempurna dan tidak menyisakan celah interpretasi, Kael menunda pengiriman laporan hingga melewati batas waktu tujuh puluh dua jam yang telah disepakati dalam kontrak." },
          { text: "Keterlambatan itu sendiri menjadi pelanggaran kontraktual terpisah, terlepas dari seberapa baik isi laporan yang akhirnya dikirim." },
          { text: "Klien menganggap keterlambatan ini sebagai tanda kurangnya kesiapan Arunika menangani insiden, sebuah kesan yang jauh lebih merusak dibanding laporan yang dikirim tepat waktu meski belum sempurna." },
        ],
      },
    ],
  },
};
