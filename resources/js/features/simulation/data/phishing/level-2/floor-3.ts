import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel2Floor3: FloorContent = {
  id: "phishing_level_2_floor_3",
  simulationId: "phishing",
  levelNumber: 2,
  floorNumber: 3,
  title: "Perintah Transfer dari Atasan",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-amber-100 to-yellow-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_1", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "plant_3", icon: "plant", x: 85, y: 22, scale: 1.2 },
      { id: "clock_1", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "laptop_office_1",
      label: "Laptop Kerja",
      icon: "laptop",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Senin pagi di kantor, kotak masuk Kael dipenuhi email kerja seperti biasa. Satu email, dari alamat yang tampak seperti milik atasannya, Pak Hendra, mencuri perhatiannya." },
      { text: "Isinya singkat namun berat: Kael, saya sedang rapat penting dan tidak bisa dihubungi lewat telepon. Tolong segera transfer dana ke rekening vendor ini untuk pembayaran mendesak. Kirim konfirmasi lewat email saja, jangan telepon kantor dulu, saya sedang di ruang tertutup." },
      { text: "Nominalnya cukup besar, dan nada email itu terasa mendesak, seolah tidak ada waktu untuk bertanya-tanya. Kael tahu betul, Pak Hendra memang sering sibuk rapat di pagi hari." },
      { text: "Namun satu kalimat terus mengusik pikirannya: jangan telepon kantor dulu. Bukankah justru menelepon adalah hal paling wajar untuk memastikan perintah sebesar ini?" },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Mengonfirmasi langsung ke Pak Hendra atau bagian keuangan lewat jalur komunikasi resmi perusahaan.",
        points: 4,
        result: [
          { text: "Kael tidak langsung memproses transfer. Ia menghubungi Pak Hendra lewat jalur komunikasi internal resmi perusahaan, bukan membalas email itu." },
          { text: "Pak Hendra justru balik bertanya, ia tidak pernah mengirim email semacam itu pagi ini." },
          { text: "Tim keuangan segera diberi tahu, dan transfer dana besar itu berhasil dicegah sebelum sempat dikirim." },
        ],
      },
      {
        id: "neutral",
        label: "Membalas email untuk meminta konfirmasi tambahan sebelum mentransfer.",
        points: 1,
        result: [
          { text: "Kael membalas email itu, meminta detail tambahan sebelum memproses transfer." },
          { text: "Pengirim membalas dengan alasan masuk akal yang membuat Kael semakin ragu, tapi ia tetap belum mentransfer apa pun." },
        ],
      },
      {
        id: "risky",
        label: "Segera mentransfer dana karena takut mengecewakan atasan.",
        points: -4,
        result: [
          { text: "Takut dianggap lalai, Kael segera memproses transfer sesuai instruksi di email." },
          { text: "Begitu dana terkirim, balasan dari 'Pak Hendra' berhenti sama sekali." },
          { text: "Siang harinya, Pak Hendra yang asli menanyakan laporan kerja seperti biasa, tanpa tahu-menahu soal transfer dana pagi tadi." },
        ],
      },
    ],
  },
};
