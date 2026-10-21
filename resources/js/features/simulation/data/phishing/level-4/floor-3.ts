import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor3: FloorContent = {
  id: "phishing_level_4_floor_3",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 3,
  title: "Serangan Dua Tahap",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-amber-100 to-yellow-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_3", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "cabinet_2", icon: "cabinet", x: 85, y: 22, scale: 1.3 },
      { id: "clock_1", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "mail_chain_1",
      label: "Rangkaian Dua Email",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Senin pagi, sebuah email ringan masuk ke kotak masuk Kael, hanya memperkenalkan diri sebagai konsultan baru dari mitra kerja perusahaan, menanyakan nama kontak yang tepat untuk urusan administrasi. Tidak ada permintaan apa pun yang mencurigakan, Kael membalas dengan nama rekan di bagian keuangan." },
      { text: "Tiga hari kemudian, email kedua datang, kali ini dari 'konsultan' yang sama, menyebut nama rekan keuangan yang baru saja Kael berikan, lalu meminta Kael membantu memverifikasi satu dokumen pembayaran yang katanya mendesak." },
      { text: "Karena email pertama terasa begitu wajar dan tidak berbahaya, Kael nyaris tidak curiga sama sekali pada email kedua ini, apalagi pengirimnya menyebut detail yang memang benar ia berikan sendiri sebelumnya." },
      { text: "Ini adalah serangan dua tahap: tahap pertama membangun kepercayaan tanpa meminta apa pun yang berbahaya, tahap kedua baru memanfaatkan kepercayaan itu untuk permintaan sesungguhnya." },
    ],
    question: "Bagaimana Kael menyikapi email kedua yang datang setelah tahap membangun kepercayaan ini?",
    choices: [
      {
        id: "safe",
        label: "Tetap memverifikasi identitas pengirim secara independen, meski detail yang disebutkan dalam email terdengar valid dan familiar.",
        points: 3,
        result: [
          { text: "Kael mengingatkan dirinya sendiri bahwa detail yang terdengar familiar bisa saja berasal dari percakapan sebelumnya yang justru sengaja dipancing." },
          { text: "Ia menghubungi mitra kerja lewat kontak resmi yang sudah lama tercatat, bukan membalas email kedua secara langsung." },
          { text: "Mitra kerja mengonfirmasi tidak pernah mengenal 'konsultan baru' yang mengaku dari pihak mereka. Seluruh rangkaian dua email itu ternyata rekayasa sejak awal." },
        ],
      },
      {
        id: "neutral",
        label: "Mempercayainya karena email pertama terbukti tidak berbahaya, jadi email kedua dianggap wajar lanjutannya.",
        points: -2,
        result: [
          { text: "Karena email pertama memang terbukti tidak berbahaya, Kael menganggap email kedua ini wajar sebagai lanjutan percakapan yang sama." },
          { text: "Ia tidak menyadari bahwa justru itulah tujuan dari email pertama, membangun rasa aman yang akan dimanfaatkan pada permintaan sesungguhnya." },
        ],
      },
      {
        id: "risky",
        label: "Langsung membantu memverifikasi dokumen pembayaran karena pengirimnya sudah dikenal sejak beberapa hari lalu.",
        points: -3,
        result: [
          { text: "Merasa sudah mengenal pengirimnya sejak beberapa hari lalu, Kael langsung membantu memverifikasi dokumen pembayaran yang diminta." },
          { text: "Dokumen itu ternyata berisi tautan yang mengarah ke halaman pencuri kredensial, disamarkan sebagai sistem verifikasi pembayaran." },
          { text: "Kael baru menyadari kesalahannya setelah kredensial kerjanya sempat digunakan dari lokasi yang tidak dikenalnya." },
        ],
      },
    ],
  },
};
