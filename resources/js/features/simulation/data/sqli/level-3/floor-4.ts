import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel3Floor4: FloorContent = {
  id: "sqli_level_3_floor_4",
  simulationId: "sqli",
  levelNumber: 3,
  floorNumber: 4,
  title: "Jejak yang Bukan Miliknya",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_4", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_4", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "access_log_1",
      label: "Log Akses Sistem",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Saat memeriksa log akses sistem untuk melengkapi dokumentasi pengujiannya, Kael menemukan sesuatu yang membuat darahnya berdesir: ada pola permintaan yang nyaris identik dengan teknik yang baru saja ia temukan sendiri, tapi dikirim dari alamat yang sama sekali bukan miliknya." },
      { text: "Pola itu tercatat sejak dua minggu lalu, jauh sebelum Kael memulai pengujian resminya. Seseorang lain sudah lebih dulu menemukan dan mencoba memanfaatkan celah yang sama." },
      { text: "Ini mengubah segalanya. Yang tadinya murni pengujian keamanan terjadwal, kini berisiko menjadi perlombaan melawan waktu, karena pihak tak dikenal itu mungkin sudah berhasil mengambil sesuatu sebelum celahnya ditambal." },
      { text: "Kael harus memutuskan dengan cepat, bagaimana menangani temuan ini tanpa mengacaukan bukti forensik yang mungkin masih tersisa di log sistem." },
    ],
    question: "Apa yang akan dilakukan Kael begitu menemukan jejak pihak lain ini?",
    choices: [
      {
        id: "safe",
        label: "Segera menghentikan pengujian lanjutan, mengamankan log sebagai bukti, dan melaporkannya sebagai insiden nyata kepada pemilik sistem.",
        points: 3,
        result: [
          { text: "Kael langsung menghentikan sesi pengujiannya sendiri agar tidak tercampur dengan jejak yang sudah ada di log." },
          { text: "Ia mengamankan salinan log sebagai bukti, lalu segera melaporkan temuan ini kepada pemilik sistem sebagai insiden keamanan nyata, bukan lagi sekadar temuan pengujian terjadwal." },
          { text: "Pemilik sistem segera menyelidiki lebih lanjut, dan menyadari bahwa penemuan dini ini mungkin menyelamatkan mereka dari kerugian yang jauh lebih besar." },
        ],
      },
      {
        id: "neutral",
        label: "Melanjutkan pengujian seperti rencana semula, berniat melaporkan jejak itu nanti di laporan akhir.",
        points: -2,
        result: [
          { text: "Kael memutuskan melanjutkan pengujian sesuai rencana semula, berniat menyebutkan jejak mencurigakan itu nanti di laporan akhir." },
          { text: "Selama waktu tunda itu, pihak tak dikenal yang sama sempat kembali mengakses sistem, dan sebagian jejaknya tertimpa oleh aktivitas pengujian Kael sendiri." },
        ],
      },
      {
        id: "risky",
        label: "Mencoba melacak balik identitas pihak tak dikenal itu sendirian tanpa melibatkan pemilik sistem.",
        points: -3,
        result: [
          { text: "Terdorong rasa penasaran, Kael mencoba melacak balik identitas pihak tak dikenal itu sendirian, tanpa melibatkan pemilik sistem terlebih dahulu." },
          { text: "Tindakan ini berada di luar lingkup kewenangan pengujian yang disepakati, dan berisiko mengganggu proses investigasi resmi jika nanti benar-benar diperlukan." },
          { text: "Pemilik sistem mengingatkan Kael bahwa melacak pihak lain adalah ranah penegak hukum, bukan sesuatu yang boleh dilakukan sepihak oleh penguji keamanan." },
        ],
      },
    ],
  },
};
