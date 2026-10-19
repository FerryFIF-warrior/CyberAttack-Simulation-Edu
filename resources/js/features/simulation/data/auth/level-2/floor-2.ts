import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel2Floor2: FloorContent = {
  id: "auth_level_2_floor_2",
  simulationId: "auth",
  levelNumber: 2,
  floorNumber: 2,
  title: "Tahap 2: Memancing Kode Rahasia",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_2", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_2", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "otp_panel_1",
      label: "Panel Verifikasi Kode",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah laporan soal kode pemulihan, pemilik forum menambahkan lapisan baru: verifikasi dua langkah lewat kode sekali pakai yang dikirim ke ponsel anggota. Secara teknis, ini seharusnya jauh lebih aman." },
      { text: "Namun pemilik forum khawatir pada satu hal: teknologi yang kuat tidak ada gunanya jika manusia di baliknya bisa ditipu untuk menyerahkannya sendiri." },
      { text: "Kael diminta menguji skenario ini lewat simulasi terkendali: menyamar sebagai staf dukungan forum, menghubungi akun pengujian yang diperankan rekan kerjanya, dan mencoba membujuknya menyebutkan kode verifikasi yang baru saja diterima." },
      { text: "Kael tahu ini adalah ranah yang lebih sensitif, karena yang diuji bukan sistem, melainkan kewaspadaan manusia yang menggunakannya." },
    ],
    question: "Bagaimana Kael menjalankan simulasi pengujian ini?",
    choices: [
      {
        id: "safe",
        label: "Menjalankan simulasi sesuai skenario yang disepakati, lalu segera menjelaskan tujuan sebenarnya begitu simulasi selesai, siapa pun hasilnya.",
        points: 4,
        result: [
          { text: "Kael menjalankan simulasi sesuai skenario yang telah disetujui pemilik forum, menyamar sebagai staf dukungan yang meminta kode verifikasi dengan alasan pemulihan akun mendesak." },
          { text: "Rekan kerja yang diperankan sebagai korban simulasi hampir menyebutkan kodenya, sebelum Kael segera menjelaskan bahwa ini hanyalah simulasi pengujian kesadaran keamanan." },
          { text: "Kael mencatat hasil ini sebagai bukti nyata bahwa staf forum perlu pelatihan tambahan soal mengenali permintaan kode verifikasi yang mencurigakan." },
        ],
      },
      {
        id: "neutral",
        label: "Menjalankan simulasi tapi langsung menghentikannya di awal karena merasa tidak nyaman.",
        points: 1,
        result: [
          { text: "Kael memulai simulasi, tapi merasa tidak nyaman dan menghentikannya sebelum benar-benar mendapat hasil yang jelas." },
          { text: "Pengujian jadi tidak memberikan data yang cukup untuk disimpulkan, dan harus diulang di lain waktu." },
        ],
      },
      {
        id: "risky",
        label: "Memperluas simulasi ke anggota forum sungguhan tanpa persetujuan mereka, demi hasil yang 'lebih nyata'.",
        points: -2,
        result: [
          { text: "Kael memutuskan memperluas simulasi ke beberapa anggota forum sungguhan tanpa memberi tahu mereka terlebih dahulu." },
          { text: "Beberapa anggota merasa benar-benar ditipu dan melaporkannya sebagai insiden nyata, menimbulkan kepanikan yang tidak perlu." },
          { text: "Pemilik forum harus turun tangan meminta maaf kepada anggotanya, dan kepercayaan terhadap proses pengujian Kael sempat tergoyahkan." },
        ],
      },
    ],
  },
};
