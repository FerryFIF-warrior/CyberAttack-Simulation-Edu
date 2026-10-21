import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor4: FloorContent = {
  id: "phishing_level_5_floor_4",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 4,
  title: "Simulasi Serangan dari Dalam",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-rose-100 to-red-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "device_2", icon: "device", x: 80, y: 22, scale: 1.4 },
      { id: "cross_sign_3", icon: "cross", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "redteam_report_1",
      label: "Laporan Hasil Simulasi Internal",
      icon: "chart",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Setelah insiden rantai pasok itu diatasi, direksi menyetujui permintaan Kael: menjalankan simulasi serangan phishing internal secara berkala untuk menguji kesiapan nyata para karyawan, bukan sekadar mengandalkan pelatihan di atas kertas." },
      { text: "Simulasi pertama dirancang meniru persis email vendor billing yang pernah menjadi ancaman sungguhan bulan lalu, dikirim ke seluruh departemen tanpa pemberitahuan sebelumnya." },
      { text: "Hasilnya mengejutkan: delapan dari sepuluh staf administrasi tertipu dan mengklik tautan simulasi itu, sementara tim IT yang justru paling sering dilatih, hanya satu yang tertipu." },
      { text: "Yang lebih mengkhawatirkan Kael bukan angka itu sendiri, melainkan pola waktunya: staf administrasi paling banyak tertipu tepat di jam-jam sibuk pergantian shift, saat perhatian mereka paling terpecah." },
    ],
    question: "Bagaimana Kael menindaklanjuti hasil simulasi serangan internal ini secara bertanggung jawab?",
    choices: [
      {
        id: "safe",
        label: "Menyusun pelatihan yang disesuaikan dengan pola waktu kerentanan tertinggi, lalu menyampaikan hasilnya secara konstruktif tanpa mempermalukan individu yang tertipu.",
        points: 3,
        result: [
          { text: "Kael menyusun program pelatihan yang secara khusus menyasar jam-jam pergantian shift, saat kewaspadaan staf administrasi paling rendah." },
          { text: "Ia menyampaikan hasil simulasi ke seluruh departemen secara agregat dan konstruktif, tanpa pernah menyebut nama individu yang tertipu, menjaga kepercayaan tim sekaligus memperbaiki kelemahan nyata." },
          { text: "Simulasi berikutnya, tiga bulan kemudian, menunjukkan penurunan tajam pada jam-jam yang sebelumnya paling rentan, bukti bahwa pelatihan yang tepat sasaran benar-benar mengubah kebiasaan." },
        ],
      },
      {
        id: "neutral",
        label: "Mengirimkan daftar nama staf yang tertipu ke atasan masing-masing agar ditindaklanjuti secara individual, tanpa program pelatihan tambahan.",
        points: -3,
        result: [
          { text: "Kael mengirimkan daftar nama staf yang tertipu simulasi ke atasan masing-masing, berharap tekanan dari atasan langsung akan mendorong perbaikan perilaku." },
          { text: "Alih-alih memperbaiki kesadaran, pendekatan ini justru membuat sebagian staf administrasi enggan melaporkan email mencurigakan di masa depan, karena takut dipermalukan atau dianggap lalai." },
          { text: "Pola kerentanan di jam pergantian shift yang sebenarnya menjadi akar masalah tidak pernah benar-benar ditangani." },
        ],
      },
      {
        id: "risky",
        label: "Mempublikasikan hasil simulasi secara terbuka ke seluruh rumah sakit, termasuk nama-nama yang tertipu, sebagai bentuk transparansi dan peringatan keras.",
        points: -6,
        result: [
          { text: "Demi apa yang dianggapnya sebagai transparansi dan efek jera, Kael mempublikasikan hasil simulasi secara terbuka, termasuk nama-nama staf yang tertipu, ke seluruh jaringan internal rumah sakit." },
          { text: "Langkah ini memicu kemarahan besar dari staf administrasi yang merasa dipermalukan secara publik atas kesalahan yang justru dirancang untuk terjadi sebagai bagian dari simulasi." },
          { text: "Kepercayaan terhadap program keamanan Kael runtuh, dan ke depannya staf menjadi jauh lebih enggan melapor ketika benar-benar menerima email mencurigakan, takut akan dipermalukan lagi." },
        ],
      },
    ],
  },
};
