import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel5Floor3: FloorContent = {
  id: "phishing_level_5_floor_3",
  simulationId: "phishing",
  levelNumber: 5,
  floorNumber: 3,
  title: "Serangan dari Vendor yang Dipercaya",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-amber-100 to-orange-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "device_1", icon: "device", x: 80, y: 22, scale: 1.4 },
      { id: "cross_sign_2", icon: "cross", x: 15, y: 25, scale: 1.2 },
      { id: "lamp_3", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "vendor_mail_1",
      label: "Email Pembaruan Vendor",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Email masuk dari alamat resmi penyedia perangkat lunak billing asuransi, vendor yang memang telah bekerja sama dengan rumah sakit selama bertahun-tahun dan memiliki akses jarak jauh resmi ke sistem internal." },
      { text: "Isinya mengumumkan pembaruan keamanan mendesak, meminta tim IT mengunduh dan memasang berkas pembaruan lewat tautan yang disediakan sebelum tengah malam, karena 'celah kritis sedang dieksploitasi secara aktif di berbagai klien lain'." },
      { text: "Alamat pengirim benar-benar valid, formatnya identik dengan komunikasi resmi vendor sebelumnya, bahkan menyertakan nomor tiket dukungan yang terlihat sah." },
      { text: "Yang tidak diketahui Kael saat itu: infrastruktur email vendor ini sendiri telah disusupi sejak beberapa hari lalu, dan email semacam ini sedang dikirim ke seluruh klien mereka, bukan hanya ke Wira Husada." },
    ],
    question: "Bagaimana Kael menyikapi permintaan pembaruan mendesak dari vendor tepercaya ini?",
    choices: [
      {
        id: "safe",
        label: "Menghubungi vendor lewat kontak darurat resmi yang tercatat di kontrak kerja sama, bukan nomor atau tautan yang disediakan di email, sebelum memasang pembaruan apa pun.",
        points: 3,
        result: [
          { text: "Kael menolak memasang pembaruan apa pun sebelum memverifikasinya lewat kontak darurat resmi yang tercantum di dokumen kontrak kerja sama, bukan informasi apa pun dari email itu sendiri." },
          { text: "Vendor mengonfirmasi dengan panik: infrastruktur email mereka telah disusupi, dan tautan 'pembaruan' itu sebenarnya adalah perangkat lunak berbahaya yang dirancang menyamar sebagai patch resmi." },
          { text: "Wira Husada menjadi salah satu dari sedikit klien vendor itu yang berhasil menghindari penyusupan, berkat kebiasaan memverifikasi lewat jalur independen yang tidak pernah bergantung pada email itu sendiri." },
        ],
      },
      {
        id: "neutral",
        label: "Memasang pembaruan di satu server pengujian terlebih dahulu sebelum menerapkannya ke sistem utama, tanpa memverifikasi ke vendor.",
        points: -3,
        result: [
          { text: "Kael memasang pembaruan itu di server pengujian lebih dulu, menganggap langkah kehati-hatian teknis ini sudah cukup tanpa perlu memverifikasi ke vendor secara langsung." },
          { text: "Server pengujian itu, meski terisolasi dari sistem produksi utama, tetap memiliki akses ke jaringan internal rumah sakit yang cukup luas untuk memberi pijakan awal bagi penyerang." },
          { text: "Butuh waktu sebelum tim menyadari bahwa 'pengujian' itu sendiri telah membuka pintu masuk baru ke dalam jaringan." },
        ],
      },
      {
        id: "risky",
        label: "Segera memasang pembaruan ke seluruh sistem produksi karena peringatan 'celah kritis sedang dieksploitasi' terdengar sangat mendesak dan vendornya tepercaya.",
        points: -6,
        result: [
          { text: "Tekanan dari ancaman 'celah kritis yang sedang aktif dieksploitasi' membuat Kael segera memasang pembaruan itu ke seluruh sistem produksi billing asuransi rumah sakit." },
          { text: "Perangkat lunak yang terpasang itu ternyata adalah pintu belakang yang memberi akses penuh kepada penyerang ke seluruh data billing dan sebagian rekam medis yang terhubung dengannya." },
          { text: "Wira Husada menjadi salah satu korban terdampak paling parah dari kampanye rantai pasok ini, karena kepercayaan penuh pada vendor diberikan tanpa verifikasi independen sama sekali." },
        ],
      },
    ],
  },
};
