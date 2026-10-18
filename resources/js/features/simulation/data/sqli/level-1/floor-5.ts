import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel1Floor5: FloorContent = {
  id: "sqli_level_1_floor_5",
  simulationId: "sqli",
  levelNumber: 1,
  floorNumber: 5,
  title: "Ujian Akhir: Laporan Rantai Celah Gerbang",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_9", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "gate_5",
      label: "Gerbang Arsip Utama",
      icon: "gate",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pengujian terakhir tiba. Pemilik arsip meminta Kael menyusun satu laporan menyeluruh, menjalankan seluruh rantai temuan dari awal hingga akhir, sebelum gerbang ini resmi dibuka untuk publik." },
      { text: "Kael mengingat kembali setiap tahap: mengintai formulir dengan tanda baca, membuktikan celah dengan deklarasi yang selalu benar, menembus penyaring sederhana, lalu menembus penjaga otomatis." },
      { text: "Kini saatnya menyusun semuanya menjadi satu rantai bukti yang utuh dan jelas, sehingga pemilik arsip bisa benar-benar memahami betapa pentingnya memperbaiki cara penjaga memeriksa setiap formulir." },
      { text: "Kael membuka catatan pengujiannya dan mulai menyusun laporan akhir." },
    ],
    question: "Bagaimana Kael menyusun rantai pengujian ini menjadi laporan akhir yang paling meyakinkan?",
    choices: [
      {
        id: "safe",
        label: "Menyusun laporan runtut: pengintaian formulir, pembuktian celah, bukti bypass penyaring, bukti bypass penjaga otomatis, lalu rekomendasi perbaikan.",
        points: 4,
        result: [
          { text: "Kael menyusun laporan tahap demi tahap, lengkap dengan bukti bahwa gerbang tidak pernah benar-benar memeriksa bentuk formulir sejak awal." },
          { text: "Ia menutup laporan dengan rekomendasi utama: gerbang harus memeriksa setiap formulir melalui prosedur baku yang ketat, bukan membandingkannya secara mentah apa adanya." },
          { text: "Pemilik arsip menerima laporan itu dan segera memperbaiki seluruh prosedur pendaftaran sebelum gerbang dibuka untuk umum." },
          { text: "Level 1 SQL Injection selesai. Gerbang Arsip kini jauh lebih aman berkat laporan menyeluruh Kael." },
        ],
      },
      {
        id: "neutral",
        label: "Melewati tahap pengintaian dalam laporan, langsung menunjukkan bukti bypass penjaga otomatis saja.",
        points: 1,
        result: [
          { text: "Kael menyusun laporan singkat yang hanya menunjukkan bukti akhir tanpa menjelaskan tahap-tahap sebelumnya." },
          { text: "Pemilik arsip memperbaiki sebagian celah yang disebutkan, tetapi tidak sepenuhnya memahami bagaimana seluruh rantai kelemahan itu terjadi." },
        ],
      },
      {
        id: "risky",
        label: "Membuktikan 'keseriusan' temuan dengan menghapus data anggota secara langsung di depan pemilik arsip.",
        points: -2,
        result: [
          { text: "Kael ingin membuat kesan dramatis dengan menghapus sebagian data anggota sebagai bukti langsung." },
          { text: "Tindakan itu merusak data asli arsip dan melanggar batas izin pengujian yang telah disepakati sejak awal." },
          { text: "Pemilik arsip kehilangan kepercayaan pada proses pengujian, dan laporan Kael dianggap tidak sah karena melampaui wewenangnya." },
        ],
      },
    ],
  },
};
