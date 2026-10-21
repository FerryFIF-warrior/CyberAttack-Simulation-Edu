import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel3Floor2: FloorContent = {
  id: "sqli_level_3_floor_2",
  simulationId: "sqli",
  levelNumber: 3,
  floorNumber: 2,
  title: "Menukar Label Kewenangan",
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
      id: "classification_panel_1",
      label: "Panel Klasifikasi Arsip",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dengan izin pengujian yang diperluas, Kael melangkah ke pertanyaan berikutnya: jika data bisa diproses ulang tanpa pemeriksaan, apakah label kewenangan sebuah catatan juga bisa diubah lewat celah yang sama?" },
      { text: "Setiap catatan di jaringan arsip memiliki label klasifikasi, mulai dari publik, anggota biasa, hingga petugas tingkat tinggi, yang menentukan siapa saja yang boleh membacanya." },
      { text: "Kael mencoba menyusun satu catatan pengujian yang label klasifikasinya disisipkan secara halus lewat celah pemrosesan ulang yang sama, berharap sistem laporan akan salah membaca label itu sebagai klasifikasi tingkat tinggi." },
      { text: "Jika berhasil, ini berarti seseorang tanpa wewenang bisa membuat catatan biasa tampak seolah-olah berstatus rahasia tingkat tinggi, atau sebaliknya, membuat catatan rahasia tampak seolah bisa diakses publik." },
    ],
    question: "Bagaimana Kael membuktikan celah eskalasi label kewenangan ini?",
    choices: [
      {
        id: "safe",
        label: "Membuat satu catatan uji coba dengan label yang disisipkan secara terkendali, lalu segera mencabutnya begitu terbukti berhasil berubah.",
        points: 4,
        result: [
          { text: "Kael membuat satu catatan uji coba khusus, menyisipkan label klasifikasi palsu lewat celah pemrosesan ulang yang telah ia pelajari sebelumnya." },
          { text: "Sistem laporan salah membaca catatan itu sebagai klasifikasi tingkat tinggi, padahal seharusnya hanya catatan biasa." },
          { text: "Begitu terbukti, Kael segera mencabut catatan uji coba itu dan mendokumentasikan seluruh langkahnya untuk laporan." },
        ],
      },
      {
        id: "neutral",
        label: "Membuktikan konsepnya secara teoretis di catatan pribadi, tanpa benar-benar mengujinya di sistem.",
        points: 0,
        result: [
          { text: "Kael menjelaskan kemungkinan celah ini secara teoretis di catatan pribadinya, tanpa benar-benar mengujinya langsung di sistem." },
          { text: "Penjelasannya masuk akal, tapi tanpa bukti nyata, laporan ini menjadi kurang meyakinkan bagi tim yang akan memperbaikinya." },
        ],
      },
      {
        id: "risky",
        label: "Mengubah label klasifikasi beberapa catatan milik anggota sungguhan untuk menguji dampaknya secara langsung.",
        points: -4,
        result: [
          { text: "Kael mengubah label klasifikasi beberapa catatan milik anggota sungguhan, berharap pengujian ini terasa lebih nyata." },
          { text: "Beberapa anggota kehilangan akses ke catatan mereka sendiri, sementara catatan lain yang seharusnya rahasia sempat terekspos ke publik." },
          { text: "Pemilik sistem harus turun tangan memulihkan data yang terganggu, dan kepercayaan terhadap proses pengujian Kael sempat goyah." },
        ],
      },
    ],
  },
};
