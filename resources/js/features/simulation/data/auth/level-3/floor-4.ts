import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel3Floor4: FloorContent = {
  id: "auth_level_3_floor_4",
  simulationId: "auth",
  levelNumber: 3,
  floorNumber: 4,
  title: "Serangan di Tengah Jalan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_4", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "wifi_1", icon: "wifi", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "network_panel_1",
      label: "Panel Jalur Komunikasi",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Token sudah diperbaiki agar sekali pakai, tapi satu pertanyaan baru muncul di benak Kael: bagaimana jika token itu dicegat bukan karena dipakai ulang, melainkan karena disadap saat masih dalam perjalanan dari perangkat pengguna menuju server?" },
      { text: "Pemilik platform mengizinkan Kael menguji ini di lingkungan terkendali, mensimulasikan sebuah jaringan publik seperti wifi kafe yang sering dipakai anggota saat login dari luar." },
      { text: "Kael memeriksa bagaimana data dikirim lewat jaringan simulasi itu, memperhatikan apakah seluruh komunikasi benar-benar terlindungi dari ujung ke ujung, atau ada celah yang memungkinkan seseorang di tengah jalur bisa membaca data yang lewat." },
      { text: "Ia menemukan satu bagian komunikasi, khusus saat pertukaran awal antara aplikasi mitra dan platform utama, yang ternyata tidak sepenuhnya terenkripsi seperti yang seharusnya." },
    ],
    question: "Apa yang akan dilakukan Kael terhadap temuan celah di jalur komunikasi ini?",
    choices: [
      {
        id: "safe",
        label: "Mendokumentasikan bagian komunikasi yang tidak terenkripsi sepenuhnya, lalu merekomendasikan enkripsi menyeluruh di seluruh tahap pertukaran data.",
        points: 3,
        result: [
          { text: "Kael mendokumentasikan secara rinci bagian mana dari proses pertukaran data yang ternyata tidak terenkripsi sepenuhnya." },
          { text: "Dalam laporannya, ia merekomendasikan agar seluruh tahap komunikasi, termasuk pertukaran awal yang sering dianggap sepele, dienkripsi secara menyeluruh tanpa pengecualian." },
          { text: "Pemilik platform menerapkan enkripsi menyeluruh itu, menutup satu lagi titik yang bisa dimanfaatkan jika seseorang menyadap jaringan publik yang sering dipakai anggota." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat temuan ini tapi menganggapnya kurang berbahaya karena hanya terjadi di tahap awal komunikasi.",
        points: -2,
        result: [
          { text: "Kael mencatat temuan ini, tapi menganggapnya kurang berbahaya karena hanya menyangkut tahap awal komunikasi yang berlangsung sangat singkat." },
          { text: "Ia tidak menyadari bahwa tahap awal yang singkat itu justru sering kali menjadi saat paling krusial, tempat informasi penting pertama kali dipertukarkan." },
        ],
      },
      {
        id: "risky",
        label: "Mencoba menyadap data anggota sungguhan di jaringan publik asli untuk membuktikan risikonya lebih meyakinkan.",
        points: -3,
        result: [
          { text: "Kael mencoba menyadap data di jaringan publik asli yang sedang dipakai anggota sungguhan, berniat membuktikan risikonya secara lebih nyata." },
          { text: "Tindakan ini melampaui lingkungan pengujian terkendali yang telah disepakati dan berisiko benar-benar melanggar privasi anggota sungguhan." },
          { text: "Pemilik platform menghentikan langkah itu segera, mengingatkan bahwa pengujian keamanan tidak boleh mengorbankan privasi orang yang justru ingin dilindungi." },
        ],
      },
    ],
  },
};
