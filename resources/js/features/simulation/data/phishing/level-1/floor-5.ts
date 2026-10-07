import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor5: FloorContent = {
  id: "phishing_level_1_floor_5",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 5,
  title: "Ujian Akhir: Detektif Email",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "decoration_trophy_1", x: 80, y: 25, scale: 1.6 },
      { id: "decoration_star_1", x: 15, y: 30, scale: 1.2 },
    ],
    object: {
      id: "object_inbox_1",
      label: "Inbox Penuh",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },
  story: {
    intro: [
      { text: "Inbox kucing penuh. Ada 4 email mencurigakan yang harus diperiksa." },
      { text: "Kucing diminta mengidentifikasi semua ciri phishing yang telah dipelajari." },
      { text: "Ini ujian akhir Level 1: email hadiah palsu, link bank palsu, lampiran berbahaya, dan urgensi palsu." },
      { text: "Kucing harus memutuskan tautan mana yang aman." },
    ],
    question: "Manakah link yang dapat dipercaya dan aman untuk dibuka?",
    choices: [
      {
        id: "safe",
        label: "https://support.google.com/mail/answer",
        points: 4,
        result: [
          { text: "Kucing memeriksa 4 aspek phishing dengan teliti." },
          { text: "Semua email teridentifikasi sebagai phishing!" },
          { text: "Level 1 Phishing selesai!" },
        ],
      },
      {
        id: "neutral",
        label: "Hapus semua tanpa memeriksa.",
        points: 1,
        result: [
          { text: "Semua email dihapus." },
          { text: "Aman, tapi kucing tidak belajar membedakan pola phishing." },
        ],
      },
      {
        id: "risky",
        label: "http://bit.ly/verify-your-account",
        points: -2,
        result: [
          { text: "Kucing membuka shortlink tersebut dan muncul tombol NEXT." },
          { text: "Sembari diarahkan ke halaman lain, browser disisipi file Code-verify-your-account.zip." },
          { text: "Kucing mengekstrak file dan malware aktif. Data kucing terancam dicuri." },
        ],
      },
    ],
  },
};
