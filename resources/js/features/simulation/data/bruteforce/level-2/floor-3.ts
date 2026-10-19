import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel2Floor3: FloorContent = {
  id: "bruteforce_level_2_floor_3",
  simulationId: "bruteforce",
  levelNumber: 2,
  floorNumber: 3,
  title: "Pintu Belakang yang Terlupakan",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_3", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "monitor_3", icon: "monitor", x: 15, y: 28, scale: 1 },
      { id: "lamp_3", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "api_panel_1",
      label: "Panel Endpoint API",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dua serangan berturut-turut membuat Kael waspada penuh. Ia mulai memeriksa seluruh sistem forum lebih menyeluruh, bukan hanya form login utama yang selama ini jadi fokusnya." },
      { text: "Saat menelusuri daftar endpoint API forum, satu baris membuatnya terdiam: ada jalur API lama untuk aplikasi mobile yang dulu pernah dibuat, dan jalur itu masih aktif, tapi tidak pernah diberi rate limiting maupun CAPTCHA seperti form login utama." },
      { text: "Endpoint itu nyaris terlupakan, tersembunyi dari halaman utama, tapi tetap bisa diakses langsung oleh siapa pun yang tahu alamatnya." },
      { text: "Kael menyadari, selama ini mungkin saja ada yang sudah menyerang lewat pintu belakang ini, jauh sebelum pertahanan di form login utama pernah diuji." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menonaktifkan atau menerapkan perlindungan yang sama pada seluruh endpoint lama yang masih aktif.",
        points: 4,
        result: [
          { text: "Kael memeriksa seluruh endpoint API forum satu per satu, termasuk yang sudah lama tidak digunakan." },
          { text: "Endpoint lama yang tidak lagi dibutuhkan ia nonaktifkan, sementara yang masih dipakai ia lengkapi dengan rate limiting dan pemantauan yang sama seperti form login utama." },
          { text: "Jalur serangan tersembunyi itu kini tertutup rapat, tidak ada lagi pintu belakang yang luput dari pengawasan." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mencatat temuan ini untuk ditinjau nanti, tanpa menutupnya segera.",
        points: 1,
        result: [
          { text: "Kael mencatat temuan endpoint lama itu di daftar tugas untuk ditinjau nanti." },
          { text: "Masalahnya belum terselesaikan, dan jalur rentan itu tetap terbuka selama catatan itu belum ditindaklanjuti." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena endpoint itu tidak pernah dipromosikan di halaman utama forum.",
        points: -2,
        result: [
          { text: "Kael menganggap endpoint itu aman karena tidak pernah terlihat dari halaman utama forum." },
          { text: "Ia lupa bahwa tersembunyi bukan berarti tidak bisa ditemukan oleh penyerang yang cukup teliti menelusuri kode aplikasi lama." },
          { text: "Beberapa hari kemudian, laporan masuk bahwa sejumlah akun diakses lewat jalur yang sama sekali tidak tercatat di log form login utama." },
        ],
      },
    ],
  },
};
