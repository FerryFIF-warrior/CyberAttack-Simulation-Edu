import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel2Floor3: FloorContent = {
  id: "sqli_level_2_floor_3",
  simulationId: "sqli",
  levelNumber: 2,
  floorNumber: 3,
  title: "Tahap 3: Membaca dari Keheningan",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_3", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_3", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "search_box_3",
      label: "Kotak Pencarian Arsip",
      icon: "search",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah laporan Kael, pemilik arsip menambal celah penggabungan daftar, dan kini pesan kesalahan yang dulu begitu rinci telah disembunyikan sepenuhnya. Apa pun yang Kael coba, kotak pencarian hanya menampilkan satu pesan datar: Terjadi kesalahan." },
      { text: "Kael menghela napas. Tanpa pesan error yang rinci, ia tidak bisa lagi membaca celah secara langsung seperti sebelumnya. Tapi ia belum menyerah, ada satu kemungkinan lain yang jarang disadari orang." },
      { text: "Ia memperhatikan satu hal kecil: ketika permintaannya benar, halaman memuat sedikit lebih lama dan menampilkan hasil kosong dengan cara yang sedikit berbeda dibanding ketika permintaannya salah." },
      { text: "Perbedaan sekecil itu, jeda waktu dan tampilan hasil kosong, bisa jadi satu-satunya petunjuk yang tersisa. Kael harus belajar membaca jawaban dari keheningan sistem, bukan dari pesan kesalahan yang sudah disembunyikan." },
    ],
    question: "Bagaimana Kael mencoba menggali informasi tanpa pesan kesalahan yang rinci?",
    choices: [
      {
        id: "safe",
        label: "Mengajukan pertanyaan bernilai benar-salah secara bertahap, lalu membandingkan perbedaan jeda waktu dan tampilan hasil untuk menyimpulkan jawabannya.",
        points: 4,
        result: [
          { text: "Kael menyusun serangkaian permintaan yang masing-masing hanya bisa dijawab benar atau salah oleh sistem, seperti menebak satu per satu huruf dari balik tirai." },
          { text: "Ia mencatat setiap perbedaan jeda waktu dan tampilan hasil kosong, lalu menyusunnya menjadi kesimpulan yang masuk akal." },
          { text: "Perlahan namun pasti, Kael berhasil memetakan pola struktur data arsip hanya dari keheningan sistem, membuktikan bahwa menyembunyikan pesan error saja tidak sepenuhnya menutup celah." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba berkali-kali secara acak tanpa mencatat pola jeda waktu maupun hasilnya.",
        points: 1,
        result: [
          { text: "Kael mencoba berkali-kali secara acak, berharap menemukan sesuatu secara kebetulan." },
          { text: "Tanpa mencatat pola jeda waktu maupun perbedaan hasil, ia tidak bisa menyimpulkan apa pun yang berguna dari percobaan-percobaannya." },
        ],
      },
      {
        id: "risky",
        label: "Mengirim ribuan permintaan secara beruntun tanpa jeda untuk mempercepat proses menebak.",
        points: -2,
        result: [
          { text: "Tidak sabar, Kael mengirim ribuan permintaan secara beruntun tanpa jeda sama sekali." },
          { text: "Sistem mendeteksi lonjakan permintaan yang tidak wajar dan langsung memblokir akses Kael ke kotak pencarian." },
          { text: "Pengujian pun terhenti total, dan Kael harus menunggu sebelum bisa melanjutkan dengan cara yang lebih hati-hati." },
        ],
      },
    ],
  },
};
