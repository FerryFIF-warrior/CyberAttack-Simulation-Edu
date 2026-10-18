import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor4: FloorContent = {
  id: "phishing_level_1_floor_4",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 4,
  title: "Urgensi Palsu",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-red-100 to-rose-200",
    playerStart: { x: 18, y: 72 },
    decorations: [
      { id: "clock_1", icon: "clock", x: 75, y: 20, scale: 1.5 },
      { id: "warning_1", icon: "warning", x: 25, y: 30, scale: 1.3 },
      { id: "tree_4", icon: "tree", x: 50, y: 85, scale: 1 },
      { id: "lamp_4", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "mail_1",
      label: "Email Mendesak",
      icon: "mail",
      x: 55,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Malam itu, sebuah email masuk dengan subjek besar-besar: PENTING! Akun Anda akan dihapus dalam 1 jam!" },
      { text: "Isinya mendesak Kael untuk segera mengklik tautan verifikasi sebelum waktu habis, lengkap dengan hitungan mundur yang menakutkan." },
      { text: "Kael memeriksa pengirimnya: support@secure-update-account.xyz, sebuah domain yang tidak pernah ia lihat sebelumnya." },
      { text: "Jantungnya sempat berdebar melihat ancaman waktu, tetapi ia teringat tiga kejadian sebelumnya: hadiah palsu, SMS bank palsu, dan lampiran berbahaya. Semuanya punya satu pola yang sama." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Tetap tenang, lalu memeriksa langsung ke situs resmi tanpa melalui link di email.",
        points: 4,
        result: [
          { text: "Kael menarik napas dan tidak membiarkan rasa panik mengambil alih keputusannya." },
          { text: "Ia membuka situs resmi layanannya secara mandiri, bukan lewat tautan di email." },
          { text: "Akunnya baik-baik saja, tidak ada ancaman penghapusan apa pun. Tekanan waktu di email itu hanyalah taktik untuk membuatnya gegabah." },
        ],
      },
      {
        id: "neutral",
        label: "Menunda keputusan dan memikirkannya dulu.",
        points: 1,
        result: [
          { text: "Kael memilih tidak membalas apa pun malam itu dan menunda keputusannya sampai esok hari." },
          { text: "Ia memang tidak terjebak, tetapi juga belum melakukan apa pun untuk memastikan atau melaporkan email tersebut." },
        ],
      },
      {
        id: "risky",
        label: "Panik dan langsung mengklik link.",
        points: -4,
        result: [
          { text: "Hitungan mundur di layar membuat Kael panik dan berpikir pendek." },
          { text: "Tanpa memeriksa lebih jauh, ia langsung mengklik tautan di dalam email itu." },
          { text: "Taktik tekanan waktu itu berhasil. Kael baru sadar setelah diminta memasukkan kata sandinya di halaman yang mencurigakan." },
        ],
      },
    ],
  },
};
