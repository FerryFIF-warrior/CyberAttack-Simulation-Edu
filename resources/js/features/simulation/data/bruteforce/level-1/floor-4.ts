import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor4: FloorContent = {
  id: "bruteforce_level_1_floor_4",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 4,
  title: "Lapisan Tambahan: CAPTCHA & MFA",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-green-100 to-emerald-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "decoration_robot_1", x: 80, y: 25, scale: 1.5 },
      { id: "decoration_shield_2", x: 15, y: 30, scale: 1.3 },
    ],
    object: { id: "object_captcha_1", label: "Panel CAPTCHA", x: 60, y: 48, interactionRadius: 8 },
  },
  story: {
    intro: [
      { text: "Bot masih mencoba login meski sudah ada rate limiting." },
      { text: "Kucing perlu menambah lapisan pertahanan lagi." },
      { text: "Ada dua opsi: CAPTCHA untuk saring bot dan MFA untuk verifikasi ganda." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      { id: "safe", label: "Aktifkan CAPTCHA + MFA untuk akun sensitif.", points: 4, result: [{ text: "CAPTCHA memblokir bot otomatis." }, { text: "MFA memerlukan kode dari HP user." }, { text: "Pertahanan berlapis berhasil menahan serangan!" }] },
      { id: "neutral", label: "Aktifkan CAPTCHA saja.", points: 1, result: [{ text: "CAPTCHA aktif di form login." }, { text: "Bot pintar masih bisa bypass CAPTCHA sederhana." }] },
      { id: "risky", label: "Matikan semua pertahanan agar user mudah login.", points: -2, result: [{ text: "Semua pertahanan dimatikan." }, { text: "Bot berhasil brute force dalam hitungan detik." }] },
    ],
  },
};
