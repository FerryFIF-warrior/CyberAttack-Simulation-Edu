import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor7: FloorContent = {
  id: "phishing_level_4_floor_7",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 7,
  title: "Ujian Akhir: Membedakan Kampanye Asli dari Latihan Resmi",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-purple-100 to-indigo-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "trophy_1", icon: "trophy", x: 80, y: 25, scale: 1.6 },
      { id: "desk_7", icon: "desk", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_7", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "two_mails_1",
      label: "Dua Email yang Hampir Identik",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Seminggu penuh ketegangan berakhir di satu ujian paling sulit. Dua email masuk ke kotak masuk Kael dalam waktu yang hampir bersamaan, keduanya mengumumkan latihan simulasi phishing resmi dari tim keamanan perusahaan." },
      { text: "Email pertama dikirim dari alamat yang berada di bawah domain resmi perusahaan, berisi tautan menuju halaman yang disebut sebagai portal latihan internal, dan mencantumkan nomor tiket pelaporan yang bisa diverifikasi lewat sistem tiket resmi perusahaan." },
      { text: "Email kedua terlihat hampir sama persis, memakai tata bahasa yang mirip, logo yang sama, bahkan domain pengirim yang sekilas terlihat identik. Satu-satunya perbedaan adalah tautan portalnya mengarah ke alamat yang sedikit berbeda, dan tidak menyertakan nomor tiket apa pun." },
      { text: "Tim keamanan sebelumnya memang pernah mengumumkan akan mengadakan latihan phishing bulan ini, tapi jadwal persisnya belum pernah diumumkan secara terbuka. Kael harus memutuskan, yang mana dari kedua email ini yang benar-benar latihan resmi, dan yang mana yang menyamar memanfaatkan momentum pengumuman itu." },
    ],
    question: "Email mana yang akan dipercaya Kael sebagai latihan resmi, dan bagaimana ia memastikannya?",
    choices: [
      {
        id: "safe",
        label: "Tidak mempercayai keduanya secara langsung, lalu memverifikasi nomor tiket email pertama lewat sistem tiket resmi sebelum bertindak apa pun.",
        points: 2,
        result: [
          { text: "Kael tidak langsung mempercayai email mana pun, meski email pertama tampak lebih meyakinkan dengan nomor tiketnya." },
          { text: "Ia membuka sistem tiket resmi perusahaan secara mandiri, bukan lewat tautan di email, lalu mencari nomor tiket yang disebutkan di email pertama." },
          { text: "Nomor tiket itu benar-benar tercatat sebagai latihan resmi yang telah disetujui tim keamanan. Email kedua, yang tidak memiliki nomor tiket apa pun, terbukti sebagai serangan yang menyamar memanfaatkan pengumuman latihan yang sama." },
          { text: "Level 4 Phishing selesai. Kael berhasil membedakan ancaman nyata dari latihan resmi bukan dari tampilan permukaannya, melainkan dari jejak yang bisa diverifikasi secara independen." },
        ],
      },
      {
        id: "neutral",
        label: "Memilih mempercayai email pertama begitu saja karena domain dan tampilannya terlihat lebih meyakinkan dibanding email kedua.",
        points: -2,
        result: [
          { text: "Kael memilih mempercayai email pertama hanya karena tampilannya terasa lebih meyakinkan dibanding email kedua." },
          { text: "Keberuntungan memang berpihak padanya kali ini, email pertama memang yang asli, tapi ia tidak pernah benar-benar memverifikasi nomor tiketnya secara mandiri." },
          { text: "Kael menyadari, menilai hanya dari kesan tampilan tanpa verifikasi independen adalah kebiasaan berbahaya yang suatu saat bisa berakhir salah." },
        ],
      },
      {
        id: "risky",
        label: "Mengklik kedua tautan secara bergantian untuk membandingkan mana yang terasa lebih 'resmi' sebelum memutuskan.",
        points: -4,
        result: [
          { text: "Penasaran ingin membandingkan langsung, Kael mengklik kedua tautan itu secara bergantian." },
          { text: "Email kedua, yang ternyata palsu, berhasil mencatat informasi perangkat dan sempat meminta kredensial kerja sebelum Kael menyadari kesalahannya." },
          { text: "Tim keamanan harus turun tangan memeriksa dampak dari klik yang terlanjur dilakukan pada tautan palsu itu." },
        ],
      },
    ],
  },
};
