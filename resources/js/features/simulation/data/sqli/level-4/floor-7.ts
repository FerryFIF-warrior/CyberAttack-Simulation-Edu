import type { FloorContent } from "@/features/simulation/types/simulation";

export const sqliLevel4Floor7: FloorContent = {
  id: "sqli_level_4_floor_7",
  simulationId: "sqli",
  levelNumber: 4,
  floorNumber: 7,
  title: "Ujian Akhir: Dua Laporan Mirip, Satu Palsu",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-stone-200 to-amber-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "pillar_7", icon: "pillar", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_7", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "two_reports_panel_1",
      label: "Dua Laporan Teknis",
      icon: "report",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Menjelang akhir masa pengujian menyeluruh, Kael menerima dua laporan teknis dari tim yang mengaku sebagai konsultan keamanan independen lain yang juga ditugaskan meninjau sistem arsip ini. Kedua laporan itu sama-sama menyebut satu celah kritis yang perlu segera ditambal." },
      { text: "Laporan pertama menunjukkan celah di formulir ekspor data, lengkap dengan penjelasan teknis rinci: jalur kode yang terdampak, cara data diproses ulang tanpa validasi, dan bukti berupa catatan hasil pengujian langkah demi langkah yang bisa diverifikasi ulang." },
      { text: "Laporan kedua menunjukkan celah yang berbeda, di sistem rekomendasi arsip, dengan bahasa yang terdengar meyakinkan dan penuh istilah teknis, tapi tanpa langkah pengujian yang bisa diulang, hanya kesimpulan akhir yang menyebut 'celah kritis telah dikonfirmasi oleh tim kami'." },
      { text: "Waktu perbaikan terbatas, dan tim pengembang hanya punya kapasitas menangani satu celah terlebih dahulu sebelum sistem diluncurkan ke publik. Kael harus memutuskan laporan mana yang benar-benar layak dipercaya untuk diprioritaskan." },
    ],
    question: "Laporan mana yang akan diprioritaskan Kael, dan bagaimana ia memastikan keputusannya tepat?",
    choices: [
      {
        id: "safe",
        label: "Mencoba mereproduksi sendiri langkah pengujian di kedua laporan sebelum memutuskan, bukan menilai dari seyakin apa bahasa laporannya.",
        points: 2,
        result: [
          { text: "Kael tidak langsung menilai dari seyakin apa bahasa masing-masing laporan, melainkan mencoba mereproduksi sendiri langkah pengujian yang disebutkan di keduanya." },
          { text: "Laporan pertama berhasil ia ulangi persis seperti yang dijelaskan, celah di formulir ekspor data itu benar-benar nyata dan bisa dibuktikan kembali." },
          { text: "Laporan kedua, meski bahasanya terdengar meyakinkan, ternyata tidak bisa direproduksi sama sekali, sistem rekomendasi arsip justru sudah memvalidasi data dengan baik. Laporan itu sengaja dibuat menyesatkan agar waktu perbaikan terbuang ke tempat yang salah." },
          { text: "Level 4 SQL Injection selesai. Kael berhasil membedakan laporan yang kredibel dari yang menyesatkan, bukan dari seyakin apa nada bicaranya, melainkan dari bukti yang bisa diverifikasi ulang." },
        ],
      },
      {
        id: "neutral",
        label: "Memilih memprioritaskan laporan kedua karena bahasanya terdengar lebih meyakinkan dan menyebut 'telah dikonfirmasi'.",
        points: -2,
        result: [
          { text: "Kael memilih memprioritaskan laporan kedua karena bahasanya terdengar lebih tegas dan menyebut sudah 'dikonfirmasi' oleh tim lain." },
          { text: "Waktu perbaikan yang terbatas habis untuk meninjau sistem rekomendasi yang ternyata sudah aman, sementara celah nyata di formulir ekspor data tertunda penanganannya." },
          { text: "Kael menyesali keputusannya, menyadari bahwa nada meyakinkan tanpa bukti yang bisa diverifikasi tidak seharusnya menjadi dasar prioritas." },
        ],
      },
      {
        id: "risky",
        label: "Memperbaiki kedua celah sekaligus tanpa verifikasi lebih dulu, demi memastikan tidak ada yang terlewat.",
        points: -3,
        result: [
          { text: "Demi memastikan tidak ada yang terlewat, Kael meminta tim memperbaiki kedua celah itu sekaligus tanpa verifikasi lebih dulu." },
          { text: "Waktu dan sumber daya tim terbuang untuk memperbaiki sistem rekomendasi yang sebenarnya sudah aman, membuat perbaikan celah nyata di formulir ekspor data justru tertunda lebih lama dari seharusnya." },
          { text: "Peluncuran sistem ke publik harus ditunda karena perbaikan yang tidak diprioritaskan dengan tepat." },
        ],
      },
    ],
  },
};
