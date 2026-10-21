import type { FloorContent } from "@/features/simulation/types/simulation";

export const bruteforceLevel4Floor4: FloorContent = {
  id: "bruteforce_level_4_floor_4",
  simulationId: "bruteforce",
  levelNumber: 4,
  floorNumber: 4,
  title: "False Flag",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-slate-200 to-cyan-200",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "server_4", icon: "server", x: 78, y: 22, scale: 1.4 },
      { id: "alarm_1", icon: "alarm", x: 15, y: 28, scale: 1.2 },
      { id: "lamp_4", icon: "lamp", x: 40, y: 15, scale: 1 },
    ],
    object: {
      id: "dual_alert_panel_1",
      label: "Panel Peringatan Ganda",
      icon: "panel",
      x: 60,
      y: 48,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Malam itu, dasbor pemantauan Kael tiba-tiba menyala merah terang: serangan brute force besar-besaran dari satu alamat IP, mencoba ribuan kombinasi ke satu akun admin dalam hitungan detik, sangat mencolok dan mudah dikenali." },
      { text: "Kael segera bergegas menangani alarm besar itu, memblokir alamat tersebut, dan menghabiskan waktu memeriksa dampaknya terhadap akun admin yang menjadi sasaran." },
      { text: "Di tengah kesibukannya menangani serangan mencolok itu, sebuah notifikasi kecil nyaris terlewat di sudut layar, percobaan login yang jauh lebih tenang sedang berlangsung di akun-akun anggota biasa, dari beberapa alamat berbeda, nyaris tidak terlihat dibanding keributan serangan besar tadi." },
      { text: "Kael mulai curiga, serangan besar yang begitu mencolok ini mungkin sengaja dirancang untuk menyedot seluruh perhatiannya, sementara serangan sesungguhnya berjalan diam-diam di tempat lain." },
    ],
    question: "Apa yang akan dilakukan Kael begitu menyadari kemungkinan ini?",
    choices: [
      {
        id: "safe",
        label: "Mendelegasikan penanganan serangan besar yang mencolok ke sistem otomatis, lalu segera memeriksa notifikasi kecil yang nyaris terlewat.",
        points: 3,
        result: [
          { text: "Kael membiarkan sistem pertahanan otomatis menangani serangan besar yang mencolok itu, karena sudah terbukti efektif menahan serangan sejenis sebelumnya." },
          { text: "Ia mengalihkan perhatiannya ke notifikasi kecil yang nyaris terlewat, dan menemukan percobaan login yang jauh lebih terencana sedang menargetkan beberapa akun anggota penting." },
          { text: "Serangan tenang yang sesungguhnya itu berhasil dihentikan tepat waktu, sementara serangan besar yang mencolok tadi memang hanya pengalih perhatian seperti dugaan Kael." },
        ],
      },
      {
        id: "neutral",
        label: "Tetap fokus penuh menangani serangan besar sampai benar-benar selesai, baru memeriksa notifikasi kecil setelahnya.",
        points: -1,
        result: [
          { text: "Kael memilih menyelesaikan penanganan serangan besar terlebih dahulu sampai tuntas, sebelum beralih ke notifikasi kecil tadi." },
          { text: "Waktu yang terpakai untuk serangan pengalih perhatian itu cukup lama bagi serangan tenang di sisi lain untuk membobol beberapa akun sebelum sempat tertangani." },
        ],
      },
      {
        id: "risky",
        label: "Mengabaikan notifikasi kecil itu sepenuhnya karena serangan besar terlihat jauh lebih mengancam.",
        points: -3,
        result: [
          { text: "Kael mengabaikan notifikasi kecil itu sepenuhnya, karena serangan besar yang mencolok terasa jauh lebih mendesak untuk ditangani." },
          { text: "Ia tidak menyadari bahwa justru itulah tujuan dari serangan besar tadi, mengalihkan seluruh perhatian dari ancaman sesungguhnya." },
          { text: "Beberapa akun anggota penting berhasil dibobol lewat serangan tenang yang berjalan tanpa gangguan sepanjang malam itu." },
        ],
      },
    ],
  },
};
