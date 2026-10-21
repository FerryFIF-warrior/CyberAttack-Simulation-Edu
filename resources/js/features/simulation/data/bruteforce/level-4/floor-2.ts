import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor2: FloorContent = {
  id: "bruteforce_level_4_floor_2",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 2,
  title: "Serangan Low-and-Slow",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_2", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "calendar_1", icon: "calendar", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "trend_graph_1",
      label: "Grafik Tren Bulanan",
      icon: "chart",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Satu bulan berlalu sejak pengintaian ambang batas itu berhasil dicegah. Kael hampir melupakannya, sampai saat meninjau grafik tren bulanan, sesuatu yang aneh tersembunyi di balik garis yang terlihat biasa saja." },
      { text: "Satu akun tertentu menerima percobaan login, hanya satu atau dua kali per hari, tersebar selama tiga puluh hari berturut-turut. Dilihat sehari-hari, ini tidak akan pernah memicu alarm apa pun." },
      { text: "Tapi dilihat dalam rentang sebulan penuh, polanya jelas: seseorang mencoba menebak kata sandi satu akun secara perlahan, sangat perlahan, sengaja menyebar waktunya agar tidak pernah terlihat sebagai lonjakan mencurigakan dalam satu hari." },
      { text: "Ini disebut serangan low-and-slow, dirancang khusus untuk luput dari sistem yang hanya memantau pola harian, bukan pola jangka panjang." },
    ],
    question: "Bagaimana Kael menangani pola serangan yang tersembunyi dalam rentang waktu panjang ini?",
    choices: [
      {
        id: "safe",
        label: "Membangun pemantauan berbasis akumulasi jangka panjang per akun, bukan hanya memantau lonjakan harian.",
        points: 3,
        result: [
          { text: "Kael menyadari sistem pemantauan yang ada hanya melihat pola dalam satu hari, sehingga serangan yang disebar selama sebulan penuh luput dari perhatian." },
          { text: "Ia membangun pemantauan baru yang mengakumulasi jumlah percobaan gagal per akun selama rentang waktu lebih panjang, bukan hanya menghitung ulang setiap hari." },
          { text: "Pola serangan low-and-slow yang sudah berjalan sebulan itu akhirnya terdeteksi, dan akun yang menjadi sasaran segera diamankan sebelum kata sandinya benar-benar berhasil ditebak." },
        ],
      },
      {
        id: "neutral",
        label: "Mengganti kata sandi akun yang menjadi sasaran, tanpa memperbaiki sistem pemantauannya.",
        points: 1,
        result: [
          { text: "Kael mengganti kata sandi akun yang menjadi sasaran serangan, menghentikan ancaman untuk akun itu secara spesifik." },
          { text: "Namun karena sistem pemantauan belum diperbaiki, akun lain yang sedang diincar dengan pola serupa tetap tidak terdeteksi." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena dalam satu hari jumlah percobaannya terlalu kecil untuk dianggap serangan.",
        points: -2,
        result: [
          { text: "Kael menganggap satu atau dua percobaan per hari terlalu kecil untuk dianggap sebagai ancaman serius." },
          { text: "Ia tidak menyadari bahwa justru itulah tujuan dari serangan low-and-slow, bersembunyi di balik angka yang terlihat remeh setiap harinya." },
          { text: "Setelah cukup lama berjalan tanpa gangguan, kata sandi akun yang menjadi sasaran akhirnya berhasil ditebak penyerang." },
        ],
      },
    ],
  },
};
