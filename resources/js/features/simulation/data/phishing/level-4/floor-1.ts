import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor1: FloorContent = {
  id: "phishing_level_4_floor_1",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 1,
  title: "Pengintaian Lintas Platform",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-100 to-blue-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_1", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "monitor_wall_1", icon: "monitor", x: 85, y: 22, scale: 1.3 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "osint_report_1",
      label: "Laporan Pelacakan Jejak Digital",
      icon: "report",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael kini menangani kasus yang jauh lebih licin dari sebelumnya. Tim keamanan menerima laporan dari auditor eksternal: data karyawan perusahaan ternyata bisa disusun ulang hanya dari potongan-potongan kecil yang tersebar di berbagai tempat berbeda." },
      { text: "Satu platform lowongan kerja lama menyebut nama dan jabatan. Satu forum komunitas teknis menyebut nama proyek yang pernah dikerjakan. Satu akun media sosial pribadi menyebut jadwal kerja mingguan secara tidak sengaja." },
      { text: "Tidak satu pun dari ketiga sumber ini bocoran data besar, masing-masing terlihat remeh sendirian. Tapi digabungkan, seseorang bisa menyusun profil lengkap seorang karyawan, cukup untuk merancang serangan yang sangat personal nantinya." },
      { text: "Auditor menjelaskan, ini disebut korelasi data lintas platform: mengumpulkan informasi dari banyak sumber kecil yang masing-masing tampak tidak berbahaya, lalu merangkainya menjadi senjata." },
    ],
    question: "Bagaimana sikap Kael menanggapi pola pengintaian lintas platform ini?",
    choices: [
      {
        id: "safe",
        label: "Memetakan seluruh potongan data yang tersebar, lalu mengedukasi karyawan bahwa bahayanya bukan dari satu sumber, melainkan dari gabungan banyak sumber kecil.",
        points: 3,
        result: [
          { text: "Kael menyusun peta lengkap dari ketiga sumber data yang tersebar itu, menunjukkan bagaimana potongan-potongan kecil itu bisa disatukan menjadi profil utuh." },
          { text: "Dalam sesi edukasi, ia menjelaskan bahwa ancaman sesungguhnya bukan terletak pada satu platform, melainkan pada kebiasaan membagikan detail kecil di banyak tempat berbeda tanpa menyadari ia bisa dirangkai." },
          { text: "Karyawan mulai meninjau ulang jejak digital mereka secara menyeluruh, bukan hanya memeriksa satu platform saja." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya meminta karyawan menghapus informasi dari platform lowongan kerja, karena dianggap sumber paling jelas.",
        points: -1,
        result: [
          { text: "Kael hanya fokus meminta karyawan menghapus informasi dari platform lowongan kerja, karena sumber itu paling mudah dikenali." },
          { text: "Forum komunitas teknis dan akun media sosial pribadi tetap menyimpan detail yang sama berbahayanya, tapi luput dari perhatian karena dianggap sumber yang kurang 'jelas' sebagai ancaman." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena tidak ada satu pun sumber yang secara individual berisi data sensitif.",
        points: -2,
        result: [
          { text: "Kael menilai tidak ada yang perlu dikhawatirkan karena setiap sumber data, dilihat satu per satu, memang tidak berisi informasi sensitif apa pun." },
          { text: "Ia tidak menyadari bahwa justru itulah cara kerja pengintaian lintas platform, berbahaya bukan karena satu sumbernya, tapi karena gabungan seluruhnya." },
          { text: "Beberapa minggu kemudian, email yang sangat personal mulai menyasar karyawan yang profilnya berhasil disusun dari ketiga sumber tadi." },
        ],
      },
    ],
  },
};
