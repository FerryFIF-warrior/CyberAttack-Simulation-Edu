import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel3Floor1: FloorContent = {
  id: "bruteforce_level_3_floor_1",
  simulationId: "bruteforce",
  levelNumber: 3,
  floorNumber: 1,
  title: "Pengintaian Infrastruktur",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_1", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "monitor_1", icon: "monitor", x: 15, y: 28, scale: 1 },
      { id: "lamp_1", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "scan_log_1",
      label: "Log Pemindaian",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Forum yang dijaga Kael kini menjadi salah satu komunitas diskusi terbesar di kotanya, dengan ribuan anggota aktif. Sayangnya, semakin besar sebuah sistem, semakin menarik pula ia di mata penyerang serius." },
      { text: "Log sistem menunjukkan sesuatu yang berbeda dari biasanya: bukan percobaan login, melainkan ribuan permintaan aneh yang tampaknya sedang memetakan seluruh struktur server, subdomain, versi perangkat lunak yang dipakai, bahkan titik-titik yang jarang diperhatikan." },
      { text: "Ini bukan serangan brute force biasa. Ini adalah tahap pengintaian infrastruktur, penyerang sedang menyusun peta lengkap sebelum benar-benar melancarkan serangan besar-besaran." },
      { text: "Kael menyadari, jika ia membiarkan pemetaan ini selesai tanpa gangguan, penyerang akan tahu persis di mana titik paling lemah forum ini sebelum serangan sungguhan dimulai." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Mendeteksi dan memblokir pola pemindaian otomatis, sambil menyembunyikan detail infrastruktur yang tidak perlu terlihat publik.",
        points: 4,
        result: [
          { text: "Kael mengenali pola pemindaian itu dari kecepatan dan urutan permintaannya yang tidak wajar, lalu memblokir alamat-alamat yang terlibat." },
          { text: "Ia juga menyembunyikan detail teknis yang selama ini tanpa sadar terekspos ke publik, seperti versi perangkat lunak dan struktur subdomain internal." },
          { text: "Peta yang coba disusun penyerang menjadi jauh lebih buram, memperlambat dan mempersulit tahap serangan berikutnya secara signifikan." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mencatat aktivitas pemindaian tanpa memblokir atau menyembunyikan apa pun.",
        points: -1,
        result: [
          { text: "Kael mencatat aktivitas pemindaian itu di log, berniat menindaklanjutinya nanti." },
          { text: "Karena tidak ada tindakan langsung, penyerang leluasa menyelesaikan pemetaan infrastruktur forum tanpa hambatan apa pun." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena belum ada percobaan login yang benar-benar terjadi.",
        points: -3,
        result: [
          { text: "Kael menganggap pemindaian ini tidak berbahaya karena belum ada percobaan login yang sebenarnya." },
          { text: "Beberapa hari kemudian, serangan datang justru melalui titik paling lemah yang berhasil dipetakan penyerang selama masa pengintaian itu." },
        ],
      },
    ],
  },
};
