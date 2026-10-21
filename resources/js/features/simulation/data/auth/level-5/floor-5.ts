import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel5Floor5: FloorContent = {
  id: "auth_level_5_floor_5",
  simulationId: "auth",
  levelNumber: 5,
  floorNumber: 5,
  title: "Pola yang Terlalu Sabar untuk Menjadi Kebetulan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "badge_wall_5", icon: "badge", x: 80, y: 22, scale: 1.4 },
      { id: "globe_3", icon: "globe", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "intel_briefing_1",
      label: "Ruang Pengarahan Intelijen Ancaman",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Sebuah pengarahan rahasia dari badan keamanan siber nasional mengejutkan Kael: Veltrix, karena posisinya sebagai pemasok komponen penting bagi beberapa infrastruktur strategis, menjadi target pengintaian jangka panjang dari kelompok yang diduga kuat disponsori negara asing." },
      { text: "Berbeda dari penyerang oportunistik biasa, kelompok ini dikenal sangat sabar, kadang menghabiskan bertahun-tahun memetakan satu organisasi sebelum benar-benar bergerak, mengumpulkan detail kecil demi kecil lewat berbagai celah yang masing-masing tampak sepele sendirian." },
      { text: "Tim Kael menemukan indikasi awal: beberapa akun tingkat menengah di divisi riset telah menerima permintaan koneksi profesional yang tampak sah dari platform jaringan kerja selama berbulan-bulan terakhir, masing-masing dari identitas berbeda namun dengan pola pendekatan yang mengejutkan serupa." },
      { text: "Tidak ada satu pun dari permintaan ini yang, dilihat sendiri-sendiri, terlihat seperti ancaman. Tapi pola kesabaran dan keseragaman pendekatan di baliknya terasa jauh dari kebetulan." },
    ],
    question: "Bagaimana Kael merespons indikasi awal pengintaian jangka panjang yang diduga disponsori negara ini?",
    choices: [
      {
        id: "safe",
        label: "Membentuk tim khusus lintas fungsi untuk memantau pola ini secara berkelanjutan, memperketat verifikasi identitas untuk akun-akun di divisi riset, dan berkoordinasi erat dengan badan keamanan nasional tanpa memicu kepanikan internal.",
        points: 3,
        result: [
          { text: "Kael membentuk tim khusus lintas fungsi, menggabungkan keamanan, sumber daya manusia, dan hukum, untuk memantau pola pengintaian ini secara berkelanjutan tanpa memicu kepanikan luas di kalangan karyawan." },
          { text: "Verifikasi identitas diperketat khusus untuk akun-akun di divisi riset yang paling berisiko, dan koordinasi erat dengan badan keamanan nasional dijaga untuk berbagi perkembangan secara rahasia." },
          { text: "Pendekatan yang tenang namun sistematis ini berhasil mengidentifikasi dan menutup beberapa celah kecil sebelum kelompok itu sempat mengumpulkan cukup informasi untuk melancarkan tahap berikutnya." },
        ],
      },
      {
        id: "neutral",
        label: "Mengirimkan peringatan umum ke seluruh karyawan tentang risiko permintaan koneksi mencurigakan, tanpa tindakan khusus pada akun-akun di divisi riset yang paling disasar.",
        points: -4,
        result: [
          { text: "Kael mengirimkan peringatan umum ke seluruh karyawan Veltrix tentang risiko menerima permintaan koneksi mencurigakan, tanpa tindakan verifikasi tambahan khusus pada akun-akun di divisi riset yang justru paling disasar pola ini." },
          { text: "Peringatan umum ini meningkatkan kewaspadaan sedikit di permukaan, tapi akun-akun spesifik yang sudah menjadi target pengintaian tetap tidak mendapat perlindungan tambahan yang benar-benar dibutuhkan." },
          { text: "Pola pengintaian yang sabar itu terus berjalan tanpa hambatan berarti, karena peringatan umum tidak pernah menyentuh akar masalah di titik yang paling berisiko." },
        ],
      },
      {
        id: "risky",
        label: "Tidak melakukan apa pun karena belum ada bukti konkret bahwa data benar-benar telah dicuri, menganggap pola ini masih terlalu dini untuk ditindaklanjuti serius.",
        points: -7,
        result: [
          { text: "Karena belum ada bukti konkret pencurian data, Kael menilai pola ini masih terlalu dini untuk ditindaklanjuti secara serius, memilih menunggu perkembangan lebih lanjut sebelum bertindak." },
          { text: "Justru itulah yang diharapkan kelompok yang sabar ini: waktu tanpa gangguan untuk terus memetakan dan mendekati lebih banyak target, membangun fondasi untuk tahap serangan yang jauh lebih merusak di masa depan." },
          { text: "Beberapa bulan kemudian, badan keamanan nasional melaporkan bahwa kelompok itu telah berhasil mendapatkan akses awal ke salah satu akun di divisi riset, tepat lewat pola yang sudah terdeteksi namun dibiarkan tanpa tindakan." },
        ],
      },
    ],
  },
};

