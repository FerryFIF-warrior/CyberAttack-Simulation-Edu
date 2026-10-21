import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor7: FloorContent = {
  id: "bruteforce_level_4_floor_7",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 7,
  title: "Ujian Akhir: Memilah Insiden Nyata dari Gangguan Wajar",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "flag_1", icon: "flag", x: 80, y: 22, scale: 1.4 },
      { id: "chart_2", icon: "chart", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_7", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "mixed_traffic_panel_1",
      label: "Panel Trafik Bercampur",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Forum mengadakan acara diskusi besar yang telah diumumkan sejak sebulan lalu, mengundang ribuan anggota baru untuk mendaftar dan login bersamaan menjelang acara dimulai. Lonjakan trafik login hari ini jauh di atas rata-rata, seperti yang memang diperkirakan panitia." },
      { text: "Di tengah lonjakan trafik sah ini, dasbor pemantauan Kael juga mendeteksi sejumlah percobaan login gagal yang jumlahnya ikut melonjak, sulit dibedakan apakah itu murni anggota baru yang salah memasukkan kata sandi karena gugup mendaftar, atau serangan sungguhan yang sengaja menunggangi keramaian acara ini." },
      { text: "Kael memeriksa lebih dekat, dan menemukan dua kelompok pola berbeda, bercampur dalam satu lonjakan besar yang sama. Satu kelompok menunjukkan percobaan gagal yang tersebar ke banyak akun berbeda secara acak, sementara kelompok lain menunjukkan percobaan gagal yang berulang kali menyasar akun-akun admin dan moderator forum secara spesifik." },
      { text: "Waktu terasa sempit. Acara akan segera dimulai, dan tindakan yang salah bisa berarti memblokir anggota baru yang sah, atau membiarkan serangan sungguhan lolos di tengah keramaian yang disengaja sebagai kedok." },
    ],
    question: "Bagaimana Kael memilah dan menangani kedua pola yang bercampur dalam lonjakan trafik ini?",
    choices: [
      {
        id: "safe",
        label: "Membiarkan pola acak ke banyak akun berjalan normal sebagai bagian dari lonjakan sah, tapi segera mengisolasi dan menahan khusus pola yang berulang menyasar akun admin dan moderator.",
        points: 2,
        result: [
          { text: "Kael memisahkan kedua pola itu berdasarkan ciri targetnya, bukan sekadar jumlah totalnya yang sama-sama tinggi." },
          { text: "Pola acak ke banyak akun ia biarkan berjalan normal, karena memang konsisten dengan perilaku anggota baru yang gugup mendaftar menjelang acara." },
          { text: "Pola yang berulang kali menyasar akun admin dan moderator segera ia isolasi dan tahan secara khusus, tanpa mengganggu lonjakan pendaftaran sah yang sedang berlangsung." },
          { text: "Level 4 Brute Force selesai. Kael berhasil memilah ancaman nyata dari keramaian yang sah, bukan dari jumlahnya yang mencolok, melainkan dari pola targetnya yang berbeda." },
        ],
      },
      {
        id: "neutral",
        label: "Memblokir sementara seluruh percobaan login yang gagal untuk mengamankan situasi, termasuk dari anggota baru yang sah.",
        points: -2,
        result: [
          { text: "Demi mengamankan situasi dengan cepat, Kael memblokir sementara seluruh percobaan login yang gagal, tanpa membedakan pola targetnya." },
          { text: "Serangan yang menyasar akun admin memang ikut tertahan, tapi ratusan anggota baru yang sah dan hanya salah mengetik kata sandi karena gugup turut terkunci di tengah acara penting mereka." },
          { text: "Panitia acara kecewa karena banyak anggota baru yang gagal bergabung tepat saat acara dimulai." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkan seluruh lonjakan trafik berjalan tanpa tindakan apa pun karena dianggap wajar akibat acara besar yang sedang berlangsung.",
        points: -4,
        result: [
          { text: "Karena lonjakan trafik memang diperkirakan sejak awal akibat acara besar ini, Kael membiarkan seluruhnya berjalan tanpa tindakan apa pun." },
          { text: "Ia tidak menyadari bahwa di balik keramaian yang sah itu, ada pola serangan sungguhan yang sengaja menunggangi momentum acara sebagai kedok." },
          { text: "Sebelum acara selesai, salah satu akun moderator berhasil dibobol lewat percobaan yang bersembunyi di tengah lonjakan trafik yang dianggap wajar." },
        ],
      },
    ],
  },
};
