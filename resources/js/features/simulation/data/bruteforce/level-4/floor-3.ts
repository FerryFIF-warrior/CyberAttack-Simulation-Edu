import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor3: FloorContent = {
  id: "bruteforce_level_4_floor_3",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 3,
  title: "Penyusupan Lewat Akun Layanan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_3", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "plug_1", icon: "plug", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "service_account_panel_1",
      label: "Panel Akun Layanan Otomatis",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah menutup celah low-and-slow, Kael memeriksa seluruh daftar akun di sistem forum, dan menemukan sesuatu yang selama ini luput dari perhatian: puluhan akun layanan otomatis, bukan milik manusia, yang dipakai sistem untuk saling berkomunikasi antar modul." },
      { text: "Akun-akun ini punya kata sandi yang jarang diganti, kadang sejak sistem pertama kali dibangun bertahun-tahun lalu, karena dianggap 'bukan akun manusia, jadi risikonya rendah'." },
      { text: "Kael memeriksa salah satu akun layanan yang bertugas mengirim notifikasi otomatis, dan menemukan percobaan login mencurigakan yang menargetkannya secara spesifik, bukan menargetkan akun anggota forum seperti biasanya." },
      { text: "Jika akun layanan ini berhasil dibobol, penyerang tidak hanya mendapat satu akun, tapi mendapat akses ke seluruh jalur komunikasi otomatis antar bagian sistem forum, sesuatu yang jauh lebih berbahaya dari satu akun anggota biasa." },
    ],
    question: "Apa yang akan dilakukan Kael terhadap risiko di akun-akun layanan otomatis ini?",
    choices: [
      {
        id: "safe",
        label: "Memperlakukan seluruh akun layanan dengan standar keamanan yang sama ketatnya dengan akun manusia, termasuk rotasi kata sandi dan pemantauan aktif.",
        points: 3,
        result: [
          { text: "Kael menyadari asumsi 'bukan akun manusia berarti risikonya rendah' justru menjadi celah besar yang selama ini luput dari perhatian." },
          { text: "Ia menerapkan rotasi kata sandi berkala untuk seluruh akun layanan, sekaligus menambahkan pemantauan aktif yang sama ketatnya seperti akun anggota forum." },
          { text: "Percobaan login yang menargetkan akun layanan otomatis itu kini langsung terdeteksi dan dihentikan sebelum sempat membobol jalur komunikasi antar sistem." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mengganti kata sandi akun layanan yang sedang diserang, tanpa meninjau akun layanan lainnya.",
        points: 1,
        result: [
          { text: "Kael hanya mengganti kata sandi akun layanan yang saat ini sedang menjadi target percobaan login." },
          { text: "Puluhan akun layanan lain yang sama rentannya, dengan kata sandi lama yang belum pernah diganti, tetap menjadi celah yang belum tersentuh." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena akun layanan dianggap bukan target yang biasa diserang penyerang nyata.",
        points: -3,
        result: [
          { text: "Kael menganggap akun layanan otomatis bukan target yang biasa diincar, sehingga tidak perlu penanganan khusus." },
          { text: "Beberapa minggu kemudian, salah satu akun layanan berhasil dibobol, memberi penyerang akses ke jalur komunikasi internal yang jauh lebih luas dibanding satu akun anggota biasa." },
        ],
      },
    ],
  },
};
