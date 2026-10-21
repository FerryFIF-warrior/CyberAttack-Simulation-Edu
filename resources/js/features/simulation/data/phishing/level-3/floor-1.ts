import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel3Floor1: FloorContent = {
  id: "phishing_level_3_floor_1",
  simulationId: "phishing",
  levelNumber: 3,
  floorNumber: 1,
  title: "Pengintaian Diam-Diam",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-100 to-blue-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_1", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "cabinet_1", icon: "cabinet", x: 85, y: 22, scale: 1.3 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "security_report_1",
      label: "Laporan Keamanan IT",
      icon: "report",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Reputasi Kael sebagai orang yang jeli terhadap phishing membuatnya kini diajak bergabung ke tim keamanan internal perusahaan tempatnya bekerja, bukan lagi sekadar menghadapi serangan sendirian." },
      { text: "Tim IT menemukan sesuatu yang janggal: beberapa akun media sosial profesional karyawan, termasuk milik Kael, ternyata pernah dikunjungi berkali-kali oleh satu profil anonim dalam sebulan terakhir, mengumpulkan detail jabatan, struktur tim, bahkan nama proyek yang sedang berjalan." },
      { text: "Ini bukan serangan, belum. Ini adalah tahap pengintaian, tempat penyerang diam-diam menyusun peta organisasi sebelum melancarkan serangan yang sesungguhnya." },
      { text: "Kael diminta menilai seberapa serius ancaman dari pengintaian ini, dan apa yang sebaiknya dilakukan sebelum serangan nyata benar-benar dimulai." },
    ],
    question: "Bagaimana sikap Kael terhadap temuan pengintaian ini?",
    choices: [
      {
        id: "safe",
        label: "Memetakan informasi apa saja yang telah terekspos ke publik, lalu mengedukasi tim untuk membatasi detail sensitif di profil profesional mereka.",
        points: 4,
        result: [
          { text: "Kael menyusun daftar informasi yang berhasil dikumpulkan profil anonim itu: nama proyek, struktur tim, bahkan pola jam kerja sejumlah karyawan." },
          { text: "Ia mengadakan sesi singkat bersama tim, menjelaskan bagaimana detail sekecil itu bisa dirangkai menjadi senjata untuk serangan bertarget nanti." },
          { text: "Beberapa karyawan segera memperbarui pengaturan privasi mereka, mempersempit ruang gerak penyerang sebelum serangan sesungguhnya tiba." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat temuan ini di laporan internal, tapi tidak memberi tahu karyawan yang bersangkutan.",
        points: -1,
        result: [
          { text: "Kael mencatat temuan pengintaian ini hanya di laporan internal tim keamanan." },
          { text: "Karena karyawan yang profilnya diincar tidak diberi tahu, mereka tetap membagikan detail sensitif yang sama di platform publik tanpa menyadari risikonya." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena belum ada serangan nyata yang terjadi.",
        points: -3,
        result: [
          { text: "Kael menganggap pengintaian semacam ini belum perlu ditindaklanjuti karena belum ada kerugian nyata." },
          { text: "Beberapa minggu kemudian, email-email bertarget mulai berdatangan ke karyawan yang namanya muncul di profil yang diintai, lengkap dengan detail proyek yang seharusnya tidak diketahui orang luar." },
        ],
      },
    ],
  },
};
