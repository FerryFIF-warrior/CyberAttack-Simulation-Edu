import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor5: FloorContent = {
  id: "bruteforce_level_4_floor_5",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 5,
  title: "Celah di Proses Pemulihan Setelah Lockout",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_5", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "key_1", icon: "key", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "unlock_panel_1",
      label: "Panel Pemulihan Akun Terkunci",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pertahanan utama forum kini sudah sangat kuat, lockout otomatis setelah lima percobaan gagal bekerja dengan baik. Tapi Kael mulai memeriksa satu bagian yang jarang disentuh: prosedur darurat untuk membuka kembali akun yang terkunci." },
      { text: "Ternyata, untuk membuka akun yang terkunci secara darurat, sistem hanya meminta jawaban dari satu pertanyaan keamanan sederhana, lebih lemah dibanding proses login normal yang sudah dilindungi berlapis-lapis." },
      { text: "Kael menyadari sesuatu yang ironis: semakin kuat lockout di gerbang utama, semakin menarik pula jalur pemulihan darurat ini sebagai sasaran, karena penyerang yang gagal lewat gerbang utama justru diarahkan ke jalur ini begitu akunnya dikunci." },
      { text: "Jika jalur pemulihan ini lebih lemah dari gerbang utamanya sendiri, seluruh kekuatan lockout yang dibangun bertahun-tahun bisa dilewati begitu saja lewat pintu darurat yang jarang diperhatikan." },
    ],
    question: "Apa yang akan dilakukan Kael terhadap kelemahan di jalur pemulihan darurat ini?",
    choices: [
      {
        id: "safe",
        label: "Memperkuat proses pemulihan darurat agar setara ketatnya dengan proses login normal, termasuk verifikasi berlapis.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa pintu darurat yang dibuat untuk membantu pengguna justru menjadi celah jika pengamanannya lebih lemah dari pintu utama." },
          { text: "Ia menambahkan verifikasi berlapis pada proses pemulihan darurat, menyetarakannya dengan ketatnya proses login normal, bukan lagi sekadar satu pertanyaan sederhana." },
          { text: "Jalur yang tadinya menjadi titik lemah kini sama kuatnya dengan gerbang utama, menutup celah yang selama ini tersembunyi di balik niat baik mempermudah pengguna." },
        ],
      },
      {
        id: "neutral",
        label: "Menonaktifkan sementara fitur pemulihan darurat tanpa memperbaiki mekanismenya.",
        points: -1,
        result: [
          { text: "Kael menonaktifkan sementara fitur pemulihan darurat untuk menghentikan risiko secara cepat." },
          { text: "Anggota forum yang akunnya benar-benar terkunci secara sah kini tidak punya cara memulihkan akses, sementara akar masalah pengamanannya tetap belum diperbaiki." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkannya karena lockout di gerbang utama sudah terbukti sangat kuat selama ini.",
        points: -2,
        result: [
          { text: "Kael menganggap karena lockout di gerbang utama sudah sangat kuat, jalur pemulihan darurat tidak perlu menjadi prioritas." },
          { text: "Ia tidak menyadari bahwa penyerang yang gagal di gerbang utama justru akan mencari jalan lain, dan jalur pemulihan ini adalah jalan paling jelas yang tersedia." },
          { text: "Beberapa akun berhasil diambil alih lewat jalur pemulihan darurat yang jauh lebih lemah dari gerbang utamanya sendiri." },
        ],
      },
    ],
  },
};
