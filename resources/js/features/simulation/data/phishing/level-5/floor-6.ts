import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor6: FloorContent = {
  id: "phishing_level_5_floor_6",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 6,
  title: "Membangun Budaya, Bukan Hanya Aturan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-emerald-100 to-teal-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "device_4", icon: "device", x: 80, y: 22, scale: 1.4 },
      { id: "cross_sign_4", icon: "cross", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "culture_board_1",
      label: "Papan Program Budaya Keamanan",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Krisis kebocoran data mereda perlahan, tapi Kael tahu luka kepercayaan di antara staf administrasi belum sembuh. Banyak dari mereka kini takut melaporkan email mencurigakan, khawatir dianggap lalai seperti yang terjadi pada rekan-rekan mereka sebelumnya." },
      { text: "Seorang perawat bahkan mengaku kepada Kael bahwa ia pernah menerima email aneh dua minggu lalu, tapi memilih diam karena takut disalahkan jika ternyata itu hanya kesalahannya sendiri." },
      { text: "Kael menyadari, aturan dan pelatihan teknis saja tidak akan pernah cukup jika budaya di baliknya membuat orang takut bicara. Keamanan yang sesungguhnya kuat butuh orang-orang yang berani melapor, bukan orang-orang yang bersembunyi dari rasa malu." },
      { text: "Direktur memberi Kael kewenangan penuh merancang satu program jangka panjang untuk membangun ulang budaya ini, dengan anggaran yang terbatas dan waktu yang juga tidak banyak." },
    ],
    question: "Program seperti apa yang sebaiknya Kael rancang untuk membangun budaya keamanan yang sehat di rumah sakit ini?",
    choices: [
      {
        id: "safe",
        label: "Membangun jalur pelaporan tanpa hukuman bagi siapa pun yang melapor email mencurigakan dengan itikad baik, termasuk yang ternyata salah duga, serta mengapresiasi keberanian melapor secara terbuka.",
        points: 3,
        result: [
          { text: "Kael merancang kebijakan 'tanpa hukuman' bagi siapa pun yang melaporkan email mencurigakan dengan itikad baik, bahkan jika laporan itu ternyata keliru atau hanya email biasa." },
          { text: "Ia memastikan setiap laporan, benar atau salah, direspons dengan apresiasi, bukan interogasi, mengubah pelaporan dari sesuatu yang menakutkan menjadi kebiasaan yang dihargai." },
          { text: "Dalam beberapa bulan, jumlah laporan email mencurigakan meningkat drastis, bukan karena ancaman meningkat, tapi karena staf akhirnya berani bicara sebelum masalah membesar." },
        ],
      },
      {
        id: "neutral",
        label: "Menambahkan lebih banyak modul pelatihan wajib tentang phishing tanpa mengubah kebijakan pelaporan yang ada.",
        points: -2,
        result: [
          { text: "Kael menambahkan lebih banyak modul pelatihan wajib tentang cara mengenali phishing, menganggap pengetahuan teknis tambahan akan cukup memperbaiki situasi." },
          { text: "Pengetahuan staf tentang ciri-ciri phishing memang meningkat, tapi rasa takut untuk melapor ketika ragu tetap tidak berubah, karena kebijakan yang membuat mereka takut disalahkan tidak pernah disentuh." },
          { text: "Email mencurigakan tetap sering dibiarkan tanpa laporan, bukan karena staf tidak tahu, melainkan karena mereka masih enggan bicara." },
        ],
      },
      {
        id: "risky",
        label: "Membuat sistem penilaian kinerja individu berdasarkan jumlah kesalahan terkait phishing, agar staf lebih waspada karena ada konsekuensi nyata.",
        points: -5,
        result: [
          { text: "Berharap konsekuensi nyata akan mendorong kewaspadaan, Kael mengusulkan sistem penilaian kinerja individu yang mencatat setiap kesalahan terkait phishing." },
          { text: "Alih-alih lebih waspada, staf administrasi justru menjadi semakin tertutup, menyembunyikan kesalahan dan keraguan mereka demi menghindari catatan buruk di penilaian kinerja." },
          { text: "Budaya saling menyalahkan tumbuh subur, dan laporan email mencurigakan yang jujur menjadi semakin langka, justru di saat rumah sakit paling membutuhkannya." },
        ],
      },
    ],
  },
};
