import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor5: FloorContent = {
  id: "bruteforce_level_1_floor_5",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 5,
  title: "Ujian Akhir: Pertahanan Berlapis",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "flag_1", icon: "flag", x: 80, y: 22, scale: 1.4 },
      { id: "plant_5", icon: "plant", x: 15, y: 28, scale: 1 },
      { id: "lamp_5", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "fortress_1",
      label: "Benteng Pertahanan",
      icon: "fortress",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Satu demi satu, Kael telah membangun pertahanan forum: kata sandi kuat, rate limiting, account lockout, lalu CAPTCHA dan MFA." },
      { text: "Malam itu, sistem mendeteksi gelombang serangan terbesar sejauh ini, sepuluh ribu percobaan login per detik, datang dari ribuan alamat IP berbeda sekaligus." },
      { text: "Ini bukan lagi bot sederhana. Penyerang di balik serangan ini tampaknya menguji apakah semua lapisan pertahanan yang telah dibangun benar-benar bekerja bersama." },
      { text: "Kael berdiri di depan panel kontrol utama, mengingat kembali semua yang telah ia pelajari selama ini." },
    ],
    question: "Strategi apa yang paling efektif untuk menghadapi serangan ini?",
    choices: [
      {
        id: "safe",
        label: "Gabungkan rate limiting, account lockout, CAPTCHA, MFA, dan kebijakan password kuat sekaligus.",
        points: 4,
        result: [
          { text: "Kael mengaktifkan seluruh lapisan pertahanan yang telah ia bangun secara bersamaan." },
          { text: "Rate limiting memperlambat bot, account lockout mengunci akun yang dibidik, CAPTCHA menyaring bot otomatis, dan MFA menghentikan akses meski kata sandi berhasil ditebak." },
          { text: "Setelah mencoba berulang kali tanpa hasil, serangan besar itu akhirnya berhenti." },
          { text: "Level 1 Brute Force selesai. Forum kini berdiri dengan pertahanan berlapis yang kokoh." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mengandalkan rate limiting dan kebijakan password kuat.",
        points: 1,
        result: [
          { text: "Kael hanya mengandalkan dua lapisan yang sudah terbukti efektif sebelumnya." },
          { text: "Serangan memang melambat, tetapi beberapa percobaan tetap lolos karena tidak ada CAPTCHA maupun MFA yang menyaringnya lebih jauh." },
        ],
      },
      {
        id: "risky",
        label: "Mengandalkan kata sandi kuat saja.",
        points: -2,
        result: [
          { text: "Kael berpikir kata sandi yang kuat saja sudah cukup untuk menghadapi serangan sebesar ini." },
          { text: "Satu lapisan pertahanan saja ternyata tidak sanggup menahan gelombang serangan sebesar itu." },
          { text: "Sebagian akun berhasil ditembus sebelum Kael sempat mengaktifkan lapisan pertahanan lainnya." },
        ],
      },
    ],
  },
};
