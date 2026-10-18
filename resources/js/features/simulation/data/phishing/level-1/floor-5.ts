import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor5: FloorContent = {
  id: "phishing_level_1_floor_5",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 5,
  title: "Ujian Akhir: Detektif Email",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "trophy_1", icon: "trophy", x: 80, y: 25, scale: 1.6 },
      { id: "star_1", icon: "star", x: 15, y: 30, scale: 1.2 },
      { id: "star_2", icon: "star", x: 50, y: 85, scale: 1 },
      { id: "lamp_5", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "inbox_1",
      label: "Inbox Penuh",
      icon: "inbox",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Seminggu sudah berlalu sejak kejadian pertama di kotak surat. Kali ini Kael membuka inboxnya dan mendapati empat email baru, semuanya terasa janggal." },
      { text: "Ia mengingat semua yang telah ia pelajari: alamat pengirim yang aneh, tautan singkat yang mencurigakan, lampiran tak terduga, dan desakan waktu yang memaksa." },
      { text: "Salah satu email menyertakan sebuah tautan yang mengaku sebagai halaman bantuan resmi, mengarahkan ke support.google.com/mail/answer." },
      { text: "Email lain menyertakan tautan pemendek yang meminta verifikasi akun dengan segera. Kael tahu saatnya menerapkan semua yang telah ia pelajari." },
    ],
    question: "Manakah tautan yang dapat dipercaya dan aman untuk diperiksa lebih lanjut?",
    choices: [
      {
        id: "safe",
        label: "https://support.google.com/mail/answer",
        points: 4,
        result: [
          { text: "Kael memeriksa setiap email dengan empat hal yang telah ia pelajari: alamat pengirim, tautan, lampiran, dan nada mendesak." },
          { text: "Tautan support.google.com mengarah ke domain resmi yang bisa diverifikasi, sedangkan tautan pemendek lainnya menyembunyikan tujuan sebenarnya." },
          { text: "Kael berhasil mengenali seluruh pola phishing yang pernah ia hadapi minggu itu." },
          { text: "Level 1 Phishing selesai. Kael kini lebih percaya diri mengenali email mencurigakan." },
        ],
      },
      {
        id: "neutral",
        label: "Menghapus semua email tanpa memeriksa satu per satu.",
        points: 0,
        result: [
          { text: "Kael menghapus seluruh email tanpa memeriksanya lebih dulu." },
          { text: "Ia memang aman dari risiko saat itu, tetapi tidak sempat melatih kejeliannya mengenali pola phishing yang sesungguhnya." },
        ],
      },
      {
        id: "risky",
        label: "http://bit.ly/verify-your-account",
        points: -5,
        result: [
          { text: "Kael memilih membuka tautan pemendek itu karena terlihat meyakinkan." },
          { text: "Halaman yang terbuka menampilkan tombol Next, mengarahkannya ke halaman lain yang terlihat meyakinkan." },
          { text: "Tanpa disadari, sebuah berkas bernama Code-verify-your-account.zip ikut terunduh ke perangkatnya." },
          { text: "Kael membuka berkas itu, dan seketika menyadari bahwa ia baru saja mengulangi kesalahan yang sama dari minggu sebelumnya." },
        ],
      },
    ],
  },
};
