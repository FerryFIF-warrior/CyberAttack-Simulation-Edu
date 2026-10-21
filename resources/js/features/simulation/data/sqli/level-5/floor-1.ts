import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor1: FloorContent = {
  id: "sqli_level_5_floor_1",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 1,
  title: "Menenun Keamanan ke Dalam Setiap Baris Pengembangan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "archive_gate_1", icon: "gate", x: 80, y: 22, scale: 1.4 },
      { id: "scroll_1", icon: "scroll", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "sdlc_board_1",
      label: "Papan Alur Pengembangan Produk",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael kini memimpin keamanan produk di Arunika, perusahaan SaaS B2B yang menyimpan Gerbang Arsip data ratusan perusahaan klien, masing-masing dengan ruang data terpisah yang seharusnya tak pernah saling bersentuhan." },
      { text: "Selama ini, tim keamanan hanya diundang memeriksa produk menjelang peluncuran, ketika fitur sudah selesai dibangun dan jadwal rilis sudah diumumkan ke klien. Setiap kali Kael menemukan celah besar di tahap ini, perbaikannya selalu terasa seperti balapan melawan waktu yang sudah telanjur sempit." },
      { text: "Seorang pengembang senior mengeluh pelan di ruang rapat: 'Kalau kalian selalu menemukan masalah di akhir, kenapa tidak dari awal saja?' Pertanyaan itu menempel di kepala Kael lebih lama dari yang ia duga." },
      { text: "Arunika sedang merancang ulang keseluruhan proses pengembangan produknya untuk kuartal mendatang. Ini kesempatan Kael untuk mengubah posisi keamanan, dari penjaga gerbang di akhir perjalanan, menjadi bagian yang menyatu sejak langkah pertama dirancang." },
    ],
    question: "Bagaimana sebaiknya Kael mengubah posisi keamanan dalam proses pengembangan produk Arunika ke depan?",
    choices: [
      {
        id: "safe",
        label: "Menyusun pedoman keamanan dan sesi tinjauan desain sejak tahap perancangan fitur dimulai, bukan hanya di akhir, agar potensi celah akses data klien dipikirkan sebelum satu baris kode pun ditulis.",
        points: 3,
        result: [
          { text: "Kael mengusulkan agar setiap fitur baru yang menyentuh data klien melalui sesi tinjauan desain keamanan sejak tahap perancangan, jauh sebelum pengembangan dimulai." },
          { text: "Pedoman sederhana disusun: bagaimana isolasi ruang data antar-klien harus dijaga, pola akses mana yang aman digunakan, dan jalur mana yang berisiko membuka celah antar Gerbang Arsip klien yang berbeda." },
          { text: "Fitur-fitur baru mulai diluncurkan dengan jauh lebih sedikit temuan keamanan mendesak di menit-menit akhir, karena masalahnya sudah dipikirkan dan dicegah sejak rancangan awal." },
        ],
      },
      {
        id: "neutral",
        label: "Menambah jumlah pemeriksaan keamanan manual menjelang setiap peluncuran tanpa mengubah kapan keamanan dilibatkan dalam proses pengembangan.",
        points: -3,
        result: [
          { text: "Kael menambah jumlah pemeriksaan keamanan manual menjelang setiap peluncuran, berharap lebih banyak pemeriksaan di akhir akan menangkap lebih banyak masalah." },
          { text: "Beban kerja tim keamanan membengkak drastis, sementara akar masalahnya, keamanan yang baru dipikirkan di akhir, tidak pernah benar-benar berubah." },
          { text: "Tekanan jadwal rilis tetap memaksa sejumlah temuan keamanan diterima sebagai risiko sementara demi mengejar tenggat waktu peluncuran yang sudah diumumkan." },
        ],
      },
      {
        id: "risky",
        label: "Mempercayakan sepenuhnya kepada tim pengembang untuk menilai sendiri keamanan fitur yang mereka bangun, tanpa keterlibatan tim keamanan di tahap mana pun.",
        points: -5,
        result: [
          { text: "Demi mempercepat proses dan mengurangi beban tim keamanan, Kael mengusulkan tim pengembang menilai sendiri keamanan fitur mereka, tanpa keterlibatan tim keamanan di tahap mana pun." },
          { text: "Tanpa perspektif khusus keamanan, beberapa fitur baru yang dirilis ternyata memiliki asumsi isolasi data antar-klien yang keliru, celah yang baru disadari setelah produk sudah digunakan banyak klien." },
          { text: "Memperbaiki asumsi arsitektur yang sudah terlanjur dipakai banyak klien jauh lebih mahal dan berisiko dibanding jika ditemukan sejak tahap rancangan." },
        ],
      },
    ],
  },
};
