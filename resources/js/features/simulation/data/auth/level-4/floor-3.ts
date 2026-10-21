import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor3: FloorContent = {
  id: "auth_level_4_floor_3",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 3,
  title: "Pembajakan Sesi via Perangkat yang Dipercaya",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_3", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "device_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "trusted_device_panel_1",
      label: "Panel Perangkat Tepercaya",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Platform ini punya fitur 'perangkat tepercaya', sekali anggota memverifikasi sebuah perangkat lewat MFA, perangkat itu tidak akan diminta verifikasi tambahan lagi untuk beberapa waktu ke depan, demi kenyamanan pengguna." },
      { text: "Kael memeriksa berapa lama status 'tepercaya' ini bertahan, dan menemukan bahwa sekali diberikan, status itu tidak pernah benar-benar kedaluwarsa, bahkan setelah bertahun-tahun perangkat itu tidak lagi dipakai anggota aslinya." },
      { text: "Ia mencoba skenario pengujian: sebuah perangkat lama yang pernah diverifikasi setahun lalu, lalu dijual atau berpindah tangan tanpa pernah dicabut status tepercayanya, ternyata tetap bisa dipakai masuk ke akun lama itu tanpa diminta MFA sama sekali." },
      { text: "Ini bukan soal mencuri kata sandi atau kode OTP. Ini adalah celah yang muncul dari kepercayaan yang diberikan sekali, lalu dilupakan selamanya, tanpa pernah ditinjau ulang." },
    ],
    question: "Bagaimana Kael menindaklanjuti temuan soal status perangkat tepercaya yang tidak pernah kedaluwarsa ini?",
    choices: [
      {
        id: "safe",
        label: "Merekomendasikan batas waktu kedaluwarsa untuk status perangkat tepercaya, dengan opsi bagi anggota untuk meninjau dan mencabut perangkat lama kapan saja.",
        points: 3,
        result: [
          { text: "Kael merekomendasikan agar status perangkat tepercaya diberi batas waktu kedaluwarsa otomatis, dipaksa verifikasi ulang setelah periode tertentu." },
          { text: "Ia juga menyarankan menambahkan halaman khusus bagi anggota untuk melihat dan mencabut sendiri perangkat lama yang sudah tidak mereka gunakan lagi." },
          { text: "Platform menerapkan kedua perubahan itu, menutup celah yang muncul dari kepercayaan lama yang terlupakan dan tidak pernah ditinjau ulang." },
        ],
      },
      {
        id: "neutral",
        label: "Menyarankan memperketat proses awal verifikasi perangkat, tanpa mengubah masa berlaku status tepercayanya.",
        points: -1,
        result: [
          { text: "Kael menyarankan memperketat proses awal saat sebuah perangkat baru pertama kali diverifikasi." },
          { text: "Namun setelah status tepercaya diberikan, masalah yang sama tetap ada, status itu tidak pernah kedaluwarsa, apa pun seberapa ketat proses verifikasi awalnya." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikannya karena fitur ini dianggap wajar sebagai bentuk kenyamanan pengguna di banyak platform lain.",
        points: -2,
        result: [
          { text: "Kael menganggap fitur perangkat tepercaya tanpa kedaluwarsa ini wajar saja, karena banyak platform lain juga menawarkan kenyamanan serupa." },
          { text: "Ia tidak mempertimbangkan bahwa 'umum dipakai' tidak selalu berarti 'dirancang dengan aman', terutama jika tidak ada batas waktu maupun cara meninjau ulang perangkat lama." },
          { text: "Sebuah perangkat lama yang berpindah tangan tanpa sepengetahuan pemilik aslinya berhasil mengakses akun tanpa hambatan MFA sama sekali." },
        ],
      },
    ],
  },
};
