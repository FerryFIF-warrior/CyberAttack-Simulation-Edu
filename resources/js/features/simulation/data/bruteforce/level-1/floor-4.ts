import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor4: FloorContent = {
  id: "bruteforce_level_1_floor_4",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 4,
  title: "Lapisan Tambahan: CAPTCHA dan MFA",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_4", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "plant_4", icon: "plant", x: 15, y: 28, scale: 1 },
      { id: "lamp_4", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "captcha_panel_1",
      label: "Panel CAPTCHA",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Rate limiting dan account lockout sudah berjalan, tetapi bot masih sesekali mencoba login dengan pola yang lebih licin, menyebar percobaannya ke banyak akun berbeda." },
      { text: "Kael menyadari forum ini butuh lapisan pertahanan tambahan, bukan hanya membatasi kecepatan, tapi juga memastikan yang login benar-benar manusia dan pemilik akun yang sah." },
      { text: "Di panel pengaturan, ia menemukan dua opsi: mengaktifkan CAPTCHA untuk menyaring bot otomatis, atau menambahkan Multi-Factor Authentication (MFA) yang meminta kode tambahan dari ponsel pengguna." },
      { text: "Kael tahu kedua lapisan ini punya fungsi berbeda, dan keduanya bisa saling melengkapi." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Aktifkan CAPTCHA dan MFA untuk akun sensitif.",
        points: 4,
        result: [
          { text: "Kael mengaktifkan CAPTCHA untuk menyaring percobaan login otomatis dari bot." },
          { text: "Bersamaan dengan itu, ia mengaktifkan MFA untuk akun-akun yang memiliki akses sensitif, mewajibkan kode tambahan dari ponsel pemiliknya." },
          { text: "Bot tidak lagi bisa lolos CAPTCHA, dan bahkan jika kata sandi berhasil ditebak, MFA tetap menghalangi akses masuk." },
        ],
      },
      {
        id: "neutral",
        label: "Aktifkan CAPTCHA saja.",
        points: 1,
        result: [
          { text: "Kael hanya mengaktifkan CAPTCHA tanpa menambahkan MFA." },
          { text: "CAPTCHA sederhana memang menyaring sebagian bot, tetapi bot yang lebih canggih masih bisa menemukan celah untuk melewatinya." },
        ],
      },
      {
        id: "risky",
        label: "Matikan semua pertahanan agar user mudah login.",
        points: -2,
        result: [
          { text: "Karena beberapa pengguna mengeluh proses login jadi merepotkan, Kael mematikan seluruh lapisan pertahanan." },
          { text: "Login memang jadi lebih cepat bagi semua orang, termasuk bot yang masih mengincar forum." },
          { text: "Dalam hitungan detik, bot kembali berhasil membobol beberapa akun tanpa hambatan apa pun." },
        ],
      },
    ],
  },
};
