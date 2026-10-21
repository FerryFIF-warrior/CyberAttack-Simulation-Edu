import type { FloorContent } from "@/features/simulation/types/simulation";

export const phishingLevel3Floor4: FloorContent = {
  id: "phishing_level_3_floor_4",
  simulationId: "phishing",
  levelNumber: 3,
  floorNumber: 4,
  title: "Jebakan di Rapat Virtual",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-sky-100 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "desk_4", icon: "desk", x: 20, y: 25, scale: 1.3 },
      { id: "calendar_1", icon: "calendar", x: 85, y: 22, scale: 1.2 },
      { id: "clock_2", icon: "clock", x: 50, y: 15, scale: 1 },
    ],
    object: {
      id: "meeting_invite_1",
      label: "Undangan Rapat",
      icon: "calendar",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Pagi yang sibuk. Kael baru saja duduk ketika sebuah undangan rapat mendadak muncul di kalendernya: Rapat Darurat Tim Lintas Divisi, lima menit lagi, lengkap dengan tautan masuk ke platform rapat yang biasa dipakai kantor." },
      { text: "Tanpa banyak berpikir, hampir semua rekan kerja yang menerima undangan serupa langsung mengklik tautan itu, takut terlambat masuk rapat penting." },
      { text: "Kael juga sempat mengklik, dan halaman yang terbuka memang terlihat sangat mirip dengan platform rapat biasa, lengkap dengan logo dan tata letak yang familiar, meminta ia masuk dengan akun kerja." },
      { text: "Sesaat sebelum mengetikkan kata sandinya, Kael melirik jam. Rapat darurat lintas divisi yang dadakan seperti ini, tanpa pemberitahuan sebelumnya dari atasan mana pun, terasa tidak biasa." },
    ],
    question: "Apa yang akan dilakukan Kael?",
    choices: [
      {
        id: "safe",
        label: "Membuka aplikasi rapat resmi secara langsung dan memeriksa apakah rapat itu benar-benar terjadwal di sana.",
        points: 3,
        result: [
          { text: "Kael menutup tautan di undangan dan membuka aplikasi rapat resminya secara mandiri." },
          { text: "Tidak ada jadwal rapat darurat apa pun tercatat di sana. Undangan itu palsu, dirancang untuk memancing kepanikan dan terburu-buru masuk." },
          { text: "Kael segera memberi tahu rekan-rekannya sebelum mereka sempat memasukkan kredensial ke halaman palsu itu." },
        ],
      },
      {
        id: "neutral",
        label: "Menunggu rekan kerja lain masuk duluan untuk melihat apakah rapatnya benar-benar ada.",
        points: -2,
        result: [
          { text: "Kael menunggu, berharap bisa melihat dari reaksi rekan kerja lain apakah rapat ini sungguhan." },
          { text: "Sayangnya beberapa rekan kerja justru sudah lebih dulu memasukkan kredensial mereka ke halaman palsu itu sebelum ada yang menyadari kejanggalannya." },
        ],
      },
      {
        id: "risky",
        label: "Langsung memasukkan kredensial kerja karena takut terlambat masuk rapat penting.",
        points: -3,
        result: [
          { text: "Takut dianggap lalai, Kael langsung memasukkan email dan kata sandi kerjanya ke halaman itu." },
          { text: "Halaman sempat memuat lama sebelum menampilkan pesan error aneh, dan rapat yang dijanjikan tidak pernah benar-benar dimulai." },
          { text: "Beberapa jam kemudian, muncul notifikasi login dari perangkat asing yang menggunakan akun kerja Kael." },
        ],
      },
    ],
  },
};
