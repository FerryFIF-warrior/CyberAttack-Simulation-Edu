import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel5Floor6: FloorContent = {
  id: "bruteforce_level_5_floor_6",
  simulationId: "bruteforce",
  levelNumber: 5,
  floorNumber: 6,
  title: "Ketika Otomasi Mulai Bertindak Sendiri",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-cyan-100 to-blue-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "vault_6", icon: "vault", x: 80, y: 22, scale: 1.4 },
      { id: "circuit_2", icon: "circuit", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_6", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "automation_console_1",
      label: "Konsol Respons Otomatis",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Sistem mitigasi otomatis yang dibangun Kael kini bekerja begitu baik sehingga mampu memblokir sebagian besar percobaan serangan dalam hitungan detik, jauh lebih cepat dari respons manusia mana pun." },
      { text: "Namun suatu malam, sistem otomatis itu mendeteksi lonjakan percobaan login yang tidak biasa dari satu rentang alamat tertentu, dan segera memblokir seluruh rentang itu sesuai aturan yang dirancang Kael sendiri, tanpa menunggu konfirmasi manusia." },
      { text: "Pagi harinya, keluhan membanjiri pusat layanan pelanggan: ribuan nasabah sah yang kebetulan menggunakan penyedia layanan internet yang sama dengan rentang alamat itu mendadak tidak bisa mengakses rekening mereka sendiri selama berjam-jam." },
      { text: "Lonjakan itu, setelah diperiksa ulang, ternyata memang sebagian berasal dari percobaan serangan nyata, tapi bercampur dengan lonjakan trafik sah akibat promosi aplikasi yang sedang berlangsung di wilayah yang sama." },
    ],
    question: "Bagaimana Kael menyeimbangkan kecepatan respons otomatis dengan risiko keputusan sepihak yang keliru seperti ini?",
    choices: [
      {
        id: "safe",
        label: "Merancang ulang sistem agar tindakan otomatis berskala besar memerlukan konfirmasi cepat dari manusia dalam jendela waktu singkat, sementara mitigasi berskala kecil tetap berjalan otomatis penuh.",
        points: 3,
        result: [
          { text: "Kael merancang ulang ambang batas keputusan: tindakan mitigasi berskala kecil tetap berjalan otomatis penuh demi kecepatan, tapi tindakan berdampak besar seperti pemblokiran rentang alamat luas memerlukan konfirmasi cepat dari manusia dalam jendela waktu singkat." },
          { text: "Desain ini menjaga kecepatan respons terhadap ancaman nyata sambil menambahkan lapisan penilaian manusia tepat sebelum keputusan berdampak luas diambil." },
          { text: "Kejadian serupa di masa depan berhasil dicegah tanpa mengorbankan kecepatan penanganan ancaman yang benar-benar berbahaya." },
        ],
      },
      {
        id: "neutral",
        label: "Menonaktifkan sepenuhnya pemblokiran otomatis berskala besar dan mengembalikan seluruh keputusan ke tangan manusia secara manual.",
        points: -3,
        result: [
          { text: "Trauma dengan insiden pemblokiran keliru ini, Kael menonaktifkan sepenuhnya kemampuan sistem untuk melakukan pemblokiran otomatis berskala besar, mengembalikan seluruh keputusan ke tangan manusia." },
          { text: "Keamanan nasabah sah memang lebih terjaga dari kesalahan serupa, tapi kecepatan respons terhadap serangan nyata berskala besar menurun drastis, karena kini semuanya menunggu keputusan manual yang lebih lambat." },
          { text: "Beberapa minggu kemudian, serangan berskala besar sempat berjalan lebih lama dari semestinya karena menunggu persetujuan manual yang tidak secepat sistem otomatis sebelumnya." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkan sistem otomatis tetap berjalan persis seperti sebelumnya karena insiden ini dianggap kasus langka yang tidak akan terulang.",
        points: -5,
        result: [
          { text: "Menganggap insiden pemblokiran keliru itu sebagai kasus langka yang tidak akan terulang, Kael membiarkan sistem otomatis berjalan persis seperti sebelumnya tanpa perubahan apa pun." },
          { text: "Beberapa bulan kemudian, pola serupa terjadi lagi saat lonjakan trafik sah bertepatan dengan percobaan serangan nyata, memicu pemblokiran keliru kedua yang memicu kemarahan nasabah lebih besar dari sebelumnya." },
          { text: "Regulator mulai mempertanyakan tata kelola sistem otomatis NusaBank yang tampak tidak belajar dari insiden yang sudah pernah terjadi." },
        ],
      },
    ],
  },
};
