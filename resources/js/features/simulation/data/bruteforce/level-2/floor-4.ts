import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel2Floor4: FloorContent = {
  id: "bruteforce_level_2_floor_4",
  simulationId: "bruteforce",
  levelNumber: 2,
  floorNumber: 4,
  title: "Mata yang Tak Pernah Tidur",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_4", icon: "server", x: 80, y: 22, scale: 1.4 },
      { id: "monitor_4", icon: "monitor", x: 15, y: 28, scale: 1 },
      { id: "lamp_4", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "dashboard_panel_1",
      label: "Dasbor Pemantauan",
      icon: "dashboard",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Tiga serangan dalam seminggu membuat Kael sadar satu hal penting: ia selalu bertindak setelah kerusakan mulai terjadi, bukan sebelum itu. Ia lelah terus-menerus bereaksi di tengah malam setiap kali ada laporan masuk." },
      { text: "Pemilik forum bertanya apakah ada cara agar serangan semacam ini bisa diketahui lebih awal, bahkan sebelum menjadi masalah besar, tanpa harus menunggu seseorang melaporkannya secara manual." },
      { text: "Kael membuka opsi pengaturan sistem dan menemukan fitur pemantauan otomatis yang selama ini belum pernah ia aktifkan, sebuah dasbor yang bisa mendeteksi pola mencurigakan secara real-time dan mengirim peringatan otomatis." },
      { text: "Ini adalah kesempatan untuk mengubah caranya bekerja, dari sekadar menambal celah satu per satu, menjadi benar-benar mengawasi forum secara menyeluruh." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Mengaktifkan dasbor pemantauan otomatis dengan peringatan dini untuk pola login mencurigakan.",
        points: 4,
        result: [
          { text: "Kael mengaktifkan dasbor pemantauan otomatis, mengatur ambang batas untuk setiap pola mencurigakan yang pernah ia temui selama ini." },
          { text: "Sistem kini bisa mengenali lonjakan percobaan login, pola kata sandi yang sama ke banyak akun, maupun akses dari endpoint yang jarang digunakan, lalu mengirim peringatan otomatis begitu polanya muncul." },
          { text: "Untuk pertama kalinya, Kael bisa tidur tenang, tahu bahwa sistem akan membangunkannya jika ada yang benar-benar perlu perhatian segera." },
        ],
      },
      {
        id: "neutral",
        label: "Memeriksa log secara manual setiap pagi sebagai gantinya.",
        points: 1,
        result: [
          { text: "Kael memilih memeriksa log secara manual setiap pagi, tanpa mengaktifkan pemantauan otomatis." },
          { text: "Ia tetap bisa menemukan sebagian masalah, tapi selalu terlambat beberapa jam dibanding jika ada peringatan dini secara langsung." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikan fitur itu karena merasa sudah cukup waspada tanpa bantuan sistem otomatis.",
        points: -2,
        result: [
          { text: "Kael merasa pengalamannya minggu ini sudah cukup membuatnya waspada tanpa perlu bantuan sistem otomatis." },
          { text: "Malam itu juga, sebuah pola serangan baru muncul diam-diam, dan tidak ada siapa pun yang menyadarinya sampai keesokan paginya." },
          { text: "Beberapa akun sempat diakses tanpa izin sebelum Kael akhirnya menemukan masalahnya secara manual." },
        ],
      },
    ],
  },
};
