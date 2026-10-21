import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor1: FloorContent = {
  id: "bruteforce_level_5_floor_1",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 1,
  title: "Berburu Ancaman Sebelum Ia Mengetuk Pintu",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-cyan-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "vault_1", icon: "vault", x: 80, y: 22, scale: 1.4 },
      { id: "chart_1", icon: "chart", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "hunt_desk_1",
      label: "Meja Perburuan Ancaman",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael kini memegang peran baru: pemimpin tim keamanan di NusaBank Digital, platform perbankan daring dengan jutaan nasabah dan nilai transaksi harian yang menggiurkan bagi siapa pun yang berniat jahat." },
      { text: "Alih-alih menunggu alarm berbunyi, tim Kael menjalankan perburuan ancaman proaktif, menyisir log autentikasi mencari pola yang belum cukup jelas untuk memicu sistem deteksi otomatis, tapi cukup aneh untuk dicurigai mata manusia yang terlatih." },
      { text: "Satu pola kecil muncul: ribuan percobaan login tersebar di ratusan akun berbeda, masing-masing hanya satu atau dua kali percobaan per akun per hari, jauh di bawah ambang batas yang akan memicu penguncian otomatis." },
      { text: "Pola tersebar sehalus ini bukan kebetulan. Ini adalah tanda tangan khas serangan yang dirancang sengaja untuk tetap tak terlihat oleh sistem deteksi berbasis ambang batas sederhana." },
    ],
    question: "Bagaimana Kael menindaklanjuti temuan pola serangan tersebar yang nyaris tidak terlihat ini?",
    choices: [
      {
        id: "safe",
        label: "Mengaitkan seluruh percobaan tersebar itu sebagai satu kampanye tunggal berdasarkan kemiripan sumber dan waktu, lalu membangun aturan deteksi baru berbasis korelasi lintas akun, bukan ambang batas per akun.",
        points: 3,
        result: [
          { text: "Kael mengaitkan ribuan percobaan tersebar itu sebagai satu kampanye tunggal, dengan menganalisis kemiripan rentang waktu dan karakteristik sumbernya, bukan memandang tiap akun secara terpisah." },
          { text: "Ia membangun aturan deteksi baru yang mengenali pola korelasi lintas akun, menutup celah yang selama ini dimanfaatkan penyerang untuk bersembunyi di bawah ambang batas per akun." },
          { text: "Kampanye yang sedang berlangsung diam-diam itu terdeteksi dan dihentikan jauh sebelum mencapai tahap mencoba membobol akun bernilai tinggi." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat temuan ini sebagai anomali ringan untuk dipantau lebih lanjut minggu depan, tanpa tindakan segera karena belum melewati ambang batas resmi.",
        points: -3,
        result: [
          { text: "Karena belum melewati ambang batas resmi yang mewajibkan eskalasi, Kael mencatat temuan ini sebagai anomali ringan untuk dipantau nanti." },
          { text: "Selama masa tunggu itu, kampanye tersebar ini terus berjalan diam-diam, perlahan memetakan akun mana saja yang memiliki kata sandi lemah tanpa pernah terdeteksi." },
          { text: "Ketika akhirnya dipantau kembali, pola itu sudah bergeser dan sebagian jejak awal hilang, membuat investigasi jauh lebih sulit." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikan pola ini karena jumlah percobaan per akun masih sangat kecil dan sistem deteksi otomatis tidak pernah memicu peringatan apa pun.",
        points: -6,
        result: [
          { text: "Kael mempercayakan sepenuhnya pada sistem deteksi otomatis, menganggap jika tidak ada peringatan yang terpicu, berarti tidak ada ancaman nyata." },
          { text: "Kepercayaan buta pada ambang batas otomatis ini justru menjadi celah yang dimanfaatkan penyerang, yang memang merancang serangannya khusus untuk tetap berada di bawah ambang batas itu." },
          { text: "Beberapa minggu kemudian, sejumlah akun dengan kata sandi lemah yang terpetakan diam-diam akhirnya dibobol serentak." },
        ],
      },
    ],
  },
};
