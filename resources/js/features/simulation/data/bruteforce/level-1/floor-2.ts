import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor2: FloorContent = {
  id: "bruteforce_level_1_floor_2",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 2,
  title: "Menahan Serangan dengan Rate Limiting",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_2", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "plant_2", icon: "plant", x: 15, y: 28, scale: 1 },
      { id: "lamp_2", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "firewall_1",
      label: "Panel Firewall",
      icon: "shield",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kata sandinya sendiri memang sudah aman sekarang, tetapi bot yang sama masih terus mencoba login ke akun-akun lain di forum, tanpa henti." },
      { text: "Kael membuka panel firewall milik sistem dan menemukan bahwa belum ada batasan sama sekali untuk jumlah percobaan login." },
      { text: "Di panel itu tersedia opsi untuk membatasi jumlah percobaan login per menit dari setiap alamat IP." },
      { text: "Jika dibiarkan tanpa batas, bot bisa terus mencoba ribuan kali tanpa ada yang menghentikannya." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Aktifkan rate limiting: maksimal 5 percobaan login per menit per IP.",
        points: 4,
        result: [
          { text: "Kael mengaktifkan rate limiting dengan batas 5 percobaan login per menit untuk setiap alamat IP." },
          { text: "Begitu batas tercapai, bot langsung diblokir sementara dan harus menunggu sebelum mencoba lagi." },
          { text: "Kecepatan serangan bot melambat drastis, dan brute force tidak lagi efektif terhadap forum." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat log percobaan saja tanpa membatasi.",
        points: 1,
        result: [
          { text: "Kael hanya mengaktifkan pencatatan log untuk setiap percobaan login yang gagal." },
          { text: "Ia jadi tahu bot itu masih aktif, tetapi tanpa batasan apa pun, bot tetap bebas mencoba sebanyak yang ia mau." },
        ],
      },
      {
        id: "risky",
        label: "Menonaktifkan login sementara untuk semua user.",
        points: -2,
        result: [
          { text: "Kael memilih jalan pintas dengan mematikan fitur login untuk seluruh pengguna." },
          { text: "Bot memang tidak bisa mencoba login sama sekali, tetapi anggota forum yang sah juga ikut terkunci keluar." },
          { text: "Forum mengalami gangguan layanan menyeluruh akibat keputusan itu." },
        ],
      },
    ],
  },
};
