import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor2: FloorContent = {
  id: "phishing_level_1_floor_2",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 2,
  title: "SMS Phishing Mengatasnamakan Bank",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-blue-100 to-sky-200",
    playerStart: { x: 15, y: 75 },
    decorations: [
      { id: "bank_1", icon: "bank", x: 80, y: 20, scale: 1.6 },
      { id: "tree_2", icon: "tree", x: 15, y: 25, scale: 1.2 },
      { id: "bench_1", icon: "bench", x: 50, y: 85, scale: 1 },
      { id: "lamp_2", icon: "lamp", x: 35, y: 15, scale: 1 },
    ],
    object: {
      id: "phone_1",
      label: "Ponsel",
      icon: "phone",
      x: 55,
      y: 50,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Sore harinya, ponsel Kael bergetar. Satu pesan masuk dari nomor yang tidak ia kenal, mengatasnamakan Bank B." },
      { text: "Pesan itu berbunyi: Akun Anda diblokir karena aktivitas mencurigakan. Verifikasi segera di bit.ly/verif-bank agar tidak kehilangan akses." },
      { text: "Kael memeriksa nomor pengirim: 62812-XXXX-XXXX, bukan nomor resmi bank yang biasa mengirim notifikasi padanya." },
      { text: "Setelah kejadian email hadiah kemarin, Kael jadi lebih waspada. Ia mengingat satu hal: bank tidak pernah meminta verifikasi lewat tautan singkat seperti itu." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Buka aplikasi bank resmi langsung, bukan dari link SMS.",
        points: 4,
        result: [
          { text: "Kael mengabaikan tautan di SMS dan membuka aplikasi bank resminya sendiri." },
          { text: "Ia memeriksa mutasi dan status akunnya langsung dari sana." },
          { text: "Akunnya baik-baik saja. SMS tadi memang phishing, dan Kael tidak terpancing." },
        ],
      },
      {
        id: "neutral",
        label: "Abaikan SMS dan tidak melakukan apa-apa.",
        points: 1,
        result: [
          { text: "Kael memilih tidak membalas maupun membuka tautan itu." },
          { text: "Ia aman untuk saat ini, tetapi tidak melaporkan nomor tersebut ke pihak bank." },
        ],
      },
      {
        id: "risky",
        label: "Klik link bit.ly dan isi form verifikasi.",
        points: -4,
        result: [
          { text: "Karena takut akunnya benar-benar diblokir, Kael mengklik tautan singkat itu." },
          { text: "Halaman yang muncul meminta nomor kartu dan PIN untuk verifikasi." },
          { text: "Begitu ia mengisinya, data perbankan Kael langsung berada di tangan yang salah." },
        ],
      },
    ],
  },
};
