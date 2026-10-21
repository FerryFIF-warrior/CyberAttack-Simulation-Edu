import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor7: FloorContent = {
  id: "auth_level_5_floor_7",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 7,
  title: "Ujian Akhir: Strategi Identitas di Depan Dewan Direksi",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-indigo-200 to-slate-400",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_final_4", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_final_4", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_final_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "board_room_table_1",
      label: "Meja Ruang Rapat Dewan Direksi",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Tiga tahun telah berlalu sejak Kael pertama kali mengusulkan filosofi 'tidak ada yang dipercaya begitu saja' di Veltrix Group. Transformasi besar itu kini selesai, dan Kael berdiri di depan dewan direksi untuk mempresentasikan arah strategi identitas untuk lima tahun ke depan." },
      { text: "Perdebatan sengit terjadi di ruang rapat itu. Satu kubu direksi mendesak investasi besar-besaran pada teknologi verifikasi biometrik mutakhir yang diklaim nyaris mustahil ditembus, demi menempatkan Veltrix sebagai pemimpin industri dalam keamanan identitas." },
      { text: "Kubu lain khawatir investasi sebesar itu akan mengorbankan anggaran untuk hal yang dianggap lebih mendasar: memastikan ribuan sistem warisan akuisisi lama, yang masih menyimpan celah-celah kecil yang belum sepenuhnya tertutup, benar-benar selaras dengan standar keamanan identitas yang sudah dibangun susah payah selama tiga tahun terakhir." },
      { text: "Kedua argumen sama-sama masuk akal, dan dewan direksi meminta rekomendasi akhir Kael sebagai penentu arah investasi strategis Veltrix untuk lima tahun mendatang, sebuah keputusan yang akan membentuk postur keamanan identitas seluruh perusahaan dalam jangka panjang." },
    ],
    question: "Rekomendasi strategi jangka panjang seperti apa yang sebaiknya disampaikan Kael kepada dewan direksi untuk menyeimbangkan kedua kepentingan ini?",
    choices: [
      {
        id: "safe",
        label: "Memprioritaskan penyelesaian konsistensi standar keamanan identitas di seluruh sistem warisan terlebih dahulu sebagai fondasi, baru kemudian mengalokasikan investasi bertahap pada teknologi verifikasi mutakhir di area dengan risiko tertinggi.",
        points: 2,
        result: [
          { text: "Kael merekomendasikan agar konsistensi standar keamanan identitas di seluruh sistem warisan diselesaikan terlebih dahulu sebagai fondasi, karena teknologi secanggih apa pun tidak banyak berarti jika masih ada celah mendasar yang belum tertutup di tempat lain." },
          { text: "Setelah fondasi itu benar-benar kokoh, investasi bertahap pada teknologi verifikasi mutakhir diarahkan khusus ke area dengan risiko dan nilai aset tertinggi, bukan diterapkan merata tanpa prioritas yang jelas." },
          { text: "Level 5 Authentication Attack selesai. Dewan direksi menyetujui pendekatan berjenjang ini, dan lima tahun kemudian Veltrix dikenal bukan karena satu teknologi tercanggih yang dimilikinya, melainkan karena konsistensi fondasi keamanan identitas yang jarang ditemukan di perusahaan sebesar mereka." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan investasi besar langsung pada teknologi verifikasi biometrik mutakhir, menunda penyelesaian konsistensi sistem warisan untuk fase berikutnya.",
        points: -4,
        result: [
          { text: "Tergoda oleh prestise menjadi pemimpin industri, Kael merekomendasikan investasi besar langsung pada teknologi verifikasi biometrik mutakhir, menunda penyelesaian konsistensi sistem warisan lama ke fase berikutnya." },
          { text: "Teknologi mutakhir itu berhasil dipasang di sejumlah sistem utama dan menarik banyak pujian publik, tapi sistem warisan lama yang belum tersentuh tetap menyimpan celah-celah kecil yang sama seperti sebelumnya." },
          { text: "Dua tahun kemudian, sebuah insiden kecil justru terjadi lewat salah satu sistem warisan lama yang terlewat, mengingatkan semua orang bahwa rantai keamanan identitas hanya sekuat titik terlemahnya, secanggih apa pun titik terkuatnya." },
        ],
      },
      {
        id: "risky",
        label: "Merekomendasikan status quo dipertahankan tanpa investasi besar baru, karena transformasi tiga tahun terakhir dianggap sudah cukup dan risiko tambahan dinilai rendah.",
        points: -6,
        result: [
          { text: "Menilai transformasi tiga tahun terakhir sudah cukup memadai, Kael merekomendasikan status quo dipertahankan tanpa investasi besar baru, menganggap risiko tambahan di masa depan relatif rendah." },
          { text: "Rekomendasi ini mengabaikan kenyataan bahwa lanskap ancaman terus berubah, dan pesaing-pesaing Veltrix yang terus berinvestasi dalam keamanan identitas perlahan mulai dipandang lebih tepercaya oleh klien-klien besar yang sensitif terhadap risiko." },
          { text: "Beberapa tahun kemudian, Veltrix kehilangan sejumlah kontrak besar ke pesaing yang dianggap memiliki postur keamanan identitas yang terus berkembang, sebuah pelajaran mahal bahwa keamanan bukan tujuan yang pernah benar-benar selesai dicapai." },
        ],
      },
    ],
  },
};
