import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor2: FloorContent = {
  id: "phishing_level_5_floor_2",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 2,
  title: "Kampanye Jangka Panjang yang Bergerak dalam Diam",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_2", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "calendar_1", icon: "calendar", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "timeline_board_1",
      label: "Papan Kronologi Akses",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Empat bulan sudah Kael bekerja di Wira Husada. Tidak ada insiden besar, hanya rutinitas yang menenangkan, sampai ia menyusun kronologi akses salah satu akun resepsionis untuk audit berkala dan menemukan sesuatu yang membuat tubuhnya membeku." },
      { text: "Akun itu, sejak dua bulan lalu, menerima email yang nyaris tidak pernah mencurigakan: newsletter kesehatan, pembaruan jadwal pelatihan, sapaan ramah dari 'rekan divisi lain'. Tidak satu pun pernah meminta apa pun yang berbahaya." },
      { text: "Namun pola akses akun itu berubah pelan-pelan setelahnya: mulai membuka folder jadwal dokter spesialis, lalu folder data pasien rawat inap, lalu akhirnya mencoba mengakses sistem billing asuransi, satu langkah kecil setiap beberapa minggu, tidak pernah cukup besar untuk memicu alarm." },
      { text: "Ini bukan serangan impulsif. Ini adalah kampanye yang dirancang untuk bergerak sepelan mungkin, membangun kepercayaan lebih dulu, lalu merambat ke sistem yang jauh lebih bernilai tanpa pernah terlihat tergesa-gesa." },
    ],
    question: "Bagaimana Kael menangani kampanye jangka panjang yang sudah bergerak selama dua bulan ini?",
    choices: [
      {
        id: "safe",
        label: "Mengisolasi akun yang terdampak dari sistem bernilai tinggi, lalu melakukan investigasi forensik menyeluruh untuk memetakan seluruh jejak pergerakan sebelum mengambil tindakan lanjutan.",
        points: 3,
        result: [
          { text: "Kael segera mengisolasi akun resepsionis itu dari akses ke sistem billing dan data pasien bernilai tinggi, tanpa menghapus jejaknya sedikit pun." },
          { text: "Ia memimpin investigasi forensik menyeluruh, memetakan setiap folder yang pernah diakses, setiap email yang menjadi pemicu perubahan perilaku akun itu." },
          { text: "Hasilnya mengungkap satu kampanye besar yang menargetkan tiga rumah sakit lain dengan pola serupa, memberi waktu berharga bagi seluruh jaringan untuk bersiap sebelum tahap akhir serangan dilancarkan." },
        ],
      },
      {
        id: "neutral",
        label: "Segera mengganti kata sandi akun yang terdampak dan menganggap masalah selesai tanpa investigasi lebih jauh.",
        points: -3,
        result: [
          { text: "Kael mengganti kata sandi akun resepsionis itu dan menandai insiden ini sebagai selesai di laporan hariannya." },
          { text: "Namun kampanye ini tidak pernah bergantung pada satu kata sandi saja, sudah ada jejak lain yang tertinggal di sistem yang sempat diaksesnya, sesuatu yang tidak pernah sempat ditemukan karena investigasi dihentikan terlalu cepat." },
          { text: "Beberapa minggu kemudian, akses mencurigakan muncul kembali dari arah yang sama sekali berbeda, memanfaatkan jejak yang luput diperiksa." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkan akun itu tetap aktif tanpa gangguan untuk mengamati lebih jauh ke mana penyerang akan bergerak, tanpa melapor ke direksi terlebih dahulu.",
        points: -6,
        result: [
          { text: "Tergoda mengamati lebih jauh tanpa melapor, Kael membiarkan akun itu tetap berjalan normal, berharap bisa menangkap pola lengkap sebelum bertindak." },
          { text: "Selama ia mengamati, penyerang justru berhasil mencapai sistem billing asuransi dan menyalin sebagian data pasien sebelum Kael sempat bertindak." },
          { text: "Keputusan membiarkan serangan berjalan tanpa persetujuan direksi, di sebuah institusi kesehatan dengan data pasien yang sensitif, menjadi pelanggaran serius yang harus dipertanggungjawabkan Kael sendiri." },
        ],
      },
    ],
  },
};
