import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor4: FloorContent = {
  id: "auth_level_5_floor_4",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 4,
  title: "Lencana dari Perusahaan yang Baru Bergabung",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "badge_wall_4", icon: "badge", x: 80, y: 22, scale: 1.4 },
      { id: "handshake_1", icon: "handshake", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "federation_map_1",
      label: "Peta Federasi Identitas Antar-Perusahaan",
      icon: "chart",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Veltrix baru saja menyelesaikan akuisisi sebuah perusahaan teknologi kecil yang cukup menjanjikan, dan sesuai kesepakatan integrasi, karyawan perusahaan baru itu akan diberi akses sementara ke beberapa sistem Veltrix lewat federasi identitas, lencana dari perusahaan lama mereka dipercaya sementara tanpa harus membuat lencana Veltrix baru untuk semua orang sekaligus." },
      { text: "Tim integrasi menekan agar proses ini berjalan cepat, karena proyek gabungan kedua tim sudah dijadwalkan dimulai minggu depan dan menunggu akses lintas sistem ini selesai dikonfigurasi." },
      { text: "Kael memeriksa sistem identitas milik perusahaan yang baru diakuisisi itu, dan menemukan sesuatu yang membuatnya ragu: standar keamanan identitas di sana jauh lebih longgar dibanding standar Veltrix, beberapa akun bahkan masih memakai metode autentikasi lama yang sudah ditinggalkan Veltrix bertahun-tahun lalu." },
      { text: "Mempercayai federasi identitas dari sistem yang standar keamanannya jauh lebih lemah berarti, secara tidak langsung, menurunkan tingkat kepercayaan seluruh ekosistem Veltrix ke titik terlemah dari kedua sistem yang digabungkan." },
    ],
    question: "Bagaimana Kael menangani permintaan federasi identitas mendesak dari perusahaan yang baru diakuisisi dengan standar keamanan lebih lemah ini?",
    choices: [
      {
        id: "safe",
        label: "Menetapkan persyaratan minimum keamanan identitas yang harus dipenuhi perusahaan baru sebelum federasi diaktifkan, sambil menyediakan akses sementara terbatas dan terpantau ketat untuk kebutuhan mendesak proyek.",
        points: 3,
        result: [
          { text: "Kael menetapkan daftar persyaratan minimum keamanan identitas yang harus dipenuhi sistem perusahaan baru sebelum federasi penuh diaktifkan, menolak menurunkan standar Veltrix demi kecepatan integrasi." },
          { text: "Untuk kebutuhan mendesak proyek gabungan, ia menyediakan akses sementara yang sangat terbatas cakupannya dan dipantau ketat, cukup untuk memulai kerja sama tanpa membuka seluruh ekosistem terhadap sistem yang lebih lemah." },
          { text: "Dalam beberapa minggu, tim perusahaan baru berhasil memenuhi persyaratan minimum itu, dan federasi penuh diaktifkan tanpa pernah menurunkan tingkat keamanan keseluruhan Veltrix." },
        ],
      },
      {
        id: "neutral",
        label: "Mengaktifkan federasi penuh seperti yang diminta tim integrasi, dengan rencana memperbaiki standar keamanan perusahaan baru secara bertahap setelahnya.",
        points: -4,
        result: [
          { text: "Demi memenuhi tenggat proyek gabungan minggu depan, Kael mengaktifkan federasi penuh seperti yang diminta tim integrasi, berencana memperbaiki standar keamanan perusahaan baru itu secara bertahap setelah proyek berjalan." },
          { text: "Selama periode 'bertahap' itu, seluruh ekosistem Veltrix secara efektif beroperasi di tingkat keamanan terlemah dari sistem yang baru diakuisisi, sebuah risiko yang terus terbuka lebih lama dari yang seharusnya." },
          { text: "Perbaikan bertahap yang direncanakan terus tergeser prioritasnya oleh kebutuhan proyek lain yang dianggap lebih mendesak, membuat celah ini bertahan jauh lebih lama dari estimasi awal." },
        ],
      },
      {
        id: "risky",
        label: "Menolak keseluruhan integrasi federasi identitas dan meminta seluruh karyawan perusahaan baru membuat lencana Veltrix dari awal secara manual, mengabaikan tenggat proyek gabungan.",
        points: -5,
        result: [
          { text: "Demi memastikan tidak ada risiko sama sekali, Kael menolak keseluruhan integrasi federasi identitas dan meminta seluruh karyawan perusahaan baru membuat lencana Veltrix dari awal secara manual, tanpa mempertimbangkan tenggat proyek gabungan yang sudah dijadwalkan." },
          { text: "Proses pembuatan lencana manual untuk puluhan karyawan baru memakan waktu jauh lebih lama dari jadwal proyek yang sudah disepakati, memicu kekecewaan besar dari tim bisnis dan risiko proyek gabungan gagal dimulai tepat waktu." },
          { text: "Direksi mempertanyakan mengapa pendekatan yang lebih seimbang, seperti akses sementara terbatas, tidak pernah dipertimbangkan sebelum mengambil keputusan paling kaku yang mengorbankan jadwal bisnis sepenuhnya." },
        ],
      },
    ],
  },
};
