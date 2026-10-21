import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor5: FloorContent = {
  id: "sqli_level_4_floor_5",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 5,
  title: "False Positive yang Disengaja",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_5", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "alarm_1", icon: "alarm", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "alert_history_panel_1",
      label: "Riwayat Peringatan Sistem",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Selama beberapa hari terakhir, sistem keamanan arsip terus memicu peringatan percobaan injeksi, puluhan kali sehari, dari berbagai alamat berbeda. Tim yang menangani peringatan ini mulai lelah memeriksa satu per satu, karena hampir semuanya ternyata tidak berbahaya, hanya kesalahan ketik pengunjung biasa yang kebetulan memicu pola yang mirip." },
      { text: "Kael memeriksa riwayat peringatan itu lebih dekat, dan menyadari sesuatu yang mencurigakan: pola percobaan 'tidak berbahaya' ini jumlahnya jauh lebih banyak dari biasanya, dan muncul dalam waktu yang terlalu teratur untuk sekadar kebetulan pengunjung biasa." },
      { text: "Ia mulai menduga, lonjakan peringatan palsu ini sengaja dipicu oleh seseorang, bukan untuk benar-benar menyerang, tapi untuk membuat tim keamanan lelah dan mulai mengabaikan peringatan, sebuah taktik yang disebut alert fatigue." },
      { text: "Jika tim benar-benar mulai mengabaikan peringatan karena terlalu sering salah, serangan sungguhan yang menyusup di antara ratusan peringatan palsu itu bisa luput tanpa disadari siapa pun." },
    ],
    question: "Bagaimana Kael menangani kemungkinan taktik alert fatigue yang disengaja ini?",
    choices: [
      {
        id: "safe",
        label: "Membangun sistem penyaringan yang memisahkan pola peringatan palsu yang berulang dari pola baru yang belum pernah muncul sebelumnya, agar tim tetap fokus pada ancaman yang benar-benar baru.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa membiarkan tim memeriksa semua peringatan satu per satu secara manual justru rentan dimanfaatkan lewat taktik ini." },
          { text: "Ia membangun sistem penyaringan yang secara otomatis mengenali pola peringatan palsu yang sudah berulang kali terverifikasi aman, memisahkannya dari pola baru yang belum pernah muncul sebelumnya." },
          { text: "Tim keamanan kini bisa fokus memeriksa ancaman yang benar-benar baru, tanpa harus kelelahan memeriksa ratusan peringatan berulang yang sudah diketahui tidak berbahaya." },
        ],
      },
      {
        id: "neutral",
        label: "Meminta tim untuk tetap semangat memeriksa setiap peringatan satu per satu tanpa mengubah sistem apa pun.",
        points: -1,
        result: [
          { text: "Kael hanya meminta tim untuk tetap bersemangat dan teliti memeriksa setiap peringatan satu per satu, tanpa mengubah cara kerja sistem." },
          { text: "Himbauan semangat saja tidak cukup melawan kelelahan yang nyata, dan lama-kelamaan tim tetap mulai kurang teliti menghadapi lonjakan peringatan yang terus-menerus." },
        ],
      },
      {
        id: "risky",
        label: "Menonaktifkan sementara seluruh sistem peringatan karena dianggap terlalu banyak menghasilkan false positive yang mengganggu.",
        points: -4,
        result: [
          { text: "Merasa terganggu dengan banyaknya peringatan palsu, Kael menonaktifkan sementara seluruh sistem peringatan injeksi." },
          { text: "Tanpa sistem peringatan sama sekali, serangan sungguhan yang sebelumnya bersembunyi di antara peringatan palsu kini bisa berjalan tanpa terdeteksi sama sekali." },
          { text: "Ini adalah persis hasil yang diinginkan oleh siapa pun yang sengaja memicu lonjakan peringatan palsu itu sejak awal." },
        ],
      },
    ],
  },
};
