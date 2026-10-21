import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor7: FloorContent = {
  id: "auth_level_4_floor_7",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 7,
  title: "Ujian Akhir: Permintaan Akses Darurat yang Ambigu",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_7", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_7", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "emergency_requests_panel_1",
      label: "Dua Permintaan Akses Darurat",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Di hari terakhir masa pengujian, dua permintaan akses darurat masuk ke meja Kael dalam waktu hampir bersamaan, keduanya mengaku sebagai anggota yang kehilangan akses ke akun mereka dan membutuhkan pemulihan segera." },
      { text: "Permintaan pertama datang dengan nada panik yang sangat kentara, kalimatnya terburu-buru, memohon bantuan secepatnya karena 'ada hal penting yang harus segera diurus', tapi menyertakan detail akun yang lengkap dan konsisten dengan data yang tercatat di sistem." },
      { text: "Permintaan kedua juga terdengar panik dengan nada yang hampir identik, memohon kecepatan yang sama, tapi saat Kael memeriksa detail akunnya, ada satu ketidaksesuaian kecil: nama perangkat yang disebutkan tidak pernah tercatat pernah dipakai akun itu sebelumnya, padahal pemohon mengklaim sudah bertahun-tahun memakai perangkat yang sama." },
      { text: "Kedua permintaan ini mengandalkan rasa urgensi yang sama persis untuk mendorong Kael bertindak cepat tanpa banyak memeriksa. Ia harus memutuskan dengan tenang, di tengah tekanan yang sengaja dibuat terasa mendesak oleh keduanya." },
    ],
    question: "Bagaimana Kael menangani kedua permintaan akses darurat yang terasa sama mendesaknya ini?",
    choices: [
      {
        id: "safe",
        label: "Tidak terpengaruh nada mendesak dari keduanya, lalu memverifikasi detail teknis masing-masing permintaan secara setara sebelum memutuskan.",
        points: 2,
        result: [
          { text: "Kael menahan diri dari dorongan untuk segera bertindak hanya karena nada mendesak kedua permintaan itu." },
          { text: "Ia memverifikasi detail teknis masing-masing secara setara, memeriksa riwayat perangkat dan pola akses yang tercatat di sistem untuk kedua permintaan." },
          { text: "Permintaan pertama terverifikasi konsisten dengan riwayat akun yang sah, dan segera dibantu pemulihannya. Permintaan kedua, dengan ketidaksesuaian nama perangkat yang tidak pernah tercatat, ternyata adalah upaya pengambilalihan akun yang menyamar sebagai pemilik asli." },
          { text: "Level 4 Authentication Attack selesai. Kael berhasil membedakan permintaan yang sah dari yang menyamar, bukan dari seberapa mendesak nadanya, melainkan dari detail teknis yang konsisten atau tidak dengan riwayat sesungguhnya." },
        ],
      },
      {
        id: "neutral",
        label: "Membantu permintaan pertama lebih dulu karena terasa sedikit lebih meyakinkan, baru memeriksa permintaan kedua setelahnya.",
        points: -2,
        result: [
          { text: "Kael membantu permintaan pertama lebih dulu karena terasa sedikit lebih meyakinkan, berniat memeriksa permintaan kedua setelahnya." },
          { text: "Jeda waktu sebelum ia sempat memeriksa permintaan kedua dengan teliti, pemohon kedua sudah lebih dulu mendesak lewat jalur lain, membuat Kael nyaris memproses pemulihan itu tanpa verifikasi yang semestinya." },
        ],
      },
      {
        id: "risky",
        label: "Memproses kedua permintaan sekaligus demi menghemat waktu, karena keduanya sama-sama terdengar mendesak.",
        points: -4,
        result: [
          { text: "Demi menghemat waktu dan meredakan kedua permintaan yang sama-sama terdengar mendesak, Kael memproses keduanya sekaligus tanpa verifikasi mendalam." },
          { text: "Permintaan kedua, yang ternyata upaya pengambilalihan akun, berhasil lolos bersamaan dengan permintaan pertama yang memang sah." },
          { text: "Butuh waktu berhari-hari sebelum pemilik akun yang sesungguhnya menyadari bahwa aksesnya telah diambil alih pihak lain." },
        ],
      },
    ],
  },
};
