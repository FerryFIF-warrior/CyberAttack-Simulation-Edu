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
      { id: "decoration_server_1", x: 80, y: 25, scale: 1.5 },
      { id: "decoration_lock_1", x: 15, y: 30, scale: 1.2 },
    ],
    object: { id: "object_login_1", label: "Form Login", x: 60, y: 48, interactionRadius: 8 },
  },
  story: {
    intro: [
      { text: "Kucing menemukan form login yang masih memakai password 123456." },
      { text: "Bot penyerang mencoba login 1000 kali per detik memakai daftar password paling umum." },
      { text: "Password lemah seperti itu ada di urutan teratas dictionary attack." },
      { text: "Kucing harus memutuskan apa yang akan dilakukan." },
    ],
    question: "Apa yang akan dilakukan kucing?",
    choices: [
      { id: "safe", label: "Ganti password dengan kombinasi kuat (12+ karakter, campuran huruf, angka, simbol).", points: 4, result: [{ text: "Kucing membuat password baru yang kuat dan acak." }, { text: "Bot tidak bisa menebak dalam waktu singkat." }, { text: "Akun kucing tetap aman!" }] },
      { id: "neutral", label: "Tambahkan satu angka di akhir password: 1234567.", points: 1, result: [{ text: "Password sedikit lebih panjang." }, { text: "Bot tetap bisa menebak dengan dictionary attack." }] },
      { id: "risky", label: "Biarkan password tetap 123456.", points: -2, result: [{ text: "Bot berhasil login dalam 1 detik." }, { text: "Akun kucing berhasil diambil alih!" }] },
    ],
  },
};
