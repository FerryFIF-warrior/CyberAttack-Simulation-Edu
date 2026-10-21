import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor6: FloorContent = {
  id: "auth_level_4_floor_6",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 6,
  title: "Downgrade Diam-Diam",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_6", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "legacy_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "legacy_login_panel_1",
      label: "Jalur Login Versi Lama",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Platform ini sudah mewajibkan MFA untuk semua anggota sejak dua tahun lalu, dan Kael yakin seluruh jalur login modern sudah terlindungi dengan baik. Namun saat menelusuri kode lama, ia menemukan jalur login versi lama yang sengaja dipertahankan untuk mendukung aplikasi pihak ketiga yang belum diperbarui." },
      { text: "Jalur login versi lama ini dibuat sebelum MFA diwajibkan, dan karena alasan kompatibilitas dengan aplikasi lama, jalur ini tidak pernah ikut diwajibkan memakai MFA sama sekali." },
      { text: "Kael mencoba login lewat jalur lama ini dengan akun pengujian yang MFA-nya sudah aktif di jalur modern. Anehnya, jalur lama tetap menerima login hanya dengan kata sandi saja, seolah MFA yang aktif di akun itu tidak pernah benar-benar berlaku di sini." },
      { text: "Ini berarti, siapa pun yang berhasil mendapatkan kata sandi seorang anggota, meski MFA-nya aktif di jalur modern, tetap bisa masuk lewat jalur lama ini tanpa pernah diminta kode tambahan apa pun." },
    ],
    question: "Bagaimana Kael menangani celah downgrade tersembunyi di jalur login versi lama ini?",
    choices: [
      {
        id: "safe",
        label: "Merekomendasikan agar MFA tetap diwajibkan di jalur login versi lama, atau jalur itu dinonaktifkan sepenuhnya jika tidak lagi dibutuhkan.",
        points: 3,
        result: [
          { text: "Kael menjelaskan bahwa kewajiban MFA yang hanya berlaku di satu jalur login saja bukanlah kewajiban yang sesungguhnya, karena penyerang akan selalu mencari jalur yang paling lemah." },
          { text: "Ia merekomendasikan agar MFA tetap diwajibkan meski lewat jalur lama, atau jika aplikasi pihak ketiga yang membutuhkannya sudah tidak lagi relevan, jalur itu dinonaktifkan sepenuhnya." },
          { text: "Platform menutup celah downgrade ini, memastikan MFA benar-benar berlaku di seluruh jalur login, bukan hanya di jalur yang paling sering digunakan." },
        ],
      },
      {
        id: "neutral",
        label: "Membatasi jalur login versi lama hanya untuk aplikasi pihak ketiga tertentu, tanpa menambahkan MFA di jalur tersebut.",
        points: -1,
        result: [
          { text: "Kael membatasi jalur login versi lama agar hanya bisa diakses oleh aplikasi pihak ketiga tertentu yang terdaftar." },
          { text: "Pembatasan ini mengurangi sedikit risiko, tapi jalur itu tetap tidak mewajibkan MFA sama sekali, sehingga tetap bisa dimanfaatkan selama kata sandi seorang anggota berhasil didapatkan." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena MFA sudah terbukti aktif dan berjalan baik di jalur login modern yang digunakan sebagian besar anggota.",
        points: -3,
        result: [
          { text: "Kael menganggap karena MFA sudah berjalan baik di jalur modern yang dipakai sebagian besar anggota, jalur lama yang jarang dipakai tidak terlalu penting untuk diperhatikan." },
          { text: "Ia tidak menyadari bahwa penyerang tidak akan mencoba jalur yang paling sering dipakai, melainkan jalur manapun yang paling lemah pertahanannya." },
          { text: "Beberapa akun dengan MFA yang seharusnya aktif tetap berhasil diakses lewat jalur lama yang luput dari kewajiban MFA." },
        ],
      },
    ],
  },
};
