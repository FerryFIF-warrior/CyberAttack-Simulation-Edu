import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor2: FloorContent = {
  id: "bruteforce_level_5_floor_2",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 2,
  title: "Serangan Berskala Negara",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-cyan-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "vault_2", icon: "vault", x: 80, y: 22, scale: 1.4 },
      { id: "globe_1", icon: "globe", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "traffic_map_1",
      label: "Peta Lalu Lintas Login Global",
      icon: "chart",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah kampanye tersebar itu dihentikan, intensitas serangan justru meningkat drastis dalam semalam, kali ini bukan ribuan, melainkan jutaan percobaan login per jam, berasal dari lebih dari seratus ribu alamat berbeda di puluhan negara." },
      { text: "Tim intelijen ancaman eksternal yang disewa NusaBank mengonfirmasi kecurigaan Kael: pola infrastruktur serangan ini cocok dengan jaringan skala besar yang sebelumnya pernah menyasar beberapa bank sentral di kawasan, diduga kuat disponsori aktor dengan sumber daya setingkat negara." },
      { text: "Skala serangan ini jauh melampaui kapasitas tim Kael untuk ditangani manual. Setiap detik penundaan berarti ribuan percobaan tambahan terjadi, namun bertindak gegabah dengan memblokir seluruh lalu lintas mencurigakan berisiko memblokir nasabah sah yang kebetulan memiliki pola koneksi serupa." },
      { text: "Direktur teknologi menatap layar yang penuh peringatan merah, menunggu Kael memberi keputusan dalam hitungan menit, bukan hari." },
    ],
    question: "Bagaimana Kael merespons serangan berskala masif yang diduga disponsori aktor negara ini?",
    choices: [
      {
        id: "safe",
        label: "Mengaktifkan mitigasi otomatis berbasis reputasi dan perilaku jaringan secara bertingkat, sambil mengoordinasikan respons dengan tim intelijen ancaman eksternal dan regulator secara paralel.",
        points: 3,
        result: [
          { text: "Kael segera mengaktifkan sistem mitigasi otomatis berbasis reputasi dan pola perilaku jaringan, memperlambat dan menyaring lalu lintas mencurigakan secara bertingkat tanpa memblokir membabi buta." },
          { text: "Secara paralel, ia menghubungi tim intelijen ancaman eksternal dan regulator finansial untuk berbagi indikator serangan dan berkoordinasi respons, menyadari skala ini melampaui kapasitas satu institusi." },
          { text: "Serangan berhasil diredam dalam hitungan jam dengan dampak minimal bagi nasabah sah, dan indikator yang dibagikan membantu bank-bank lain bersiap menghadapi gelombang yang sama." },
        ],
      },
      {
        id: "neutral",
        label: "Memblokir seluruh lalu lintas dari negara-negara asal sebagian besar percobaan login, tanpa analisis perilaku lebih lanjut.",
        points: -4,
        result: [
          { text: "Demi bertindak cepat, Kael memerintahkan pemblokiran menyeluruh terhadap seluruh lalu lintas dari negara-negara asal sebagian besar percobaan login." },
          { text: "Langkah ini memang meredam sebagian serangan, tapi juga memblokir ribuan nasabah sah yang sedang bepergian atau menggunakan layanan VPN perusahaan dari wilayah yang sama, memicu keluhan besar-besaran." },
          { text: "Sebagian jaringan penyerang yang menggunakan infrastruktur di luar wilayah yang diblokir tetap lolos, membuat pemblokiran ini tidak benar-benar efektif terhadap ancaman inti." },
        ],
      },
      {
        id: "risky",
        label: "Mematikan sementara seluruh sistem login nasabah untuk menghentikan serangan sepenuhnya, tanpa berkoordinasi dengan regulator terlebih dahulu.",
        points: -8,
        result: [
          { text: "Dalam tekanan untuk segera menghentikan serangan, Kael mengambil langkah drastis mematikan sepenuhnya sistem login nasabah tanpa lebih dulu berkoordinasi dengan regulator finansial." },
          { text: "Jutaan nasabah sah kehilangan akses total ke layanan perbankan mereka, memicu kepanikan publik dan liputan media negatif yang jauh lebih merusak reputasi dibanding dampak serangan itu sendiri." },
          { text: "Regulator mempertanyakan keputusan sepihak ini, karena pemadaman layanan finansial berskala besar semestinya melalui protokol koordinasi resmi, bukan keputusan darurat satu arah." },
        ],
      },
    ],
  },
};
