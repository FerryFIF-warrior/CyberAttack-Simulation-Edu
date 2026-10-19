import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel2Floor5: FloorContent = {
  id: "sqli_level_2_floor_5",
  simulationId: "sqli",
  levelNumber: 2,
  floorNumber: 5,
  title: "Ujian Akhir: Laporan Rantai Kebocoran Arsip",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_5", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "search_box_5",
      label: "Meja Laporan Akhir",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pemilik arsip memanggil Kael untuk sesi terakhir. Temuan soal arsip terlarang membuat mereka cemas: bagaimana mungkin fitur pencarian sederhana bisa menjangkau sejauh itu?" },
      { text: "Kael mengingat kembali seluruh rantai pengujian: jendela baru di kotak pencarian yang mewarisi celah lama, penyambungan dua daftar berbeda, teknik membaca dari keheningan setelah pesan error disembunyikan, hingga terbukti menjangkau arsip terlarang." },
      { text: "Pemilik arsip bertanya, apa akar masalah sesungguhnya di balik semua ini, bukan sekadar menambal satu per satu celah yang ditemukan." },
      { text: "Kael menatap catatannya sejenak, lalu mulai menyusun kesimpulan yang akan menentukan bagaimana arsip ini dibangun ulang ke depannya." },
    ],
    question: "Apa akar masalah yang akan Kael sampaikan dalam laporan akhirnya?",
    choices: [
      {
        id: "safe",
        label: "Setiap jalur yang menyentuh data, bukan hanya gerbang login, harus memproses masukan pengunjung lewat prosedur baku yang sama ketatnya, tanpa kecuali.",
        points: 4,
        result: [
          { text: "Kael menjelaskan bahwa akar masalahnya bukan satu fitur yang rusak, melainkan asumsi keliru bahwa hanya gerbang login yang perlu dijaga ketat." },
          { text: "Ia merekomendasikan agar setiap jalur yang menyentuh data, termasuk kotak pencarian dan fitur publik lainnya, memproses masukan pengunjung lewat prosedur baku yang sama ketatnya, tanpa kecuali." },
          { text: "Pemilik arsip menerapkan prosedur itu ke seluruh sistem, bukan hanya menambal satu kotak pencarian, memastikan celah serupa tidak muncul lagi lewat jalur lain di masa depan." },
          { text: "Level 2 SQL Injection selesai. Kael kini memahami bahwa keamanan sejati berarti memeriksa seluruh pintu, bukan hanya pintu yang paling sering digunakan." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan perbaikan hanya untuk kotak pencarian yang diuji, tanpa menyinggung fitur lain.",
        points: 1,
        result: [
          { text: "Kael hanya merekomendasikan perbaikan untuk kotak pencarian yang menjadi fokus pengujiannya." },
          { text: "Kotak pencarian itu memang diperbaiki, tetapi fitur publik lain yang mungkin punya kelemahan serupa tidak pernah ditinjau ulang." },
        ],
      },
      {
        id: "risky",
        label: "Menyarankan menutup fitur pencarian publik sepenuhnya daripada memperbaikinya.",
        points: -2,
        result: [
          { text: "Merasa lelah dengan rentetan temuan, Kael menyarankan agar fitur pencarian publik ditutup saja sepenuhnya." },
          { text: "Pemilik arsip kecewa, karena fitur itu sebenarnya berguna bagi pengunjung, dan masalah sesungguhnya bukan pada fiturnya, melainkan cara data itu diproses." },
          { text: "Forum kehilangan satu fitur bermanfaat tanpa benar-benar menyelesaikan akar masalah keamanannya." },
        ],
      },
    ],
  },
};
