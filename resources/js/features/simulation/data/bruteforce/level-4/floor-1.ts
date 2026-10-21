import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor1: FloorContent = {
  id: "bruteforce_level_4_floor_1",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 1,
  title: "Pengintaian Pola Pertahanan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_1", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "chart_1", icon: "chart", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "threshold_log_1",
      label: "Log Ambang Batas Sistem",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Forum yang kini dikelola Kael telah melalui banyak serangan besar, dan pertahanannya semakin matang. Tapi minggu ini, log sistem menunjukkan pola yang berbeda dari biasanya, sesuatu yang terasa seperti sedang diuji diam-diam." },
      { text: "Beberapa percobaan login datang dalam jumlah yang sengaja dijaga tepat di bawah ambang rate limiting, empat percobaan, lalu berhenti sesaat sebelum batas lima tercapai, lalu mencoba lagi dari alamat lain dengan pola yang sama persis." },
      { text: "Ini bukan serangan yang berusaha membobol akun. Ini terlihat seperti seseorang sedang mempelajari persis di titik berapa sistem akan bereaksi, memetakan batas toleransi pertahanan sebelum serangan sesungguhnya dilancarkan." },
      { text: "Kael menyadari, jika pengintaian semacam ini dibiarkan selesai tanpa gangguan, penyerang akan tahu persis cara menghindari setiap alarm yang ada." },
    ],
    question: "Apa yang akan dilakukan Kael terhadap pola pengintaian ambang batas ini?",
    choices: [
      {
        id: "safe",
        label: "Menambahkan deteksi untuk pola percobaan yang konsisten berhenti tepat di bawah ambang batas, bukan hanya mendeteksi saat ambang batas terlampaui.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa sistem deteksi lama hanya bereaksi ketika ambang batas benar-benar terlampaui, padahal pola mencurigakan sudah terlihat jauh sebelum itu." },
          { text: "Ia menambahkan aturan baru: jika banyak alamat berbeda konsisten berhenti tepat di bawah ambang batas dengan pola waktu yang serupa, sistem akan menandainya sebagai pengintaian, meski belum ada satu pun yang melanggar batas." },
          { text: "Upaya memetakan toleransi sistem itu terdeteksi sejak dini, membuat penyerang kehilangan informasi yang mereka coba kumpulkan." },
        ],
      },
      {
        id: "neutral",
        label: "Menurunkan ambang batas rate limiting menjadi lebih ketat sebagai respons cepat.",
        points: -1,
        result: [
          { text: "Kael menurunkan ambang batas rate limiting menjadi lebih ketat, berharap itu cukup menghalangi pengintaian ini." },
          { text: "Penyerang hanya perlu menyesuaikan pola percobaannya mengikuti ambang batas baru, dan pengintaian tetap berjalan tanpa benar-benar terhenti." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena tidak satu pun percobaan yang benar-benar melanggar batas rate limiting.",
        points: -3,
        result: [
          { text: "Kael menganggap tidak ada yang perlu dikhawatirkan karena tidak satu pun percobaan melanggar ambang batas yang ada." },
          { text: "Beberapa hari kemudian, serangan sesungguhnya datang dengan pola yang sudah dirancang sempurna untuk menghindari setiap alarm yang berhasil dipetakan selama masa pengintaian itu." },
        ],
      },
    ],
  },
};
