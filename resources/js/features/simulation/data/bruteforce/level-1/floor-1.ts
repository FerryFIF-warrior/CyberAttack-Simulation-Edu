import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor1: FloorContent = {
  id: "bruteforce_level_1_floor_1",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 1,
  title: "Serangan Dictionary: Password Lemah",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_1", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "plant_1", icon: "plant", x: 15, y: 28, scale: 1 },
      { id: "lamp_1", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "login_1",
      label: "Form Login",
      icon: "lock",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael baru saja diangkat menjadi penjaga sistem untuk sebuah forum komunitas kecil. Tugas pertamanya: memeriksa keamanan form login." },
      { text: "Saat memeriksa log sistem, ia menemukan akun miliknya sendiri masih memakai kata sandi 123456, peninggalan saat akun itu pertama dibuat." },
      { text: "Di saat yang sama, ia melihat lonjakan aneh di log: sebuah bot sedang mencoba login seribu kali per detik, menggunakan daftar kata sandi paling umum di dunia." },
      { text: "Jika kata sandinya masih sesederhana itu, akunnya bisa jadi korban pertama." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Ganti password dengan kombinasi kuat (12+ karakter, campuran huruf, angka, simbol).",
        points: 4,
        result: [
          { text: "Kael segera mengganti kata sandinya dengan kombinasi panjang yang sulit ditebak." },
          { text: "Bot yang mencoba daftar kata sandi umum tidak menemukan satu pun yang cocok." },
          { text: "Akun Kael tetap aman, dan ia mulai memikirkan pertahanan tambahan untuk seluruh sistem." },
        ],
      },
      {
        id: "neutral",
        label: "Menambahkan satu angka di akhir password: '1234567'.",
        points: 1,
        result: [
          { text: "Kael hanya menambahkan satu angka di akhir kata sandi lamanya." },
          { text: "Kata sandinya sedikit lebih panjang, tetapi daftar kata sandi umum milik bot tetap bisa menebaknya dalam waktu singkat." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkan password tetap '123456'.",
        points: -2,
        result: [
          { text: "Kael menunda penggantian kata sandi karena merasa belum ada yang terjadi." },
          { text: "Beberapa detik kemudian, bot tersebut berhasil menebak kata sandinya dan masuk ke dalam akun." },
          { text: "Akun Kael berhasil diambil alih sebelum ia sempat bertindak." },
        ],
      },
    ],
  },
};
