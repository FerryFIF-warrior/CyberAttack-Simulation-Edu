import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel4Floor2: FloorContent = {
  id: "phishing_level_4_floor_2",
  simulationId: "phishing",
  levelNumber: 4,
  floorNumber: 2,
  title: "Email yang Terlalu Sempurna",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-100 to-blue-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_2", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "cabinet_1", icon: "cabinet", x: 85, y: 22, scale: 1.3 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "clean_mail_1",
      label: "Email Tanpa Cacat",
      icon: "mail",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael membuka satu email yang masuk ke kotak masuknya sendiri. Tidak ada kesalahan ketik. Tidak ada tata bahasa aneh. Tidak ada urgensi berlebihan yang biasanya jadi tanda peringatan." },
      { text: "Pengirimnya menggunakan alamat yang terlihat resmi, diakhiri domain perusahaan yang benar. Isinya meminta Kael memeriksa dokumen kebijakan baru lewat tautan yang disediakan, nada bahasanya profesional dan tenang." },
      { text: "Kael memeriksa tautannya lebih dekat. Alamatnya memang benar-benar berada di bawah domain resmi perusahaan, bukan domain tiruan seperti kasus-kasus sebelumnya." },
      { text: "Yang Kael tidak sadari sepenuhnya: domain resmi perusahaan punya banyak subdomain untuk berbagai keperluan, dan salah satu subdomain lama yang jarang dipakai ternyata berhasil disusupi penyerang tanpa sepengetahuan tim IT." },
    ],
    question: "Apa yang akan dilakukan Kael menghadapi email yang tampak sempurna ini?",
    choices: [
      {
        id: "safe",
        label: "Memeriksa subdomain secara spesifik dan mengonfirmasi ke tim IT apakah subdomain itu memang resmi digunakan untuk keperluan ini.",
        points: 3,
        result: [
          { text: "Kael tidak berhenti hanya karena domain utamanya benar. Ia memeriksa subdomain spesifik yang dipakai tautan itu dan menghubungi tim IT untuk memastikan keasliannya." },
          { text: "Tim IT mengonfirmasi, subdomain itu memang milik perusahaan, tapi sudah lama tidak digunakan dan baru saja terdeteksi disusupi tanpa sepengetahuan mereka." },
          { text: "Kael menghindari jebakan yang nyaris sempurna ini, karena ia tahu domain resmi saja tidak cukup menjamin keamanan jika subdomainnya tidak pernah diperiksa." },
        ],
      },
      {
        id: "neutral",
        label: "Mempercayainya karena domainnya benar-benar resmi, lalu melanjutkan tanpa pengecekan tambahan.",
        points: -2,
        result: [
          { text: "Karena domainnya terlihat benar-benar resmi, Kael langsung mempercayai email itu tanpa pengecekan tambahan." },
          { text: "Ia tidak menyadari bahwa domain yang benar tidak selalu berarti setiap bagian dari domain itu aman, terutama subdomain lama yang jarang dipantau." },
        ],
      },
      {
        id: "risky",
        label: "Mengklik tautan dan memasukkan kredensial karena tidak menemukan satu pun ciri phishing klasik.",
        points: -3,
        result: [
          { text: "Tidak menemukan satu pun ciri klasik phishing yang biasa ia kenali, Kael mengklik tautan dan memasukkan kredensial kerjanya." },
          { text: "Halaman yang terbuka memang tampak meyakinkan, berada di bawah domain resmi perusahaan, tapi disajikan dari subdomain yang telah disusupi." },
          { text: "Kredensial Kael berhasil dicuri, membuktikan bahwa serangan tingkat lanjut tidak selalu meninggalkan tanda-tanda yang biasa diajarkan." },
        ],
      },
    ],
  },
};
