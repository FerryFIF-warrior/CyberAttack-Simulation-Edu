import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel2Floor5: FloorContent = {
  id: "phishing_level_2_floor_5",
  simulationId: "phishing",
  levelNumber: 2,
  floorNumber: 5,
  title: "Ujian Akhir: Jaringan Penipuan Berlapis",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "trophy_1", icon: "trophy", x: 80, y: 25, scale: 1.6 },
      { id: "desk_3", icon: "desk", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "command_center_1",
      label: "Pusat Investigasi",
      icon: "monitor",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Tim IT kantor mengumpulkan semua laporan minggu ini, DM Mira yang dibajak, halaman login palsu, email transfer palsu, dan serangan bertarget yang tahu namanya. Semuanya ternyata berasal dari satu jaringan penipuan yang sama." },
      { text: "Kael diminta membantu menyusun simpulan akhir: pola apa yang menghubungkan keempat serangan itu, agar seluruh kantor bisa lebih waspada ke depannya." },
      { text: "Di layar, empat kasus itu ditampilkan berdampingan. Satu benang merah mulai terlihat jelas bagi Kael: setiap serangan selalu memanfaatkan kepercayaan, entah pada sahabat, pada tampilan yang familiar, pada posisi atasan, atau pada detail pribadi yang terasa meyakinkan." },
      { text: "Tim bertanya kepada Kael, bagaimana sebaiknya sikap paling tepat menghadapi pola semacam ini ke depannya, bukan hanya untuk satu kasus, tapi untuk semua kemungkinan serupa." },
    ],
    question: "Apa sikap paling tepat yang akan Kael sampaikan sebagai simpulan?",
    choices: [
      {
        id: "safe",
        label: "Selalu memverifikasi lewat jalur komunikasi terpisah, siapa pun pengirimnya dan sedekat apa pun hubungannya.",
        points: 4,
        result: [
          { text: "Kael menyampaikan satu prinsip yang konsisten di balik semua kejadian minggu ini: kepercayaan pada identitas pengirim tidak boleh didasarkan pada isi pesan itu sendiri." },
          { text: "Verifikasi lewat jalur komunikasi terpisah, baik itu telepon, aplikasi internal, atau bertemu langsung, adalah satu-satunya cara yang benar-benar bisa diandalkan." },
          { text: "Tim kantor menerapkan prinsip itu sebagai kebijakan baru, dan jaringan penipuan yang sama tidak lagi berhasil menembus siapa pun di kantor." },
          { text: "Level 2 Phishing selesai. Kael kini memahami pola di balik serangan, bukan hanya mengenali contohnya satu per satu." },
        ],
      },
      {
        id: "neutral",
        label: "Menyarankan agar lebih berhati-hati dengan email dari luar perusahaan saja.",
        points: 0,
        result: [
          { text: "Kael menyarankan kewaspadaan ekstra hanya untuk email dari luar perusahaan." },
          { text: "Saran itu membantu sebagian, tetapi tidak menjangkau kasus seperti DM yang dibajak atau email yang menyamar sebagai pihak internal." },
        ],
      },
      {
        id: "risky",
        label: "Menyarankan supaya semua pesan yang terlihat meyakinkan langsung dipercaya saja untuk menghemat waktu kerja.",
        points: -5,
        result: [
          { text: "Kael, merasa lelah dengan kewaspadaan yang menyita waktu, menyarankan untuk mempercayai saja pesan yang terlihat meyakinkan." },
          { text: "Beberapa minggu kemudian, jaringan penipuan yang sama kembali menyerang kantor, dan kali ini berhasil menipu rekan kerja lain yang mengikuti saran itu." },
          { text: "Kael menyesali sarannya, menyadari bahwa kenyamanan sesaat tidak sebanding dengan risiko yang ditimbulkannya." },
        ],
      },
    ],
  },
};
