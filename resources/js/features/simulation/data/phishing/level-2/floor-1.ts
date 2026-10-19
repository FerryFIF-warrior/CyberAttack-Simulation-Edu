import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel2Floor1: FloorContent = {
  id: "phishing_level_2_floor_1",
  simulationId: "phishing",
  levelNumber: 2,
  floorNumber: 1,
  title: "Pesan dari Sahabat yang Terancam",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-indigo-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "sofa_1", icon: "sofa", x: 15, y: 25, scale: 1.2 },
      { id: "plant_1", icon: "plant", x: 85, y: 22, scale: 1.3 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "laptop_dm_1",
      label: "Laptop",
      icon: "laptop",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dua minggu setelah lolos dari ujian akhir Level 1, Kael mulai merasa cukup percaya diri menghadapi email-email mencurigakan. Namun malam ini, ancaman datang dari tempat yang tidak ia duga." },
      { text: "Sebuah pesan masuk dari akun media sosial Mira, sahabat lamanya. Nada pesannya terasa panik: Kael, tolong aku. Aku kehabisan saldo buat bayar rumah sakit mendadak. Bisa pinjam dulu, transfer ke nomor ini? Nanti kuganti double." },
      { text: "Kael terdiam sejenak. Ia memang kenal Mira sejak lama, tapi ada sesuatu yang terasa aneh: Mira biasanya menelepon langsung kalau butuh bantuan mendesak, bukan mengirim pesan singkat seperti ini." },
      { text: "Jantung Kael berdebar. Jika ini benar-benar Mira dalam kesulitan, menunda bisa berarti terlambat menolong. Tapi jika ini bukan Mira, uangnya bisa melayang sia-sia." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menghubungi Mira lewat telepon atau jalur komunikasi lain sebelum mengirim apa pun.",
        points: 4,
        result: [
          { text: "Kael menahan jarinya dari tombol kirim, lalu menelepon nomor Mira yang selama ini ia simpan." },
          { text: "Mira menjawab dengan bingung: ia tidak pernah mengirim pesan semacam itu. Akun media sosialnya rupanya telah dibajak sejak kemarin malam." },
          { text: "Kael segera memberi tahu Mira untuk mengamankan akunnya, dan tidak sepeser pun uangnya melayang ke tangan yang salah." },
        ],
      },
      {
        id: "neutral",
        label: "Membalas pesan itu dengan bertanya-tanya dulu tanpa mengirim uang.",
        points: 1,
        result: [
          { text: "Kael membalas dengan beberapa pertanyaan klarifikasi, tanpa langsung mengirim uang." },
          { text: "Pengirim di balik akun itu menjawab lancar seolah benar-benar Mira, membuat Kael ragu. Ia belum terjebak, tapi juga belum benar-benar yakin apa yang sedang terjadi." },
        ],
      },
      {
        id: "risky",
        label: "Langsung mentransfer uang karena takut terlambat menolong.",
        points: -3,
        result: [
          { text: "Didorong rasa khawatir, Kael langsung mentransfer sejumlah uang ke nomor yang diberikan." },
          { text: "Pesan 'terima kasih' datang begitu cepat, terlalu cepat untuk terasa wajar." },
          { text: "Esok paginya, Mira yang asli menghubungi Kael, bingung karena tidak pernah meminta uang apa pun. Akunnya telah dibajak, dan uang Kael sudah tidak bisa ditarik kembali." },
        ],
      },
    ],
  },
};
