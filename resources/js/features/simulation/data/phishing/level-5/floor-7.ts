import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor7: FloorContent = {
  id: "phishing_level_5_floor_7",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 7,
  title: "Ujian Akhir: Trade-off di Depan Direksi",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-indigo-200 to-slate-400",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_final_1", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_final_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_final_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "board_table_1",
      label: "Meja Rapat Direksi",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Satu tahun telah berlalu sejak Kael pertama kali menginjakkan kaki di Wira Husada. Program budaya keamanannya berhasil, laporan email mencurigakan meningkat, insiden besar tidak terulang, dan kepercayaan staf mulai pulih sepenuhnya." },
      { text: "Namun hari ini, Kael berdiri di depan direksi dengan satu proposal yang sulit: menambahkan lapisan verifikasi tambahan untuk setiap permintaan transfer data pasien antar-departemen, termasuk permintaan dari dokter senior dan direktur sekalipun." },
      { text: "Seorang anggota direksi keberatan keras: dokter-dokter senior sudah mengeluh proses kerja mereka melambat karena berbagai lapisan verifikasi yang sudah ada, dan menambah satu lapisan lagi dikhawatirkan membuat mereka justru mencari jalan pintas di luar sistem resmi." },
      { text: "Anggota direksi lain balas berargumen bahwa justru permintaan dari posisi senior adalah yang paling sering disamarkan penyerang lewat rekayasa sosial, karena jarang dipertanyakan bawahan yang segan menolak. Kedua argumen ini sama-sama berdasar, dan Kael harus memberi rekomendasi akhir yang akan menentukan arah kebijakan rumah sakit untuk tahun-tahun mendatang." },
    ],
    question: "Rekomendasi seperti apa yang sebaiknya Kael sampaikan untuk menyeimbangkan kedua kekhawatiran yang sama-sama berdasar ini?",
    choices: [
      {
        id: "safe",
        label: "Merekomendasikan verifikasi tambahan yang disesuaikan risikonya, lebih ringan untuk permintaan rutin bernilai rendah, lebih ketat untuk permintaan data sensitif bernilai tinggi, tanpa mengecualikan posisi senior mana pun.",
        points: 2,
        result: [
          { text: "Kael mengusulkan pendekatan berbasis risiko, bukan berbasis jabatan: permintaan data rutin bernilai rendah tetap cepat diproses, sementara permintaan data pasien sensitif bernilai tinggi mendapat verifikasi tambahan, berlaku untuk siapa pun tanpa kecuali." },
          { text: "Ia menjelaskan bahwa mengecualikan posisi senior dari verifikasi justru menciptakan celah paling berbahaya, karena itulah pola yang paling sering dimanfaatkan penyerang lewat rekayasa sosial." },
          { text: "Level 5 Phishing selesai. Direksi menerima rekomendasi ini, memahami bahwa keamanan yang baik bukan soal memilih antara kecepatan kerja dan perlindungan data, melainkan menyesuaikan keduanya dengan risiko sesungguhnya dari setiap permintaan." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan verifikasi tambahan untuk semua permintaan tanpa kecuali, demi kesederhanaan kebijakan dan menghindari perdebatan lebih lanjut di rapat.",
        points: -3,
        result: [
          { text: "Demi menghindari perdebatan panjang dan menjaga kebijakan tetap sederhana, Kael merekomendasikan verifikasi tambahan yang sama ketatnya untuk seluruh permintaan, tanpa membedakan tingkat risiko." },
          { text: "Keseragaman ini memang mudah dijelaskan, tapi memperlambat permintaan data rutin yang sebenarnya tidak berisiko tinggi, mendorong sebagian dokter mulai mencari jalan pintas tidak resmi untuk pekerjaan sehari-hari mereka." },
          { text: "Jalan pintas tidak resmi itu, meski dibuat demi efisiensi, membuka celah baru yang sama sekali tidak dipantau sistem keamanan yang ada." },
        ],
      },
      {
        id: "risky",
        label: "Mengecualikan permintaan dari dokter senior dan direktur dari verifikasi tambahan, karena mereka dianggap paling tepercaya dan posisinya paling tidak mungkin disalahgunakan.",
        points: -7,
        result: [
          { text: "Untuk meredakan keluhan dan menjaga kecepatan kerja para dokter senior, Kael merekomendasikan mengecualikan permintaan dari posisi senior dari verifikasi tambahan, menganggap jabatan tinggi berarti risiko rendah." },
          { text: "Keputusan ini justru menciptakan celah yang paling diincar: penyerang yang menyamar sebagai direktur lewat rekayasa sosial kini memiliki jalur bebas hambatan menuju data pasien paling sensitif." },
          { text: "Satu tahun kerja keras membangun budaya dan sistem keamanan Wira Husada nyaris runtuh oleh satu pengecualian kebijakan yang terdengar masuk akal di permukaan, tapi mengabaikan pola ancaman yang sudah terbukti berulang kali." },
        ],
      },
    ],
  },
};
