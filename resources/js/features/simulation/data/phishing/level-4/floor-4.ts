import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor4: FloorContent = {
  id: "phishing_level_4_floor_4",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 4,
  title: "Penyamaran Internal yang Terverifikasi Sebagian",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-rose-100 to-red-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_4", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "directory_board_1", icon: "board", x: 85, y: 22, scale: 1.3 },
      { id: "clock_2", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "internal_mail_1",
      label: "Email dari Rekan Terverifikasi",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Email baru masuk dari Dita, rekan satu divisi yang memang benar-benar terdaftar di direktori resmi perusahaan. Kael bahkan sempat mengecek namanya di sistem internal, semuanya cocok, jabatan dan nomor pegawainya benar." },
      { text: "Isinya meminta Kael mengirimkan salinan data klien untuk 'keperluan audit internal mendadak', dengan alasan Dita sedang terburu-buru menyiapkan laporan sebelum rapat sore ini." },
      { text: "Karena identitas pengirimnya benar-benar terverifikasi di direktori resmi, kewaspadaan Kael terhadap kemungkinan penyamaran mulai mengendur." },
      { text: "Namun ada satu hal yang luput dari verifikasi sederhana lewat direktori: direktori hanya membuktikan bahwa Dita memang benar ada, bukan membuktikan bahwa akun email ini benar-benar sedang dikendalikan oleh Dita sendiri saat ini." },
    ],
    question: "Apa yang akan dilakukan Kael menghadapi permintaan dari identitas yang terverifikasi sebagian ini?",
    choices: [
      {
        id: "safe",
        label: "Mengonfirmasi langsung ke Dita lewat jalur komunikasi lain, karena verifikasi identitas di direktori tidak membuktikan akunnya belum diambil alih.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa terverifikasi di direktori hanya membuktikan identitas Dita secara umum, bukan membuktikan siapa yang sedang mengendalikan akun emailnya saat ini." },
          { text: "Ia menghubungi Dita lewat aplikasi pesan internal yang terpisah dari email." },
          { text: "Dita terkejut, ia tidak pernah mengirim permintaan semacam itu. Akun emailnya ternyata sudah diambil alih sejak kemarin malam." },
        ],
      },
      {
        id: "neutral",
        label: "Mengirimkan sebagian data klien yang dianggap kurang sensitif saja, sebagai jalan tengah.",
        points: -2,
        result: [
          { text: "Merasa identitas pengirimnya cukup terverifikasi, Kael mengirimkan sebagian data klien yang menurutnya kurang sensitif sebagai jalan tengah." },
          { text: "Ternyata data yang dianggap kurang sensitif itu tetap cukup untuk disalahgunakan, karena penyerang hanya butuh potongan kecil untuk melengkapi informasi yang sudah mereka kumpulkan dari tempat lain." },
        ],
      },
      {
        id: "risky",
        label: "Mengirimkan seluruh data klien karena identitas Dita sudah terverifikasi jelas di direktori perusahaan.",
        points: -3,
        result: [
          { text: "Karena identitasnya terverifikasi jelas di direktori, Kael mengirimkan seluruh data klien yang diminta tanpa ragu." },
          { text: "Data itu ternyata diterima oleh pihak yang telah mengambil alih akun email Dita, bukan oleh Dita sendiri." },
          { text: "Kebocoran data klien baru disadari setelah Dita yang asli menanyakan laporan audit yang tidak pernah ia minta." },
        ],
      },
    ],
  },
};
