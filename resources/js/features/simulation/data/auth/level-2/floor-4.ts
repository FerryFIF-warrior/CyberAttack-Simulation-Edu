import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel2Floor4: FloorContent = {
  id: "auth_level_2_floor_4",
  simulationId: "auth",
  levelNumber: 2,
  floorNumber: 4,
  title: "Tahap 4: Penyamaran Lewat Pintu Lain",
  maxPoints: 4,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_4", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "banner_4", icon: "banner", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "device_panel_1",
      label: "Panel Perangkat Terhubung",
      icon: "panel",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Satu pertanyaan masih mengganjal pikiran Kael: jika sebuah lencana sesi berhasil dipakai dari perangkat asing, apakah pemilik aslinya akan tahu? Ia memutuskan menguji fitur manajemen perangkat forum." },
      { text: "Kael login ke akun pengujiannya dari perangkat keduanya, seolah-olah itu adalah perangkat milik orang lain yang baru saja mendapatkan lencana curian." },
      { text: "Ia memeriksa pengaturan akun dari perangkat pertama, mencari tahu apakah ada daftar perangkat yang sedang login, atau notifikasi tentang login dari perangkat baru." },
      { text: "Yang ia temukan membuatnya cemas: tidak ada daftar perangkat aktif, tidak ada notifikasi apa pun. Login dari perangkat asing sama sekali tidak meninggalkan jejak yang bisa disadari pemilik akun." },
    ],
    question: "Apa yang akan Kael lakukan terhadap temuan ini?",
    choices: [
      {
        id: "safe",
        label: "Mendokumentasikan tidak adanya notifikasi dan daftar perangkat, lalu merekomendasikan fitur manajemen perangkat beserta notifikasi login baru.",
        points: 4,
        result: [
          { text: "Kael mendokumentasikan secara rinci bahwa forum tidak memiliki daftar perangkat aktif maupun notifikasi login dari perangkat baru." },
          { text: "Dalam laporannya, ia merekomendasikan dua hal: halaman yang menampilkan semua perangkat yang sedang login, dan notifikasi otomatis setiap kali ada login dari perangkat yang belum pernah dikenali." },
          { text: "Pemilik forum membangun kedua fitur itu, sehingga ke depannya, penyamaran lewat lencana curian akan langsung terdeteksi oleh pemilik akun aslinya." },
        ],
      },
      {
        id: "neutral",
        label: "Mencatat ketiadaan fitur ini tanpa menjelaskan dampaknya secara rinci.",
        points: 1,
        result: [
          { text: "Kael hanya mencatat singkat bahwa forum tidak punya fitur manajemen perangkat." },
          { text: "Catatan yang terlalu singkat itu membuat pemilik forum kurang memahami seberapa penting fitur ini untuk segera dibangun." },
        ],
      },
      {
        id: "risky",
        label: "Membiarkan akun pengujian login dari perangkat kedua tanpa batas waktu untuk 'melihat apa yang terjadi nanti'.",
        points: -2,
        result: [
          { text: "Kael membiarkan sesi dari perangkat kedua tetap aktif tanpa batas waktu, penasaran ingin melihat apakah ada perubahan dengan sendirinya." },
          { text: "Tidak ada yang berubah, sesi itu tetap aktif tanpa ada yang menyadarinya, justru memperpanjang risiko yang seharusnya segera dilaporkan dan ditutup." },
          { text: "Waktu pengujian terbuang karena Kael menunda tindakan yang seharusnya sudah jelas sejak awal." },
        ],
      },
    ],
  },
};
