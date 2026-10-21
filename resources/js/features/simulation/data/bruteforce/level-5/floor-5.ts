import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor5: FloorContent = {
  id: "bruteforce_level_5_floor_5",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 5,
  title: "Menyusun Ulang Apa yang Sudah Terjadi",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-cyan-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "vault_5", icon: "vault", x: 80, y: 22, scale: 1.4 },
      { id: "clock_1", icon: "clock", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "forensic_table_1",
      label: "Meja Rekonstruksi Forensik",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kampanye besar itu akhirnya mereda, tapi pekerjaan Kael belum selesai. Sebuah tim audit independen diminta direksi untuk merekonstruksi secara lengkap apa yang sebenarnya terjadi selama berminggu-minggu serangan berlangsung, akun mana saja yang benar-benar berhasil ditembus, dan kapan tepatnya itu terjadi." },
      { text: "Log yang tersedia sangat banyak namun berantakan, tersebar di berbagai sistem yang tidak selalu mencatat waktu dengan format yang sama, beberapa bahkan tumpang tindih akibat pergantian zona waktu server selama proses mitigasi darurat." },
      { text: "Tim audit menekan Kael untuk segera memberi kesimpulan awal, karena regulator menunggu laporan insiden resmi dalam waktu dekat. Namun Kael tahu, kesimpulan yang terburu-buru dari data yang belum sepenuhnya diverifikasi bisa saja keliru, dan kesalahan dalam laporan resmi ke regulator punya konsekuensi serius." },
      { text: "Di sisi lain, menunda laporan terlalu lama juga berisiko dianggap menutup-nutupi atau tidak transparan oleh otoritas pengawas." },
    ],
    question: "Bagaimana Kael menyeimbangkan tekanan waktu pelaporan dengan kebutuhan akurasi forensik yang menyeluruh ini?",
    choices: [
      {
        id: "safe",
        label: "Menyampaikan laporan awal yang jelas membedakan temuan yang sudah terverifikasi dari yang masih diselidiki, sambil terus menyelaraskan seluruh catatan waktu lintas sistem secara menyeluruh.",
        points: 3,
        result: [
          { text: "Kael menyusun laporan awal yang secara eksplisit memisahkan temuan yang sudah terverifikasi penuh dari dugaan yang masih dalam proses investigasi, agar regulator mendapat gambaran jujur tentang tingkat kepastian setiap temuan." },
          { text: "Timnya terus bekerja menyelaraskan seluruh catatan waktu lintas sistem yang berbeda format, memastikan rekonstruksi akhir benar-benar akurat sebelum laporan final disusun." },
          { text: "Regulator menghargai transparansi bertahap ini, dan laporan final yang menyusul beberapa minggu kemudian terbukti akurat, memperkuat kredibilitas NusaBank di mata otoritas pengawas." },
        ],
      },
      {
        id: "neutral",
        label: "Menyampaikan laporan awal berdasarkan asumsi terbaik dari data yang belum sepenuhnya diselaraskan, demi memenuhi tenggat waktu regulator.",
        points: -3,
        result: [
          { text: "Demi memenuhi tenggat waktu, Kael menyampaikan laporan awal berdasarkan asumsi terbaik dari data yang belum sepenuhnya diselaraskan antar sistem." },
          { text: "Beberapa minggu kemudian, setelah penyelarasan selesai, ternyata ada satu akun tambahan yang sempat ditembus namun tidak tercatat dalam laporan awal karena kesalahan pencocokan waktu." },
          { text: "Regulator mempertanyakan ketidaksesuaian antara laporan awal dan laporan final, meski tidak disengaja, menimbulkan keraguan terhadap proses investigasi NusaBank." },
        ],
      },
      {
        id: "risky",
        label: "Menunda seluruh pelaporan ke regulator sampai forensik benar-benar selesai seratus persen, tanpa memberi pembaruan sementara apa pun.",
        points: -5,
        result: [
          { text: "Kael memilih menunda seluruh komunikasi ke regulator sampai forensik benar-benar tuntas seratus persen, menganggap laporan parsial lebih berisiko dibanding diam sepenuhnya." },
          { text: "Keheningan berkepanjangan ini membuat regulator curiga NusaBank menyembunyikan sesuatu, dan mulai menjalankan pemeriksaan tambahan yang lebih ketat dan memakan waktu dari yang seharusnya." },
          { text: "Hubungan kepercayaan dengan otoritas pengawas memburuk, bukan karena ada yang disembunyikan, tapi karena ketiadaan komunikasi itu sendiri yang menimbulkan kecurigaan." },
        ],
      },
    ],
  },
};
