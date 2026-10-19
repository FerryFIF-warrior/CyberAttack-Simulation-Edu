import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel2Floor2: FloorContent = {
  id: "sqli_level_2_floor_2",
  simulationId: "sqli",
  levelNumber: 2,
  floorNumber: 2,
  title: "Tahap 2: Menyambung Rak yang Terpisah",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_2", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_2", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "search_box_2",
      label: "Kotak Pencarian Arsip",
      icon: "search",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dengan izin pemilik arsip, Kael melangkah lebih jauh. Ia ingin membuktikan seberapa jauh celah di kotak pencarian ini bisa dimanfaatkan, apakah hanya menampilkan pesan error, atau benar-benar bisa menyingkap data dari rak lain yang seharusnya terpisah." },
      { text: "Kael memperhatikan bahwa hasil pencarian arsip ditampilkan dalam satu daftar yang tersusun rapi, kolom demi kolom. Ia menduga, jika daftar itu bisa 'disambung' dengan daftar lain dari rak yang berbeda, bukan tidak mungkin informasi dari balik gerbang utama bisa ikut terbawa." },
      { text: "Ini adalah teknik yang lebih berani daripada sekadar membuat penjaga bingung: menyusun permintaan sedemikian rupa sehingga dua daftar yang terpisah tampak seolah menjadi satu daftar yang sama." },
      { text: "Jika berhasil, Kael bisa membuktikan bahwa data sensitif di balik gerbang utama ternyata masih bisa bocor lewat kotak pencarian publik ini." },
    ],
    question: "Bagaimana Kael mencoba menyambungkan dua daftar arsip yang seharusnya terpisah?",
    choices: [
      {
        id: "safe",
        label: "Menyusun permintaan pencarian yang menggabungkan dua daftar berbeda, lalu segera mencatat dan menutup aksesnya begitu terbukti.",
        points: 4,
        result: [
          { text: "Kael menyusun permintaan pencarian khusus yang menyambungkan daftar katalog publik dengan daftar anggota di balik gerbang utama." },
          { text: "Hasil pencarian menampilkan baris tambahan yang janggal, berisi potongan data anggota yang seharusnya tidak pernah muncul di sini." },
          { text: "Begitu terbukti, Kael langsung menutup sesi pengujian dan mencatat seluruh langkah untuk dilaporkan, tanpa menyalin data lebih jauh dari yang dibutuhkan sebagai bukti." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba menyambungkan daftar, tapi berhenti begitu melihat satu baris data muncul tanpa menyelidikinya lebih jauh.",
        points: 1,
        result: [
          { text: "Kael berhasil menyambungkan sebagian daftar, dan satu baris data asing sempat muncul." },
          { text: "Ia berhenti di situ tanpa benar-benar memastikan seberapa luas data yang bisa tersingkap, membuat buktinya kurang meyakinkan untuk laporan nanti." },
        ],
      },
      {
        id: "risky",
        label: "Menyalin seluruh data anggota yang berhasil tersingkap untuk 'dokumentasi pribadi' sebelum melapor.",
        points: -2,
        result: [
          { text: "Kael tergoda menyalin seluruh data anggota yang berhasil tersingkap, beralasan ingin dokumentasi pribadi yang lengkap." },
          { text: "Tindakan menyalin data melebihi apa yang dibutuhkan sebagai bukti ini melanggar batas wewenang pengujian yang telah disepakati." },
          { text: "Pemilik arsip mempertanyakan etika pengujian Kael, meski celahnya nyata, caranya menangani bukti dianggap tidak profesional." },
        ],
      },
    ],
  },
};
