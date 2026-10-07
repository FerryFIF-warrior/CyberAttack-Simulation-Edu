import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor2: FloorContent = {
  id: "bruteforce_level_1_floor_2",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 2,
  title: "Menahan Serangan dengan Rate Limiting",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-slate-300 to-blue-200",
    playerStart: { x: 15, y: 75 },
    decorations: [
      { id: "decoration_shield_1", x: 80, y: 20, scale: 1.6 },
      { id: "decoration_clock_1", x: 20, y: 30, scale: 1.3 },
    ],
    object: { id: "object_firewall_1", label: "Panel Firewall", x: 60, y: 48, interactionRadius: 8 },
  },
  story: {
    intro: [
      { text: "Bot terus mencoba login tanpa henti setelah gagal menebak password." },
      { text: "Kucing menemukan panel firewall yang bisa dikonfigurasi." },
      { text: "Ada opsi untuk membatasi jumlah percobaan login per menit per IP." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      { id: "safe", label: "Aktifkan rate limiting: maksimal 5 percobaan login per menit per IP.", points: 4, result: [{ text: "Rate limiting aktif di firewall." }, { text: "Bot melambat drastis karena diblokir sementara." }, { text: "Brute force tidak lagi efektif." }] },
      { id: "neutral", label: "Catat log percobaan saja tanpa membatasi.", points: 1, result: [{ text: "Log percobaan login tercatat." }, { text: "Bot tetap bisa mencoba tanpa hambatan." }] },
      { id: "risky", label: "Nonaktifkan login sementara untuk semua user.", points: -2, result: [{ text: "Semua user tidak bisa login sama sekali." }, { text: "Terjadi denial of service terhadap user sah." }] },
    ],
  },
};
