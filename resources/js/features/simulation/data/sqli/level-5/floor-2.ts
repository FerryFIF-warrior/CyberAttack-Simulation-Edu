import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor2: FloorContent = {
  id: "sqli_level_5_floor_2",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 2,
  title: "Penjaga yang Bekerja di Setiap Baris Kode Baru",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "archive_gate_2", icon: "gate", x: 80, y: 22, scale: 1.4 },
      { id: "circuit_3", icon: "circuit", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "pipeline_panel_1",
      label: "Panel Jalur Rilis Otomatis",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Tinjauan desain keamanan di awal sudah berjalan baik, tapi Kael tahu itu belum cukup. Kode yang ditulis setelah rancangan disetujui masih bisa meleset dari rencana awalnya, baik karena ketergesaan maupun kesalahan manusia yang wajar terjadi." },
      { text: "Ia mengusulkan pemasangan pemeriksa otomatis ke dalam jalur rilis, semacam penjaga yang memeriksa setiap perubahan kode sebelum diizinkan bergabung ke produk utama, mencari pola akses data mentah yang berisiko menembus batas Gerbang Arsip antar-klien." },
      { text: "Minggu pertama setelah dipasang, penjaga otomatis ini langsung menangkap sesuatu: satu perubahan kode dari pengembang baru yang, tanpa disadari, membuat satu jalur permintaan data bisa menerima masukan mentah dari pengguna tanpa penyaringan yang semestinya." },
      { text: "Pengembang itu terkejut, bersikeras kodenya sudah diuji dan berjalan normal di seluruh skenario yang ia coba. Ia tidak menyadari bahwa normal di permukaan tidak selalu berarti aman di balik layar." },
    ],
    question: "Bagaimana Kael menindaklanjuti temuan penjaga otomatis dan menyikapi keberatan pengembang tersebut?",
    choices: [
      {
        id: "safe",
        label: "Memblokir perubahan kode itu dari bergabung ke produk utama sampai pola masukan berisiko diperbaiki, sekaligus menjelaskan ke pengembang mengapa pengujian fungsional saja tidak cukup untuk mendeteksi celah ini.",
        points: 3,
        result: [
          { text: "Kael mempertahankan keputusan penjaga otomatis untuk memblokir perubahan kode itu, tidak peduli betapa pun kode itu tampak berjalan normal di pengujian fungsional biasa." },
          { text: "Ia duduk bersama pengembang itu, menjelaskan dengan sabar bagaimana pola masukan mentah yang tidak disaring bisa dimanfaatkan untuk menembus batas data antar-klien, sesuatu yang tidak pernah muncul dalam pengujian fungsional normal." },
          { text: "Perubahan kode diperbaiki sebelum pernah menyentuh produk yang digunakan klien sungguhan, dan pengembang itu kini menjadi salah satu yang paling waspada terhadap pola serupa di masa depan." },
        ],
      },
      {
        id: "neutral",
        label: "Mengizinkan perubahan kode itu bergabung dengan catatan untuk diperbaiki pada pembaruan berikutnya, demi menjaga jadwal rilis mingguan tetap tepat waktu.",
        points: -3,
        result: [
          { text: "Demi menjaga jadwal rilis mingguan tetap tepat waktu, Kael mengizinkan perubahan kode itu bergabung dengan catatan untuk diperbaiki pada pembaruan berikutnya." },
          { text: "Jadwal yang padat membuat catatan perbaikan itu terus tergeser ke pembaruan selanjutnya, dan celah itu sempat aktif di produk yang digunakan klien sungguhan selama lebih dari seminggu." },
          { text: "Untungnya tidak ada yang mengeksploitasinya selama periode itu, tapi risikonya nyata dan sepenuhnya bisa dihindari." },
        ],
      },
      {
        id: "risky",
        label: "Mematikan sementara penjaga otomatis itu karena dianggap terlalu sering menghalangi kecepatan rilis tim pengembang, dan kembali ke pemeriksaan manual sesekali.",
        points: -6,
        result: [
          { text: "Keluhan tim pengembang tentang kecepatan rilis yang terhambat membuat Kael mematikan sementara penjaga otomatis itu, kembali mengandalkan pemeriksaan manual sesekali yang jauh lebih jarang dan lambat." },
          { text: "Tanpa penjaga otomatis yang bekerja di setiap perubahan, sejumlah pola berisiko serupa lolos tanpa terdeteksi selama periode penjaga itu dimatikan." },
          { text: "Salah satu dari pola yang lolos itu baru ditemukan berbulan-bulan kemudian, setelah sempat aktif cukup lama di produk yang digunakan ratusan klien." },
        ],
      },
    ],
  },
};
