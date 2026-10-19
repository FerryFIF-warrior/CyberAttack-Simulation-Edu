import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel2Floor5: FloorContent = {
  id: "auth_level_2_floor_5",
  simulationId: "auth",
  levelNumber: 2,
  floorNumber: 5,
  title: "Ujian Akhir: Laporan Rantai Kelemahan Identitas",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_5", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_5", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "final_panel_1",
      label: "Meja Laporan Akhir",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pemilik forum mengumpulkan seluruh tim untuk sesi terakhir. Minggu ini terasa panjang bagi Kael: kode pemulihan yang mudah ditebak, simulasi memancing kode verifikasi, lencana lama yang tak pernah kedaluwarsa, dan penyamaran lewat perangkat asing yang luput dari notifikasi." },
      { text: "Satu pertanyaan besar mengambang di ruangan itu: bagaimana forum bisa yakin identitas seseorang benar-benar terjaga, kalau begitu banyak titik lemah tersembunyi di balik sistem yang terlihat aman?" },
      { text: "Kael menata catatannya, menyadari bahwa keempat temuan minggu ini sebenarnya saling terhubung, bukan empat masalah terpisah, melainkan satu kesenjangan besar antara keamanan teknis dan kewaspadaan manusia maupun kebijakan di baliknya." },
      { text: "Semua mata di ruangan itu tertuju padanya, menunggu simpulan akhir yang akan menentukan arah perbaikan forum ke depan." },
    ],
    question: "Apa simpulan akhir yang akan Kael sampaikan?",
    choices: [
      {
        id: "safe",
        label: "Memperbaiki kode pemulihan, melatih kewaspadaan staf, menerapkan kedaluwarsa sesi, dan membangun notifikasi perangkat, sebagai satu kebijakan identitas yang menyeluruh.",
        points: 4,
        result: [
          { text: "Kael menjelaskan bahwa keempat celah ini sebenarnya adalah empat sisi dari satu masalah yang sama: identitas pengguna yang tidak benar-benar terjaga dari ujung ke ujung." },
          { text: "Ia merekomendasikan satu kebijakan identitas menyeluruh: kode pemulihan yang kuat dan terbatas waktu, pelatihan rutin kewaspadaan staf terhadap rekayasa sosial, kedaluwarsa sesi otomatis, dan notifikasi login dari perangkat baru." },
          { text: "Pemilik forum menerapkan seluruh rekomendasi itu sekaligus, membangun fondasi identitas yang jauh lebih kokoh dibanding sekadar menambal satu demi satu celah." },
          { text: "Level 2 Authentication Attack selesai. Kael kini memahami bahwa menjaga identitas pengguna bukan hanya soal kode dan kata sandi, tapi juga soal kebijakan dan kesadaran manusia di baliknya." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan perbaikan teknis saja, tanpa menyinggung pelatihan kewaspadaan staf.",
        points: 1,
        result: [
          { text: "Kael hanya merekomendasikan perbaikan teknis: kode pemulihan, kedaluwarsa sesi, dan notifikasi perangkat." },
          { text: "Sistemnya membaik, tetapi celah soal kewaspadaan manusia terhadap rekayasa sosial tetap terbuka, karena tidak ada pelatihan tambahan yang diusulkan." },
        ],
      },
      {
        id: "risky",
        label: "Menyimpulkan bahwa forum ini sudah 'cukup aman' karena belum pernah ada insiden nyata yang dilaporkan.",
        points: -2,
        result: [
          { text: "Kael menyimpulkan bahwa karena belum pernah ada insiden nyata yang dilaporkan, forum ini sudah cukup aman seperti adanya." },
          { text: "Pemilik forum kecewa, mengingatkan bahwa tidak adanya laporan insiden bukan berarti tidak ada risiko, melainkan bisa jadi risiko itu belum pernah benar-benar diuji sampai hari ini." },
          { text: "Tanpa rekomendasi perbaikan yang jelas, seluruh temuan minggu ini berisiko terlupakan begitu saja." },
        ],
      },
    ],
  },
};
