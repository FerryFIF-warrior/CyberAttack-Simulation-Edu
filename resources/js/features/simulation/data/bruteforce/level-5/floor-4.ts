import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor4: FloorContent = {
  id: "bruteforce_level_5_floor_4",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 4,
  title: "Panggilan dari Bank Lain",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-cyan-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "vault_4", icon: "vault", x: 80, y: 22, scale: 1.4 },
      { id: "phone_2", icon: "phone", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "coordination_call_1",
      label: "Panggilan Koordinasi Antar-Bank",
      icon: "phone",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah model deteksi gabungan Kael berhasil meredam adaptasi penyerang, ia menerima panggilan tak terduga dari rekan sejawatnya di dua bank digital pesaing. Mereka melaporkan pola serangan yang nyaris identik sedang menghantam sistem mereka masing-masing dalam beberapa hari terakhir." },
      { text: "Satu di antaranya ragu-ragu berbagi detail teknis, khawatir informasi tentang kelemahan sistemnya bisa dimanfaatkan pesaing bisnis, bukan hanya penyerang. Ketegangan antara kebutuhan kolaborasi keamanan dan kepentingan kompetitif bisnis terasa jelas dalam percakapan itu." },
      { text: "Kael menyadari, jika ketiga bank ini sebenarnya sedang dihadapi satu kampanye terkoordinasi yang sama, berbagi indikator serangan secara cepat bisa menyelamatkan ketiganya. Namun membangun kepercayaan itu butuh lebih dari sekadar permintaan baik-baik." },
      { text: "Regulator finansial, yang juga mendengar laporan serupa dari beberapa institusi lain, mulai mendesak agar ada mekanisme berbagi informasi ancaman yang lebih terstruktur di seluruh sektor." },
    ],
    question: "Bagaimana Kael mendorong kolaborasi lintas lembaga finansial ini tanpa mengorbankan kepentingan kompetitif masing-masing pihak?",
    choices: [
      {
        id: "safe",
        label: "Mengusulkan protokol berbagi indikator teknis anonim melalui regulator sebagai perantara tepercaya, sehingga detail sensitif institusi tetap terlindungi sementara pola ancaman tetap bisa dikenali bersama.",
        points: 3,
        result: [
          { text: "Kael mengusulkan skema berbagi indikator teknis, seperti pola alamat sumber dan tanda tangan perilaku serangan, secara anonim lewat regulator sebagai perantara tepercaya, bukan langsung antar-pesaing bisnis." },
          { text: "Skema ini meredakan kekhawatiran soal kerahasiaan kompetitif sambil tetap memungkinkan ketiga bank mengenali bahwa mereka menghadapi kampanye terkoordinasi yang sama." },
          { text: "Dalam waktu singkat, indikator yang dibagikan membantu seluruh sektor memperkuat pertahanan secara serentak, memaksa penyerang mengalihkan target ke institusi yang kurang siap." },
        ],
      },
      {
        id: "neutral",
        label: "Menunggu regulator menetapkan mekanisme resmi sebelum berbagi informasi apa pun, demi menghindari risiko hukum dari berbagi data secara informal.",
        points: -3,
        result: [
          { text: "Kael memilih menunggu regulator menyelesaikan mekanisme resmi sebelum berbagi informasi apa pun, demi kehati-hatian terhadap risiko hukum berbagi data secara informal." },
          { text: "Proses penyusunan mekanisme resmi itu memakan waktu berminggu-minggu, sementara kampanye yang sedang berlangsung terus bergerak dari satu bank ke bank lain tanpa hambatan." },
          { text: "Dua bank lain akhirnya terkena dampak lebih parah karena informasi yang bisa mencegahnya datang terlalu terlambat." },
        ],
      },
      {
        id: "risky",
        label: "Membagikan seluruh data log mentah NusaBank secara langsung ke kedua bank pesaing agar mereka bisa menganalisis sendiri, tanpa anonimisasi atau perantara.",
        points: -6,
        result: [
          { text: "Demi mempercepat kolaborasi, Kael membagikan data log mentah NusaBank langsung ke kedua bank pesaing tanpa anonimisasi atau perantara resmi." },
          { text: "Data log mentah itu ternyata memuat lebih banyak detail arsitektur internal dibanding yang seharusnya dibagikan, menimbulkan masalah kepatuhan serius dan kekhawatiran penyalahgunaan informasi kompetitif." },
          { text: "Kepercayaan antar-institusi yang seharusnya dibangun lewat kolaborasi ini justru retak akibat kekhawatiran baru tentang bagaimana data sensitif itu akan digunakan." },
        ],
      },
    ],
  },
};
