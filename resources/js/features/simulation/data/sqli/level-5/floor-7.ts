import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor7: FloorContent = {
  id: "sqli_level_5_floor_7",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 7,
  title: "Ujian Akhir: Keputusan Arsitektur Jangka Panjang",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-indigo-200 to-slate-400",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_final_3", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_final_3", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_final_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "roadmap_table_1",
      label: "Meja Peta Jalan Produk Jangka Panjang",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dua tahun bekerja di Arunika telah mengubah Kael dari pemeriksa gerbang di akhir proses menjadi arsitek kepercayaan yang dihormati di seluruh perusahaan. Namun keputusan terbesar dalam kariernya di sini justru datang bukan dari insiden, melainkan dari pertumbuhan bisnis itu sendiri." },
      { text: "Arunika baru saja menandatangani kontrak dengan klien perusahaan multinasional raksasa, yang menuntut satu basis data benar-benar terpisah secara fisik khusus untuk mereka, bukan sekadar terisolasi secara logis seperti klien-klien lain." },
      { text: "Tim rekayasa memperingatkan Kael: membangun infrastruktur terpisah khusus untuk satu klien akan menciptakan dua arsitektur berbeda yang harus dipelihara, diperbarui, dan diamankan secara paralel selamanya, meningkatkan kompleksitas dan risiko kesalahan manusia di masa depan." },
      { text: "Namun menolak permintaan itu berarti kehilangan kontrak bernilai sangat besar yang sudah dinanti-nantikan tim bisnis selama berbulan-bulan. Direksi menyerahkan keputusan teknis akhir ini sepenuhnya kepada Kael, sebuah keputusan yang akan membentuk arah arsitektur Arunika untuk bertahun-tahun mendatang." },
    ],
    question: "Keputusan arsitektur jangka panjang seperti apa yang sebaiknya direkomendasikan Kael untuk menyeimbangkan permintaan klien raksasa ini dengan keberlanjutan keamanan produk secara keseluruhan?",
    choices: [
      {
        id: "safe",
        label: "Merancang model isolasi berjenjang yang bisa menawarkan pemisahan fisik sebagai opsi standar bagi klien tertentu, dibangun di atas fondasi keamanan yang sama dan tetap mudah dipelihara, bukan arsitektur terpisah yang unik sekali pakai.",
        points: 2,
        result: [
          { text: "Kael mengusulkan merancang model isolasi berjenjang sebagai kemampuan standar produk, bukan solusi khusus sekali pakai untuk satu klien, dengan pemisahan fisik sebagai salah satu opsi yang dibangun di atas fondasi keamanan dan pemeliharaan yang sama." },
          { text: "Investasi awal untuk merancang kemampuan ini lebih besar dibanding sekadar membangun satu infrastruktur terpisah secara terburu-buru, tapi hasilnya bisa dipakai untuk klien besar mana pun di masa depan tanpa menambah kompleksitas pemeliharaan yang terus bertambah." },
          { text: "Level 5 SQL Injection selesai. Kontrak klien raksasa itu berhasil didapat, dan beberapa bulan kemudian kemampuan isolasi berjenjang yang sama menarik dua klien besar lain, membuktikan bahwa keputusan yang mempertimbangkan keberlanjutan jangka panjang justru membuka peluang bisnis baru, bukan menghambatnya." },
        ],
      },
      {
        id: "neutral",
        label: "Membangun infrastruktur terpisah khusus untuk klien ini secepat mungkin demi mengejar tenggat kontrak, dan menunda pemikiran tentang keberlanjutan jangka panjang untuk nanti.",
        points: -4,
        result: [
          { text: "Demi mengejar tenggat kontrak yang ketat, Kael menyetujui pembangunan infrastruktur terpisah khusus untuk klien raksasa ini secepat mungkin, menunda pemikiran tentang keberlanjutan jangka panjang untuk nanti." },
          { text: "Kontrak berhasil didapat tepat waktu, tapi tim rekayasa kini harus memelihara dua arsitektur berbeda secara paralel selamanya, meningkatkan beban kerja dan risiko kesalahan konfigurasi setiap kali pembaruan keamanan harus diterapkan ke keduanya." },
          { text: "Beberapa bulan kemudian, satu pembaruan keamanan penting sempat terlewat diterapkan ke arsitektur khusus itu karena tim lupa bahwa ia terpisah dari alur pembaruan standar, celah yang nyaris tidak pernah akan terjadi jika arsitekturnya dirancang menyatu sejak awal." },
        ],
      },
      {
        id: "risky",
        label: "Menolak keseluruhan permintaan klien raksasa itu demi mempertahankan satu arsitektur tunggal yang sudah ada, tanpa mengeksplorasi solusi tengah apa pun.",
        points: -6,
        result: [
          { text: "Demi menjaga kesederhanaan arsitektur yang sudah ada, Kael merekomendasikan menolak keseluruhan permintaan klien raksasa itu, tanpa lebih dulu mengeksplorasi kemungkinan solusi tengah yang bisa memuaskan kedua kebutuhan." },
          { text: "Arunika kehilangan kontrak bernilai sangat besar yang sudah dinanti-nantikan tim bisnis selama berbulan-bulan, dan klien itu berpindah ke pesaing yang bersedia menawarkan fleksibilitas arsitektur yang diminta." },
          { text: "Direksi mempertanyakan mengapa keputusan teknis ini diambil tanpa pernah benar-benar mengeksplorasi solusi tengah yang mungkin ada, sebuah pelajaran mahal tentang pentingnya mencari jalan kreatif sebelum menjatuhkan penolakan mutlak." },
        ],
      },
    ],
  },
};
