import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor5: FloorContent = {
  id: "phishing_level_4_floor_5",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 5,
  title: "Tekanan Waktu dan Otoritas Ganda",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-rose-100 to-red-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_5", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "clock_3", icon: "clock", x: 85, y: 22, scale: 1.3 },
      { id: "phone_1", icon: "phone", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "urgent_mail_2",
      label: "Email Permintaan Transfer",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Email dari 'atasan' meminta Kael segera memproses transfer dana untuk vendor baru, dengan alasan kesepakatan mendesak yang harus selesai hari ini juga." },
      { text: "Kael teringat pelajaran lamanya: verifikasi lewat jalur kedua sebelum bertindak. Ia mencoba menghubungi nomor telepon kantor yang tertera di tanda tangan email untuk memastikan." },
      { text: "Seseorang mengangkat telepon itu, mengaku sebagai asisten atasan, dan mengonfirmasi bahwa permintaan transfer itu memang benar, bahkan menambahkan detail rekening tujuan yang sama persis dengan di email." },
      { text: "Dua sumber berbeda, email dan telepon, sama-sama membenarkan permintaan ini. Rasanya ini sudah cukup diverifikasi, bukan?" },
    ],
    question: "Apa yang akan dilakukan Kael setelah mendapat konfirmasi dari dua sumber berbeda ini?",
    choices: [
      {
        id: "safe",
        label: "Tetap memverifikasi lewat jalur ketiga yang benar-benar independen, seperti bertemu langsung atau menghubungi nomor pribadi atasan yang sudah lama tersimpan.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa nomor telepon di tanda tangan email bisa saja bagian dari rekayasa yang sama, bukan sumber yang benar-benar independen." },
          { text: "Ia menghubungi nomor pribadi atasannya yang sudah lama tersimpan di kontaknya sendiri, bukan nomor yang tertera di email." },
          { text: "Atasannya yang asli terkejut, tidak pernah mengirim email atau meminta siapa pun menelepon atas namanya hari ini. Kedua 'sumber verifikasi' tadi ternyata bagian dari rekayasa yang sama." },
        ],
      },
      {
        id: "neutral",
        label: "Menganggap dua sumber yang saling membenarkan sudah cukup sebagai verifikasi independen.",
        points: -2,
        result: [
          { text: "Kael menganggap karena email dan telepon sama-sama membenarkan, ini sudah cukup sebagai verifikasi independen." },
          { text: "Ia tidak menyadari bahwa nomor telepon di tanda tangan email bisa saja bagian dari rekayasa yang sama, bukan sumber verifikasi yang benar-benar terpisah." },
        ],
      },
      {
        id: "risky",
        label: "Segera memproses transfer karena sudah dikonfirmasi dua kali oleh dua pihak berbeda.",
        points: -3,
        result: [
          { text: "Merasa sudah cukup yakin dengan dua konfirmasi berbeda, Kael segera memproses transfer dana ke rekening yang diminta." },
          { text: "Begitu dana terkirim, baik 'atasan' di email maupun 'asisten' di telepon tidak pernah bisa dihubungi lagi." },
          { text: "Atasan yang asli baru mengetahui kejadian ini keesokan harinya, jauh setelah dana tidak bisa ditarik kembali." },
        ],
      },
    ],
  },
};
