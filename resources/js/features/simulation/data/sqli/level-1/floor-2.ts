import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel1Floor2: FloorContent = {
  id: "sqli_level_1_floor_2",
  simulationId: "sqli",
  levelNumber: 1,
  floorNumber: 2,
  title: "Tahap 2: Membuktikan Celah Deklarasi",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_3", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "pillar_4", icon: "pillar", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "gate_2",
      label: "Gerbang Arsip",
      icon: "gate",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dengan celah tadi tercatat, Kael melapor sebentar kepada pemilik arsip bahwa gerbang tampaknya tidak memeriksa bentuk formulir dengan ketat. Pemilik meminta Kael membuktikan seberapa jauh celah itu bisa dimanfaatkan, masih dalam lingkup pengujian resmi." },
      { text: "Kael memperhatikan cara kerja penjaga lebih dekat: penjaga membandingkan nama dan kata sandi yang dituliskan tamu dengan satu baris aturan di buku besar, lalu mengizinkan masuk jika keduanya cocok." },
      { text: "Karena formulir tidak diperiksa bentuknya, Kael menyadari ia bisa menyisipkan sebuah pernyataan tambahan yang selalu dianggap benar oleh penjaga, membuat aturan pencocokan itu kehilangan maknanya." },
      { text: "Ini adalah titik krusial: jika berhasil, siapa pun bisa masuk seolah-olah sudah terdaftar, tanpa benar-benar mengetahui nama atau kata sandi anggota mana pun." },
    ],
    question: "Bagaimana Kael membuktikan celah ini kepada pemilik arsip?",
    choices: [
      {
        id: "safe",
        label: "Menyisipkan pernyataan tambahan yang selalu bernilai benar di kolom nama, lalu segera mencatat hasilnya untuk dilaporkan.",
        points: 4,
        result: [
          { text: "Kael menuliskan deklarasi yang disusun sedemikian rupa sehingga pernyataan pembandingnya selalu dianggap benar oleh penjaga, apa pun isi kata sandi yang ditulis." },
          { text: "Penjaga langsung membukakan gerbang, mengira Kael adalah anggota pertama yang terdaftar di buku besar." },
          { text: "Kael segera mencatat langkah persis yang ia lakukan dan menutup sesi pengujian, lalu melaporkannya kepada pemilik arsip sebagai bukti celah nyata." },
        ],
      },
      {
        id: "neutral",
        label: "Menyisipkan pernyataan sederhana yang hanya membuka akses sebagai anggota biasa.",
        points: 1,
        result: [
          { text: "Kael mencoba deklarasi yang lebih sederhana, dan berhasil masuk, tetapi hanya dengan hak akses anggota biasa." },
          { text: "Buktinya berhasil, meski kurang meyakinkan karena tidak menunjukkan seberapa luas celah itu bisa dimanfaatkan." },
        ],
      },
      {
        id: "risky",
        label: "Menuliskan deklarasi yang memerintahkan seluruh buku besar anggota dihapus, untuk 'membuktikan' celah secara dramatis.",
        points: -2,
        result: [
          { text: "Kael tergoda membuktikan celah itu secara dramatis dengan deklarasi yang menghapus seluruh buku besar anggota." },
          { text: "Buku besar itu benar-benar hilang, dan seluruh catatan anggota arsip ikut lenyap." },
          { text: "Ini bukan lagi pengujian keamanan, melainkan kerusakan nyata yang melanggar izin yang diberikan pemilik arsip." },
        ],
      },
    ],
  },
};
