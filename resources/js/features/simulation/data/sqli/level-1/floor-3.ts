import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel1Floor3: FloorContent = {
  id: "sqli_level_1_floor_3",
  simulationId: "sqli",
  levelNumber: 1,
  floorNumber: 3,
  title: "Tahap 3: Menembus Penyaring Sederhana",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_5", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "pillar_6", icon: "pillar", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "gate_3",
      label: "Gerbang Arsip",
      icon: "gate",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah laporan Kael, pemilik arsip memasang penyaring sederhana di gerbang: formulir yang mengandung tanda kutip atau simbol mencurigakan tertentu akan langsung ditolak." },
      { text: "Pemilik meminta Kael menguji ulang gerbang untuk memastikan perbaikan itu benar-benar menutup celahnya, bukan hanya menyamarkannya." },
      { text: "Kael mencoba deklarasi lama yang berhasil minggu lalu, dan kali ini penjaga langsung menolaknya dengan pesan: Formulir mengandung simbol terlarang." },
      { text: "Namun Kael memperhatikan sesuatu: penyaring itu hanya menolak simbol-simbol tertentu secara persis, tanpa benar-benar memahami makna di balik formulirnya." },
    ],
    question: "Bagaimana Kael menguji kekuatan penyaring ini lebih jauh?",
    choices: [
      {
        id: "safe",
        label: "Mencoba menyusun deklarasi yang sama maknanya namun ditulis dengan cara berbeda dari yang diblokir penyaring.",
        points: 4,
        result: [
          { text: "Kael menyusun ulang kalimat deklarasinya dengan cara penulisan lain yang maknanya tetap sama, tanpa memakai simbol yang diblokir penyaring." },
          { text: "Penjaga tidak mengenali pola barunya dan tetap membacanya sebagai formulir yang sah." },
          { text: "Kael berhasil membuktikan bahwa penyaring hanya menolak simbol tertentu secara kaku, bukan memahami maksud sebenarnya dari formulir itu. Temuan ini segera ia catat." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba kembali deklarasi lama persis seperti sebelumnya.",
        points: 1,
        result: [
          { text: "Kael mencoba lagi deklarasi lamanya tanpa perubahan apa pun." },
          { text: "Penyaring langsung mendeteksi pola yang sama dan menolaknya. Tidak ada informasi baru yang didapat dari percobaan ini." },
        ],
      },
      {
        id: "risky",
        label: "Mengirim ribuan variasi formulir secara acak dan cepat untuk mencari celah lewat coba-coba.",
        points: -2,
        result: [
          { text: "Kael mencoba mengirim ribuan variasi formulir dalam waktu singkat, berharap salah satunya lolos secara kebetulan." },
          { text: "Sistem mendeteksi pola pengiriman yang tidak wajar dan langsung memblokir akses Kael selama satu jam." },
          { text: "Pengujian pun terhenti total, dan Kael kehilangan waktu berharga tanpa temuan baru." },
        ],
      },
    ],
  },
};
