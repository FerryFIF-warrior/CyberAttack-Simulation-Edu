import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel3Floor5: FloorContent = {
  id: "bruteforce_level_3_floor_5",
  simulationId: "bruteforce",
  levelNumber: 3,
  floorNumber: 5,
  title: "Respons Insiden Skala Besar",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_5", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "team_desk_1", icon: "desk", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "war_room_panel_1",
      label: "Ruang Koordinasi Darurat",
      icon: "monitor",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Empat jalur serangan berturut-turut membuat pemilik forum sadar, ini bukan lagi masalah yang bisa ditangani satu orang sendirian. Sebuah tim darurat kecil dibentuk, dan Kael diminta memimpin koordinasinya." },
      { text: "Di tengah rapat darurat, laporan baru masuk: serangan kini mencoba lima pendekatan sekaligus dalam waktu bersamaan, memaksa tim untuk membagi perhatian ke berbagai arah tanpa bisa fokus pada satu titik saja." },
      { text: "Beberapa anggota tim mulai kewalahan, ada yang ingin segera mematikan seluruh sistem, ada yang justru ingin mendiamkan dulu sambil menunggu polanya lebih jelas." },
      { text: "Sebagai koordinator, Kael harus memutuskan bagaimana membagi tugas tim secara efektif, termasuk kapan saatnya meminta bantuan dari luar jika serangan ini ternyata di luar kemampuan mereka sendiri." },
    ],
    question: "Bagaimana Kael mengoordinasikan respons tim dalam situasi ini?",
    choices: [
      {
        id: "safe",
        label: "Membagi tim berdasarkan jalur serangan yang paling mendesak, sambil menyiapkan jalur eskalasi ke penyedia keamanan luar jika situasi memburuk.",
        points: 3,
        result: [
          { text: "Kael dengan cepat memetakan kelima jalur serangan, lalu membagi tim menjadi kelompok-kelompok kecil, masing-masing fokus menahan satu jalur sesuai urutan prioritas." },
          { text: "Ia juga menyiapkan kontak dengan penyedia layanan keamanan luar sebagai rencana cadangan, jika situasi ternyata melampaui kapasitas tim internal." },
          { text: "Koordinasi yang jelas membuat tim bisa menahan seluruh jalur serangan tanpa ada yang benar-benar lolos tanpa penanganan." },
        ],
      },
      {
        id: "neutral",
        label: "Membiarkan tiap anggota tim memilih sendiri jalur mana yang ingin mereka tangani.",
        points: -1,
        result: [
          { text: "Kael membiarkan setiap anggota tim memilih sendiri jalur serangan mana yang ingin mereka tangani." },
          { text: "Tanpa koordinasi yang jelas, dua jalur serangan ditangani oleh tiga orang sekaligus, sementara dua jalur lainnya tidak tertangani sama sekali." },
        ],
      },
      {
        id: "risky",
        label: "Mematikan seluruh sistem forum sepenuhnya tanpa membagi tugas apa pun, menunggu situasi reda sendiri.",
        points: -2,
        result: [
          { text: "Merasa kewalahan, Kael memutuskan mematikan seluruh sistem forum dan menunggu situasi reda dengan sendirinya." },
          { text: "Forum lumpuh total untuk seluruh anggotanya, sementara penyerang tetap bisa mencoba jalur-jalur lain yang belum sempat dipetakan selama sistem mati." },
          { text: "Ketika sistem dinyalakan kembali, tim masih harus menghadapi jalur serangan yang sama tanpa persiapan tambahan apa pun." },
        ],
      },
    ],
  },
};
