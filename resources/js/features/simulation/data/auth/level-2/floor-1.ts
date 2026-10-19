import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel2Floor1: FloorContent = {
  id: "auth_level_2_floor_1",
  simulationId: "auth",
  levelNumber: 2,
  floorNumber: 1,
  title: "Tahap 1: Kunci Cadangan yang Mudah Ditiru",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_1", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "reset_panel_1",
      label: "Formulir Lupa Kata Sandi",
      icon: "form",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Laporan penyamaran identitas Kael tahun lalu membuat forum menutup celah besar di sistem lencana keanggotaan. Kini pemilik forum memintanya menguji satu fitur yang jarang diperiksa orang: formulir lupa kata sandi." },
      { text: "Kael mencoba fitur itu dengan akun pengujiannya sendiri. Ia memasukkan nama pengguna, dan sistem mengirimkan sebuah kode pemulihan singkat yang tampak sederhana, hanya enam digit angka." },
      { text: "Yang membuatnya waspada bukan jumlah digitnya saja, tapi fakta bahwa kode itu tidak memiliki batas waktu. Ia mencoba menunggu satu jam, dan kode yang sama masih berfungsi tanpa masalah." },
      { text: "Kael menyadari, jika kode pemulihan bisa ditebak dan tidak pernah kedaluwarsa, siapa pun dengan cukup waktu bisa mencoba membobol kunci cadangan ini, bukan hanya gerbang utama." },
    ],
    question: "Apa yang akan Kael lakukan untuk menguji kelemahan ini lebih jauh?",
    choices: [
      {
        id: "safe",
        label: "Mencoba beberapa kombinasi kode secara terbatas sambil mencatat berapa lama kode itu tetap aktif, sebagai bukti untuk laporan.",
        points: 4,
        result: [
          { text: "Kael mencoba sejumlah kecil kombinasi kode secara terkendali, sambil mencatat dengan cermat berapa lama kode pemulihan tetap aktif tanpa kedaluwarsa." },
          { text: "Hasilnya jelas: kode enam digit tanpa batas waktu bisa ditebak dengan cukup banyak percobaan, apalagi jika tidak ada pembatasan jumlah percobaan sama sekali." },
          { text: "Kael mencatat temuan ini lengkap dengan bukti waktu aktifnya kode, siap dijadikan dasar laporan perbaikan." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mencatat bahwa kode tidak memiliki batas waktu tanpa menguji seberapa mudah ditebak.",
        points: 1,
        result: [
          { text: "Kael mencatat bahwa kode pemulihan tidak memiliki batas waktu." },
          { text: "Catatan itu berguna, tetapi tanpa pengujian tambahan, ia belum benar-benar membuktikan seberapa mudah kode itu bisa ditebak oleh pihak lain." },
        ],
      },
      {
        id: "risky",
        label: "Mencoba menebak kode pemulihan milik akun anggota asli yang sebenarnya, bukan akun pengujian.",
        points: -2,
        result: [
          { text: "Kael tergoda mencoba menebak kode pemulihan milik akun anggota asli, bukan akun pengujiannya sendiri." },
          { text: "Tindakan ini melampaui lingkup izin pengujian yang disepakati, karena menyentuh akun orang lain tanpa persetujuan langsung." },
          { text: "Pemilik forum menegur Kael, mengingatkan bahwa pengujian keamanan tetap harus menghormati batas akun yang boleh disentuh." },
        ],
      },
    ],
  },
};
