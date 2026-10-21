import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel3Floor1: FloorContent = {
  id: "sqli_level_3_floor_1",
  simulationId: "sqli",
  levelNumber: 3,
  floorNumber: 1,
  title: "Injeksi Tertunda",
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
      id: "profile_form_1",
      label: "Formulir Profil Anggota",
      icon: "form",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Reputasi Kael sebagai penguji keamanan Gerbang Arsip membuatnya kini dipercaya menangani sistem yang jauh lebih kompleks: jaringan arsip gabungan beberapa kota, saling terhubung lewat satu basis data bersama." },
      { text: "Kael mengisi formulir profil anggota dengan data yang terlihat wajar, lalu menyimpannya. Tidak ada kesalahan apa pun muncul, formulir ini tampak sudah memeriksa inputnya dengan benar." },
      { text: "Beberapa hari kemudian, saat petugas arsip membuka laporan bulanan yang memuat ulang data profil tersebut ke dalam sebuah ringkasan, sistem laporan itu tiba-tiba menampilkan kesalahan aneh." },
      { text: "Kael menyadari sesuatu yang jarang disadari orang: data yang tersimpan dengan aman di satu tempat, ternyata dipakai ulang mentah-mentah oleh sistem laporan lain yang tidak pernah memeriksanya kembali." },
    ],
    question: "Bagaimana Kael menelusuri celah yang baru muncul belakangan ini?",
    choices: [
      {
        id: "safe",
        label: "Melacak data profil yang disimpan minggu lalu, lalu membuktikan bahwa sistem laporan memprosesnya ulang tanpa pemeriksaan tambahan.",
        points: 4,
        result: [
          { text: "Kael menelusuri kembali data profil yang pernah ia simpan, membandingkannya dengan isi laporan bulanan yang bermasalah." },
          { text: "Ia membuktikan bahwa sistem laporan menyalin data profil itu secara mentah ke dalam proses lain, tanpa pernah memeriksanya ulang sama sekali." },
          { text: "Kael mencatat ini sebagai celah tingkat lanjut: ancaman yang tidak muncul saat data pertama kali masuk, melainkan belakangan ketika data itu dipakai ulang di tempat yang lengah." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat kesalahan laporan sebagai bug biasa tanpa menelusuri sumbernya lebih jauh.",
        points: -2,
        result: [
          { text: "Kael mencatat kejadian ini sebagai bug teknis biasa dan meneruskannya ke tim pengembang tanpa penjelasan lebih lanjut." },
          { text: "Tanpa penjelasan yang tepat, tim pengembang memperbaiki gejalanya saja, sementara celah sesungguhnya di balik pemrosesan ulang data tetap tidak tersentuh." },
        ],
      },
      {
        id: "risky",
        label: "Menduplikasi data bermasalah itu ke banyak profil lain untuk melihat seberapa luas dampaknya tanpa izin tambahan.",
        points: -3,
        result: [
          { text: "Kael menduplikasi data bermasalah itu ke sejumlah profil lain, tanpa meminta izin tambahan dari pemilik sistem untuk pengujian seluas itu." },
          { text: "Tindakan ini melampaui lingkup pengujian yang disepakati dan berisiko mengganggu data profil anggota sungguhan." },
          { text: "Pemilik sistem menegur Kael, mengingatkan bahwa pengujian lanjutan tetap harus disetujui dulu sebelum menyentuh data dalam skala luas." },
        ],
      },
    ],
  },
};
