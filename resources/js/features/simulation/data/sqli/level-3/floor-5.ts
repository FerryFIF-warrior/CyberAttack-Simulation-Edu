import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel3Floor5: FloorContent = {
  id: "sqli_level_3_floor_5",
  simulationId: "sqli",
  levelNumber: 3,
  floorNumber: 5,
  title: "Godaan Alat Serba Otomatis",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_5", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_5", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "scanner_tool_1",
      label: "Alat Pemindai Otomatis",
      icon: "tool",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah insiden ditangani pemilik sistem, Kael diminta melanjutkan pengujian menyeluruh ke seluruh jaringan arsip gabungan, puluhan formulir dan ratusan titik input yang harus diperiksa satu per satu." },
      { text: "Rekan kerja menyarankan Kael memakai alat pemindai otomatis yang bisa menguji ribuan kombinasi ke semua titik input sekaligus, jauh lebih cepat dibanding menguji manual satu per satu seperti biasanya." },
      { text: "Namun Kael tahu, jaringan arsip ini sedang aktif dipakai petugas dan anggota sungguhan saat ini juga, bukan lingkungan pengujian terpisah. Alat otomatis yang terlalu agresif bisa saja membebani sistem hingga melambat, bahkan mengganggu layanan yang sedang berjalan." },
      { text: "Di satu sisi, waktu pengujian yang terbatas membuat kecepatan terasa menggoda. Di sisi lain, mengganggu layanan yang sedang dipakai publik adalah risiko yang tidak bisa dianggap remeh." },
    ],
    question: "Bagaimana Kael memutuskan pendekatan pengujian untuk seluruh jaringan ini?",
    choices: [
      {
        id: "safe",
        label: "Menjadwalkan pengujian otomatis dengan kecepatan terbatas di luar jam sibuk, dikombinasikan dengan pengujian manual untuk titik paling kritis.",
        points: 3,
        result: [
          { text: "Kael menyusun jadwal pengujian otomatis dengan kecepatan yang dibatasi, dijalankan di luar jam sibuk saat beban sistem paling rendah." },
          { text: "Untuk titik-titik paling kritis, seperti yang menyimpan data pribadi anggota, ia tetap menguji secara manual agar lebih terkendali dan tidak berisiko merusak data." },
          { text: "Seluruh jaringan arsip berhasil diuji menyeluruh tanpa satu pun gangguan terhadap layanan yang sedang dipakai petugas dan anggota." },
        ],
      },
      {
        id: "neutral",
        label: "Menjalankan alat otomatis dengan kecepatan penuh di siang hari karena waktu pengujian terbatas.",
        points: -2,
        result: [
          { text: "Karena dikejar waktu, Kael menjalankan alat pemindai otomatis dengan kecepatan penuh di siang hari, saat sistem sedang ramai digunakan." },
          { text: "Beberapa petugas melaporkan sistem terasa melambat drastis selama beberapa jam, mengganggu pekerjaan mereka yang sedang berlangsung." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkan alat otomatis berjalan tanpa batas kecepatan maupun pengawasan sama sekali demi efisiensi maksimal.",
        points: -3,
        result: [
          { text: "Demi efisiensi maksimal, Kael membiarkan alat otomatis berjalan tanpa batas kecepatan maupun pengawasan langsung." },
          { text: "Beban permintaan yang terlalu besar membuat sistem arsip sempat tidak bisa diakses sama sekali selama beberapa menit." },
          { text: "Pemilik sistem kecewa, pengujian keamanan yang seharusnya melindungi layanan justru menjadi penyebab gangguan layanan itu sendiri." },
        ],
      },
    ],
  },
};
