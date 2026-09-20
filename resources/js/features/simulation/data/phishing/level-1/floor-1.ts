import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor1: FloorContent = {
  id: "phishing_level_1_floor_1",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 1,
  title: "Email Hadiah Palsu",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-sky-200 to-green-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "decoration_tree_1", x: 10, y: 20, scale: 1.2 },
      { id: "decoration_house_1", x: 85, y: 25, scale: 1.4 },
    ],
    object: {
      id: "object_mailbox_1",
      label: "Kotak Surat",
      x: 65,
      y: 45,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kucing menemukan sebuah email di kotak surat." },
      { text: "Email berkata bahwa kucing memenangkan hadiah dan harus mengklik sebuah link." },
      { text: "Alamat pengirim terlihat mencurigakan." },
      { text: "Kucing harus memutuskan tindakan yang akan diambil." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      {
        id: "safe",
        label: "Tidak mengklik link, melaporkan email sebagai phishing, lalu menghapusnya.",
        points: 4,
        result: [
          { text: "Kucing tidak mengklik link tersebut." },
          { text: "Kucing melaporkan email sebagai phishing." },
          { text: "Akun tetap aman." },
        ],
      },
      {
        id: "neutral",
        label: "Mengabaikan email tanpa melaporkan.",
        points: 1,
        result: [
          { text: "Kucing mengabaikan email tersebut." },
          { text: "Kucing tidak terjebak, tetapi email phishing masih dapat menyerang pengguna lain." },
        ],
      },
      {
        id: "risky",
        label: "Mengklik link dan mengisi data akun.",
        points: -2,
        result: [
          { text: "Kucing mengklik link tersebut." },
          { text: "Kucing memasukkan data akun." },
          { text: "Data akun berpotensi dicuri." },
        ],
      },
    ],
  },
};