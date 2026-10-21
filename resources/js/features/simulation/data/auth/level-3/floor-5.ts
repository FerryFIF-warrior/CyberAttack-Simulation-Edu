import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel3Floor5: FloorContent = {
  id: "auth_level_3_floor_5",
  simulationId: "auth",
  levelNumber: 3,
  floorNumber: 5,
  title: "Eskalasi dari Akses Terbatas ke Akses Penuh",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_5", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "admin_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "privilege_panel_1",
      label: "Panel Tingkat Akses",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dengan akun pengujian yang sengaja dibuat dengan akses terbatas, setara anggota biasa, Kael ingin menguji satu pertanyaan terakhir yang paling krusial: seandainya akses terbatas seperti ini berhasil direbut penyerang, seberapa jauh ia bisa merambat naik menjadi akses penuh?" },
      { text: "Kael memeriksa bagaimana platform membedakan anggota biasa dari admin. Ternyata, perbedaannya hanya ditentukan oleh satu penanda kecil yang dikirim bersama token akses, bukan oleh pemeriksaan berlapis di sisi server." },
      { text: "Dengan akses terbatas yang ia miliki, Kael mencoba mengubah penanda kecil itu secara terkendali, lalu memeriksa apakah platform benar-benar memverifikasi ulang perubahan itu atau hanya mempercayainya begitu saja." },
      { text: "Jika platform tidak memverifikasi ulang, ini berarti siapa pun yang berhasil merebut akun biasa sekalipun, bisa dengan mudah menaikkan dirinya sendiri menjadi admin penuh." },
    ],
    question: "Bagaimana Kael menguji potensi eskalasi dari akses terbatas ini?",
    choices: [
      {
        id: "safe",
        label: "Mengubah penanda akses secara terkendali di akun pengujian, lalu segera mencatat dan mengembalikannya begitu terbukti platform tidak memverifikasi ulang.",
        points: 3,
        result: [
          { text: "Kael mengubah penanda akses di akun pengujiannya sendiri, dari anggota biasa menjadi tampak seperti admin." },
          { text: "Platform menerima perubahan itu tanpa verifikasi tambahan, dan akun pengujian Kael tiba-tiba memiliki akses penuh layaknya admin sungguhan." },
          { text: "Kael segera mengembalikan akun itu ke status semula dan mencatat bukti ini sebagai temuan paling kritis dalam seluruh rangkaian pengujian." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba mengubah penanda akses tapi tidak memastikan apakah perubahan itu benar-benar memberi akses admin penuh.",
        points: 1,
        result: [
          { text: "Kael mencoba mengubah penanda akses, tapi tidak melangkah lebih jauh untuk memastikan apakah perubahan itu benar-benar membuka akses admin penuh." },
          { text: "Ia punya indikasi awal, tapi buktinya belum cukup kuat untuk meyakinkan dewan pengelola tentang separah apa risiko ini sebenarnya." },
        ],
      },
      {
        id: "risky",
        label: "Memakai akses admin yang berhasil direbut untuk membuka data anggota lain demi 'membuktikan level keparahannya'.",
        points: -4,
        result: [
          { text: "Setelah berhasil merebut akses admin penuh, Kael tergoda membuka data anggota lain untuk membuktikan separah apa dampaknya." },
          { text: "Tindakan ini jauh melampaui kebutuhan pengujian, menyentuh data pribadi anggota tanpa alasan yang benar-benar diperlukan untuk membuktikan celahnya." },
          { text: "Pemilik platform menegaskan bahwa membuktikan akses penuh cukup berhenti pada pembuktian akses itu sendiri, bukan menyalahgunakannya lebih jauh." },
        ],
      },
    ],
  },
};
