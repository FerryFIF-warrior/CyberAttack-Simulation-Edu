import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel1Floor5: FloorContent = {
  id: "auth_level_1_floor_5",
  simulationId: "auth",
  levelNumber: 1,
  floorNumber: 5,
  title: "Ujian Akhir: Laporan Rantai Penyamaran Lencana",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_5", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_6", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "final_target_1",
      label: "Dasbor Utama Forum",
      icon: "dashboard",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Satu rangkaian pengujian besar tersisa sebelum forum ini dinyatakan siap: Kael harus menunjukkan seluruh rantai celah yang telah ia temukan, dari awal hingga akhir, kepada pemilik arsip." },
      { text: "Ia mengingat kembali setiap tahap: lencana yang tidak disegel dengan baik, kotak komentar yang menampilkan tulisan tamu apa adanya, catatan tersembunyi yang menyalin lencana moderator, dan penyamaran identitas yang berhasil menembus dasbor." },
      { text: "Pemilik arsip duduk menunggu, siap mendengarkan bagaimana keempat celah kecil itu bisa dirangkai menjadi satu ancaman besar jika forum benar-benar dibuka tanpa perbaikan." },
      { text: "Kael menata catatannya satu per satu, memastikan setiap tahap tersambung jelas dengan tahap berikutnya." },
    ],
    question: "Bagaimana Kael menyusun rantai temuan ini menjadi laporan akhir yang paling jelas?",
    choices: [
      {
        id: "safe",
        label: "Menjelaskan rantai lengkap: lencana tak tersegel, titik rentan di kotak komentar, pencurian lencana, lalu penyamaran identitas, diikuti rekomendasi perbaikan menyeluruh.",
        points: 4,
        result: [
          { text: "Kael menjelaskan rantai temuannya tahap demi tahap, menunjukkan bagaimana satu celah kecil bisa membuka jalan bagi celah berikutnya." },
          { text: "Ia menutup laporan dengan rekomendasi: menyegel lencana dengan benar, menyaring tulisan tamu di kotak komentar, dan menambahkan verifikasi tambahan sebelum dasbor moderator bisa diakses." },
          { text: "Pemilik arsip memahami sepenuhnya dan segera memerintahkan perbaikan menyeluruh sebelum forum dibuka untuk publik." },
          { text: "Level 1 Authentication Attack selesai. Sistem keanggotaan forum kini jauh lebih aman berkat laporan Kael." },
        ],
      },
      {
        id: "neutral",
        label: "Melewati penjelasan awal, langsung menunjukkan hasil akhir penyamaran identitas saja.",
        points: 1,
        result: [
          { text: "Kael hanya menunjukkan hasil akhir keberhasilan penyamaran identitas, tanpa menjelaskan tahap-tahap sebelumnya secara rinci." },
          { text: "Pemilik arsip memperbaiki bagian dasbor, tetapi tidak menyadari bahwa kotak komentar dan lencana yang tak tersegel juga perlu diperbaiki." },
        ],
      },
      {
        id: "risky",
        label: "Membuktikan 'keseriusan' temuan dengan tetap masuk sebagai moderator di depan seluruh anggota forum yang sedang daring.",
        points: -2,
        result: [
          { text: "Kael memilih menunjukkan hasil penyamaran identitasnya secara langsung di depan seluruh anggota forum yang sedang daring." },
          { text: "Tindakan itu membuat anggota forum panik, mengira akun moderator benar-benar telah diretas sungguhan." },
          { text: "Pemilik arsip harus menenangkan komunitas terlebih dahulu, dan kepercayaan terhadap proses pengujian Kael ikut tercoreng." },
        ],
      },
    ],
  },
};
