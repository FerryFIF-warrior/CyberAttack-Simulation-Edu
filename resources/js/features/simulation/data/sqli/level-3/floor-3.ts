import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel3Floor3: FloorContent = {
  id: "sqli_level_3_floor_3",
  simulationId: "sqli",
  levelNumber: 3,
  floorNumber: 3,
  title: "Mengirim Kabar Lewat Jalur Lain",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_3", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "shelf_3", icon: "shelf", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "silent_form_1",
      label: "Formulir Tanpa Respons",
      icon: "form",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah laporan soal eskalasi label, sistem laporan diperbaiki total, kini tidak menampilkan pesan apa pun, bahkan tidak ada perbedaan jeda waktu seperti yang dulu bisa dibaca Kael di Gerbang Arsip." },
      { text: "Formulir itu benar-benar diam, apa pun yang dimasukkan, responsnya selalu sama datar, tanpa petunjuk apa pun tentang apakah permintaan itu berhasil atau gagal." },
      { text: "Kael teringat satu teknik yang belum pernah ia coba sebelumnya: jika sistem ini terhubung ke layanan pengiriman notifikasi internal, mungkin ia bisa memancing sistem itu mengirimkan sebuah kabar kecil ke alamat pengujian miliknya sendiri, sebagai bukti bahwa permintaannya benar-benar diproses." },
      { text: "Ini adalah cara membuktikan celah tanpa pernah melihat responsnya secara langsung, mengirim kabar lewat jalur sama sekali berbeda dari jalur utama yang sedang diuji." },
    ],
    question: "Bagaimana Kael membuktikan celah ini tanpa respons langsung dari formulir?",
    choices: [
      {
        id: "safe",
        label: "Memancing sistem mengirim notifikasi kecil ke alamat pengujian miliknya sendiri sebagai bukti permintaan berhasil diproses.",
        points: 4,
        result: [
          { text: "Kael menyusun permintaan yang memancing sistem notifikasi internal mengirim sebuah kabar kecil ke alamat pengujian miliknya sendiri." },
          { text: "Beberapa saat kemudian, notifikasi itu benar-benar masuk, bukti nyata bahwa permintaannya berhasil diproses meski formulir utama tetap diam tanpa respons apa pun." },
          { text: "Kael mencatat teknik ini sebagai bukti kuat: menyembunyikan respons di permukaan tidak sepenuhnya menutup celah jika sistem lain yang terhubung masih bisa dipancing untuk bersaksi." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba berkali-kali dengan harapan responsnya suatu saat berubah, tanpa memanfaatkan jalur lain.",
        points: -1,
        result: [
          { text: "Kael mencoba berkali-kali dengan variasi kecil, berharap responsnya suatu saat berubah." },
          { text: "Formulir tetap diam seperti sebelumnya, dan tanpa memanfaatkan jalur lain, Kael tidak mendapat bukti apa pun yang bisa dilaporkan." },
        ],
      },
      {
        id: "risky",
        label: "Memancing sistem mengirim notifikasi ke alamat acak milik orang lain untuk 'melihat apa yang terjadi'.",
        points: -3,
        result: [
          { text: "Penasaran dengan hasilnya, Kael memancing sistem mengirim notifikasi ke alamat acak yang bukan miliknya sendiri." },
          { text: "Seseorang yang tidak terkait sama sekali dengan pengujian ini menerima notifikasi aneh yang membingungkan dan mencurigakan." },
          { text: "Pemilik sistem harus menjelaskan dan meminta maaf atas kejadian itu, sebuah konsekuensi yang seharusnya bisa dihindari jika pengujian tetap berada dalam batas yang disepakati." },
        ],
      },
    ],
  },
};
