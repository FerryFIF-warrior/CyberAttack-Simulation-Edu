import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor2: FloorContent = {
  id: "sqli_level_4_floor_2",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 2,
  title: "Injeksi Lewat Data yang Tampak Tidak Berbahaya",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_2", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_2", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "dropdown_form_1",
      label: "Formulir Pilihan Kategori",
      icon: "form",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael menguji formulir pencarian arsip yang memiliki kolom teks bebas, yang sudah divalidasi dengan sangat ketat sejak lama. Tapi ada satu bagian formulir yang selama ini tidak pernah ia curigai: kolom pilihan kategori arsip, berbentuk menu dropdown dengan opsi terbatas." },
      { text: "Tim pengembang selalu menganggap kolom dropdown aman karena penggunanya hanya bisa memilih dari opsi yang sudah disediakan, tidak bisa mengetik bebas seperti kolom teks lain yang selama ini jadi fokus pengujian." },
      { text: "Namun saat Kael memeriksa bagaimana data dikirim dari formulir itu ke server, ia menyadari sesuatu: nilai yang dikirim bukan teks pilihan yang terlihat di layar, melainkan sebuah kode angka tersembunyi di balik setiap opsi, dan kode angka itu dikirim langsung tanpa pemeriksaan tambahan di sisi server." },
      { text: "Karena dropdown dianggap 'pasti aman', tidak ada yang pernah memeriksa apakah nilai yang dikirim benar-benar dibatasi hanya pada opsi yang tersedia, atau bisa dimanipulasi sebelum dikirim." },
    ],
    question: "Bagaimana Kael menguji kemungkinan celah di balik kolom dropdown yang dianggap aman ini?",
    choices: [
      {
        id: "safe",
        label: "Memeriksa dan memvalidasi di sisi server bahwa nilai yang dikirim benar-benar hanya dari opsi yang sah, bukan mengandalkan batasan tampilan di sisi pengguna saja.",
        points: 3,
        result: [
          { text: "Kael membuktikan bahwa batasan pilihan di dropdown hanya berlaku di tampilan pengguna, sementara nilai yang benar-benar dikirim ke server bisa diubah sebelum sampai." },
          { text: "Ia merekomendasikan agar server selalu memvalidasi ulang nilai yang diterima, memastikan nilainya memang sesuai dengan salah satu opsi yang sah, bukan mempercayai apa pun yang dikirim hanya karena 'berasal dari dropdown'." },
          { text: "Tim pengembang memperbaiki validasi di sisi server, menutup celah yang selama ini tersembunyi di balik asumsi bahwa kolom pilihan pasti aman." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat temuan ini sebagai risiko rendah karena pengguna normal tidak akan pernah mengubah nilai dropdown secara manual.",
        points: -2,
        result: [
          { text: "Kael mencatat temuan ini sebagai risiko rendah, beralasan pengguna normal tidak akan pernah mencoba mengubah nilai dropdown secara manual." },
          { text: "Ia lupa bahwa keamanan tidak dirancang untuk pengguna normal saja, melainkan juga untuk mengantisipasi seseorang yang sengaja memanipulasi data sebelum dikirim." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya sepenuhnya karena kolom dropdown secara umum dianggap jauh lebih aman dibanding kolom teks bebas.",
        points: -3,
        result: [
          { text: "Kael mengabaikan sepenuhnya kolom dropdown ini, karena secara umum kolom semacam itu memang dianggap lebih aman dibanding kolom teks bebas." },
          { text: "Anggapan umum itu ternyata keliru untuk kasus ini, karena nilai sesungguhnya yang dikirim ke server tidak pernah benar-benar dibatasi." },
          { text: "Beberapa waktu kemudian, celah ini dimanfaatkan untuk menyisipkan nilai yang tidak pernah dimaksudkan muncul di daftar opsi resmi." },
        ],
      },
    ],
  },
};
