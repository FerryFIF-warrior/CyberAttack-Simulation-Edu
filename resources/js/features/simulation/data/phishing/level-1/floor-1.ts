import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel1Floor1: FloorContent = {
  id: "phishing_level_1_floor_1",
  simulationId: "phishing",
  levelNumber: 1,
  floorNumber: 1,
  title: "Email Hadiah Palsu",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-sky-200 to-green-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "tree_1", icon: "tree", x: 10, y: 20, scale: 1.4 },
      { id: "house_1", icon: "house", x: 85, y: 25, scale: 1.6 },
      { id: "flower_1", icon: "flower", x: 30, y: 85, scale: 1 },
      { id: "lamp_1", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "mailbox_1",
      label: "Kotak Surat",
      icon: "mailbox",
      x: 65,
      y: 45,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pagi itu, seekor kucing bernama Kael baru pulang berjalan-jalan ketika ia melihat kotak suratnya penuh." },
      { text: "Satu email menarik perhatiannya. Judulnya besar dan mencolok: Selamat, Anda Memenangkan Hadiah! Klik di sini untuk klaim sekarang." },
      { text: "Kael belum pernah ikut undian apa pun belakangan ini. Ia membuka detail email dan memeriksa alamat pengirimnya: hadiah-resmi@secure-login-alert.xyz" },
      { text: "Alamat itu tidak terdengar seperti nama perusahaan mana pun yang ia kenal. Sesuatu terasa janggal, dan Kael tahu ia harus memutuskan dengan hati-hati." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Tidak mengklik link, melaporkan email sebagai phishing, lalu menghapusnya.",
        points: 4,
        result: [
          { text: "Kael mengurungkan niatnya untuk mengklik link tersebut." },
          { text: "Ia menandai email itu sebagai phishing melalui tombol laporan di aplikasi emailnya." },
          { text: "Akun Kael tetap aman, dan penyedia email kini bisa memperingatkan pengguna lain yang menerima email serupa." },
        ],
      },
      {
        id: "neutral",
        label: "Mengabaikan email tanpa melaporkan.",
        points: 1,
        result: [
          { text: "Kael memilih diam saja dan membiarkan email itu menumpuk di kotak masuk." },
          { text: "Ia memang tidak terjebak, tetapi email yang sama tetap bisa menipu kucing-kucing lain yang belum waspada." },
        ],
      },
      {
        id: "risky",
        label: "Mengklik link dan mengisi data akun.",
        points: -2,
        result: [
          { text: "Rasa penasaran mengalahkan kehati-hatian. Kael mengklik link di dalam email." },
          { text: "Halaman yang terbuka meminta ia memasukkan username dan kata sandi untuk klaim hadiah." },
          { text: "Begitu data itu dikirim, Kael baru sadar halaman tersebut bukan situs resmi mana pun. Akunnya kini berisiko dicuri." },
        ],
      },
    ],
  },
};
