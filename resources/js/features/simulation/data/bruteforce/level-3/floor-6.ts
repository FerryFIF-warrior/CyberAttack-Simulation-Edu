import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel3Floor6: FloorContent = {
  id: "bruteforce_level_3_floor_6",
  simulationId: "bruteforce",
  levelNumber: 3,
  floorNumber: 6,
  title: "Ujian Akhir: Pertahanan Adaptif",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "flag_1", icon: "flag", x: 80, y: 22, scale: 1.4 },
      { id: "team_desk_2", icon: "desk", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "command_center_1",
      label: "Pusat Kendali Keamanan",
      icon: "monitor",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pengintaian infrastruktur, botnet terdistribusi, serangan meniru manusia, celah di integrasi pihak ketiga, lalu koordinasi tim darurat, semuanya telah dilalui. Forum selamat, tapi Kael tahu penyerang sebesar ini pasti akan kembali dengan taktik baru suatu hari nanti." },
      { text: "Pemilik forum bertanya satu hal terakhir: bagaimana caranya agar forum tidak harus selalu bereaksi setelah serangan baru terjadi, melainkan bisa benar-benar siap menghadapi taktik yang bahkan belum pernah mereka lihat sebelumnya." },
      { text: "Kael memandangi pusat kendali keamanan yang kini jauh lebih lengkap dibanding setahun lalu, lalu menyadari satu benang merah dari seluruh pertempuran minggu ini: setiap kali mereka menambal satu celah, penyerang selalu menemukan celah baru yang belum pernah dipikirkan." },
      { text: "Pertanyaannya bukan lagi bagaimana menutup semua celah yang ada sekarang, melainkan bagaimana membangun sistem yang bisa terus belajar dan beradaptasi terhadap celah yang belum pernah ditemukan." },
    ],
    question: "Apa rekomendasi akhir yang akan Kael sampaikan untuk membangun pertahanan jangka panjang?",
    choices: [
      {
        id: "safe",
        label: "Membangun sistem pemantauan adaptif yang terus mempelajari pola baru, dikombinasikan dengan evaluasi keamanan berkala di seluruh lini, bukan hanya form login.",
        points: 2,
        result: [
          { text: "Kael merekomendasikan dua hal yang saling melengkapi: sistem pemantauan yang terus mempelajari pola serangan baru secara otomatis, dan evaluasi keamanan berkala yang mencakup seluruh bagian sistem, bukan hanya form login utama." },
          { text: "Dengan begitu, forum tidak lagi hanya menunggu serangan terjadi untuk bereaksi, melainkan terus menyesuaikan pertahanannya seiring taktik penyerang yang terus berubah." },
          { text: "Pemilik forum menerapkan rekomendasi itu sepenuhnya, membangun fondasi keamanan yang dirancang untuk bertahan menghadapi ancaman yang bahkan belum pernah mereka bayangkan." },
          { text: "Level 3 Brute Force selesai. Kael kini memahami bahwa keamanan sejati bukan tentang menutup semua celah yang diketahui, melainkan membangun sistem yang terus siap menghadapi yang belum diketahui." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan menambah staf keamanan saja tanpa membangun sistem pemantauan adaptif.",
        points: 1,
        result: [
          { text: "Kael hanya merekomendasikan penambahan staf keamanan untuk memperkuat tim yang ada." },
          { text: "Tim yang lebih besar membantu merespons lebih cepat, tapi tanpa sistem yang bisa belajar sendiri, mereka tetap selalu satu langkah di belakang taktik baru penyerang." },
        ],
      },
      {
        id: "risky",
        label: "Menyatakan pertahanan saat ini sudah cukup kuat karena berhasil menahan semua serangan minggu ini.",
        points: -5,
        result: [
          { text: "Merasa bangga karena berhasil menahan semua serangan minggu ini, Kael menyatakan pertahanan saat ini sudah lebih dari cukup." },
          { text: "Pemilik forum mengingatkan bahwa setiap taktik yang berhasil ditahan minggu ini sebelumnya tidak pernah mereka duga sama sekali, artinya taktik berikutnya pun bisa jadi sama tak terduganya." },
          { text: "Tanpa persiapan untuk ancaman yang belum diketahui, forum berisiko kembali kewalahan ketika taktik baru yang benar-benar asing suatu saat muncul." },
        ],
      },
    ],
  },
};
