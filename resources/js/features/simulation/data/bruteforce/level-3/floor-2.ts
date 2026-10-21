import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel3Floor2: FloorContent = {
  id: "bruteforce_level_3_floor_2",
  simulationId: "bruteforce",
  levelNumber: 3,
  floorNumber: 2,
  title: "Botnet Terdistribusi",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_2", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "globe_1", icon: "globe", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "traffic_map_1",
      label: "Peta Lalu Lintas Jaringan",
      icon: "map",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah pemetaan infrastruktur gagal berjalan mulus, penyerang mengganti strategi. Kael membuka peta lalu lintas jaringan dan terkejut melihat percobaan login datang dari lebih dari dua ribu alamat IP berbeda, tersebar di puluhan negara, semuanya dalam waktu bersamaan." },
      { text: "Rate limiting per alamat IP yang selama ini diandalkan Kael tidak banyak berguna lagi, karena setiap alamat hanya mencoba beberapa kali saja sebelum berpindah ke alamat berikutnya." },
      { text: "Ini adalah jaringan botnet, kumpulan perangkat yang telah disusupi dan dikendalikan dari jarak jauh, bergerak serempak seolah menjadi satu kekuatan besar yang menyerang dari segala arah." },
      { text: "Kael menyadari, melawan botnet sebesar ini butuh cara berpikir yang berbeda dari sekadar membatasi satu alamat IP pada satu waktu." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Menerapkan deteksi berbasis pola perilaku kolektif, bukan lagi hanya membatasi IP satu per satu.",
        points: 4,
        result: [
          { text: "Kael mengalihkan strategi dari membatasi IP individual ke mendeteksi pola perilaku yang muncul secara kolektif di seluruh jaringan." },
          { text: "Sistem baru itu mengenali ciri khas serangan terdistribusi: banyak sumber berbeda, tapi dengan pola target dan waktu yang terlalu serempak untuk dianggap kebetulan." },
          { text: "Begitu polanya terdeteksi, seluruh gelombang serangan dari botnet itu bisa ditahan sekaligus, bukan satu per satu alamat yang nyaris tak ada habisnya." },
        ],
      },
      {
        id: "neutral",
        label: "Memblokir IP satu demi satu seiring terdeteksinya setiap percobaan baru.",
        points: 1,
        result: [
          { text: "Kael mencoba memblokir setiap alamat IP baru begitu terdeteksi mencoba login." },
          { text: "Usahanya terus mengejar, tapi jumlah alamat baru yang muncul jauh lebih cepat daripada kecepatannya memblokir satu per satu." },
        ],
      },
      {
        id: "risky",
        label: "Mematikan seluruh akses dari luar negeri untuk menghentikan serangan secara instan.",
        points: -2,
        result: [
          { text: "Dalam keputusasaan, Kael mematikan seluruh akses forum dari luar negeri, berharap itu menghentikan serangan secara instan." },
          { text: "Serangan memang berkurang, tapi ratusan anggota forum yang sah dari luar negeri juga ikut terkunci tanpa peringatan." },
          { text: "Keluhan dari anggota forum yang sah membanjiri Kael, sementara sebagian serangan dari dalam negeri tetap berjalan tanpa hambatan." },
        ],
      },
    ],
  },
};
