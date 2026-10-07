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
      { id: "decoration_bank_1", x: 80, y: 20, scale: 1.6 },
      { id: "decoration_tree_2", x: 15, y: 25, scale: 1.2 },
    ],
    object: {
      id: "object_phone_1",
      label: "Ponsel",
      x: 55,
      y: 50,
      interactionRadius: 8,
    },
  },
  story: {
    intro: [
      { text: "Kucing mendapatkan SMS dari nomor tidak dikenal yang mengatasnamakan Bank B." },
      { text: "SMS berkata: Akun Anda diblokir. Verifikasi di bit.ly/verif-bank." },
      { text: "Pengirim: 62812-XXXX-XXXX, nomor tidak dikenal dan bukan nomor resmi bank." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      {
        id: "safe",
        label: "Buka aplikasi bank resmi langsung, bukan dari link SMS.",
        points: 4,
        result: [
          { text: "Kucing membuka aplikasi bank resmi." },
          { text: "Kucing memeriksa mutasi rekening di aplikasi resmi." },
          { text: "Akun normal, tidak ada masalah. SMS itu phishing." },
        ],
      },
      {
        id: "neutral",
        label: "Abaikan SMS dan tidak melakukan apa-apa.",
        points: 1,
        result: [
          { text: "Kucing mengabaikan SMS tersebut." },
          { text: "Kucing tidak terjebak, tapi tidak melaporkan ke bank." },
        ],
      },
      {
        id: "risky",
        label: "Klik link bit.ly dan isi form verifikasi.",
        points: -2,
        result: [
          { text: "Kucing mengklik shortlink tersebut." },
          { text: "Situs palsu meminta nomor kartu dan PIN." },
          { text: "Data perbankan kucing berpotensi dicuri." },
        ],
      },
    ],
  },
};
