import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor3: FloorContent = {
  id: "bruteforce_level_1_floor_3",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 3,
  title: "Kunci Akun dengan Account Lockout",
  maxPoints: 4,
  map: {
    backgroundClass: "bg-gradient-to-b from-orange-100 to-red-200",
    playerStart: { x: 18, y: 72 },
    decorations: [
      { id: "decoration_lock_2", x: 75, y: 25, scale: 1.5 },
      { id: "decoration_user_1", x: 15, y: 30, scale: 1.2 },
    ],
    object: { id: "object_admin_panel", label: "Admin Panel", x: 60, y: 48, interactionRadius: 8 },
  },
  story: {
    intro: [
      { text: "Sistem mendeteksi 50 percobaan login gagal dalam 1 menit." },
      { text: "Kucing harus memilih strategi account lockout yang tepat." },
      { text: "Opsi konfigurasi tersedia di admin panel." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      { id: "safe", label: "Lock akun selama 30 menit setelah 5 percobaan gagal, plus notifikasi email ke user.", points: 4, result: [{ text: "Akun terkunci otomatis setelah 5 percobaan gagal." }, { text: "User sah mendapat notifikasi email." }, { text: "Brute force terhenti, user sah tetap bisa pulih." }] },
      { id: "neutral", label: "Lock permanen setelah 5 percobaan gagal.", points: 1, result: [{ text: "Akun terkunci permanen." }, { text: "User sah harus menghubungi admin untuk membuka." }] },
      { id: "risky", label: "Tidak lock, hanya ganti password default.", points: -2, result: [{ text: "Bot tetap bisa terus mencoba." }, { text: "Akun kucing berhasil diambil alih." }] },
    ],
  },
};
