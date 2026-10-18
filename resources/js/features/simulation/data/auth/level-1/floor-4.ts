import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel1Floor4: FloorContent = {
  id: "auth_level_1_floor_4",
  simulationId: "auth",
  levelNumber: 1,
  floorNumber: 4,
  title: "Tahap 4: Menguji Penyamaran Identitas",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_4", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_5", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "victim_dashboard_1",
      label: "Dasbor Moderator",
      icon: "dashboard",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael kini memegang salinan lencana moderator dari demonstrasi sebelumnya, disimpan khusus untuk sesi pengujian lanjutan dengan izin tertulis dari pemilik arsip." },
      { text: "Pertanyaan berikutnya adalah seberapa jauh celah ini bisa dimanfaatkan: apakah forum benar-benar hanya memeriksa lencana tanpa memverifikasi siapa pemilik aslinya?" },
      { text: "Kael mencoba memasang salinan lencana itu ke perangkatnya sendiri, lalu membuka halaman dasbor yang seharusnya hanya bisa diakses moderator." },
      { text: "Jika forum benar-benar hanya memeriksa keberadaan lencana tanpa verifikasi tambahan, Kael akan langsung dianggap sebagai moderator asli." },
    ],
    question: "Bagaimana Kael menguji apakah forum bisa ditipu dengan lencana salinan ini?",
    choices: [
      {
        id: "safe",
        label: "Memasang salinan lencana itu ke perangkat pengujian, lalu memuat ulang halaman dasbor untuk melihat reaksi sistem.",
        points: 4,
        result: [
          { text: "Kael memasang salinan lencana moderator ke perangkat pengujiannya melalui alat pemeriksa browser." },
          { text: "Ia memuat ulang halaman dasbor, dan forum langsung mengenalinya sebagai moderator, tanpa meminta verifikasi tambahan apa pun." },
          { text: "Penyamaran identitas terbukti berhasil. Kael segera keluar dari dasbor dan mencatat temuan ini sebagai celah paling serius dalam laporannya." },
        ],
      },
      {
        id: "neutral",
        label: "Menggunakan alat baris perintah untuk mengirim satu permintaan dengan salinan lencana itu.",
        points: 1,
        result: [
          { text: "Kael mengirim satu permintaan data melalui alat baris perintah menggunakan salinan lencana itu." },
          { text: "Ia berhasil mendapatkan sebagian data dasbor, tetapi tidak bisa benar-benar berinteraksi dengan tampilan seperti moderator asli." },
        ],
      },
      {
        id: "risky",
        label: "Mengirim seratus permintaan sekaligus memakai lencana yang sama agar pengujian 'lebih cepat selesai'.",
        points: -2,
        result: [
          { text: "Kael mengirim seratus permintaan sekaligus dengan lencana yang sama demi mempercepat pengujian." },
          { text: "Sistem mendeteksi aktivitas aneh dari satu lencana yang sama dan langsung membatalkannya secara otomatis." },
          { text: "Lencana itu tidak lagi berlaku, dan Kael harus mengulang seluruh proses pengambilan lencana dari awal." },
        ],
      },
    ],
  },
};
