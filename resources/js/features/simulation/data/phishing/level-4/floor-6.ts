import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor6: FloorContent = {
  id: "phishing_level_4_floor_6",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 6,
  title: "Insiden yang Disamarkan sebagai Latihan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-sky-100 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_6", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "banner_drill_1", icon: "banner", x: 85, y: 22, scale: 1.3 },
      { id: "clock_4", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "drill_mail_1",
      label: "Email Pengumuman Latihan",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Sebuah email masuk dari alamat yang mengatasnamakan tim keamanan, mengumumkan bahwa perusahaan akan menjalankan 'latihan simulasi phishing resmi' minggu ini, dan meminta setiap karyawan menyelesaikan satu tautan pengujian sebagai bagian dari latihan." },
      { text: "Kael pernah mendengar perusahaan memang sesekali mengadakan latihan semacam ini untuk menguji kewaspadaan karyawan, jadi pengumuman ini tidak terdengar aneh sama sekali." },
      { text: "Email itu bahkan menyebutkan, dengan nada santai, bahwa mengklik tautan dan mengisi data pengujian adalah hal yang wajar dan diharapkan, karena 'ini hanya latihan, tidak ada risiko nyata'." },
      { text: "Justru di situlah licinnya serangan ini: dengan mengklaim dirinya sebagai latihan resmi, email ini sengaja menurunkan kewaspadaan yang biasanya muncul saat seseorang menerima permintaan mencurigakan." },
    ],
    question: "Bagaimana Kael menyikapi pengumuman latihan yang mencurigakan ini?",
    choices: [
      {
        id: "safe",
        label: "Memverifikasi ke tim keamanan internal yang sesungguhnya apakah latihan ini benar-benar sedang berjalan, sebelum mengklik apa pun.",
        points: 3,
        result: [
          { text: "Kael tidak langsung percaya hanya karena email itu mengklaim sebagai latihan resmi. Ia bertanya langsung ke tim keamanan internal lewat jalur komunikasi yang sudah lama terverifikasi." },
          { text: "Tim keamanan menegaskan, tidak ada latihan simulasi phishing yang dijadwalkan minggu ini." },
          { text: "Email itu ternyata serangan sungguhan yang menyamar sebagai latihan, memanfaatkan rasa aman yang muncul begitu sesuatu diberi label 'hanya pengujian'." },
        ],
      },
      {
        id: "neutral",
        label: "Mengklik tautan tapi tidak mengisi data apa pun, hanya untuk melihat tampilannya.",
        points: -1,
        result: [
          { text: "Kael mengklik tautan itu hanya untuk melihat tampilannya, tanpa benar-benar mengisi data apa pun." },
          { text: "Sekadar membuka tautan itu saja ternyata sudah cukup untuk mencatat informasi perangkat dan alamat Kael, informasi yang bisa dipakai untuk tahap serangan berikutnya." },
        ],
      },
      {
        id: "risky",
        label: "Mengisi data pengujian dengan lengkap karena percaya ini memang latihan resmi dari perusahaan sendiri.",
        points: -3,
        result: [
          { text: "Karena yakin ini latihan resmi, Kael mengisi seluruh data pengujian yang diminta dengan lengkap dan tanpa ragu." },
          { text: "Data yang ia masukkan ternyata langsung terkirim ke pihak yang menyamar sebagai tim keamanan, bukan latihan sungguhan." },
          { text: "Butuh waktu beberapa hari sebelum perusahaan menyadari bahwa 'latihan' itu sebenarnya serangan nyata yang berhasil menipu banyak karyawan sekaligus." },
        ],
      },
    ],
  },
};
