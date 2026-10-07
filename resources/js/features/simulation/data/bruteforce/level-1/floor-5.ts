import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor5: FloorContent = {
  id: "bruteforce_level_1_floor_5",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 5,
  title: "Ujian Akhir: Pertahanan Berlapis",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "decoration_trophy_2", x: 80, y: 25, scale: 1.6 },
      { id: "decoration_star_3", x: 15, y: 30, scale: 1.2 },
    ],
    object: { id: "object_fortress_1", label: "Benteng Pertahanan", x: 60, y: 48, interactionRadius: 8 },
  },
  story: {
    intro: [
      { text: "Kucing membangun benteng pertahanan terakhir." },
      { text: "Bot menyerang dengan 10.000 percobaan login per detik." },
      { text: "Kucing harus menggabungkan semua strategi yang telah dipelajari." },
      { text: "Kucing harus memutuskan strategi terbaik." },
    ],
    question: "Strategi apa yang paling efektif?",
    choices: [
      { id: "safe", label: "Rate limiting + account lockout + CAPTCHA + MFA + strong password policy.", points: 4, result: [{ text: "Lima lapis pertahanan aktif sekaligus." }, { text: "Bot akhirnya menyerah!" }, { text: "Level 1 Brute Force selesai!" }] },
      { id: "neutral", label: "Hanya rate limiting + strong password policy.", points: 1, result: [{ text: "Dua lapis pertahanan aktif." }, { text: "Cukup, tapi belum optimal." }] },
      { id: "risky", label: "Percayakan hanya pada password yang kuat.", points: -2, result: [{ text: "Satu lapis pertahanan tidak cukup." }, { text: "Bot berhasil menembus pertahanan." }] },
    ],
  },
};
