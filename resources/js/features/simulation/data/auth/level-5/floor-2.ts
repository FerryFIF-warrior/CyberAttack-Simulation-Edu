import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor2: FloorContent = {
  id: "auth_level_5_floor_2",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 2,
  title: "Mengganti Lencana dengan Sesuatu yang Tak Bisa Dicuri",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "badge_wall_2", icon: "badge", x: 80, y: 22, scale: 1.4 },
      { id: "key_1", icon: "key", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "passwordless_console_1",
      label: "Konsol Migrasi Autentikasi Tanpa Kata Sandi",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Laporan tahunan tim intelijen ancaman Veltrix menunjukkan angka yang tidak bisa diabaikan: lebih dari sembilan puluh persen insiden akses tidak sah dalam dua tahun terakhir berakar dari kata sandi yang dicuri, ditebak, atau digunakan ulang dari kebocoran layanan lain." },
      { text: "Kael mengusulkan langkah radikal: menghapus kata sandi sebagai metode autentikasi utama sama sekali, menggantinya dengan kunci kriptografi yang tertanam di perangkat masing-masing karyawan, sesuatu yang secara fisik tidak bisa dicuri lewat cara-cara yang membuat kata sandi begitu rapuh." },
      { text: "Transisi ini bukan tanpa tantangan. Sejumlah sistem lama warisan akuisisi bertahun-tahun lalu tidak dirancang untuk mendukung metode modern ini, dan sebagian karyawan senior yang sudah terbiasa puluhan tahun dengan kata sandi menunjukkan keengganan besar untuk beralih." },
      { text: "Tim proyek mengusulkan dua pendekatan berbeda untuk periode transisi: menjalankan kedua metode berdampingan untuk sementara, atau memaksa seluruh karyawan beralih serentak dalam satu waktu yang ditentukan." },
    ],
    question: "Bagaimana sebaiknya Kael merancang periode transisi menuju autentikasi tanpa kata sandi ini agar tidak membuka celah baru?",
    choices: [
      {
        id: "safe",
        label: "Menjalankan migrasi bertahap per kelompok sistem dengan jadwal tegas penutupan jalur kata sandi lama, memastikan periode berdampingan tidak pernah dibiarkan terbuka tanpa batas waktu yang jelas.",
        points: 3,
        result: [
          { text: "Kael merancang migrasi bertahap per kelompok sistem, dimulai dari yang paling sensitif, dengan jadwal tegas kapan jalur kata sandi lama untuk setiap kelompok akan ditutup sepenuhnya." },
          { text: "Periode berdampingan antara kedua metode tetap ada selama transisi, tapi selalu dengan batas waktu yang jelas dan dikomunikasikan, bukan dibiarkan terbuka tanpa akhir yang pasti." },
          { text: "Transisi selesai dalam waktu yang direncanakan, dan insiden terkait kata sandi yang dicuri turun drastis begitu jalur lama benar-benar ditutup di setiap kelompok sistem." },
        ],
      },
      {
        id: "neutral",
        label: "Membiarkan kedua metode autentikasi berjalan berdampingan tanpa batas waktu pasti, demi memberi fleksibilitas penuh kepada karyawan yang belum siap beralih.",
        points: -3,
        result: [
          { text: "Demi memberi fleksibilitas penuh dan menghindari keluhan karyawan yang belum siap, Kael membiarkan kedua metode autentikasi berjalan berdampingan tanpa batas waktu pasti kapan jalur lama akan ditutup." },
          { text: "Tanpa tekanan waktu yang jelas, banyak karyawan terus menunda migrasi mereka ke metode baru, membuat jalur kata sandi lama yang rentan tetap aktif dan dimanfaatkan jauh lebih lama dari yang seharusnya." },
          { text: "Manfaat keamanan dari investasi besar migrasi ini tertunda bertahun-tahun karena tidak ada dorongan nyata untuk benar-benar menyelesaikan transisi." },
        ],
      },
      {
        id: "risky",
        label: "Memaksa seluruh karyawan di semua negara beralih serentak dalam satu akhir pekan, tanpa periode transisi berdampingan sama sekali, demi menutup risiko secepat mungkin.",
        points: -6,
        result: [
          { text: "Demi menutup risiko kata sandi secepat mungkin, Kael memaksa seluruh karyawan di empat benua beralih serentak dalam satu akhir pekan, tanpa periode transisi berdampingan sama sekali." },
          { text: "Ribuan karyawan di berbagai zona waktu mengalami kebingungan dan terkunci dari sistem kerja mereka sendiri, sementara tim dukungan teknis kewalahan menangani lonjakan permintaan bantuan yang datang bersamaan." },
          { text: "Beberapa tim, dalam kepanikan mencari cara tetap bekerja, mulai menggunakan solusi tidak resmi di luar sistem yang disetujui, menciptakan celah keamanan baru yang justru lebih sulit dipantau dibanding kata sandi lama." },
        ],
      },
    ],
  },
};
