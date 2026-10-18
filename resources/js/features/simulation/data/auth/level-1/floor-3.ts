import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel1Floor3: FloorContent = {
  id: "auth_level_1_floor_3",
  simulationId: "auth",
  levelNumber: 1,
  floorNumber: 3,
  title: "Tahap 3: Membuktikan Pencurian Lencana",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_3", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_4", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "comment_form_1",
      label: "Kotak Komentar",
      icon: "board",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael sudah tahu kotak komentar menampilkan tulisan tamu apa adanya, dan lencana anggota bisa diintip tanpa perlindungan. Kini saatnya membuktikan keduanya bisa digabungkan menjadi ancaman nyata." },
      { text: "Pemilik arsip mengizinkan Kael melakukan satu demonstrasi terkendali: memasang sebuah catatan di kotak komentar yang akan dilihat oleh moderator forum saat sesi pengujian berlangsung." },
      { text: "Rencananya, saat moderator membuka halaman komentar, catatan tersembunyi itu akan diam-diam menyalin lencana milik moderator dan mengirimkannya ke catatan pengujian Kael, murni untuk dibuktikan lalu segera dihapus." },
      { text: "Kael tahu catatan ini harus terlihat biasa saja, tidak boleh mencolok, agar pengujian benar-benar mencerminkan serangan nyata yang bisa luput dari kewaspadaan." },
    ],
    question: "Catatan seperti apa yang akan Kael pasang untuk demonstrasi ini?",
    choices: [
      {
        id: "safe",
        label: "Memasang catatan yang terlihat seperti komentar biasa, namun diam-diam menyalin lencana siapa pun yang membukanya.",
        points: 4,
        result: [
          { text: "Kael memasang catatan yang tampak seperti komentar biasa, tanpa ada yang terlihat janggal di permukaan." },
          { text: "Saat moderator membuka halaman komentar untuk sesi pengujian, catatan itu diam-diam menyalin lencana moderator di latar belakang." },
          { text: "Lencana berhasil tersalin tanpa ada tanda mencolok apa pun. Kael langsung menghapus catatan itu dan mencatat hasilnya sebagai bukti pengujian." },
        ],
      },
      {
        id: "neutral",
        label: "Memasang catatan yang memindahkan moderator ke halaman lain sambil membawa salinan lencananya.",
        points: 1,
        result: [
          { text: "Kael memasang catatan yang berhasil menyalin lencana, tetapi juga memindahkan moderator ke halaman lain." },
          { text: "Perpindahan halaman yang tiba-tiba membuat moderator curiga ada yang tidak biasa, meski demonstrasinya tetap berhasil." },
        ],
      },
      {
        id: "risky",
        label: "Memasang catatan dengan jendela peringatan yang jelas-jelas terlihat agar 'pasti ketahuan berhasil'.",
        points: -2,
        result: [
          { text: "Kael memasang catatan dengan jendela peringatan yang muncul mencolok di layar moderator." },
          { text: "Moderator langsung menyadari sesuatu yang aneh dan segera melaporkannya ke admin forum." },
          { text: "Catatan itu segera dihapus sebelum Kael sempat membuktikan apa pun, dan sesi demonstrasi harus diulang dari awal." },
        ],
      },
    ],
  },
};
