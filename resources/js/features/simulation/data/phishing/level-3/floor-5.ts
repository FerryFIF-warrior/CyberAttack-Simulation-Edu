import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel3Floor5: FloorContent = {
  id: "phishing_level_3_floor_5",
  simulationId: "phishing",
  levelNumber: 3,
  floorNumber: 5,
  title: "Tekanan dari Dalam",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-rose-100 to-red-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_5", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "badge_board_1", icon: "board", x: 85, y: 22, scale: 1.3 },
      { id: "clock_3", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "security_mail_1",
      label: "Email Tim Keamanan",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah jebakan rapat virtual gagal, Kael menduga penyerang akan mencoba sesuatu yang lebih licik lagi. Dugaannya benar. Email baru masuk, kali ini mengatasnamakan tim keamanan internal tempat Kael sendiri bernaung." },
      { text: "Isinya meminta seluruh anggota tim segera memverifikasi ulang akun mereka lewat formulir khusus, sebagai respons atas 'insiden kebocoran kredensial' yang baru terdeteksi." },
      { text: "Ironisnya, email ini memanfaatkan rasa patuh yang justru ditanamkan tim keamanan sendiri selama ini, kebiasaan untuk segera bertindak begitu ada peringatan keamanan." },
      { text: "Kael merasakan dilema yang aneh: jika ia ragu pada email dari timnya sendiri, apakah itu berarti ia terlalu paranoid? Tapi jika ia langsung percaya, bukankah itu justru celah yang sama seperti yang selalu ia ajarkan untuk diwaspadai?" },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Mengonfirmasi langsung ke rekan satu tim keamanan lewat jalur internal, bukan membalas atau mengklik apa pun di email.",
        points: 3,
        result: [
          { text: "Kael mengetuk meja rekan setimnya yang duduk tidak jauh darinya, menanyakan apakah mereka baru saja mengirim email verifikasi mendesak." },
          { text: "Rekannya kaget, tidak ada insiden kebocoran kredensial apa pun yang sedang ditangani tim hari ini." },
          { text: "Email itu ternyata tiruan yang sangat meyakinkan, memanfaatkan nama tim keamanan untuk menyerang dari dalam kepercayaan yang mereka bangun sendiri." },
        ],
      },
      {
        id: "neutral",
        label: "Mengisi formulir verifikasi tapi hanya dengan data minimal, tidak dengan kata sandi lengkap.",
        points: -2,
        result: [
          { text: "Kael mengisi formulir itu dengan data minimal, berpikir ini cara aman di tengah keraguannya." },
          { text: "Ternyata formulir itu dirancang untuk mencatat pola ketik dan email aktif, cukup untuk dipakai menyusun serangan susulan yang lebih bertarget." },
        ],
      },
      {
        id: "risky",
        label: "Segera mengisi formulir verifikasi lengkap karena emailnya mengatasnamakan timnya sendiri.",
        points: -3,
        result: [
          { text: "Karena emailnya terasa begitu dekat dengan timnya sendiri, Kael mengisi formulir verifikasi itu secara lengkap tanpa curiga." },
          { text: "Data yang ia masukkan langsung terkirim ke pihak yang menyamar sebagai tim keamanan." },
          { text: "Butuh waktu berhari-hari sebelum tim benar-benar menyadari bahwa salah satu dari mereka sendiri telah menjadi korban penyamaran ini." },
        ],
      },
    ],
  },
};
