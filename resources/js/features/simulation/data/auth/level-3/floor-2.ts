import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel3Floor2: FloorContent = {
  id: "auth_level_3_floor_2",
  simulationId: "auth",
  levelNumber: 3,
  floorNumber: 2,
  title: "Rantai Kepercayaan Pihak Ketiga",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_2", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "chain_board_2", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "weak_service_1",
      label: "Layanan Mitra Terlemah",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Layanan kecil di ujung rantai yang ditemukan Kael ternyata adalah sebuah aplikasi mitra lama, dibangun bertahun-tahun lalu dan jarang diperbarui, tapi tetap dipercaya sebagai salah satu titik masuk resmi ke platform utama." },
      { text: "Kael menduga, jika ia bisa membuktikan identitas dari layanan kecil ini bisa dipalsukan atau dimanipulasi, platform utama mungkin akan tetap mempercayainya begitu saja, tanpa menyadari bahwa identitas itu sebenarnya palsu." },
      { text: "Dengan izin pengujian yang telah disepakati, Kael mencoba membuat sebuah identitas pengujian di layanan kecil itu, menyusunnya sedemikian rupa agar tampak seolah berasal dari anggota yang sah." },
      { text: "Jika platform utama menerima identitas palsu ini begitu saja hanya karena berasal dari layanan yang 'dipercaya', itu berarti seluruh rantai kepercayaan bisa dikalahkan lewat mata rantai yang paling lemah." },
    ],
    question: "Bagaimana Kael membuktikan bahwa kepercayaan platform utama bisa dikalahkan lewat mata rantai terlemah ini?",
    choices: [
      {
        id: "safe",
        label: "Membuat identitas pengujian terkendali di layanan terlemah, lalu memverifikasi apakah platform utama menerimanya tanpa pemeriksaan tambahan.",
        points: 4,
        result: [
          { text: "Kael membuat satu identitas pengujian di layanan mitra terlemah, lengkap dengan data yang disusun menyerupai anggota sah." },
          { text: "Ia mencoba login ke platform utama memakai identitas itu, dan platform menerimanya begitu saja hanya karena berasal dari layanan yang terdaftar sebagai mitra tepercaya." },
          { text: "Kael segera menghentikan sesi pengujian dan mencatat bukti ini: platform utama tidak pernah benar-benar memverifikasi keaslian identitas dari layanan mitra, hanya mempercayainya begitu saja." },
        ],
      },
      {
        id: "neutral",
        label: "Membuat identitas pengujian tapi tidak benar-benar mencoba login ke platform utama dengannya.",
        points: 1,
        result: [
          { text: "Kael membuat identitas pengujian di layanan terlemah, tapi berhenti sebelum benar-benar mencoba login ke platform utama." },
          { text: "Ia mendapat gambaran awal, tapi belum benar-benar membuktikan apakah platform utama akan menerima identitas itu atau tidak." },
        ],
      },
      {
        id: "risky",
        label: "Menggunakan identitas palsu itu untuk mengakses data anggota sungguhan di platform utama sebagai 'bukti nyata'.",
        points: -4,
        result: [
          { text: "Kael menggunakan identitas palsu itu untuk mengakses data anggota sungguhan di platform utama, berniat memberikan bukti yang lebih meyakinkan." },
          { text: "Tindakan ini melampaui batas pengujian yang disepakati dan menyentuh data nyata anggota tanpa alasan yang benar-benar diperlukan." },
          { text: "Pemilik platform mengingatkan Kael bahwa membuktikan celah tidak berarti harus benar-benar menyalahgunakannya terhadap data sungguhan." },
        ],
      },
    ],
  },
};
