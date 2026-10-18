import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel1Floor1: FloorContent = {
  id: "auth_level_1_floor_1",
  simulationId: "auth",
  levelNumber: 1,
  floorNumber: 1,
  title: "Tahap 1: Mengintai Lencana Keanggotaan",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_1", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_2", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "target_site_1",
      label: "Situs Target",
      icon: "monitor",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Masih dengan izin pengujian resmi dari pemilik Arsip Kota, Kael kini diminta memeriksa bagian lain dari forum: sistem lencana keanggotaan yang menandai setiap anggota yang sedang masuk." },
      { text: "Setiap anggota yang login diberi lencana digital, semacam tanda pengenal sementara yang dipegang selama mereka berada di forum." },
      { text: "Kael membuka alat pemeriksa di perangkatnya dan memeriksa bagaimana lencana itu disimpan di sisi pengunjung." },
      { text: "Ia menemukan sesuatu yang janggal: lencana itu tidak disegel dengan baik, sehingga berpotensi bisa dibaca oleh siapa saja yang tahu cara mengintipnya, bukan hanya oleh loket pendaftaran forum." },
    ],
    question: "Langkah pengintaian apa yang akan Kael lakukan selanjutnya?",
    choices: [
      {
        id: "safe",
        label: "Memeriksa apakah lencana itu bisa dibaca langsung melalui alat pemeriksa di perangkat pengunjung.",
        points: 4,
        result: [
          { text: "Kael menjalankan pemeriksaan kecil melalui alat bawaan browsernya untuk melihat apakah lencana bisa diakses dari luar sistem resmi." },
          { text: "Hasilnya terbaca jelas: lencana itu memang bisa dibaca begitu saja, tanpa perlindungan tambahan apa pun." },
          { text: "Kael mencatat temuan ini: jalur pencurian lencana lewat sisi pengunjung benar-benar terbuka." },
        ],
      },
      {
        id: "neutral",
        label: "Memeriksa pengaturan keamanan yang tertulis di halaman bantuan forum.",
        points: 1,
        result: [
          { text: "Kael membaca halaman bantuan forum yang menjelaskan sistem keanggotaan secara umum." },
          { text: "Informasinya berguna sebagai latar belakang, tetapi belum membuktikan apakah lencana benar-benar bisa diintip atau tidak." },
        ],
      },
      {
        id: "risky",
        label: "Langsung mencoba menebak-nebak isi lencana anggota lain dengan ribuan percobaan acak.",
        points: -2,
        result: [
          { text: "Kael mencoba menebak isi lencana anggota lain dengan cara mencoba ribuan kombinasi secara acak." },
          { text: "Lencana itu terlalu panjang dan rumit untuk ditebak dengan cara seperti itu." },
          { text: "Sistem mencatat ribuan percobaan aneh dari perangkat Kael, dan forum menjadi lebih waspada terhadap aktivitasnya." },
        ],
      },
    ],
  },
};
