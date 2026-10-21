import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel3Floor3: FloorContent = {
  id: "auth_level_3_floor_3",
  simulationId: "auth",
  levelNumber: 3,
  floorNumber: 3,
  title: "Token yang Dipakai Ulang",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_3", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "chain_board_3", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "token_panel_1",
      label: "Panel Token Akses",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah laporan soal identitas palsu dari layanan mitra, pemilik platform memperbaiki proses verifikasinya. Kini Kael menemukan satu hal lagi yang mengganjal: token akses sementara yang diberikan setiap kali login seharusnya hanya berlaku sekali." },
      { text: "Saat mencoba login lewat salah satu layanan mitra, Kael mengamati token yang diterimanya, lalu secara terkendali ia mencoba memakai token yang sama itu untuk login kedua kalinya ke layanan lain yang juga menerima token serupa." },
      { text: "Anehnya, token itu masih diterima, padahal seharusnya token sekali pakai langsung tidak berlaku lagi setelah digunakan satu kali." },
      { text: "Kael menyadari, jika token ini bisa dipakai berulang kali, siapa pun yang berhasil mencegatnya sekali saja bisa memakainya berkali-kali ke berbagai layanan yang terhubung, bukan hanya satu kali seperti yang seharusnya." },
    ],
    question: "Bagaimana Kael membuktikan dan menindaklanjuti temuan token yang dipakai ulang ini?",
    choices: [
      {
        id: "safe",
        label: "Mencatat bukti bahwa token yang sama diterima di beberapa layanan berbeda, lalu merekomendasikan agar setiap token otomatis tidak berlaku setelah dipakai sekali.",
        points: 4,
        result: [
          { text: "Kael mendokumentasikan dengan rinci bagaimana satu token yang sama berhasil diterima di lebih dari satu layanan berbeda." },
          { text: "Dalam laporannya, ia merekomendasikan agar setiap token otomatis dibatalkan begitu dipakai satu kali, sesuai dengan tujuan awal token sekali pakai itu dirancang." },
          { text: "Pemilik platform segera memperbaiki mekanisme ini, menutup celah yang bisa dimanfaatkan siapa pun yang berhasil mencegat satu token saja." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba token yang sama berkali-kali tanpa mencatat ke layanan mana saja ia berhasil dipakai.",
        points: -1,
        result: [
          { text: "Kael mencoba token yang sama berkali-kali ke berbagai layanan, tapi tidak mencatat secara rinci layanan mana saja yang menerimanya." },
          { text: "Buktinya terasa kurang lengkap untuk laporan, karena tidak ada catatan jelas seberapa luas celah ini sebenarnya berlaku." },
        ],
      },
      {
        id: "risky",
        label: "Membagikan token hasil temuannya ke rekan kerja lain untuk 'ikut mencoba-coba' tanpa koordinasi.",
        points: -2,
        result: [
          { text: "Kael membagikan token hasil temuannya ke beberapa rekan kerja agar mereka ikut mencoba-coba, tanpa koordinasi yang jelas." },
          { text: "Token pengujian itu berpindah tangan tanpa pencatatan yang rapi, membuat jejak pengujian menjadi kacau dan sulit dipertanggungjawabkan." },
          { text: "Pemilik platform mempertanyakan bagaimana token pengujian bisa tersebar ke banyak orang tanpa catatan yang jelas." },
        ],
      },
    ],
  },
};
