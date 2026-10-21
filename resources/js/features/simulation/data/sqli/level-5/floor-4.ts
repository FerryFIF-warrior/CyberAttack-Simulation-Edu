import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel5Floor4: FloorContent = {
  id: "sqli_level_5_floor_4",
  simulationId: "sqli",
  levelNumber: 5,
  floorNumber: 4,
  title: "Surat dari Seseorang yang Mengetuk Gerbang Secara Sah",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "archive_gate_4", icon: "gate", x: 80, y: 22, scale: 1.4 },
      { id: "mail_1", icon: "mail", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "bounty_inbox_1",
      label: "Kotak Masuk Program Hadiah Keamanan",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Enam bulan lalu, Arunika meluncurkan program hadiah keamanan, mengundang peneliti independen dari seluruh dunia untuk secara sah mencoba menembus Gerbang Arsip produk mereka dan melaporkan apa pun yang mereka temukan, dengan imbalan yang pantas." },
      { text: "Pagi ini, sebuah laporan masuk dari seorang peneliti yang belum pernah berkontribusi sebelumnya. Laporannya menjelaskan, dengan bahasa teknis yang rapi, sebuah celah yang memungkinkan satu klien secara tidak sengaja melihat sebagian data milik klien lain lewat kombinasi parameter permintaan yang jarang digunakan." },
      { text: "Kael memverifikasi laporan itu dan mendapati bukti kuat bahwa celah ini memang nyata dan serius, sudah ada sejak beberapa bulan lalu, meski sejauh ini tidak ada tanda-tanda celah ini pernah dieksploitasi oleh pihak lain sebelum laporan ini masuk." },
      { text: "Peneliti itu, dalam laporannya, juga menyinggung ekspektasi imbalan yang jauh lebih tinggi dari skema yang sudah ditetapkan Arunika, mengklaim tingkat keparahan celah ini seharusnya dinilai lebih tinggi dari kategori standar." },
    ],
    question: "Bagaimana Kael menangani laporan sah ini sekaligus negosiasi imbalan yang menyertainya?",
    choices: [
      {
        id: "safe",
        label: "Segera menambal celah tersebut tanpa menunggu negosiasi selesai, sambil mengevaluasi tingkat keparahan secara objektif berdasarkan kriteria program yang sudah ditetapkan, lalu berkomunikasi transparan dengan peneliti.",
        points: 3,
        result: [
          { text: "Kael memastikan tim teknis segera menambal celah itu tanpa menunggu negosiasi imbalan selesai, karena menutup risiko nyata tidak boleh disandera oleh proses administratif." },
          { text: "Secara paralel, ia mengevaluasi tingkat keparahan laporan itu secara objektif berdasarkan kriteria yang sudah ditetapkan program, lalu menjelaskan secara transparan kepada peneliti bagaimana penilaian itu diambil." },
          { text: "Peneliti menerima penjelasan itu dengan baik karena prosesnya terasa adil dan jelas, dan celah yang bisa membocorkan data antar-klien sudah tertutup sebelum sempat dimanfaatkan siapa pun." },
        ],
      },
      {
        id: "neutral",
        label: "Menunda penambalan celah sampai negosiasi imbalan dengan peneliti selesai disepakati, demi menjaga hubungan baik dengan program hadiah keamanan.",
        points: -3,
        result: [
          { text: "Demi menjaga hubungan baik dan menghindari kesan tidak menghargai temuan peneliti, Kael menunda penambalan celah sampai negosiasi imbalan selesai disepakati terlebih dahulu." },
          { text: "Negosiasi berlarut-larut lebih dari seminggu, selama waktu itu celah yang sudah diketahui serius tetap terbuka di produk yang digunakan ratusan klien." },
          { text: "Untungnya tidak ada pihak lain yang menemukan dan mengeksploitasinya selama periode itu, tapi risiko yang dibiarkan terbuka itu sepenuhnya bisa dihindari." },
        ],
      },
      {
        id: "risky",
        label: "Menolak laporan itu secara keseluruhan karena dianggap peneliti mencoba memanfaatkan situasi untuk meminta imbalan berlebihan di luar skema yang berlaku.",
        points: -6,
        result: [
          { text: "Merasa terganggu dengan negosiasi imbalan yang dianggap berlebihan, Kael menolak mentah-mentah laporan itu secara keseluruhan tanpa memverifikasi kebenaran teknisnya terlebih dahulu." },
          { text: "Celah yang sebenarnya nyata dan serius itu dibiarkan tidak tertangani sama sekali, karena penolakan itu membuat laporan teknisnya diabaikan bersamaan dengan negosiasi imbalannya." },
          { text: "Peneliti yang merasa diabaikan mempertimbangkan mempublikasikan temuannya secara terbuka, sebuah risiko jauh lebih besar bagi Arunika dibanding sekadar menegosiasikan imbalan yang wajar." },
        ],
      },
    ],
  },
};
