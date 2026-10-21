import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor3: FloorContent = {
  id: "auth_level_5_floor_3",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 3,
  title: "Lencana yang Sama, Pembawa yang Berbeda",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "badge_wall_3", icon: "badge", x: 80, y: 22, scale: 1.4 },
      { id: "circuit_4", icon: "circuit", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "risk_engine_panel_1",
      label: "Panel Mesin Penilaian Risiko Sesi",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Migrasi tanpa kata sandi berjalan sukses, tapi Kael tahu autentikasi yang kuat di awal sesi tidak cukup. Seseorang bisa saja masuk secara sah di pagi hari, lalu sesi itu diambil alih pihak lain beberapa jam kemudian lewat cara-cara yang tidak pernah disadari pengguna aslinya." },
      { text: "Ia memimpin proyek penilaian risiko berkelanjutan, sebuah sistem yang terus memantau konteks setiap sesi aktif, bukan hanya memeriksa identitas sekali di awal lalu mempercayainya penuh sepanjang hari." },
      { text: "Pekan pertama sistem ini aktif, sebuah peringatan muncul: akun seorang eksekutif senior yang pagi itu masuk dari kantor pusat tiba-tiba menunjukkan pola aktivitas yang mengakses sejumlah dokumen keuangan sensitif dengan kecepatan dan pola klik yang sangat tidak biasa dibanding kebiasaannya sehari-hari." },
      { text: "Tidak ada yang salah dengan identitas awal sesi itu, lencana yang digunakan memang sah. Tapi perilaku di dalam sesi itu terasa asing, seolah bukan orang yang sama yang sedang mengendalikannya." },
    ],
    question: "Bagaimana Kael menindaklanjuti peringatan dari mesin penilaian risiko berkelanjutan ini?",
    choices: [
      {
        id: "safe",
        label: "Segera meminta verifikasi ulang tambahan secara real-time untuk sesi yang mencurigakan itu, sambil membatasi sementara akses ke dokumen paling sensitif sampai verifikasi berhasil dikonfirmasi.",
        points: 3,
        result: [
          { text: "Kael segera memicu permintaan verifikasi ulang secara real-time untuk sesi yang menunjukkan perilaku mencurigakan itu, tanpa menunggu konfirmasi identitas awal yang sudah dianggap cukup di pagi hari." },
          { text: "Sambil menunggu verifikasi, akses ke dokumen keuangan paling sensitif dibatasi sementara, mencegah potensi kerugian lebih lanjut tanpa sepenuhnya mengganggu pekerjaan jika ternyata itu memang eksekutif yang sah." },
          { text: "Verifikasi gagal dilakukan oleh pihak yang sedang menggunakan sesi itu, mengonfirmasi sesi tersebut memang telah diambil alih pihak lain, dan pembatasan akses yang sudah diterapkan lebih dulu mencegah kebocoran dokumen sensitif." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat peringatan ini untuk ditinjau oleh tim keamanan pada jam kerja berikutnya, karena identitas awal sesi sudah terverifikasi sah di pagi hari.",
        points: -3,
        result: [
          { text: "Karena identitas awal sesi sudah terverifikasi sah di pagi hari, Kael mencatat peringatan perilaku mencurigakan ini untuk ditinjau tim keamanan pada jam kerja berikutnya, bukan segera." },
          { text: "Selama waktu tunggu itu, sesi yang sudah diambil alih tersebut sempat mengakses dan mengunduh sejumlah dokumen keuangan sensitif sebelum sempat ditinjau." },
          { text: "Mempercayai identitas awal sesi sepenuhnya, tanpa mempertimbangkan bahwa sesi itu sendiri bisa berubah tangan di tengah jalan, menjadi kelemahan yang dimanfaatkan dalam insiden ini." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikan peringatan ini karena eksekutif senior tersebut dikenal sering bekerja dengan ritme tidak biasa dan dianggap tidak perlu diganggu dengan verifikasi tambahan.",
        points: -6,
        result: [
          { text: "Menganggap eksekutif senior itu memang dikenal sering bekerja dengan ritme tidak biasa, Kael mengabaikan peringatan ini sepenuhnya, enggan mengganggu seseorang berposisi tinggi dengan verifikasi tambahan." },
          { text: "Asumsi berdasarkan jabatan dan reputasi ini, alih-alih data perilaku aktual, membuat sesi yang sudah diambil alih leluasa mengakses dokumen keuangan paling sensitif milik perusahaan tanpa hambatan apa pun." },
          { text: "Butuh waktu berhari-hari sebelum kebocoran ini akhirnya disadari lewat jalur lain, jauh setelah dokumen-dokumen penting itu sudah berpindah tangan." },
        ],
      },
    ],
  },
};
