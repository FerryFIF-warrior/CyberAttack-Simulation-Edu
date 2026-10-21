import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel3Floor1: FloorContent = {
  id: "auth_level_3_floor_1",
  simulationId: "auth",
  levelNumber: 3,
  floorNumber: 1,
  title: "Pengintaian Rantai Kepercayaan",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_1", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "chain_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "connection_map_1",
      label: "Peta Koneksi Layanan",
      icon: "map",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Forum yang dulu dijaga Kael kini telah berkembang menjadi platform komunitas besar, dengan fitur 'Masuk dengan Akun Lain', memungkinkan anggota login memakai akun dari beberapa layanan mitra tanpa perlu mendaftar ulang." },
      { text: "Pemilik platform meminta Kael menguji seluruh rantai kepercayaan ini sebelum fitur itu diperluas ke lebih banyak layanan mitra." },
      { text: "Kael membuka peta koneksi layanan, dan menyadari betapa rumitnya rantai ini: platform mempercayai layanan mitra A, layanan mitra A mempercayai penyedia identitas B, dan penyedia identitas B lagi-lagi terhubung ke beberapa layanan lain yang lebih kecil." },
      { text: "Satu hal membuatnya waspada: semakin panjang rantai kepercayaan ini, semakin sulit memastikan bahwa setiap mata rantai benar-benar seaman yang diasumsikan." },
    ],
    question: "Langkah apa yang akan Kael lakukan untuk memetakan risiko rantai kepercayaan ini?",
    choices: [
      {
        id: "safe",
        label: "Memetakan seluruh rantai kepercayaan secara menyeluruh, mencatat setiap layanan yang terlibat beserta tingkat keamanannya masing-masing.",
        points: 4,
        result: [
          { text: "Kael menyusun peta lengkap seluruh rantai kepercayaan, dari platform utama hingga layanan mitra terkecil yang terhubung di ujung rantai." },
          { text: "Ia mencatat tingkat keamanan masing-masing layanan, menandai mana yang sudah diaudit dengan baik dan mana yang belum pernah diperiksa sama sekali." },
          { text: "Dari peta ini, Kael menemukan satu layanan kecil di ujung rantai yang pengamanannya jauh lebih lemah dibanding layanan lain, titik yang paling berisiko dijadikan jalan masuk." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya memeriksa layanan mitra utama yang paling sering digunakan anggota.",
        points: -1,
        result: [
          { text: "Kael hanya memeriksa layanan mitra utama yang paling sering digunakan anggota untuk login." },
          { text: "Layanan-layanan kecil di ujung rantai yang jarang digunakan tidak pernah tersentuh pemeriksaan, padahal justru di situlah biasanya pengamanan paling lemah berada." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikan pemetaan ini karena rantainya terlalu rumit untuk ditelusuri satu per satu.",
        points: -3,
        result: [
          { text: "Kael menganggap rantai kepercayaan ini terlalu rumit untuk dipetakan secara menyeluruh dan memilih melewatkannya." },
          { text: "Tanpa pemetaan yang jelas, ia tidak akan pernah tahu di titik mana sebenarnya rantai ini paling rapuh sampai masalah benar-benar terjadi." },
        ],
      },
    ],
  },
};
