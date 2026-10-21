import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor6: FloorContent = {
  id: "auth_level_5_floor_6",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 6,
  title: "Ancaman yang Sudah Memegang Lencana Sah",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "badge_wall_6", icon: "badge", x: 80, y: 22, scale: 1.4 },
      { id: "document_1", icon: "document", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "insider_case_file_1",
      label: "Berkas Kasus Internal Sensitif",
      icon: "document",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Panggilan ini berbeda dari semua yang pernah ditangani Kael sebelumnya. Bukan dari luar, melainkan dari kepala sumber daya manusia: seorang insinyur senior di divisi riset, yang baru saja diberitahu akan dipindahkan ke posisi lebih rendah akibat restrukturisasi, mulai menunjukkan pola akses yang ganjil terhadap dokumen riset di luar cakupan kerjanya." },
      { text: "Lencana insinyur itu sepenuhnya sah, akses yang ia miliki memang diberikan secara resmi bertahun-tahun lalu untuk proyek yang pernah ia tangani, akses yang belum pernah dicabut meski proyek itu sudah lama selesai dan perannya telah berubah." },
      { text: "Log menunjukkan ia mulai mengunduh sejumlah besar dokumen riset dalam beberapa hari terakhir, tepat setelah menerima kabar restrukturisasi itu, pola yang sangat berbeda dari kebiasaan kerjanya selama bertahun-tahun sebelumnya." },
      { text: "Ini bukan penyerang asing yang menyamar, melainkan seseorang dengan lencana sah yang mulai bertindak di luar batas kewajaran, situasi yang jauh lebih rumit secara hukum dan manusiawi dibanding menghadapi ancaman dari luar." },
    ],
    question: "Bagaimana Kael menangani situasi sensitif ini, di mana ancaman datang dari seseorang dengan akses yang sepenuhnya sah secara teknis?",
    choices: [
      {
        id: "safe",
        label: "Segera membatasi akses insinyur itu ke dokumen di luar cakupan kerjanya saat ini berdasarkan kebijakan akses minimum yang berlaku bagi siapa pun, sambil berkoordinasi dengan sumber daya manusia dan hukum menangani situasi secara formal.",
        points: 3,
        result: [
          { text: "Kael segera membatasi akses insinyur itu ke dokumen riset di luar cakupan kerjanya saat ini, berdasarkan kebijakan akses minimum yang semestinya berlaku bagi siapa pun, bukan tindakan yang menyasar dirinya secara pribadi." },
          { text: "Ia berkoordinasi erat dengan tim sumber daya manusia dan hukum untuk menangani situasi ini secara formal dan adil, memastikan proses tetap mengikuti prosedur yang benar meski situasinya sensitif." },
          { text: "Dokumen riset yang sensitif berhasil terlindungi, dan penanganan yang profesional ini juga melindungi Veltrix dari potensi tuduhan tindakan sepihak yang tidak berdasar terhadap karyawan." },
        ],
      },
      {
        id: "neutral",
        label: "Menunggu dan mengamati lebih lama untuk mengumpulkan bukti lebih kuat sebelum mengambil tindakan apa pun, karena khawatir membatasi akses terlalu cepat bisa dianggap tidak adil.",
        points: -4,
        result: [
          { text: "Khawatir membatasi akses terlalu cepat akan dianggap tidak adil tanpa bukti yang lebih kuat, Kael memilih menunggu dan mengamati lebih lama sebelum mengambil tindakan apa pun." },
          { text: "Selama masa pengamatan itu, insinyur tersebut terus mengunduh lebih banyak dokumen riset, memperbesar potensi kerugian yang bisa saja sudah dicegah lebih awal dengan pembatasan akses sementara yang wajar." },
          { text: "Keseimbangan antara keadilan terhadap karyawan dan perlindungan aset perusahaan ini ternyata bisa dicapai lewat kebijakan formal, bukan dengan menunda tindakan pencegahan yang sah." },
        ],
      },
      {
        id: "risky",
        label: "Segera memecat dan mencabut seluruh akses insinyur itu tanpa proses formal, berdasarkan kecurigaan pola unduhan yang sudah terlihat jelas.",
        points: -6,
        result: [
          { text: "Yakin dengan kecurigaannya, Kael mendesak pemecatan segera dan pencabutan seluruh akses insinyur itu tanpa melalui proses formal sumber daya manusia dan hukum yang semestinya." },
          { text: "Tindakan sepihak ini, meski kecurigaannya mungkin berdasar, melanggar prosedur ketenagakerjaan yang berlaku dan membuka Veltrix terhadap risiko gugatan hukum serius dari karyawan yang merasa diperlakukan tidak adil." },
          { text: "Yang seharusnya menjadi penanganan insiden keamanan yang bersih justru berubah menjadi masalah hukum ketenagakerjaan yang jauh lebih rumit dan mahal untuk diselesaikan." },
        ],
      },
    ],
  },
};
