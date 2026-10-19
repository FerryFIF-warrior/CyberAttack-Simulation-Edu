import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel2Floor5: FloorContent = {
  id: "bruteforce_level_2_floor_5",
  simulationId: "bruteforce",
  levelNumber: 2,
  floorNumber: 5,
  title: "Ujian Akhir: Gelombang Serangan Senyap",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "flag_1", icon: "flag", x: 80, y: 22, scale: 1.4 },
      { id: "monitor_5", icon: "monitor", x: 15, y: 28, scale: 1 },
      { id: "lamp_5", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "dashboard_panel_2",
      label: "Dasbor Pemantauan Utama",
      icon: "dashboard",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Tengah malam, dasbor pemantauan yang baru saja Kael aktifkan tiba-tiba menyala merah. Bukan satu pola serangan, tapi tiga sekaligus: credential stuffing dari data bocoran, password spraying ke banyak akun, dan percobaan akses lewat endpoint lama yang jarang dipantau." },
      { text: "Penyerang di balik ini tampaknya sudah mempelajari semua pertahanan forum selama ini, dan mencoba menyerang dari tiga arah bersamaan, berharap setidaknya satu jalur berhasil menembus sebelum Kael sempat bereaksi." },
      { text: "Notifikasi terus berdatangan ke layarnya, detik demi detik terasa menegangkan. Ini adalah ujian sesungguhnya bagi semua yang telah Kael pelajari dan bangun selama ini." },
      { text: "Kael menarik napas dalam, mengingat setiap pelajaran dari serangan-serangan sebelumnya, lalu mulai bergerak." },
    ],
    question: "Bagaimana Kael menghadapi gelombang serangan tiga arah ini?",
    choices: [
      {
        id: "safe",
        label: "Menjalankan seluruh lapisan pertahanan sekaligus: deteksi pola lintas-akun, perlindungan menyeluruh di semua endpoint, dan respons cepat dari peringatan dini.",
        points: 4,
        result: [
          { text: "Kael memanfaatkan dasbor pemantauan untuk mengidentifikasi ketiga pola serangan secara bersamaan." },
          { text: "Perlindungan lintas-akun yang telah ia pasang menahan password spraying, penguncian endpoint lama menahan jalur tersembunyi, dan peringatan dini membuatnya bisa merespons dalam hitungan menit, bukan jam." },
          { text: "Satu per satu jalur serangan itu tertutup sebelum sempat membobol satu akun pun. Gelombang serangan tiga arah itu akhirnya berhenti total." },
          { text: "Level 2 Brute Force selesai. Forum berdiri lebih kokoh dari sebelumnya, dengan Kael yang kini benar-benar memahami bagaimana menghadapi serangan yang bersembunyi di balik celah-celah kecil." },
        ],
      },
      {
        id: "neutral",
        label: "Fokus menahan satu jalur serangan yang terlihat paling berbahaya, mengabaikan dua lainnya untuk sementara.",
        points: 1,
        result: [
          { text: "Kael memilih fokus menahan satu jalur serangan yang menurutnya paling berbahaya." },
          { text: "Jalur itu berhasil ditahan, tetapi dua jalur lainnya sempat menembus beberapa akun sebelum akhirnya tertangani belakangan." },
        ],
      },
      {
        id: "risky",
        label: "Mematikan sementara seluruh sistem login forum agar serangan berhenti total.",
        points: -2,
        result: [
          { text: "Dalam tekanan, Kael mematikan seluruh sistem login forum, berharap itu menghentikan ketiga serangan sekaligus." },
          { text: "Serangan memang berhenti, tapi seluruh anggota forum yang sah juga ikut terkunci keluar di tengah malam." },
          { text: "Pemilik forum kecewa, forum yang seharusnya tetap bisa diakses justru lumpuh total akibat keputusan terburu-buru itu." },
        ],
      },
    ],
  },
};
