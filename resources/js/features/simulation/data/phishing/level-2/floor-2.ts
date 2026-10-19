import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel2Floor2: FloorContent = {
  id: "phishing_level_2_floor_2",
  simulationId: "phishing",
  levelNumber: 2,
  floorNumber: 2,
  title: "Halaman Masuk yang Mengkhianati",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-indigo-100 to-blue-200",
    playerStart: { x: 18, y: 72 },
    decorations: [
      { id: "sofa_2", icon: "sofa", x: 15, y: 25, scale: 1.2 },
      { id: "plant_2", icon: "plant", x: 85, y: 22, scale: 1.3 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "laptop_login_1",
      label: "Laptop",
      icon: "laptop",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Masih terbayang kejadian semalam, Kael membuka email paginya untuk menenangkan diri. Satu email dari layanan streaming favoritnya muncul: Sesi Anda telah berakhir, silakan masuk kembali untuk melanjutkan tontonan." },
      { text: "Kael mengklik tautannya, dan sebuah halaman login muncul, tampilannya nyaris identik dengan yang biasa ia gunakan. Logo sama, warna sama, bahkan tata letaknya sama persis." },
      { text: "Sesaat sebelum mengetik kata sandinya, matanya tanpa sengaja melirik ke bilah alamat di atas. Sesuatu terasa tidak pas, meski semuanya tampak begitu meyakinkan." },
      { text: "Kael menyipitkan mata, mencoba membaca alamat situs itu dengan lebih teliti sebelum jarinya menyentuh keyboard." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Memeriksa alamat URL dengan teliti, lalu membuka situs resmi secara manual jika ada kejanggalan.",
        points: 4,
        result: [
          { text: "Kael memperbesar tampilan bilah alamat dan membacanya huruf demi huruf." },
          { text: "Ia menemukan satu huruf yang ditukar dengan angka serupa, domain itu bukan situs resminya, hanya menyerupai." },
          { text: "Kael menutup halaman itu dan membuka situs resmi secara langsung melalui alamat yang ia ketik sendiri. Akunnya tetap aman." },
        ],
      },
      {
        id: "neutral",
        label: "Menutup halaman tanpa memeriksa lebih lanjut, lalu mengabaikannya begitu saja.",
        points: 1,
        result: [
          { text: "Kael menutup tab itu tanpa benar-benar memeriksa apa yang janggal darinya." },
          { text: "Ia aman untuk saat ini, tetapi tidak pernah benar-benar tahu seberapa dekat ia dengan jebakan itu, dan halaman palsu itu tetap bisa menjebak orang lain." },
        ],
      },
      {
        id: "risky",
        label: "Langsung memasukkan email dan kata sandi karena tampilannya meyakinkan.",
        points: -4,
        result: [
          { text: "Karena tampilannya begitu meyakinkan, Kael mengetikkan email dan kata sandinya tanpa ragu." },
          { text: "Halaman sempat memuat sebentar, lalu menampilkan pesan error yang terasa aneh." },
          { text: "Beberapa jam kemudian, Kael menerima notifikasi bahwa akunnya telah login dari perangkat yang tidak ia kenal." },
        ],
      },
    ],
  },
};
