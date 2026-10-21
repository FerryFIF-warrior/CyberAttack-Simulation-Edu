import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor3: FloorContent = {
  id: "bruteforce_level_5_floor_3",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 3,
  title: "Pola yang Belajar Menyamar",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-cyan-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "vault_3", icon: "vault", x: 80, y: 22, scale: 1.4 },
      { id: "circuit_1", icon: "circuit", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "model_panel_1",
      label: "Panel Pemantauan Model Deteksi",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Mitigasi berbasis reputasi dan perilaku yang dipasang Kael bekerja baik selama beberapa minggu, sampai tim analitik melaporkan sesuatu yang ganjil: akurasi model deteksi anomali perlahan menurun, seolah pola-pola yang dulu mudah dikenali kini mulai meleset dari prediksinya." },
      { text: "Penyelidikan lebih dalam mengungkap kenyataan yang mengkhawatirkan: penyerang tampaknya telah mempelajari ambang batas dan pola respons sistem deteksi NusaBank sendiri, lalu secara bertahap menyesuaikan pola percobaan login mereka agar terlihat semakin mirip perilaku pengguna sah." },
      { text: "Setiap kali tim Kael menyesuaikan aturan deteksi, penyerang tampak beradaptasi lagi dalam hitungan hari, seolah kedua belah pihak sedang terlibat dalam permainan kucing-tikus yang bergerak semakin cepat." },
      { text: "Mengandalkan aturan statis saja jelas tidak akan pernah cukup melawan lawan yang terus belajar dan menyesuaikan diri secepat ini." },
    ],
    question: "Bagaimana Kael mengatasi penyerang yang terus menyesuaikan polanya untuk menghindari deteksi ini?",
    choices: [
      {
        id: "safe",
        label: "Mengombinasikan beberapa sinyal deteksi independen yang sulit ditiru sekaligus, seperti perilaku perangkat dan konteks sesi, serta merancang model yang diperbarui berkelanjutan, bukan aturan statis.",
        points: 3,
        result: [
          { text: "Kael menyadari satu sinyal deteksi saja akan selalu bisa dipelajari dan ditiru, sehingga ia merancang kombinasi beberapa sinyal independen, pola perilaku perangkat, konteks sesi, dan kebiasaan historis pengguna, yang jauh lebih sulit ditiru sekaligus." },
          { text: "Ia juga mengubah pendekatan tim dari aturan deteksi statis menjadi model yang terus diperbarui berdasarkan data terbaru, agar tidak mudah tertinggal dari penyesuaian penyerang." },
          { text: "Butuh waktu, tapi kombinasi sinyal yang sulit ditiru ini membuat penyerang kehilangan jejak untuk menyamar secara efektif, memaksa mereka mengurangi intensitas serangan secara signifikan." },
        ],
      },
      {
        id: "neutral",
        label: "Terus memperketat satu aturan deteksi utama yang sudah ada setiap kali penyerang beradaptasi, tanpa menambah sinyal deteksi baru.",
        points: -3,
        result: [
          { text: "Kael terus memperketat aturan deteksi utama yang sudah ada setiap kali menemukan tanda-tanda adaptasi dari penyerang, berharap cukup responsif untuk tetap unggul." },
          { text: "Namun karena hanya mengandalkan satu aturan utama, penyerang dengan cepat mempelajari pola penyesuaian itu juga, dan permainan kucing-tikus ini terus berlanjut tanpa pernah benar-benar berakhir." },
          { text: "Pengetatan berulang ini pun mulai berdampak pada pengguna sah yang pola perilakunya kebetulan sedikit tidak biasa, meningkatkan keluhan false positive." },
        ],
      },
      {
        id: "risky",
        label: "Mempercayakan sepenuhnya pada model pembelajaran mesin otomatis tanpa pengawasan manusia, karena dianggap akan selalu lebih cepat beradaptasi dibanding tim manual.",
        points: -6,
        result: [
          { text: "Kael mengalihkan seluruh keputusan deteksi dan pemblokiran ke model pembelajaran mesin otomatis, menganggap kecepatannya akan selalu unggul tanpa perlu campur tangan manusia." },
          { text: "Penyerang yang sudah mempelajari cara kerja model sebelumnya kemudian sengaja memberi umpan data palsu untuk menyesatkan proses pembelajaran model itu sendiri, membuatnya justru semakin mudah ditembus." },
          { text: "Tanpa pengawasan manusia yang bisa mengenali kejanggalan di balik data umpan itu, model otomatis mulai salah mengklasifikasikan serangan nyata sebagai perilaku normal." },
        ],
      },
    ],
  },
};
