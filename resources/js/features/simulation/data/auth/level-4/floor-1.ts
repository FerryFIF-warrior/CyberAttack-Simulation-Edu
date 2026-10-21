import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor1: FloorContent = {
  id: "auth_level_4_floor_1",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 1,
  title: "Pengintaian Kebijakan Pemulihan Akun",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_1", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "question_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "recovery_policy_panel_1",
      label: "Panel Kebijakan Pemulihan",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Platform komunitas yang kini diuji Kael punya fitur pemulihan akun lewat pertanyaan keamanan, cara lama yang masih dipertahankan sebagai opsi cadangan selain email dan nomor telepon." },
      { text: "Kael mencoba fitur pemulihan itu dengan akun pengujiannya, dan menemukan pertanyaan keamanan yang dipakai adalah hal-hal seperti 'nama sekolah dasar Anda' dan 'kota kelahiran Anda'." },
      { text: "Pertanyaan semacam ini terasa pribadi, tapi Kael menyadari sesuatu: jawaban-jawaban itu sering kali bisa ditemukan dari profil media sosial, postingan lama, atau bahkan obrolan santai yang pernah dibagikan secara publik oleh pemiliknya sendiri." },
      { text: "Ini bukan celah teknis di kode sistem, melainkan kelemahan dalam desain kebijakan itu sendiri, mengandalkan 'rahasia' yang sebenarnya tidak terlalu rahasia bagi siapa pun yang mau mencarinya sedikit lebih jauh." },
    ],
    question: "Bagaimana Kael menilai dan menindaklanjuti kelemahan kebijakan pemulihan akun ini?",
    choices: [
      {
        id: "safe",
        label: "Merekomendasikan mengganti pertanyaan keamanan dengan metode pemulihan yang tidak bergantung pada informasi yang berpotensi bisa dicari dari sumber publik.",
        points: 3,
        result: [
          { text: "Kael menjelaskan bahwa pertanyaan keamanan berbasis informasi pribadi semacam ini rentan karena jawabannya sering kali bisa ditelusuri dari jejak digital seseorang." },
          { text: "Ia merekomendasikan mengganti metode pemulihan dengan cara yang tidak bergantung pada informasi semacam itu, misalnya verifikasi lewat perangkat yang sudah dikenal atau kode yang dikirim ke kontak resmi yang terdaftar." },
          { text: "Platform menerapkan metode pemulihan baru yang jauh lebih sulit ditelusuri dari sumber publik mana pun." },
        ],
      },
      {
        id: "neutral",
        label: "Menyarankan mengganti pertanyaan keamanan dengan pertanyaan lain yang masih sejenis, dianggap 'lebih sulit ditebak'.",
        points: -1,
        result: [
          { text: "Kael menyarankan mengganti pertanyaan lama dengan pertanyaan sejenis lain yang dianggap lebih sulit ditebak, seperti 'nama hewan peliharaan pertama'." },
          { text: "Masalah dasarnya tidak benar-benar selesai, karena jenis pertanyaan semacam ini tetap sama rentannya, informasi pribadi apa pun berpotensi ditemukan dari jejak digital seseorang." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena fitur ini jarang dipakai anggota, sebagian besar memilih pemulihan lewat email.",
        points: -2,
        result: [
          { text: "Kael menganggap kelemahan ini tidak terlalu penting karena sebagian besar anggota memilih pemulihan lewat email, bukan lewat pertanyaan keamanan." },
          { text: "Ia lupa bahwa fitur yang jarang dipakai justru sering kali menjadi jalur yang paling sedikit dipantau, dan tetap bisa dimanfaatkan selama masih aktif sebagai pilihan." },
          { text: "Beberapa akun dengan jejak digital publik yang cukup banyak berhasil dipulihkan oleh pihak yang bukan pemiliknya lewat jalur pertanyaan keamanan ini." },
        ],
      },
    ],
  },
};
