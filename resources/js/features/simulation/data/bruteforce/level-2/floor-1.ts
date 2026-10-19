import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel2Floor1: FloorContent = {
  id: "bruteforce_level_2_floor_1",
  simulationId: "bruteforce",
  levelNumber: 2,
  floorNumber: 1,
  title: "Kunci yang Dicuri dari Tempat Lain",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_1", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "monitor_1", icon: "monitor", x: 15, y: 28, scale: 1 },
      { id: "lamp_1", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "alert_panel_1",
      label: "Panel Peringatan",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Forum yang dijaga Kael sudah lama aman sejak pertahanan berlapis Level 1 terpasang. Tapi malam ini, sebuah peringatan baru muncul di layarnya, pola yang belum pernah ia lihat sebelumnya." },
      { text: "Ratusan akun di forum tiba-tiba mengalami percobaan login, masing-masing hanya satu atau dua kali, tapi menggunakan kombinasi email dan kata sandi yang terlihat sangat spesifik, bukan tebakan acak seperti biasanya." },
      { text: "Kael memeriksa salah satu kombinasi yang dicoba, dan jantungnya mencelos: kata sandi itu persis sama dengan yang pernah bocor dari sebuah situs belanja online tahun lalu." },
      { text: "Penyerang ini tidak menebak-nebak. Mereka menggunakan data yang sudah pernah bocor dari tempat lain, berharap banyak orang memakai kata sandi yang sama di berbagai situs." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Memaksa reset password untuk akun yang kombinasinya cocok dengan data kebocoran, dan mengimbau semua anggota tidak mendaur ulang kata sandi.",
        points: 4,
        result: [
          { text: "Kael memeriksa akun-akun yang kombinasi emailnya cocok dengan data kebocoran, lalu memaksa reset kata sandi untuk semuanya." },
          { text: "Ia juga mengirim imbauan ke seluruh anggota forum agar tidak menggunakan kata sandi yang sama di berbagai situs berbeda." },
          { text: "Serangan credential stuffing itu kehilangan efeknya, karena kata sandi lama yang bocor tidak lagi berlaku di forum." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya memantau akun yang berhasil diakses, tanpa memaksa reset password.",
        points: 1,
        result: [
          { text: "Kael memantau akun-akun yang berhasil diakses penyerang, mencatat setiap aktivitas mencurigakan." },
          { text: "Ia tahu ada masalah, tetapi tanpa reset paksa, akun-akun itu tetap rentan diakses ulang kapan saja oleh penyerang yang sama." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena masing-masing akun hanya dicoba satu dua kali, dianggap tidak berbahaya.",
        points: -2,
        result: [
          { text: "Kael menganggap serangan ini tidak berbahaya karena setiap akun hanya dicoba sekali dua kali, jauh di bawah ambang rate limiting." },
          { text: "Ia tidak menyadari bahwa justru itulah triknya, serangan yang disebar tipis ke banyak akun agar lolos dari deteksi." },
          { text: "Keesokan harinya, belasan akun dengan kata sandi daur ulang berhasil diambil alih." },
        ],
      },
    ],
  },
};
