import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel3Floor4: FloorContent = {
  id: "bruteforce_level_3_floor_4",
  simulationId: "bruteforce",
  levelNumber: 3,
  floorNumber: 4,
  title: "Menyasar API Pihak Ketiga",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_4", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "plug_1", icon: "plug", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "integration_panel_1",
      label: "Panel Integrasi Eksternal",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah gagal lewat ketiga pendekatan sebelumnya, penyerang tampaknya mengalihkan incarannya. Kael menemukan lonjakan aktivitas aneh, bukan dari form login forum, melainkan dari layanan kalender eksternal yang terhubung ke akun anggota lewat fitur integrasi." },
      { text: "Fitur itu memungkinkan anggota forum menghubungkan akun mereka ke layanan kalender pihak ketiga untuk pengingat jadwal diskusi. Sayangnya, jalur integrasi ini ternyata tidak pernah diberi pembatasan percobaan sama sekali." },
      { text: "Penyerang mencoba membobol akun lewat celah otentikasi di layanan pihak ketiga itu, berharap bisa menembus forum lewat pintu yang jarang diawasi, bukan lewat form login utama yang sudah dijaga ketat." },
      { text: "Kael menyadari, pertahanan sekuat apa pun di form login utama tidak banyak berguna jika pintu sampingnya dibiarkan terbuka lebar." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menerapkan pembatasan dan pemantauan yang setara pada seluruh jalur integrasi pihak ketiga, menyamakannya dengan form login utama.",
        points: 3,
        result: [
          { text: "Kael memeriksa seluruh fitur integrasi forum dengan layanan eksternal, memastikan setiap jalur memiliki pembatasan percobaan dan pemantauan yang sama ketatnya dengan form login utama." },
          { text: "Jalur integrasi kalender yang tadinya longgar kini ikut dilindungi, menutup celah yang sempat dimanfaatkan penyerang." },
          { text: "Percobaan lewat layanan pihak ketiga itu akhirnya terdeteksi dan dihentikan sebelum berhasil membobol satu akun pun." },
        ],
      },
      {
        id: "neutral",
        label: "Menonaktifkan sementara fitur integrasi kalender tanpa memperbaiki pengamanannya.",
        points: 1,
        result: [
          { text: "Kael menonaktifkan sementara fitur integrasi kalender untuk menghentikan serangan secara cepat." },
          { text: "Serangan memang berhenti, tapi akar masalahnya belum diperbaiki, dan fitur itu tidak bisa diaktifkan kembali tanpa risiko yang sama terulang." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena anggap integrasi pihak ketiga bukan tanggung jawab forum.",
        points: -3,
        result: [
          { text: "Kael menganggap keamanan layanan pihak ketiga bukan tanggung jawabnya, karena bukan bagian dari sistem forum itu sendiri." },
          { text: "Ia lupa bahwa begitu sebuah layanan terhubung dan dipercaya oleh forum, celah di dalamnya tetap bisa dipakai menembus data anggota forum." },
          { text: "Beberapa akun berhasil diambil alih lewat jalur integrasi yang sama sekali tidak pernah ditinjau ulang." },
        ],
      },
    ],
  },
};
