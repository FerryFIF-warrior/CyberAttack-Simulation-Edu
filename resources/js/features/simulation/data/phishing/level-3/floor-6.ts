import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel3Floor6: FloorContent = {
  id: "phishing_level_3_floor_6",
  simulationId: "phishing",
  levelNumber: 3,
  floorNumber: 6,
  title: "Ujian Akhir: Memutus Rantai Kampanye",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "trophy_1", icon: "trophy", x: 80, y: 25, scale: 1.6 },
      { id: "desk_6", icon: "desk", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "war_room_1",
      label: "Ruang Koordinasi Insiden",
      icon: "monitor",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dua minggu penuh ketegangan berakhir di satu ruangan: pengintaian diam-diam, kampanye email serentak, penyamaran vendor, jebakan rapat virtual, hingga penyamaran tim keamanan sendiri, semuanya berasal dari satu kelompok penyerang yang sama." },
      { text: "Manajemen perusahaan meminta laporan akhir: bukan sekadar daftar insiden, tapi rencana nyata agar kampanye sebesar ini tidak pernah bisa menembus perusahaan lagi." },
      { text: "Kael berdiri di depan tim, menyadari bahwa setiap serangan yang mereka hadapi selalu memanfaatkan satu hal yang sama, celah antara satu orang yang curiga dan sistem yang tidak saling terhubung untuk saling memperingatkan." },
      { text: "Inilah saatnya menyampaikan simpulan yang akan menentukan bagaimana perusahaan menghadapi kampanye serupa di masa depan." },
    ],
    question: "Apa rekomendasi akhir yang akan Kael sampaikan kepada manajemen?",
    choices: [
      {
        id: "safe",
        label: "Membangun jalur pelaporan cepat yang otomatis menyebarkan peringatan ke seluruh perusahaan begitu satu pola serangan terdeteksi.",
        points: 2,
        result: [
          { text: "Kael menjelaskan bahwa akar masalah sesungguhnya bukan karena karyawan kurang waspada, tapi karena kewaspadaan satu orang tidak pernah cepat sampai ke orang lain yang menghadapi ancaman serupa." },
          { text: "Ia merekomendasikan jalur pelaporan cepat: begitu satu pola serangan terkonfirmasi, peringatan otomatis langsung tersebar ke seluruh karyawan dalam hitungan menit, bukan menunggu laporan demi laporan terkumpul." },
          { text: "Manajemen menyetujui dan membangun sistem itu. Kampanye berikutnya yang mencoba menyerang perusahaan langsung terdeteksi dan diredam sejak percobaan pertamanya." },
          { text: "Level 3 Phishing selesai. Kael kini memahami bahwa melawan kampanye besar membutuhkan kecepatan kolektif, bukan hanya kewaspadaan individu." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan pelatihan kewaspadaan tambahan saja tanpa membangun jalur pelaporan cepat.",
        points: 1,
        result: [
          { text: "Kael hanya merekomendasikan pelatihan kewaspadaan tambahan bagi seluruh karyawan." },
          { text: "Pelatihan itu membantu, tapi tanpa jalur pelaporan cepat, setiap kampanye baru tetap butuh waktu lama sebelum seluruh perusahaan benar-benar waspada." },
        ],
      },
      {
        id: "risky",
        label: "Menyatakan ancaman sudah selesai karena kampanye terakhir berhasil digagalkan satu per satu.",
        points: -5,
        result: [
          { text: "Merasa lega karena setiap serangan berhasil digagalkan satu per satu, Kael menyatakan ancaman ini sudah selesai." },
          { text: "Manajemen mengingatkan bahwa berhasil menggagalkan setiap serangan secara manual bukan berarti pertahanan sudah cukup kuat, hanya berarti selama ini mereka cukup beruntung." },
          { text: "Tanpa perbaikan sistemik, perusahaan tetap rentan terhadap kampanye serupa yang mungkin datang lebih licin di masa depan." },
        ],
      },
    ],
  },
};
