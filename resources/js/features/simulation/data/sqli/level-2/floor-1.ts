import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel2Floor1: FloorContent = {
  id: "sqli_level_2_floor_1",
  simulationId: "sqli",
  levelNumber: 2,
  floorNumber: 1,
  title: "Tahap 1: Jendela Baru di Balik Rak Arsip",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_1", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_1", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "search_box_1",
      label: "Kotak Pencarian Arsip",
      icon: "search",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Gerbang Arsip Kota kini jauh lebih kuat berkat laporan Kael tahun lalu. Namun pemilik arsip baru saja menambahkan fitur baru: kotak pencarian katalog, agar pengunjung bisa mencari judul arsip tanpa harus login dulu." },
      { text: "Kael diminta menguji fitur baru ini sebelum diluncurkan resmi. Ia tahu betul, setiap jendela baru yang dibuka ke publik bisa jadi celah baru yang belum pernah diuji sebelumnya." },
      { text: "Saat mencoba mencari judul sembarangan, Kael memperhatikan sesuatu: hasil pencarian menampilkan detail arsip lengkap dengan nomor rak dan kode penyimpanan, informasi yang seharusnya hanya terlihat oleh petugas arsip, bukan pengunjung umum." },
      { text: "Kotak pencarian ini rupanya terhubung langsung ke data yang sama dengan yang dulu dilindungi gerbang utama. Jika kotak ini juga tidak memeriksa bentuk tulisan pengunjung dengan ketat, celah lama bisa muncul kembali lewat pintu yang berbeda." },
    ],
    question: "Langkah apa yang akan Kael lakukan untuk menguji kotak pencarian ini?",
    choices: [
      {
        id: "safe",
        label: "Menguji kotak pencarian dengan tanda baca tidak wajar, seperti yang dulu membongkar celah di gerbang utama.",
        points: 4,
        result: [
          { text: "Kael mencoba memasukkan satu tanda kutip yang diletakkan tidak pada tempatnya ke kotak pencarian, persis seperti pengujian pertamanya dulu di gerbang utama." },
          { text: "Sistem pencarian langsung menampilkan pesan kesalahan yang sama anehnya, tanda bahwa kotak ini juga tidak memeriksa bentuk tulisan dengan ketat." },
          { text: "Kael mencatat temuan ini: fitur baru ternyata mewarisi kelemahan lama yang belum pernah diperbaiki di jalur yang berbeda." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mencoba kata kunci pencarian yang wajar untuk melihat bagaimana hasilnya ditampilkan.",
        points: 1,
        result: [
          { text: "Kael mencoba beberapa kata kunci pencarian yang wajar dan memperhatikan bagaimana hasilnya disusun." },
          { text: "Ia mendapat gambaran umum tentang tampilan fitur ini, tapi belum benar-benar menguji apakah kotak pencarian memeriksa inputnya dengan ketat atau tidak." },
        ],
      },
      {
        id: "risky",
        label: "Langsung mencoba menyingkap seluruh data arsip dari kotak pencarian tanpa pengujian awal.",
        points: 0,
        result: [
          { text: "Kael langsung mencoba teknik lanjutan tanpa memahami dulu bagaimana kotak pencarian ini bekerja." },
          { text: "Sistem hanya menampilkan pesan error umum yang tidak memberi petunjuk apa pun." },
          { text: "Kael harus mengulang dari pengujian paling dasar, kehilangan waktu berharga di awal pengujian." },
        ],
      },
    ],
  },
};
