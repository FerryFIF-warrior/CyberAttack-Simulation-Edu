import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor4: FloorContent = {
  id: "auth_level_4_floor_4",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 4,
  title: "Serangan terhadap Mekanisme Ingat Saya",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_4", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "checkbox_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "remember_me_panel_1",
      label: "Panel Fitur Ingat Saya",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Di halaman login, ada satu kotak centang kecil bertuliskan 'Ingat saya', yang jika dicentang akan membuat anggota tetap masuk secara otomatis setiap kali membuka platform ini lagi, tanpa perlu login ulang." },
      { text: "Kael memeriksa bagaimana fitur ini bekerja di balik layar, dan menemukan bahwa mencentang kotak ini menciptakan sebuah lencana sesi berjangka sangat panjang, jauh lebih lama dari sesi login biasa, disimpan di perangkat pengguna." },
      { text: "Yang mengkhawatirkan, lencana berjangka panjang ini ternyata disimpan dengan cara yang sama persis seperti lencana sesi biasa, tanpa perlindungan tambahan apa pun, padahal jendela waktu yang bisa dimanfaatkan jika lencana ini bocor jauh lebih lebar dibanding sesi biasa." },
      { text: "Fitur yang dirancang untuk kenyamanan ini justru memperpanjang jendela serangan secara diam-diam, tanpa pernah disadari oleh anggota yang mencentangnya hanya demi tidak perlu login berulang kali." },
    ],
    question: "Bagaimana Kael menangani risiko yang tersembunyi di balik fitur kenyamanan ini?",
    choices: [
      {
        id: "safe",
        label: "Merekomendasikan agar lencana sesi berjangka panjang diberi perlindungan tambahan yang lebih ketat dibanding sesi biasa, sesuai dengan risiko jendela waktunya yang lebih lebar.",
        points: 3,
        result: [
          { text: "Kael menjelaskan bahwa semakin panjang jendela waktu sebuah lencana berlaku, semakin besar pula risikonya jika sampai bocor." },
          { text: "Ia merekomendasikan agar lencana sesi berjangka panjang diberi perlindungan tambahan, seperti verifikasi ulang perangkat secara berkala, dibanding sesi biasa yang masa berlakunya jauh lebih singkat." },
          { text: "Platform menerapkan perlindungan tambahan itu, membuat fitur kenyamanan ini tidak lagi menjadi titik lemah tersembunyi." },
        ],
      },
      {
        id: "neutral",
        label: "Menyarankan memperpendek masa berlaku fitur ini sedikit, tanpa menambah perlindungan tambahan apa pun.",
        points: -1,
        result: [
          { text: "Kael menyarankan memperpendek sedikit masa berlaku fitur ini, dari yang sangat panjang menjadi sedikit lebih pendek." },
          { text: "Jendela waktunya memang mengecil sedikit, tapi perlindungan dasarnya tetap sama lemahnya seperti sebelumnya, tanpa perlindungan tambahan apa pun." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena fitur 'Ingat saya' adalah fitur umum yang hampir selalu ada di berbagai platform.",
        points: -2,
        result: [
          { text: "Kael menganggap fitur ini wajar dan tidak perlu perhatian khusus, karena hampir semua platform punya fitur serupa." },
          { text: "Ia tidak mempertimbangkan bahwa umum dipakai tidak berarti diimplementasikan dengan aman di setiap platform, dan jendela waktu yang lebar tetap menjadi risiko nyata jika tidak dilindungi dengan baik." },
          { text: "Sebuah perangkat yang hilang dengan fitur 'Ingat saya' aktif berhasil dipakai mengakses akun pemiliknya tanpa hambatan apa pun." },
        ],
      },
    ],
  },
};
