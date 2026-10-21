import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel3Floor6: FloorContent = {
  id: "auth_level_3_floor_6",
  simulationId: "auth",
  levelNumber: 3,
  floorNumber: 6,
  title: "Ujian Akhir: Laporan Arsitektur Kepercayaan",
  maxPoints: 2,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_6", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_1", icon: "banner", x: 85, y: 25, scale: 1.3 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "final_desk_1",
      label: "Meja Laporan Arsitektur",
      icon: "desk",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Dewan pengelola platform berkumpul untuk mendengarkan laporan terakhir Kael. Rantai kepercayaan yang rapuh, identitas palsu yang diterima begitu saja, token yang dipakai ulang, jalur komunikasi yang bocor, hingga eskalasi akses yang nyaris tak terdeteksi." },
      { text: "Satu anggota dewan bertanya dengan nada frustrasi: apakah sistem mereka memang serapuh itu, atau apakah Kael hanya kebetulan menemukan celah demi celah tanpa akhir?" },
      { text: "Kael menjawab dengan tenang, menjelaskan bahwa seluruh temuan ini sebenarnya berasal dari satu akar yang sama: platform selalu mempercayai setiap mata rantai begitu saja, tanpa pernah memverifikasi ulang di titik-titik penting." },
      { text: "Inilah saatnya menyampaikan simpulan yang akan menentukan bagaimana arsitektur kepercayaan platform ini dibangun ulang, bukan sekadar menambal satu demi satu celah yang sudah ditemukan." },
    ],
    question: "Apa simpulan akhir yang akan Kael sampaikan kepada dewan pengelola?",
    choices: [
      {
        id: "safe",
        label: "Membangun ulang arsitektur kepercayaan agar setiap mata rantai, sekecil apa pun, diverifikasi ulang secara independen, bukan dipercaya hanya karena berasal dari jalur yang dikenal.",
        points: 2,
        result: [
          { text: "Kael menjelaskan bahwa kesalahan mendasar platform ini adalah mempercayai sebuah mata rantai hanya karena ia terhubung lewat jalur yang dikenal, tanpa pernah memverifikasinya secara independen." },
          { text: "Ia merekomendasikan perubahan arsitektur menyeluruh: setiap identitas, token, dan penanda akses harus diverifikasi ulang secara independen di setiap tahap, tidak peduli seberapa tepercaya sumbernya terlihat." },
          { text: "Dewan pengelola menyetujui perubahan besar ini, membangun ulang fondasi kepercayaan platform dari akarnya, bukan hanya menambal celah yang sudah ditemukan satu per satu." },
          { text: "Level 3 Authentication Attack selesai. Kael kini memahami bahwa pada tingkat lanjutan, identitas yang aman bukan tentang siapa yang dipercaya, melainkan tentang apa yang selalu diverifikasi ulang." },
        ],
      },
      {
        id: "neutral",
        label: "Merekomendasikan perbaikan pada setiap celah yang sudah ditemukan, tanpa mengubah cara kerja sistem secara menyeluruh.",
        points: 1,
        result: [
          { text: "Kael hanya merekomendasikan perbaikan pada masing-masing celah yang sudah ditemukan selama pengujian." },
          { text: "Perbaikan itu menutup lubang yang sudah diketahui, tapi cara kerja dasar sistem yang terlalu mudah percaya pada sumber yang dikenal tetap tidak berubah." },
        ],
      },
      {
        id: "risky",
        label: "Menyarankan membatasi fitur login lintas layanan sepenuhnya daripada memperbaiki arsitekturnya.",
        points: -5,
        result: [
          { text: "Merasa lelah dengan rentetan celah yang ditemukan, Kael menyarankan agar fitur login lintas layanan dibatasi sepenuhnya daripada diperbaiki." },
          { text: "Dewan pengelola kecewa, karena fitur itu sebenarnya sangat membantu anggota, dan akar masalahnya bukan pada fiturnya, melainkan pada cara platform memverifikasi kepercayaan." },
          { text: "Platform kehilangan satu fitur yang bermanfaat tanpa benar-benar menyelesaikan masalah arsitektur yang menjadi penyebab sesungguhnya." },
        ],
      },
    ],
  },
};
