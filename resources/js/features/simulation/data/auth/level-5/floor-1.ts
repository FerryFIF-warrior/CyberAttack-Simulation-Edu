import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor1: FloorContent = {
  id: "auth_level_5_floor_1",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 1,
  title: "Tidak Ada yang Dipercaya Begitu Saja",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "badge_wall_1", icon: "badge", x: 80, y: 22, scale: 1.4 },
      { id: "globe_2", icon: "globe", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "identity_strategy_desk_1",
      label: "Meja Strategi Identitas Global",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael kini menjabat kepala manajemen identitas di Veltrix Group, perusahaan multinasional dengan lebih dari delapan puluh ribu Lencana Keanggotaan aktif tersebar di empat benua, masing-masing menjadi kunci menuju sistem dan data yang berbeda-beda tingkat kepekaannya." },
      { text: "Model lama Veltrix sederhana: begitu seseorang berhasil masuk ke jaringan kantor lewat satu Lencana yang sah, mereka dipercaya bergerak cukup bebas ke berbagai sistem internal lain, seolah berada di dalam gedung berarti otomatis dianggap aman." },
      { text: "Kael baru saja menyelesaikan tinjauan arsitektur menyeluruh dan menemukan kenyataan yang mengkhawatirkan: dengan karyawan yang bekerja dari berbagai negara, perangkat pribadi yang bercampur dengan perangkat kantor, dan puluhan akuisisi perusahaan kecil yang membawa sistem lama masing-masing, konsep 'di dalam gedung berarti aman' sudah tidak lagi berarti apa-apa." },
      { text: "Ia mengusulkan pergeseran filosofi besar kepada direksi: setiap permintaan akses, dari mana pun asalnya, harus diverifikasi berdasarkan konteksnya sendiri setiap saat, tidak ada lagi 'zona aman' yang dipercaya begitu saja hanya karena lokasinya." },
    ],
    question: "Bagaimana Kael merancang langkah awal penerapan filosofi 'tidak ada yang dipercaya begitu saja' ini di Veltrix Group?",
    choices: [
      {
        id: "safe",
        label: "Memulai dari pemetaan menyeluruh seluruh sistem dan tingkat kepekaan datanya, lalu menerapkan verifikasi identitas dan konteks berlapis secara bertahap dimulai dari sistem paling sensitif.",
        points: 3,
        result: [
          { text: "Kael memulai dengan memetakan secara menyeluruh seluruh sistem Veltrix dan tingkat kepekaan data masing-masing, menolak asumsi lama bahwa lokasi jaringan saja cukup menentukan tingkat kepercayaan." },
          { text: "Penerapan verifikasi berlapis dimulai bertahap dari sistem yang menyimpan data paling sensitif, memberi waktu bagi tim dan karyawan beradaptasi tanpa mengganggu operasional secara drastis sekaligus." },
          { text: "Dalam enam bulan, Veltrix memiliki gambaran jelas tentang siapa yang sebenarnya mengakses apa, kapan, dan dari mana, fondasi yang akan menjadi penentu dalam menghadapi ancaman-ancaman yang lebih besar di masa depan." },
        ],
      },
      {
        id: "neutral",
        label: "Menerapkan verifikasi berlapis secara seragam ke seluruh sistem sekaligus tanpa pemetaan tingkat kepekaan terlebih dahulu, demi mempercepat transformasi.",
        points: -3,
        result: [
          { text: "Demi mempercepat transformasi, Kael menerapkan verifikasi berlapis secara seragam ke seluruh sistem Veltrix sekaligus, tanpa lebih dulu memetakan mana yang benar-benar butuh prioritas." },
          { text: "Sistem-sistem penting dengan data paling sensitif justru tenggelam dalam antrean implementasi yang sama dengan sistem rutin bernilai rendah, memperlambat perlindungan tepat sasaran yang paling dibutuhkan." },
          { text: "Karyawan di berbagai negara mengeluhkan gangguan kerja yang meluas karena perubahan serentak yang tidak terencana baik, memicu resistensi terhadap keseluruhan program." },
        ],
      },
      {
        id: "risky",
        label: "Menunda transformasi ini sampai ada insiden nyata yang membuktikan model lama benar-benar berbahaya, karena perubahan besar dianggap terlalu mengganggu operasional saat ini.",
        points: -5,
        result: [
          { text: "Khawatir perubahan besar akan terlalu mengganggu operasional yang sedang berjalan lancar, Kael memilih menunda transformasi ini sampai ada insiden nyata yang benar-benar membuktikan model lama berbahaya." },
          { text: "Keputusan menunggu bukti nyata ini berarti Veltrix tetap mengandalkan asumsi kepercayaan berbasis lokasi yang sudah terbukti usang, sebuah risiko besar yang dibiarkan terbuka tanpa alasan kuat selain menghindari ketidaknyamanan jangka pendek." },
          { text: "Setiap hari yang berlalu tanpa transformasi ini berarti puluhan ribu Lencana Keanggotaan tersebar luas tetap beroperasi di atas fondasi kepercayaan yang rapuh." },
        ],
      },
    ],
  },
};
