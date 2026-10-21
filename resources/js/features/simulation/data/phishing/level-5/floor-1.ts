import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor1: FloorContent = {
  id: "phishing_level_5_floor_1",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 1,
  title: "Threat Intelligence: Mengenali Pelaku, Bukan Hanya Emailnya",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_1", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "cross_sign_1", icon: "cross", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "intel_desk_1",
      label: "Meja Analisis Ancaman",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Rumah Sakit Wira Husada baru saja menandatangani kontrak dengan Kael sebagai konsultan keamanan siber tetap. Bukan tugas kecil: ribuan rekam medis, data asuransi, dan jaringan alat medis yang terhubung ke internet, semuanya berada dalam satu ekosistem yang rapuh." },
      { text: "Direktur IT menyerahkan satu arsip berisi insiden phishing yang pernah menimpa rumah sakit lain di tahun-tahun terakhir, kasus demi kasus, dari klinik kecil hingga jaringan rumah sakit besar." },
      { text: "Kael tidak membaca arsip itu sebagai kumpulan cerita lama. Ia mencari pola: siapa yang selalu jadi sasaran pertama, metode apa yang berulang dipakai, dan kapan biasanya serangan ini meningkat intensitasnya." },
      { text: "Satu pola menonjol tajam: penyerang yang menyasar sektor kesehatan hampir selalu dimulai dari staf administrasi, bukan dokter atau direksi, karena akses mereka ke sistem penjadwalan dan data pasien sering kali kurang diawasi ketat." },
    ],
    question: "Bagaimana Kael memanfaatkan pola dari data historis ini untuk membangun pertahanan rumah sakit?",
    choices: [
      {
        id: "safe",
        label: "Memetakan profil risiko berdasarkan pola historis, lalu memperkuat pengawasan khusus pada akun staf administrasi sebagai titik masuk yang paling sering disasar.",
        points: 3,
        result: [
          { text: "Kael menyusun profil ancaman berbasis data: siapa yang paling sering jadi sasaran awal, metode apa yang berulang digunakan, dan jalur mana yang paling sering dimanfaatkan untuk bergerak lebih dalam." },
          { text: "Ia memprioritaskan pengawasan tambahan untuk akun staf administrasi, bukan menyebar sumber daya secara merata ke seluruh karyawan tanpa arah." },
          { text: "Beberapa minggu kemudian, upaya awal penyusupan lewat akun resepsionis langsung terdeteksi berkat pemantauan tambahan yang sudah disiapkan lebih dulu." },
        ],
      },
      {
        id: "neutral",
        label: "Membagikan ringkasan pola serangan ke seluruh karyawan lewat buletin internal, tanpa mengubah prioritas pengawasan teknis apa pun.",
        points: -2,
        result: [
          { text: "Kael membagikan ringkasan pola serangan ke seluruh karyawan lewat buletin internal, berharap kesadaran saja sudah cukup." },
          { text: "Kesadaran memang sedikit meningkat, tapi tanpa penyesuaian prioritas pengawasan teknis, titik paling rentan, akun staf administrasi, tetap tidak mendapat perlindungan tambahan yang nyata." },
          { text: "Pola yang sudah diketahui sejak awal itu tetap menjadi celah terbuka ketika serangan sesungguhnya tiba." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikan data historis karena menganggap setiap rumah sakit punya situasi berbeda dan pola lama belum tentu berlaku di sini.",
        points: -5,
        result: [
          { text: "Kael menolak memakai data historis sebagai acuan, beralasan setiap rumah sakit punya konteks dan sistem yang berbeda-beda." },
          { text: "Keputusan ini membuang satu aset paling berharga yang dimiliki tim keamanan: pelajaran dari insiden yang sudah pernah terjadi di tempat lain." },
          { text: "Ketika serangan datang persis mengikuti pola lama, lewat akun staf administrasi yang tidak pernah diberi perhatian tambahan, rumah sakit sama sekali tidak siap menghadapinya." },
        ],
      },
    ],
  },
};
