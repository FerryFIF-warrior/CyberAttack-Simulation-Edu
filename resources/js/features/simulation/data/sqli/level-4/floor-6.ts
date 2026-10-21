import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor6: FloorContent = {
  id: "sqli_level_4_floor_6",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 6,
  title: "Celah di Fitur Aman Buatan Sendiri",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_6", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "workbench_1", icon: "workbench", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "custom_filter_panel_1",
      label: "Penyaring Buatan Sendiri",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Saat menelusuri kode sistem lebih dalam, Kael menemukan sesuatu yang menarik perhatiannya: alih-alih menggunakan metode standar yang sudah teruji untuk memeriksa input, salah satu formulir ternyata memakai penyaring buatan sendiri, ditulis khusus oleh tim pengembang bertahun-tahun lalu." },
      { text: "Penyaring buatan sendiri itu terlihat cukup rumit, mencoba memblokir berbagai macam pola berbahaya dengan daftar kata dan simbol yang dianggap mencurigakan." },
      { text: "Kael menguji penyaring itu dengan berbagai teknik yang sudah ia kenal, dan sebagian besar memang berhasil diblokir dengan baik. Tapi ia penasaran, mengapa tim dulu memilih membuat penyaring sendiri alih-alih memakai metode standar yang sudah banyak diuji oleh komunitas luas." },
      { text: "Setelah mencoba kombinasi yang sedikit tidak biasa, sesuatu yang jarang dipikirkan pembuat penyaring itu, Kael menemukan satu pola yang berhasil lolos, sesuatu yang seharusnya sudah lama tertutup jika sistem ini memakai metode standar yang teruji, bukan solusi buatan sendiri yang penuh asumsi." },
    ],
    question: "Bagaimana Kael menyikapi temuan celah di penyaring buatan sendiri ini?",
    choices: [
      {
        id: "safe",
        label: "Melaporkan celah spesifiknya, sekaligus merekomendasikan mengganti penyaring buatan sendiri dengan metode standar yang sudah teruji luas oleh komunitas keamanan.",
        points: 3,
        result: [
          { text: "Kael melaporkan pola spesifik yang berhasil melewati penyaring buatan sendiri itu, lengkap dengan penjelasan mengapa celah itu bisa terjadi." },
          { text: "Ia juga merekomendasikan langkah yang lebih mendasar: mengganti penyaring buatan sendiri dengan metode standar yang sudah diuji secara luas oleh komunitas keamanan selama bertahun-tahun, bukan terus menambal solusi buatan sendiri satu per satu." },
          { text: "Tim pengembang setuju dan mengganti penyaring lama itu, menutup bukan hanya celah yang ditemukan Kael, tapi juga potensi celah lain yang mungkin belum pernah diuji sama sekali." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya menambal pola spesifik yang berhasil ditemukan, tanpa menyarankan penggantian metode secara menyeluruh.",
        points: -1,
        result: [
          { text: "Kael hanya melaporkan dan meminta tim menambal pola spesifik yang berhasil ia temukan hari ini." },
          { text: "Penyaring buatan sendiri itu tetap dipertahankan, dengan segala asumsi dan celah tersembunyi lain yang mungkin belum pernah diuji secara menyeluruh." },
        ],
      },
      {
        id: "risky",
        label: "Menganggap penyaring ini sudah cukup baik karena berhasil memblokir sebagian besar teknik yang dicoba Kael.",
        points: -2,
        result: [
          { text: "Kael menganggap penyaring buatan sendiri ini sudah cukup baik, karena berhasil memblokir sebagian besar teknik yang ia coba." },
          { text: "Ia tidak menyadari bahwa 'sebagian besar berhasil diblokir' tidak sama dengan 'benar-benar aman', terutama untuk solusi buatan sendiri yang belum pernah diuji seluas metode standar yang sudah teruji komunitas." },
          { text: "Celah yang tersisa di penyaring itu tetap terbuka, menunggu ditemukan oleh pihak yang mungkin tidak akan melaporkannya sebaik Kael." },
        ],
      },
    ],
  },
};
