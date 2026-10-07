import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor4: FloorContent = {
  id: "phishing_level_1_floor_4",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 4,
  title: "Urgensi Palsu",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-red-100 to-rose-200",
    playerStart: { x: 18, y: 72 },
    decorations: [
      { id: "decoration_clock_1", x: 75, y: 20, scale: 1.5 },
      { id: "decoration_warning_1", x: 25, y: 30, scale: 1.3 },
    ],
    object: {
      id: "object_mail_1",
      label: "Email Mendesak",
      x: 55,
      y: 48,
      interactionRadius: 8,
    },
  },
  story: {
    intro: [
      { text: "Email masuk dengan subjek: URGENT! Akun akan dihapus dalam 1 jam!" },
      { text: "Email menekan kucing untuk segera klik link." },
      { text: "Pengirim: support@secure-update-account.xyz, domain tidak resmi." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      {
        id: "safe",
        label: "Tenang, cek langsung ke situs resmi tanpa lewat link.",
        points: 4,
        result: [
          { text: "Kucing tidak panik menghadapi tekanan waktu." },
          { text: "Kucing membuka situs resmi langsung, akun aman." },
          { text: "Phishing gagal karena rekayasa urgensi tidak berhasil." },
        ],
      },
      {
        id: "neutral",
        label: "Tunda dan pikirkan dulu.",
        points: 1,
        result: [
          { text: "Kucing menunda keputusan." },
          { text: "Aman, tapi kucing belum memverifikasi kebenaran email." },
        ],
      },
      {
        id: "risky",
        label: "Panik dan langsung klik link.",
        points: -2,
        result: [
          { text: "Kucing panik membaca peringatan." },
          { text: "Kucing mengklik link tanpa pikir panjang." },
          { text: "Phishing berhasil karena rekayasa sosial." },
        ],
      },
    ],
  },
};
