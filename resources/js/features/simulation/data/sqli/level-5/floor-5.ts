import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor5: FloorContent = {
  id: "sqli_level_5_floor_5",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 5,
  title: "Merancang Ulang Kepercayaan di Dalam Gerbang",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "archive_gate_5", icon: "gate", x: 80, y: 22, scale: 1.4 },
      { id: "shield_1", icon: "shield", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "architecture_review_1",
      label: "Meja Tinjauan Arsitektur Akses Data",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dua celah besar dalam setahun terakhir, meski berhasil ditutup sebelum dieksploitasi, membuat Kael merenung lebih dalam. Keduanya punya satu kesamaan: begitu sebuah komponen internal berhasil mendapat akses awal ke sistem, ia dipercaya begitu saja untuk mengakses hampir seluruh data klien tanpa pemeriksaan ulang." },
      { text: "Arsitektur lama Arunika dibangun di atas asumsi bahwa apa pun yang sudah berada di dalam jaringan internal boleh dipercaya sepenuhnya. Asumsi itu masuk akal bertahun-tahun lalu ketika sistemnya masih kecil dan sederhana, tapi kini terasa seperti bom waktu di tengah kompleksitas yang terus bertambah." },
      { text: "Kael mengusulkan perombakan besar: setiap permintaan akses ke Gerbang Arsip data klien, bahkan dari komponen internal yang sudah berada di dalam sistem, harus diverifikasi ulang konteksnya setiap kali, bukan dipercaya begitu saja karena sudah berada di 'dalam'." },
      { text: "Perombakan ini akan memakan waktu berbulan-bulan dan menyentuh hampir seluruh bagian produk, sesuatu yang pasti akan memperlambat pengembangan fitur baru untuk sementara waktu, sebuah keputusan besar yang butuh persetujuan direksi." },
    ],
    question: "Bagaimana Kael meyakinkan direksi untuk menyetujui perombakan arsitektur akses data berskala besar ini?",
    choices: [
      {
        id: "safe",
        label: "Menyajikan data konkret dari dua insiden sebelumnya sebagai bukti risiko arsitektur lama, lalu mengusulkan migrasi bertahap yang dimulai dari area berisiko tertinggi, agar dampak pada kecepatan pengembangan tetap terkendali.",
        points: 3,
        result: [
          { text: "Kael menyajikan data konkret dari dua insiden sebelumnya kepada direksi, menunjukkan bagaimana keduanya berakar dari asumsi kepercayaan internal yang sama, bukan kejadian terpisah yang kebetulan." },
          { text: "Ia mengusulkan migrasi bertahap, dimulai dari area yang menyentuh data klien paling sensitif terlebih dahulu, memungkinkan dampak terhadap kecepatan pengembangan tetap terkendali dan terukur." },
          { text: "Direksi menyetujui rencana ini, dan setahun kemudian arsitektur verifikasi berlapis itu berhasil mencegah satu insiden ketiga yang seharusnya bisa jauh lebih parah dengan arsitektur lama." },
        ],
      },
      {
        id: "neutral",
        label: "Menambahkan lapisan verifikasi tambahan hanya pada komponen yang pernah terlibat insiden sebelumnya, tanpa merombak keseluruhan arsitektur kepercayaan internal.",
        points: -3,
        result: [
          { text: "Untuk menghindari proyek besar yang memakan waktu, Kael hanya menambahkan lapisan verifikasi tambahan pada komponen spesifik yang pernah terlibat dalam dua insiden sebelumnya." },
          { text: "Pendekatan tambal sulam ini menutup dua celah yang sudah diketahui, tapi akar masalah yang sesungguhnya, asumsi kepercayaan internal yang terlalu longgar, tetap ada di seluruh bagian lain sistem." },
          { text: "Beberapa bulan kemudian, komponen lain yang belum pernah terlibat insiden sebelumnya menjadi titik lemah baru yang nyaris dieksploitasi dengan pola serupa." },
        ],
      },
      {
        id: "risky",
        label: "Menunda seluruh rencana perombakan arsitektur karena dua insiden sebelumnya berhasil ditutup tanpa dampak nyata, dianggap belum cukup mendesak untuk proyek sebesar ini.",
        points: -5,
        result: [
          { text: "Melihat kedua insiden sebelumnya berhasil ditutup tanpa dampak nyata ke klien, Kael menilai belum cukup mendesak untuk mengajukan proyek perombakan arsitektur sebesar ini kepada direksi." },
          { text: "Asumsi kepercayaan internal yang longgar itu tetap tertanam di seluruh sistem, menunggu komponen berikutnya yang disusupi untuk mengungkap betapa luasnya akses yang sebenarnya tersedia begitu satu titik berhasil ditembus." },
          { text: "Keputusan menunda ini terasa aman di permukaan, tapi sebenarnya hanya menunda risiko besar ke waktu yang tidak bisa diprediksi." },
        ],
      },
    ],
  },
};
