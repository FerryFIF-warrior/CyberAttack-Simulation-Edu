import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel1Floor4: FloorContent = {
  id: "sqli_level_1_floor_4",
  simulationId: "sqli",
  levelNumber: 1,
  floorNumber: 4,
  title: "Tahap 4: Menguji Penjaga Otomatis",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_7", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "pillar_8", icon: "pillar", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "gate_4",
      label: "Gerbang Arsip",
      icon: "gate",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pemilik arsip tidak puas hanya dengan penyaring sederhana. Kali ini mereka memasang penjaga otomatis yang jauh lebih waspada, mampu mengenali banyak pola formulir mencurigakan sekaligus." },
      { text: "Kael mencoba variasi penulisan yang berhasil minggu lalu, tetapi penjaga otomatis ini langsung mengenalinya dan menolak dengan tegas." },
      { text: "Sambil mengamati cara kerja penjaga baru ini, Kael menyadari satu hal: penjaga otomatis hanya mencocokkan pola kata secara persis, termasuk besar kecilnya huruf, tanpa benar-benar memahami maksud kalimatnya." },
      { text: "Jika benar, sebuah kalimat yang ditulis dengan variasi huruf besar dan kecil yang tidak biasa mungkin tidak akan dikenali sebagai pola yang sama oleh penjaga otomatis itu." },
    ],
    question: "Bagaimana Kael mencoba melewati penjaga otomatis ini?",
    choices: [
      {
        id: "safe",
        label: "Menulis ulang deklarasi dengan variasi huruf besar-kecil yang tidak biasa, untuk menguji apakah penjaga otomatis hanya mencocokkan pola secara kaku.",
        points: 4,
        result: [
          { text: "Kael menulis ulang deklarasinya dengan kombinasi huruf besar dan kecil yang tidak lazim, tetap bermakna sama seperti sebelumnya." },
          { text: "Penjaga otomatis membandingkan pola secara persis dan tidak mengenali variasi hurufnya sebagai pola yang sama dengan yang telah ia blokir." },
          { text: "Formulir itu lolos, membuktikan bahwa penjaga otomatis punya titik buta pada variasi penulisan, bukan benar-benar memahami makna kalimat. Kael mencatat temuan penting ini." },
        ],
      },
      {
        id: "neutral",
        label: "Mencoba menuliskan deklarasi dengan kode karakter tersembunyi yang mewakili simbol terlarang.",
        points: 1,
        result: [
          { text: "Kael mencoba menyamarkan simbol terlarang menggunakan kode karakter tersembunyi." },
          { text: "Sebagian berhasil lolos, tetapi hasilnya tidak konsisten karena beberapa penjaga otomatis modern sudah bisa mengenali kode semacam itu." },
        ],
      },
      {
        id: "risky",
        label: "Mengirim satu formulir sangat panjang berisi banyak kata kunci mencurigakan sekaligus, berharap penjaga kewalahan.",
        points: -2,
        result: [
          { text: "Kael mengirim formulir yang sangat panjang, penuh dengan kata kunci mencurigakan yang ditumpuk begitu saja." },
          { text: "Penjaga otomatis justru semakin mudah mengenali pola aneh itu dan langsung memblokir akses Kael secara permanen dari gerbang itu." },
          { text: "Kael harus mencari jalur pengujian lain, karena akses ke gerbang ini sudah ditutup sepenuhnya untuknya." },
        ],
      },
    ],
  },
};
