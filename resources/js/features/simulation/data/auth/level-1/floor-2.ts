import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel1Floor2: FloorContent = {
  id: "auth_level_1_floor_2",
  simulationId: "auth",
  levelNumber: 1,
  floorNumber: 2,
  title: "Tahap 2: Mencari Titik di Papan Pengumuman",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_2", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_3", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "input_fields_1",
      label: "Papan Pengumuman",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Mengetahui lencana bisa diintip saja belum cukup. Kael masih butuh cara agar lencana milik anggota lain benar-benar bisa ia dapatkan, bukan hanya diketahui rentan." },
      { text: "Forum ini punya beberapa tempat tamu bisa menuliskan sesuatu: kotak komentar, kolom pencarian, dan profil anggota." },
      { text: "Kael tahu bahwa titik paling berbahaya adalah tempat yang menampilkan kembali tulisan tamu persis seperti aslinya, tanpa menyaring bentuknya terlebih dahulu." },
      { text: "Ia memutuskan untuk menguji satu per satu, mencari papan pengumuman mana yang menampilkan tulisan tamu apa adanya." },
    ],
    question: "Teknik apa yang akan Kael gunakan untuk menguji titik ini?",
    choices: [
      {
        id: "safe",
        label: "Mengirim penanda kecil yang tidak berbahaya ke setiap kolom, lalu melihat kolom mana yang menampilkannya secara mentah tanpa disaring.",
        points: 4,
        result: [
          { text: "Kael mengirim sebuah penanda kecil dan tidak berbahaya ke kotak komentar, kolom pencarian, dan profil anggota." },
          { text: "Kotak komentar ternyata menampilkan penanda itu persis seperti aslinya, lengkap dengan efek yang seharusnya hanya berlaku untuk format tertentu." },
          { text: "Kael menemukan titik yang ia cari: kotak komentar menampilkan tulisan tamu secara mentah tanpa penyaringan apa pun." },
        ],
      },
      {
        id: "neutral",
        label: "Mengirim penanda yang mencolok dan mudah terlihat ke semua kolom sekaligus.",
        points: 1,
        result: [
          { text: "Kael mengirim penanda yang sangat mencolok ke semua kolom sekaligus." },
          { text: "Sebagian kolom menolaknya, tetapi kotak komentar tetap menampilkannya dengan jelas." },
          { text: "Titik rentan ditemukan, tetapi caranya terlalu mencolok dan berisiko memicu perhatian sistem pemantau forum." },
        ],
      },
      {
        id: "risky",
        label: "Langsung mengirim penanda yang dirancang untuk mengambil data secara otomatis ke semua kolom tanpa pengujian awal.",
        points: -2,
        result: [
          { text: "Kael langsung mengirim penanda paling berbahaya yang ia rancang, tanpa menguji dulu kolom mana yang rentan." },
          { text: "Sistem pemantau forum mendeteksi pola berbahaya itu dan langsung memblokir alamat Kael." },
          { text: "Admin forum mulai menyelidiki, dan Kael harus mencari jalur pengujian lain yang lebih hati-hati." },
        ],
      },
    ],
  },
};
