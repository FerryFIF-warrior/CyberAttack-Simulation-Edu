import type { FloorContent } from "@/features/simulation/types/simulation";

export const authLevel4Floor2: FloorContent = {
  id: "auth_level_4_floor_2",
  simulationId: "auth",
  levelNumber: 4,
  floorNumber: 2,
  title: "Token Palsu yang Terlihat Sah",
  maxPoints: 3,

  map: {
    backgroundClass: "bg-gradient-to-b from-violet-100 to-fuchsia-100",
    playerStart: { x: 20, y: 70 },
    decorations: [
      { id: "booth_2", icon: "booth", x: 15, y: 25, scale: 1.3 },
      { id: "chain_board_1", icon: "board", x: 85, y: 25, scale: 1.2 },
      { id: "lamp_2", icon: "lamp", x: 45, y: 15, scale: 1 },
    ],
    object: {
      id: "token_inspector_1",
      label: "Alat Pemeriksa Token",
      icon: "tool",
      x: 60,
      y: 46,
      interactionRadius: 8,
    },
  },

  story: {
    intro: [
      { text: "Kael memeriksa bagaimana platform memverifikasi token akses yang diberikan setelah login. Sekilas, mekanismenya terlihat aman: setiap token punya format tertentu, lengkap dengan bagian yang disebut tanda tangan digital untuk membuktikan keasliannya." },
      { text: "Saat memeriksa bagaimana server memverifikasi token itu, Kael menemukan sesuatu yang janggal: server hanya memeriksa apakah format token sudah benar, tiga bagian dipisah titik, susunan karakternya sesuai pola, tapi tidak benar-benar memvalidasi apakah tanda tangan digitalnya cocok dengan isi tokennya." },
      { text: "Ini berarti, selama sebuah token terlihat 'benar bentuknya', server menerimanya begitu saja, bahkan jika isi di dalamnya, seperti nama pengguna atau tingkat akses, sudah diubah sembarangan." },
      { text: "Kael menyusun satu token pengujian, menyusun ulang struktur formatnya persis seperti token asli, lalu mengganti isi di dalamnya menjadi informasi yang berbeda sama sekali, sambil tetap mempertahankan bentuk luarnya agar lolos pemeriksaan format." },
    ],
    question: "Bagaimana Kael membuktikan bahwa server hanya memeriksa format, bukan keaslian isi token?",
    choices: [
      {
        id: "safe",
        label: "Menyusun token pengujian dengan format benar tapi isi yang diubah, lalu membuktikan server tetap menerimanya tanpa memvalidasi tanda tangan digitalnya.",
        points: 3,
        result: [
          { text: "Kael menyusun token pengujian dengan format yang benar secara struktur, tapi mengganti isi di dalamnya tanpa menyesuaikan tanda tangan digitalnya." },
          { text: "Server menerima token itu begitu saja, hanya karena bentuknya terlihat benar, tanpa pernah benar-benar memverifikasi apakah tanda tangan digitalnya memang cocok dengan isi yang telah diubah." },
          { text: "Kael mencatat ini sebagai temuan kritis: pemeriksaan format saja tidak pernah cukup untuk membuktikan keaslian sebuah token." },
        ],
      },
      {
        id: "neutral",
        label: "Memeriksa format token secara mendalam tanpa benar-benar menguji apakah tanda tangannya divalidasi atau tidak.",
        points: -1,
        result: [
          { text: "Kael menghabiskan waktu memeriksa format token secara sangat mendalam, mencatat setiap detail strukturnya." },
          { text: "Tanpa benar-benar menguji apakah tanda tangan digitalnya divalidasi, ia tidak mendapat bukti konkret tentang celah yang sebenarnya paling berbahaya dari token ini." },
        ],
      },
      {
        id: "risky",
        label: "Menyimpulkan token ini aman karena formatnya sudah sesuai standar yang dikenal luas.",
        points: -3,
        result: [
          { text: "Karena formatnya sesuai standar yang dikenal luas, Kael hampir menyimpulkan token ini sudah aman tanpa pengujian lebih lanjut." },
          { text: "Ia lupa bahwa mengikuti format standar tidak sama dengan mengimplementasikan verifikasinya dengan benar, keduanya adalah hal yang sangat berbeda." },
          { text: "Celah paling berbahaya di sistem ini, ketiadaan validasi tanda tangan, nyaris terlewat begitu saja." },
        ],
      },
    ],
  },
};
