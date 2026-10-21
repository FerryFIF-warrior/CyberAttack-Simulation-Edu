import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor7: FloorContent = {
  id: "bruteforce_level_5_floor_7",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 7,
  title: "Ujian Akhir: Insiden dengan Informasi Tidak Lengkap",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-indigo-200 to-slate-400",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_final_2", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_final_2", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_final_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "situation_room_1",
      label: "Ruang Situasi Darurat",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pukul dua dini hari, telepon darurat Kael berdering. Sistem pemantauan mendeteksi lonjakan percobaan login yang tidak biasa, tapi kali ini log yang masuk terpotong-potong, salah satu server pengumpul log sedang mengalami gangguan teknis yang tidak berkaitan, membuat sebagian data periode kritis hilang sama sekali." },
      { text: "Dari data yang tersisa, Kael hanya bisa memastikan satu hal: terjadi lonjakan drastis percobaan login terhadap akun-akun bernilai tinggi dalam rentang waktu sekitar dua puluh menit, tapi tidak ada cara memastikan apakah ada yang benar-benar berhasil ditembus selama jendela waktu yang datanya hilang." },
      { text: "Tim Kael terbagi dua pendapat tajam. Sebagian mendesak pemulihan log diprioritaskan lebih dulu sebelum mengambil tindakan apa pun, karena bertindak tanpa gambaran lengkap berisiko salah sasaran. Sebagian lain mendesak tindakan pencegahan segera dijalankan sekarang juga, karena menunggu kepastian penuh bisa berarti membiarkan pelanggaran yang sudah terjadi terus meluas." },
      { text: "Tidak ada jawaban yang sepenuhnya aman. Dengan informasi yang tidak pernah akan lengkap dalam waktu dekat, Kael harus memutuskan arah respons malam ini juga." },
    ],
    question: "Dengan data yang hilang sebagian dan waktu yang terbatas, langkah apa yang sebaiknya Kael ambil malam ini?",
    choices: [
      {
        id: "safe",
        label: "Segera menerapkan pengamanan sementara menyeluruh pada seluruh akun bernilai tinggi (seperti verifikasi tambahan paksa), sambil paralel memulihkan log yang hilang untuk memastikan cakupan dampak sesungguhnya.",
        points: 2,
        result: [
          { text: "Kael memilih bertindak atas dasar skenario terburuk yang masuk akal: segera menerapkan verifikasi tambahan paksa pada seluruh akun bernilai tinggi yang berada dalam jendela waktu mencurigakan itu, tanpa menunggu kepastian penuh." },
          { text: "Secara paralel, ia memerintahkan tim lain memulihkan log yang hilang dari cadangan sistem terpisah, untuk memastikan gambaran dampak sesungguhnya begitu data itu tersedia." },
          { text: "Level 5 Bruteforce selesai. Pemulihan log beberapa jam kemudian mengonfirmasi dua akun memang sempat ditembus dalam jendela waktu itu, namun verifikasi tambahan yang sudah diterapkan lebih dulu berhasil mencegah transaksi apa pun dilakukan dari akun-akun tersebut." },
        ],
      },
      {
        id: "neutral",
        label: "Menunggu pemulihan log selesai sepenuhnya sebelum mengambil tindakan apa pun, agar keputusan diambil berdasarkan data yang benar-benar lengkap.",
        points: -4,
        result: [
          { text: "Kael memilih menunggu pemulihan log selesai sepenuhnya sebelum bertindak, karena khawatir tindakan berdasarkan data tidak lengkap bisa keliru sasaran." },
          { text: "Pemulihan log ternyata memakan waktu lebih dari enam jam, jauh melampaui jendela waktu kritis untuk mencegah penyalahgunaan akun yang mungkin sudah ditembus." },
          { text: "Ketika log akhirnya pulih dan mengonfirmasi dua akun memang ditembus, salah satunya sudah sempat digunakan untuk transaksi mencurigakan sebelum verifikasi tambahan diterapkan." },
        ],
      },
      {
        id: "risky",
        label: "Mengunci sepenuhnya seluruh akun bernilai tinggi tanpa pengecualian sampai investigasi selesai total, tanpa mempertimbangkan dampak operasional terhadap nasabah.",
        points: -6,
        result: [
          { text: "Demi memastikan tidak ada risiko tersisa sedikit pun, Kael memerintahkan penguncian total seluruh akun bernilai tinggi tanpa pengecualian, tanpa mempertimbangkan dampak operasional terhadap nasabah yang sama sekali tidak terlibat." },
          { text: "Ribuan nasabah bernilai tinggi yang sah sama sekali tidak bisa mengakses rekening mereka selama investigasi berlangsung, memicu keluhan besar dan sejumlah nasabah memilih memindahkan dananya ke bank lain." },
          { text: "Reaksi berlebihan terhadap data yang tidak lengkap ini merusak kepercayaan nasabah jauh lebih luas dibanding dampak sesungguhnya dari insiden yang sedang ditangani." },
        ],
      },
    ],
  },
};
