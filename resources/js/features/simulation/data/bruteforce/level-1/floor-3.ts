import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel1Floor3: FloorContent = {
  id: "bruteforce_level_1_floor_3",
  simulationId: "bruteforce",
  levelNumber: 1,
  floorNumber: 3,
  title: "Kunci Akun dengan Account Lockout",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_3", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "plant_3", icon: "plant", x: 15, y: 28, scale: 1 },
      { id: "lamp_3", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "admin_panel_1",
      label: "Admin Panel",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Rate limiting berhasil memperlambat bot, tetapi tidak sepenuhnya menghentikannya. Bot kini mengubah taktik, mencoba lebih pelan namun lebih gigih." },
      { text: "Sistem mendeteksi lebih dari 50 percobaan login gagal dalam satu menit, semuanya mengincar satu akun yang sama." },
      { text: "Kael membuka admin panel dan menemukan opsi account lockout, fitur yang bisa mengunci sementara akun setelah sejumlah percobaan gagal." },
      { text: "Ia harus memilih strategi lockout yang tepat, cukup ketat untuk menghentikan bot, tapi tidak sampai menyulitkan pemilik akun yang sah." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Kunci akun selama 30 menit setelah 5 percobaan gagal, plus notifikasi email ke user.",
        points: 4,
        result: [
          { text: "Kael mengatur akun untuk terkunci otomatis selama 30 menit setelah 5 kali percobaan login gagal." },
          { text: "Pemilik akun yang sah langsung mendapat notifikasi email begitu lockout terjadi." },
          { text: "Serangan brute force terhenti, sementara pemilik akun yang sebenarnya tetap bisa memulihkan aksesnya dengan mudah." },
        ],
      },
      {
        id: "neutral",
        label: "Kunci permanen setelah 5 percobaan gagal.",
        points: 1,
        result: [
          { text: "Kael mengatur akun untuk terkunci permanen setelah 5 kali percobaan gagal." },
          { text: "Bot memang berhenti, tetapi pemilik akun yang sah pun harus menghubungi admin secara manual untuk membuka kembali aksesnya." },
        ],
      },
      {
        id: "risky",
        label: "Tidak mengunci akun, hanya mengganti password default.",
        points: -2,
        result: [
          { text: "Kael mengira mengganti kata sandi default saja sudah cukup, tanpa menambahkan lockout." },
          { text: "Bot tetap bebas mencoba berulang kali tanpa ada yang menghentikannya." },
          { text: "Dengan cukup waktu, bot akhirnya berhasil mengambil alih akun yang menjadi targetnya." },
        ],
      },
    ],
  },
};
