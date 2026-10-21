import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel3Floor3: FloorContent = {
  id: "phishing_level_3_floor_3",
  simulationId: "phishing",
  levelNumber: 3,
  floorNumber: 3,
  title: "Penyamaran Vendor Tepercaya",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-amber-100 to-yellow-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_3", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "cabinet_2", icon: "cabinet", x: 85, y: 22, scale: 1.3 },
      { id: "clock_1", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "invoice_mail_1",
      label: "Email Tagihan Vendor",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kampanye besar itu berhasil diredam, tapi penyerang di baliknya rupanya tidak menyerah. Beberapa hari kemudian, bagian keuangan menerima email dari vendor percetakan yang memang sudah bertahun-tahun bekerja sama dengan perusahaan." },
      { text: "Isinya wajar: tagihan bulanan rutin, lengkap dengan nomor invoice yang formatnya sama seperti biasa, bahkan menyebut proyek cetak brosur yang memang sedang berjalan." },
      { text: "Satu-satunya perbedaan: nomor rekening tujuan pembayaran telah berubah, dengan alasan 'pergantian bank mitra' yang ditulis singkat di bagian bawah email." },
      { text: "Bagian keuangan hampir memproses pembayaran seperti biasa, sampai Kael diminta memeriksa karena nilainya cukup besar untuk transaksi rutin bulanan." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menghubungi vendor lewat kontak resmi yang sudah lama tercatat, bukan kontak yang tertera di email tagihan.",
        points: 4,
        result: [
          { text: "Kael mencari nomor kontak vendor dari catatan kerja sama lama perusahaan, bukan dari email yang baru diterima." },
          { text: "Vendor mengonfirmasi tidak pernah mengganti rekening pembayaran, dan tidak pernah mengirim email tagihan dengan perubahan semacam itu." },
          { text: "Pembayaran ke rekening palsu berhasil dibatalkan sebelum sempat diproses, menyelamatkan dana yang hampir mengalir ke pihak yang salah." },
        ],
      },
      {
        id: "neutral",
        label: "Membalas email itu untuk meminta konfirmasi tertulis soal perubahan rekening.",
        points: 1,
        result: [
          { text: "Kael membalas email itu, meminta konfirmasi tertulis resmi soal perubahan rekening." },
          { text: "Balasan yang diterima terlihat meyakinkan dengan kop surat yang tampak asli, membuat kecurigaan Kael sedikit berkurang meski belum benar-benar terverifikasi." },
        ],
      },
      {
        id: "risky",
        label: "Memproses pembayaran karena formatnya terlihat sama persis seperti tagihan-tagihan sebelumnya.",
        points: -4,
        result: [
          { text: "Karena formatnya terasa begitu familiar, bagian keuangan memproses pembayaran ke rekening baru yang tercantum di email." },
          { text: "Beberapa hari kemudian, vendor asli menagih pembayaran yang belum pernah mereka terima." },
          { text: "Perusahaan menyadari dana sudah terlanjur mengalir ke rekening yang bukan milik vendor sesungguhnya." },
        ],
      },
    ],
  },
};
