import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor5: FloorContent = {
  id: "phishing_level_5_floor_5",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 5,
  title: "Kebocoran yang Sudah Terjadi",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-zinc-200 to-slate-300",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "device_3", icon: "device", x: 80, y: 22, scale: 1.4 },
      { id: "phone_1", icon: "phone", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "press_statement_1",
      label: "Draf Pernyataan Resmi",
      icon: "document",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Tiga minggu setelah simulasi internal itu, ketenangan Kael pecah oleh telepon dari jurnalis kesehatan independen. Nada suaranya sopan tapi tajam: 'Saya punya bukti data pasien Wira Husada beredar di forum tertutup. Apakah pihak rumah sakit sudah tahu?'" },
      { text: "Kael belum tahu. Pemeriksaan darurat mengonfirmasi mimpi buruk itu nyata, sebagian kecil data pasien rawat inap memang bocor, berasal dari akun staf administrasi yang sempat disusupi di floor sebelumnya namun belum sepenuhnya dibersihkan." },
      { text: "Direktur rumah sakit menatap Kael dengan wajah pucat, meminta arahan segera: apa yang harus disampaikan ke publik, dan kapan, sebelum jurnalis itu mempublikasikan beritanya sendiri dengan informasi yang mungkin tidak lengkap atau keliru." },
      { text: "Ini bukan lagi soal mencegah serangan. Ini soal bagaimana sebuah institusi kesehatan merespons kebocoran yang sudah terjadi, dengan kejujuran yang cukup untuk dipercaya tapi tanpa memperburuk kepanikan publik." },
    ],
    question: "Bagaimana Kael menyarankan rumah sakit merespons kebocoran data yang sudah terjadi ini?",
    choices: [
      {
        id: "safe",
        label: "Menyarankan pengungkapan proaktif dan jujur kepada pasien terdampak serta otoritas terkait, disertai langkah konkret yang sudah dan akan diambil, sebelum berita itu dipublikasikan pihak lain.",
        points: 3,
        result: [
          { text: "Kael menyarankan direktur untuk proaktif mengungkap kebocoran ini kepada pasien yang terdampak dan otoritas perlindungan data terkait, sebelum jurnalis itu mempublikasikan versinya sendiri." },
          { text: "Pernyataan itu disusun jujur tentang apa yang terjadi, data apa yang terdampak, dan langkah konkret yang sudah diambil untuk menutup celahnya, tanpa meminimalkan masalah atau menyalahkan pihak lain." },
          { text: "Kepercayaan publik terguncang tapi tidak hancur. Pasien dan media menghargai kejujuran dan kecepatan responsnya, jauh lebih baik dibanding jika kebocoran itu terungkap lebih dulu lewat pihak luar." },
        ],
      },
      {
        id: "neutral",
        label: "Menunggu hasil investigasi internal selesai sepenuhnya sebelum mengeluarkan pernyataan apa pun, meski itu berarti menunda selama beberapa minggu.",
        points: -3,
        result: [
          { text: "Kael menyarankan menunggu investigasi internal selesai sepenuhnya sebelum bicara ke publik, demi memastikan setiap detail akurat." },
          { text: "Selama masa tunggu itu, jurnalis tersebut mempublikasikan beritanya sendiri dengan informasi yang tidak lengkap, memicu spekulasi dan kepanikan yang sebenarnya bisa dikendalikan lebih baik lewat komunikasi lebih awal." },
          { text: "Rumah sakit terlihat seperti menutup-nutupi, meski niat sebenarnya hanya kehati-hatian." },
        ],
      },
      {
        id: "risky",
        label: "Menyarankan direktur untuk membantah adanya kebocoran kepada jurnalis sampai bukti yang lebih kuat benar-benar dipublikasikan.",
        points: -7,
        result: [
          { text: "Demi membeli waktu, Kael menyarankan direktur membantah mentah-mentah klaim kebocoran itu kepada jurnalis, berharap masalah bisa diselesaikan diam-diam terlebih dahulu." },
          { text: "Ketika jurnalis itu akhirnya mempublikasikan bukti konkret yang dimilikinya, bantahan resmi rumah sakit sebelumnya berubah menjadi bukti kebohongan yang disengaja." },
          { text: "Kepercayaan publik terhadap Wira Husada runtuh jauh lebih dalam dibanding jika kebocoran itu sendiri yang menjadi sorotan utama, karena sekarang institusi ini juga dianggap tidak jujur." },
        ],
      },
    ],
  },
};
