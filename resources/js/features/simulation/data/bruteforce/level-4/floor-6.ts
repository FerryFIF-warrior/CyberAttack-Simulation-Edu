import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor6: FloorContent = {
  id: "bruteforce_level_4_floor_6",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 6,
  title: "Serangan Terkoordinasi Lintas Zona Waktu",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_6", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "globe_2", icon: "globe", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "timezone_chart_1",
      label: "Grafik Trafik Lintas Zona Waktu",
      icon: "chart",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Forum ini kini punya anggota dari berbagai negara, aktif di jam yang berbeda-beda sepanjang hari. Kael memeriksa grafik trafik gabungan, dan semuanya terlihat normal, selalu ada aktivitas di setiap jam, tidak ada lonjakan yang mencolok." },
      { text: "Namun saat memisahkan grafik itu berdasarkan masing-masing zona waktu pengguna, polanya berubah drastis. Di setiap zona waktu, ada lonjakan percobaan login yang terjadi tepat saat jam paling sepi di zona itu, lalu berhenti begitu jam sibuk dimulai." },
      { text: "Karena grafik gabungan selalu terlihat ramai sepanjang waktu, lonjakan di satu zona waktu tertentu selalu tertutupi oleh aktivitas normal dari zona waktu lain yang sedang sibuk." },
      { text: "Ini adalah serangan yang sengaja dikoordinasikan mengikuti jam sepi tiap zona waktu, bersembunyi di balik keramaian trafik global yang terlihat wajar saat dilihat secara keseluruhan." },
    ],
    question: "Bagaimana Kael mengungkap dan menangani serangan yang tersembunyi di balik trafik global ini?",
    choices: [
      {
        id: "safe",
        label: "Memisahkan analisis trafik berdasarkan zona waktu masing-masing pengguna, bukan hanya melihat grafik gabungan secara keseluruhan.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa grafik gabungan menyembunyikan pola penting yang hanya terlihat jika dipecah per zona waktu." },
          { text: "Ia membangun analisis baru yang memisahkan trafik berdasarkan zona waktu pengguna, membandingkan aktivitas normal dengan jam sepi masing-masing wilayah." },
          { text: "Lonjakan percobaan login yang selama ini tersembunyi di balik keramaian global akhirnya terlihat jelas, dan serangan terkoordinasi itu berhasil ditahan di setiap zona waktu." },
        ],
      },
      {
        id: "neutral",
        label: "Menambah kapasitas server untuk mengatasi trafik yang terlihat selalu ramai sepanjang waktu.",
        points: -1,
        result: [
          { text: "Kael menambah kapasitas server, mengira trafik yang selalu ramai sepanjang waktu ini murni soal pertumbuhan pengguna yang wajar." },
          { text: "Kapasitas tambahan itu justru membuat serangan yang tersembunyi semakin leluasa berjalan tanpa terdeteksi, karena sistem tidak pernah terlihat kewalahan." },
        ],
      },
      {
        id: "risky",
        label: "Menganggap trafik ini aman karena grafik gabungan tidak pernah menunjukkan lonjakan mencolok.",
        points: -2,
        result: [
          { text: "Kael menganggap trafik ini aman-aman saja karena grafik gabungan tidak pernah menunjukkan lonjakan yang mencolok." },
          { text: "Ia tidak menyadari bahwa serangan ini memang dirancang khusus untuk tidak pernah terlihat mencolok di grafik gabungan." },
          { text: "Beberapa akun di berbagai zona waktu berhasil dibobol secara bergantian, masing-masing tepat saat zona waktunya sedang paling sepi." },
        ],
      },
    ],
  },
};
