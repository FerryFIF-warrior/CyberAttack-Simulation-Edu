import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor5: FloorContent = {
  id: "auth_level_4_floor_5",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 5,
  title: "Penyamaran lewat Akun Dukungan Bayangan",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_5", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "support_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_5", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "support_account_panel_1",
      label: "Panel Akun Dukungan Internal",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Saat meninjau daftar akun dengan hak akses luas, Kael menemukan satu akun bernama 'support-internal', awalnya dibuat bertahun-tahun lalu untuk membantu tim dukungan pelanggan melihat data anggota saat menangani keluhan." },
      { text: "Akun ini punya akses yang sangat luas, hampir setara admin, tapi berbeda dari akun admin biasa yang selalu diaudit rutin, akun ini nyaris tidak pernah masuk dalam catatan audit keamanan karena dianggap 'hanya akun layanan dukungan', bukan akun bernilai tinggi." },
      { text: "Kael memeriksa riwayat penggunaan akun itu, dan menemukan sesuatu yang janggal: kata sandinya tidak pernah diganti sejak dibuat, dan beberapa karyawan lama yang sudah tidak lagi bekerja di perusahaan ternyata masih mengetahui kredensialnya." },
      { text: "Inilah yang disebut akun bayangan, akun dengan akses besar yang luput dari pengawasan karena tidak dianggap 'penting' seperti akun admin pada umumnya, padahal risikonya sama besarnya, bahkan mungkin lebih besar karena jarang diperiksa." },
    ],
    question: "Bagaimana Kael menangani risiko dari akun dukungan bayangan ini?",
    choices: [
      {
        id: "safe",
        label: "Memasukkan seluruh akun berakses luas, termasuk akun layanan dukungan, ke dalam audit rutin yang sama ketatnya dengan akun admin, dan segera mengganti kredensial yang sudah diketahui mantan karyawan.",
        points: 3,
        result: [
          { text: "Kael menyadari bahwa tingkat pengawasan seharusnya ditentukan oleh seberapa besar akses sebuah akun, bukan oleh nama atau label yang melekat padanya." },
          { text: "Ia memasukkan akun 'support-internal' ke dalam audit rutin yang sama ketatnya dengan akun admin, sekaligus segera mengganti kredensialnya karena sudah diketahui mantan karyawan." },
          { text: "Akun bayangan yang selama bertahun-tahun luput dari pengawasan kini menjadi bagian dari pemantauan keamanan yang sama ketatnya dengan akun bernilai tinggi lainnya." },
        ],
      },
      {
        id: "neutral",
        label: "Hanya mengganti kata sandi akun tersebut, tanpa memasukkannya ke dalam audit rutin ke depannya.",
        points: -1,
        result: [
          { text: "Kael mengganti kata sandi akun 'support-internal' untuk mengatasi masalah yang ditemukan saat ini." },
          { text: "Namun tanpa dimasukkan ke dalam audit rutin, akun ini berisiko kembali luput dari pengawasan di masa depan, dan masalah yang sama bisa terulang tanpa disadari." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena akun ini bukan akun admin resmi, hanya akun layanan pendukung biasa.",
        points: -3,
        result: [
          { text: "Kael menganggap akun ini tidak terlalu berisiko karena bukan akun admin resmi, hanya dikategorikan sebagai akun layanan pendukung." },
          { text: "Ia tidak menyadari bahwa tingkat akses yang dimiliki akun itu, bukan labelnya, yang sebenarnya menentukan seberapa besar risikonya." },
          { text: "Mantan karyawan yang masih mengetahui kredensial lama akun ini berhasil mengakses data anggota tanpa ada yang menyadarinya untuk waktu yang lama." },
        ],
      },
    ],
  },
};
