import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor3: FloorContent = {
  id: "sqli_level_5_floor_3",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 3,
  title: "Celah di Fondasi yang Dipinjam dari Luar",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "archive_gate_3", icon: "gate", x: 80, y: 22, scale: 1.4 },
      { id: "crate_1", icon: "crate", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "dependency_map_1",
      label: "Peta Komponen Pihak Ketiga",
      icon: "chart",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Sebuah buletin keamanan industri mendarat di kotak masuk Kael pagi itu: satu komponen pustaka pengolah data yang banyak dipakai aplikasi web di seluruh dunia ternyata memiliki celah serius yang bisa dimanfaatkan untuk menembus lapisan penyaringan data secara tidak terduga." },
      { text: "Jantung Kael berdegup cepat. Ia tahu persis, pustaka itu juga dipakai jauh di dalam salah satu lapisan fondasi produk Arunika, diwariskan dari komponen pihak ketiga yang dipasang bertahun-tahun lalu dan nyaris tidak pernah disentuh lagi sejak itu." },
      { text: "Masalahnya, tidak ada satu pun dokumentasi lengkap yang mencatat di mana saja pustaka itu benar-benar digunakan di seluruh produk Arunika yang sudah berkembang jauh lebih kompleks sejak pertama kali dipasang." },
      { text: "Buletin itu juga memperingatkan bahwa eksploitasi aktif terhadap celah ini sudah mulai terlihat di berbagai layanan lain, artinya waktu Kael untuk bertindak sangat terbatas." },
    ],
    question: "Bagaimana Kael menangani risiko dari komponen pihak ketiga yang rentan dan tersebar tak terlacak ini?",
    choices: [
      {
        id: "safe",
        label: "Segera memetakan seluruh penggunaan komponen rentan itu di seluruh produk secara sistematis, menerapkan mitigasi sementara di titik berisiko tinggi, lalu memperbarui komponennya secara menyeluruh dan terverifikasi.",
        points: 3,
        result: [
          { text: "Kael segera mengerahkan tim untuk memetakan secara sistematis seluruh titik di produk Arunika yang masih bergantung pada komponen rentan itu, tidak mengandalkan ingatan atau dokumentasi lama yang sudah usang." },
          { text: "Untuk titik-titik berisiko tinggi yang menyentuh data klien langsung, mitigasi sementara segera diterapkan sambil menunggu pembaruan komponen yang sudah diverifikasi aman selesai dipasang menyeluruh." },
          { text: "Arunika berhasil menutup celah ini sebelum ada eksploitasi nyata yang berhasil menyentuh data klien, berkat pemetaan sistematis yang tidak bergantung pada ingatan samar tentang arsitektur lama." },
        ],
      },
      {
        id: "neutral",
        label: "Memperbarui komponen itu hanya di produk utama yang paling banyak digunakan klien, tanpa memeriksa produk-produk pendamping yang lebih kecil.",
        points: -3,
        result: [
          { text: "Karena keterbatasan waktu, Kael memprioritaskan pembaruan komponen hanya di produk utama yang paling banyak digunakan klien, menunda pemeriksaan produk-produk pendamping yang dianggap lebih kecil risikonya." },
          { text: "Beberapa bulan kemudian, ternyata salah satu produk pendamping yang terlewat juga memiliki akses ke sebagian data klien yang sama, dan komponen rentan di dalamnya tidak pernah diperbarui." },
          { text: "Celah yang terlewat itu akhirnya ditemukan oleh pihak luar, bukan oleh tim Kael sendiri." },
        ],
      },
      {
        id: "risky",
        label: "Menunggu laporan resmi dari penyedia pustaka tentang produk mana saja yang terdampak, alih-alih memetakan sendiri secara proaktif.",
        points: -5,
        result: [
          { text: "Kael memilih menunggu laporan resmi dari penyedia pustaka yang menjelaskan produk mana saja yang mungkin terdampak, dibanding memetakan sendiri secara proaktif dengan sumber daya internal." },
          { text: "Laporan resmi itu, ketika akhirnya datang, bersifat umum dan tidak mencakup cara penggunaan khusus yang sudah dimodifikasi tim Arunika bertahun-tahun lalu, sehingga tidak banyak membantu." },
          { text: "Waktu berharga yang hilang karena menunggu itu membuat jendela mitigasi menyempit drastis, tepat ketika eksploitasi aktif mulai menyebar luas di luar sana." },
        ],
      },
    ],
  },
};
