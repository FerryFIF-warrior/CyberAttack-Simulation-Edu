import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel3Floor3: FloorContent = {
  id: "bruteforce_level_3_floor_3",
  simulationId: "bruteforce",
  levelNumber: 3,
  floorNumber: 3,
  title: "Serangan Meniru Perilaku Manusia",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_3", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "chart_1", icon: "chart", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "behavior_panel_1",
      label: "Panel Analisis Perilaku",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Deteksi pola kolektif berhasil menahan botnet, tapi penyerang kembali beradaptasi. Kali ini, percobaan login datang jauh lebih lambat, dengan jeda antar-ketukan tombol yang terasa wajar, bahkan sesekali ada gerakan kursor seperti layaknya manusia sungguhan." },
      { text: "CAPTCHA yang biasanya menyaring bot otomatis entah bagaimana berhasil dilewati tanpa masalah, seolah yang mengisinya benar-benar manusia, bukan program." },
      { text: "Kael memeriksa data lebih dalam dan menemukan sesuatu yang mengkhawatirkan: pola ketikan itu memang dirancang meniru ritme manusia, lengkap dengan jeda acak dan sesekali kesalahan ketik yang segera diperbaiki, seperti kebiasaan orang sungguhan." },
      { text: "Ini bukan bot kasar seperti sebelumnya. Ini adalah serangan yang dirancang khusus untuk mengelabui sistem yang mengandalkan 'terlihat seperti manusia' sebagai tanda keamanan." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menambahkan analisis pola jangka panjang, seperti kombinasi lokasi, perangkat, dan riwayat akun, bukan hanya perilaku ketik sesaat.",
        points: 4,
        result: [
          { text: "Kael menyadari satu sesi yang terlihat manusiawi saja tidak cukup untuk memastikan keasliannya." },
          { text: "Ia menambahkan lapisan analisis baru: mencocokkan lokasi login, jenis perangkat, dan riwayat akun dalam jangka waktu lebih panjang, bukan hanya menilai dari satu sesi login saja." },
          { text: "Pola serangan yang menyamar sebagai manusia itu akhirnya terungkap, karena meski ketikannya meyakinkan, riwayat akun dan lokasinya tetap tidak masuk akal secara keseluruhan." },
        ],
      },
      {
        id: "neutral",
        label: "Menonaktifkan sementara CAPTCHA karena dianggap sudah tidak efektif lagi.",
        points: -2,
        result: [
          { text: "Kael menonaktifkan sementara CAPTCHA, beranggapan fitur itu sudah tidak lagi berguna melawan serangan sepintar ini." },
          { text: "Tanpa CAPTCHA sama sekali, bot-bot yang lebih sederhana dari sebelumnya justru ikut leluasa mencoba login tanpa hambatan apa pun." },
        ],
      },
      {
        id: "risky",
        label: "Mempercayai begitu saja sesi yang lolos CAPTCHA sebagai manusia asli tanpa pengecekan tambahan.",
        points: -3,
        result: [
          { text: "Kael menganggap begitu sebuah sesi berhasil lolos CAPTCHA, itu sudah cukup membuktikan ia adalah manusia asli." },
          { text: "Penyerang yang telah mempelajari cara mengelabui CAPTCHA pun leluasa mencoba lebih banyak akun tanpa dicurigai sama sekali." },
          { text: "Beberapa akun dengan kata sandi yang sebenarnya cukup kuat tetap berhasil ditembus lewat percobaan yang terlihat meyakinkan sebagai manusia." },
        ],
      },
    ],
  },
};
