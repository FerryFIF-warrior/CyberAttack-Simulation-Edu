/**
 * Data materi halaman Learning.
 * Sumber: paper pada Materi_Phishing / Brute_Force / SQL_Injection / Authentication_Attack.zip
 * Warna aksen mengikuti STYLE-GUIDE-Eksperimen-1 (section 2.2) — jangan diubah.
 * Teks sudah diparafrase ke Bahasa Indonesia; angka diambil dari paper masing-masing.
 */

export type ModuleId = "phishing" | "bruteforce" | "sqli" | "auth";

export interface Source {
  id: string;
  cite: string; // penulis, tahun
  title: string;
  venue: string;
  note: string; // satu kalimat: apa kontribusi paper untuk materi
}

export interface Fact {
  value: string;
  label: string;
  src: string; // id Source
}

export interface Topic {
  title: string;
  body: string;
  tag?: string;
}

export interface LearningModule {
  id: ModuleId;
  no: string; // "01"
  name: string;
  vector: string;
  tagline: string;
  accent: string;
  accentDark: string;
  iconBg: string;
  intro: string[];
  howItWorks: { heading: string; items: Topic[] };
  signs: { heading: string; items: string[] };
  defense: { heading: string; items: Topic[] };
  research: { heading: string; intro: string; facts: Fact[] };
  takeaways: string[];
  sources: Source[];
}

export const modules: LearningModule[] = [
  /* ───────────────────────── 01 PHISHING ───────────────────────── */
  {
    id: "phishing",
    no: "01",
    name: "Phishing",
    vector: "SOCIAL ENGINEERING",
    tagline: "Menipu manusia, bukan menembus sistem.",
    accent: "#00e5ff",
    accentDark: "#00b8cc",
    iconBg: "#0e2a33",
    intro: [
      "Phishing adalah kejahatan siber yang memadukan rekayasa sosial dan trik teknis: pelaku menyamar sebagai pihak tepercaya (bank, kantor, layanan populer) supaya korban menyerahkan kredensial, data kartu, atau data pribadi lainnya.",
      "Cara kerjanya umumnya sama: penyerang membuat salinan situs asli, lalu menyebarkan tautannya lewat email, pesan, atau formulir kontak. FBI IC3 mencatat kerugian global di atas 2,7 miliar USD pada 2018, dan ancamannya terus berkembang.",
    ],
    howItWorks: {
      heading: "Bentuk-bentuk phishing",
      items: [
        { title: "Email phishing", body: "Email massal yang menyerupai institusi resmi dan mengarahkan korban ke halaman login palsu.", tag: "EMAIL" },
        { title: "Spear phishing", body: "Versi bertarget: isi pesan disesuaikan dengan nama, jabatan, atau konteks kerja korban sehingga terasa meyakinkan.", tag: "TARGETED" },
        { title: "Whaling", body: "Spear phishing yang menyasar eksekutif atau pengambil keputusan karena akses dan wewenangnya besar.", tag: "EXECUTIVE" },
        { title: "Website spoofing", body: "Situs tiruan dengan tampilan nyaris identik dengan situs asli, biasanya memakai domain yang mirip.", tag: "CLONE" },
        { title: "Smishing & vishing", body: "Penipuan lewat SMS (smishing) atau panggilan suara (vishing) yang memancing korban memberi data atau mengeklik tautan.", tag: "MOBILE" },
        { title: "Malware-based & angler", body: "Phishing yang membawa lampiran berbahaya, atau memakai akun media sosial palsu yang berpura-pura menjadi layanan pelanggan.", tag: "MALWARE" },
      ],
    },
    signs: {
      heading: "Ciri yang biasa dipakai untuk mendeteksi situs phishing",
      items: [
        "Alamat IP dipakai langsung di URL, bukan nama domain.",
        "URL tidak wajar panjangnya atau mengandung karakter janggal.",
        "Usia domain sangat muda (baru didaftarkan).",
        "Pengalihan (redirect) berlapis sebelum sampai ke halaman akhir.",
        "Atribut form mencurigakan, misalnya data dikirim ke domain lain.",
        "Tidak memakai HTTPS atau sertifikat tidak sesuai domain.",
      ],
    },
    defense: {
      heading: "Pertahanan",
      items: [
        { title: "Blacklist saja tidak cukup", body: "Daftar URL berbahaya bersifat reaktif: situs yang baru dibuat belum masuk daftar. Karena itu penelitian bergeser ke deteksi proaktif berbasis machine learning." },
        { title: "Deteksi berbasis fitur", body: "Model membaca fitur URL, domain, isi halaman, dan perilaku halaman, lalu mengklasifikasikan situs sebagai sah atau phishing." },
        { title: "Model yang bisa dijelaskan", body: "SHAP membantu melihat fitur mana yang paling berpengaruh pada keputusan model, sehingga hasilnya bisa dipertanggungjawabkan oleh analis." },
        { title: "Kebiasaan pengguna", body: "Periksa domain sebelum login, jangan membuka lampiran tak dikenal, dan verifikasi permintaan sensitif lewat kanal lain." },
      ],
    },
    research: {
      heading: "Temuan dari paper",
      intro: "Angka berikut berasal dari studi yang berbeda dan memakai dataset berbeda, jadi jangan dibandingkan langsung satu sama lain.",
      facts: [
        { value: "71,25%", label: "dari 80 studi memakai pendekatan machine learning", src: "safi" },
        { value: "38,75%", label: "studi memakai Random Forest, algoritma klasik terbanyak", src: "safi" },
        { value: "99,98%", label: "akurasi tertinggi (CNN) di antara studi yang ditinjau", src: "safi" },
        { value: "97,5%", label: "akurasi hibrida BPNN + XGBoost pada 11.000 URL", src: "leonika" },
        { value: "97%", label: "akurasi Random Forest + SHAP pada dataset 11.000+ URL", src: "kehkashan" },
        { value: "< 2.000 ms", label: "waktu eksekusi model NB/SVM pada fitur URL, halaman, dan perilaku", src: "orunsolu" },
      ],
    },
    takeaways: [
      "Akurasi tinggi saja belum membuktikan model efektif di dunia nyata. Tinjauan 2019–2025 menyoroti dataset usang, kelas tidak seimbang, data duplikat, dan kebocoran data (data leakage).",
      "Ensemble dan neural network cenderung mengungguli algoritma klasik pada dataset seimbang.",
      "Pengujian lintas dataset dan lintas waktu diperlukan agar model tahan terhadap serangan baru.",
    ],
    sources: [
      { id: "mohamed", cite: "Mohamed dkk., 2026", title: "An In-Depth Analysis of Modern Phishing Detection Methods: A Comprehensive Systematic Literature Review", venue: "Applied Computational Intelligence and Soft Computing", note: "Tinjauan sistematis 2019–2025 (PRISMA), jenis phishing, serta masalah dataset dan evaluasi." },
      { id: "safi", cite: "Safi & Singh, 2023", title: "A systematic literature review on phishing website detection techniques", venue: "J. King Saud Univ. – CIS 35", note: "80 studi terpilih; statistik teknik, dataset, dan algoritma." },
      { id: "vaitkevicius", cite: "Vaitkevicius & Marcinkevicius, 2020", title: "Comparison of Classification Algorithms for Detection of Phishing Websites", venue: "Informatica 31(1)", note: "Membandingkan 8 klasifikator; ensemble dan neural network unggul." },
      { id: "orunsolu", cite: "Orunsolu dkk., 2022", title: "A predictive model for phishing detection", venue: "J. King Saud Univ. – CIS 34", note: "Fitur URL, properti, dan perilaku halaman; NB dan SVM." },
      { id: "leonika", cite: "Leonika & Nagarajan, 2025", title: "Phishing Attack Detection on Websites Using Machine Learning", venue: "Journal of Soft Computing Paradigm 7(2)", note: "Hibrida BPNN + XGBoost." },
      { id: "raj", cite: "Raj dkk., 2026", title: "Phishing Website Detection using ML", venue: "IJERT 15(5)", note: "Ekstraksi fitur URL, domain, dan konten." },
      { id: "kehkashan", cite: "Kehkashan dkk., 2025", title: "Explainable phishing website detection for secure and sustainable cyber infrastructure", venue: "Scientific Reports", note: "Feature selection dengan SHAP untuk interpretabilitas." },
    ],
  },

  /* ───────────────────────── 02 BRUTE FORCE ───────────────────────── */
  {
    id: "bruteforce",
    no: "02",
    name: "Brute Force",
    vector: "CREDENTIAL GUESSING",
    tagline: "Mencoba kombinasi terus-menerus sampai ada yang cocok.",
    accent: "#ffb020",
    accentDark: "#d48c00",
    iconBg: "#2b2110",
    intro: [
      "Serangan brute force mencoba kombinasi username dan password secara sistematis sampai menemukan yang benar. Prinsipnya sederhana dan andal, sehingga sangat sering dipakai untuk membobol kredensial akun, perangkat, maupun layanan jaringan.",
      "Targetnya bisa formulir login web, layanan jaringan seperti SSH, FTP, dan Remote Desktop, maupun basis data hash password yang bocor. Pelaku jarang meninggalkan jejak yang jelas, sehingga pencatatan log menjadi kunci.",
    ],
    howItWorks: {
      heading: "Variasi serangan password",
      items: [
        { title: "Brute force murni", body: "Alat otomatis mencoba semua kombinasi karakter. Boros sumber daya, tetapi efektif untuk password pendek atau lemah.", tag: "ALL COMBINATIONS" },
        { title: "Dictionary attack", body: "Memakai daftar kata dan password umum atau variasinya, lalu mencoba satu per satu.", tag: "WORDLIST" },
        { title: "Hybrid attack", body: "Menggabungkan wordlist dengan aturan pembentukan password untuk mempercepat tebakan.", tag: "WORDLIST + RULES" },
        { title: "Password spraying", body: "Satu atau beberapa password umum dicoba ke banyak akun, sehingga tidak memicu kunci akun per pengguna.", tag: "MANY ACCOUNTS" },
        { title: "Credential stuffing", body: "Kredensial yang bocor dari satu layanan dicoba di layanan lain karena banyak orang memakai ulang password.", tag: "REUSED" },
        { title: "Rainbow table", body: "Tabel hash yang dihitung lebih dulu untuk memulihkan password dari hash. Melemah jika hash diberi salt.", tag: "OFFLINE" },
      ],
    },
    signs: {
      heading: "Tanda yang terlihat di log",
      items: [
        "Banyak percobaan login gagal beruntun dari satu IP atau rentang IP.",
        "Lonjakan koneksi ke port SSH, FTP, atau Remote Desktop dalam waktu singkat.",
        "Login berhasil yang datang dari IP asing setelah rentetan kegagalan (di Windows: Event ID 4624 dengan Logon Type 10 untuk akses remote desktop).",
        "Pola waktu yang teratur dan terlalu cepat untuk manusia.",
        "Akses ke akun administrator pada jam tidak lazim.",
      ],
    },
    defense: {
      heading: "Pertahanan",
      items: [
        { title: "Password kuat dan panjang", body: "Gunakan password sepanjang yang diizinkan sistem. Terutama untuk akses jarak jauh seperti Remote Desktop." },
        { title: "Tutup layanan yang tidak dipakai", body: "Jika port Remote Desktop tidak diperlukan, nonaktifkan. Jika diperlukan, batasi IP yang boleh mengakses." },
        { title: "Perbarui perangkat lunak", body: "Pakai versi asli dan terbaru, serta antivirus yang dikenal baik." },
        { title: "Blokir berdasarkan log", body: "Kumpulkan log akses (misalnya dari router), beri bobot pada pola akses, lalu masukkan IP penyerang ke blacklist." },
        { title: "Deteksi dengan IDS berbasis deep learning", body: "Model ANN, CNN, RNN, dan LSTM dilatih pada lalu lintas jaringan untuk mengenali pola brute force." },
      ],
    },
    research: {
      heading: "Temuan dari paper",
      intro: "Sebagian besar hasil di bawah memakai dataset CSE-CIC-IDS2018. Akurasi sangat tinggi di dataset belum tentu berlaku di jaringan nyata.",
      facts: [
        { value: "99,995%", label: "akurasi CNN pada deteksi brute force (CSE-CICIDS2018)", src: "awadh" },
        { value: "99,99%", label: "akurasi LSTM pada dataset yang sama", src: "awadh" },
        { value: "9,94 dtk", label: "waktu uji CNN, yang tercepat dengan hasil terbaik", src: "awadh" },
        { value: "99,9%", label: "akurasi ANN untuk brute force SSH dan FTP (F-score 98,3%)", src: "alotibi" },
        { value: "100%", label: "presisi model ANN pada FTP/SSH; recall 98%", src: "alotibi" },
      ],
    },
    takeaways: [
      "Studi kasus nyata (Kara, 2019) menunjukkan serangan tidak selalu dimulai dari brute force: pelaku lebih dulu mengirim email penipuan ke seorang pejabat dengan lampiran berbahaya, lalu melakukan akses jarak jauh.",
      "Analisis forensik memakai log keamanan Windows untuk menemukan IP penyerang dan waktu akses.",
      "Deteksi log-based di router adalah lapisan murah yang bisa menghentikan serangan SSH sebelum mencapai server.",
    ],
    sources: [
      { id: "kara", cite: "Kara, 2019", title: "Detection, Technical Analysis of Brute Force Attack", venue: "Sakarya Univ. J. Computer and Information Sciences 2(2)", note: "Analisis serangan brute force nyata terhadap komputer seorang pejabat." },
      { id: "park", cite: "Park dkk., 2021", title: "Network Log-Based SSH Brute-Force Attack Detection Model", venue: "Computers, Materials & Continua", note: "Model deteksi SSH brute force dari log router dan kontrol akses IP." },
      { id: "alotibi", cite: "Alotibi & Alshammari, 2023", title: "Deep Learning-based Intrusion Detection: A Novel Approach for Identifying Brute-Force Attacks on FTP and SSH Protocol", venue: "IJACSA 14(6)", note: "ANN pada CSE-CIC-IDS2018." },
      { id: "awadh", cite: "Awadh dkk., 2025", title: "A Robust Framework for Detecting Brute-Force Attacks through Deep Learning Techniques", venue: "IJRTE 13(5)", note: "Perbandingan ANN, CNN, RNN, dan LSTM." },
    ],
  },

  /* ───────────────────────── 03 SQL INJECTION ───────────────────────── */
  {
    id: "sqli",
    no: "03",
    name: "SQL Injection",
    vector: "INPUT VALIDATION",
    tagline: "Input pengguna berubah menjadi perintah database.",
    accent: "#a78bfa",
    accentDark: "#7c5bd6",
    iconBg: "#211e33",
    intro: [
      "SQL injection (SQLIA) terjadi ketika aplikasi menyusun query SQL dari input pengguna tanpa validasi yang benar, sehingga penyerang bisa menyisipkan perintah SQL sendiri. Istilah ini sudah dikenal sejak akhir 1990-an dan masih relevan.",
      "Dampaknya mencakup tiga aspek keamanan sekaligus: kerahasiaan (data dibaca), integritas (data diubah atau dihapus), dan ketersediaan (layanan terganggu). Akibatnya bisa berupa kerugian finansial, reputasi, dan sanksi regulasi.",
    ],
    howItWorks: {
      heading: "Jenis serangan (taksonomi klasik)",
      items: [
        { title: "Tautology", body: "Kondisi query dibuat selalu benar sehingga pengecekan login atau filter data terlewati.", tag: "MANIPULATION" },
        { title: "Logically incorrect query", body: "Query sengaja dibuat salah agar pesan error database membocorkan struktur tabel atau kolom.", tag: "ERROR-BASED" },
        { title: "Union query", body: "Query sah digabung dengan query lain untuk mengambil data dari tabel yang tidak dimaksudkan.", tag: "UNION" },
        { title: "Piggy-backed query", body: "Perintah tambahan disambungkan setelah query asli agar ikut dieksekusi.", tag: "STACKED" },
        { title: "Stored procedure", body: "Memanggil prosedur bawaan database untuk mendapat informasi atau menjalankan fungsi tertentu.", tag: "FUNCTION CALL" },
        { title: "Alternate encoding", body: "Payload disamarkan dengan encoding (hex, ASCII, Unicode) agar lolos filter sederhana.", tag: "EVASION" },
        { title: "Blind injection", body: "Aplikasi tidak menampilkan error, tetapi penyerang menyimpulkan data dari perbedaan respons.", tag: "INFERENCE" },
      ],
    },
    signs: {
      heading: "Tanda kerentanan dan serangan",
      items: [
        "Query dibentuk dengan menyambung string dari input pengguna.",
        "Pesan error database tampil utuh ke pengguna.",
        "Input mengandung tanda kutip, komentar SQL, atau kata kunci seperti UNION dan SELECT.",
        "Respons aplikasi berubah tidak wajar terhadap input yang aneh.",
        "Akun database aplikasi memiliki hak akses terlalu luas.",
      ],
    },
    defense: {
      heading: "Pertahanan",
      items: [
        { title: "Query berparameter (prepared statement)", body: "Pisahkan kode SQL dari data. Input diperlakukan sebagai nilai, bukan sebagai bagian perintah." },
        { title: "Validasi dan sanitasi input", body: "Terapkan validasi di sisi server dengan aturan yang ketat. Praktik coding yang benar sangat menentukan." },
        { title: "Analisis statis dan dinamis", body: "Analisis statis mencari kode rawan sebelum rilis, sedangkan pemindaian dinamis menguji aplikasi yang berjalan." },
        { title: "Hak akses minimum dan patch", body: "Batasi hak akun database aplikasi, sembunyikan detail error, dan pasang patch server secara rutin." },
        { title: "Deteksi dengan machine learning", body: "Blacklist dan aturan statis gagal menghadapi variasi input, sehingga model ML dipakai untuk memprediksi query berbahaya." },
      ],
    },
    research: {
      heading: "Temuan dari paper",
      intro: "Nilai F1 dan akurasi berasal dari dataset yang berbeda di tiap studi.",
      facts: [
        { value: "99,30%", label: "akurasi ensemble (SVM, NN, discriminant, RF) pada deteksi SQLi", src: "sirmulla" },
        { value: "95,11%", label: "akurasi SVM tunggal pada studi yang sama", src: "sirmulla" },
        { value: "99,57%", label: "F1 pendekatan hibrida, tertinggi di studi Demilie & Deriba", src: "demilie" },
        { value: "88,11%", label: "F1 Naive Bayes, terendah di antara metode yang diuji", src: "demilie" },
        { value: "99,35%", label: "F1 ANN, dibandingkan 97,58% untuk SVM", src: "demilie" },
      ],
    },
    takeaways: [
      "Belum ada satu solusi yang mampu mencegah atau mendeteksi semua jenis SQLi.",
      "Pendekatan hibrida (ANN + SVM) paling akurat, tetapi waktu uji-nya jauh lebih lama. Ada trade-off antara akurasi dan kecepatan.",
      "SQLi termasuk kategori injection di OWASP Top 10. Pencegahan paling efektif tetap ada di kode aplikasi.",
    ],
    sources: [
      { id: "kausar", cite: "Kausar dkk., 2019", title: "SQL Injection Detection and Prevention Techniques in ASP.NET Web Application", venue: "IJRTE 8(3)", note: "Dampak SQLIA dan teknik pencegahan pada aplikasi ASP.NET." },
      { id: "raghuvanshi", cite: "Raghuvanshi & Dixit, 2014", title: "Prevention and Detection Techniques for SQL Injection Attacks", venue: "IJCTT 12(3)", note: "Jenis serangan SQLi serta teknik deteksi statis dan dinamis." },
      { id: "sirmulla", cite: "Sirmulla & Prabhakar, 2023", title: "A Supervised Ensemble Learning-Based Approach to Mitigate SQL Injection Attack on Smart City Data", venue: "IJETT 71(11)", note: "Ensemble classifier untuk deteksi query berbahaya." },
      { id: "demilie", cite: "Demilie & Deriba, 2022", title: "Detection and prevention of SQLI attacks and developing compressive framework using machine learning and hybrid techniques", venue: "Journal of Big Data 9:124", note: "Perbandingan NB, DT, SVM, RF, LR, MLP, dan hibrida." },
    ],
  },

  /* ───────────────────────── 04 AUTHENTICATION ───────────────────────── */
  {
    id: "auth",
    no: "04",
    name: "Authentication Attack",
    vector: "IDENTITY & SESSION",
    tagline: "Menyerang cara sistem memastikan siapa penggunanya.",
    accent: "#34d399",
    accentDark: "#1fa87a",
    iconBg: "#132620",
    intro: [
      "Autentikasi memverifikasi identitas pengguna sebelum memberi akses. Password masih menjadi cara paling umum karena murah dan mudah diterapkan, tetapi juga menjadi titik terlemah: bisa ditebak, dicuri lewat phishing, atau bocor dari penyimpanan yang tidak aman.",
      "Serangan modern semakin menargetkan sesi yang sudah terautentikasi, bukan hanya password. Karena itu fokus pertahanan bergeser ke autentikasi tanpa password dan tahan phishing seperti passkey (FIDO2).",
    ],
    howItWorks: {
      heading: "Titik lemah dan vektor serangan",
      items: [
        { title: "Penyimpanan password lemah", body: "Password disimpan plaintext, memakai hash usang seperti MD5 atau SHA-1, atau tanpa salt, sehingga mudah dipulihkan jika database bocor.", tag: "STORAGE" },
        { title: "Kebijakan password lemah", body: "Tanpa syarat panjang dan keberagaman karakter, password mudah ditebak lewat brute force atau dictionary.", tag: "POLICY" },
        { title: "Pembajakan sesi dan bypass MFA", body: "Phishing relay mencuri token sesi setelah korban lolos MFA, sehingga penyerang masuk tanpa mengetahui password.", tag: "SESSION" },
        { title: "Serangan terhadap passkey", body: "Dua skenario yang dikaji: authenticator yang terinfeksi (kunci diketahui penyerang) dan authenticator deception (situs dipalsukan lewat sertifikat yang dipasang di browser).", tag: "FIDO2" },
        { title: "Serangan terhadap biometrik", body: "Similarity-based attack memanfaatkan skor kecocokan untuk merekonstruksi fitur biometrik yang mendekati milik korban.", tag: "BIOMETRIC" },
      ],
    },
    signs: {
      heading: "Tanda yang perlu dipantau",
      items: [
        "Login berhasil dari perangkat atau lokasi baru tepat setelah korban mengeklik tautan email.",
        "Token sesi dipakai dari alamat berbeda dengan tempat login awal.",
        "Lonjakan permintaan reset password.",
        "Banyak akun gagal login dengan password yang sama (password spraying).",
        "Perubahan metode MFA atau perangkat tepercaya tanpa permintaan pengguna.",
      ],
    },
    defense: {
      heading: "Pertahanan",
      items: [
        { title: "Passkey / WebAuthn / FIDO2", body: "Kunci privat tetap di perangkat pengguna dan server hanya menyimpan kunci publik. Login berupa tanda tangan atas challenge, sehingga tidak ada password untuk dicuri." },
        { title: "MFA tahan phishing", body: "Password ditambah faktor yang bisa direlay masih rentan. Kontrol seperti itu sebaiknya dianggap transisi, bukan perlindungan penuh." },
        { title: "Lindungi token sesi", body: "Gunakan masa berlaku singkat, rotasi dan pencabutan, cookie yang aman, serta autentikasi ulang untuk aksi sensitif." },
        { title: "Penyimpanan password yang benar", body: "Pakai hash modern dengan salt, kebijakan password kuat, dan password manager." },
        { title: "Pantau lintas lapisan", body: "Gabungkan log identity provider, endpoint, browser, token, dan aktivitas aplikasi dalam satu telemetri." },
        { title: "Desain pencocokan biometrik", body: "Skor berbentuk rasio (bukan jarak Hamming) membuat similarity-based attack tidak efektif pada fingerprint dan wajah di studi yang dilakukan." },
      ],
    },
    research: {
      heading: "Temuan dari paper",
      intro: "Bagian ini memuat angka dari studi akademik dan laporan adopsi enterprise yang konteksnya berbeda.",
      facts: [
        { value: "890.000+", label: "serangan phishing dilaporkan APWG pada Q3 2025", src: "berladskyy" },
        { value: "~70%", label: "karyawan terdaftar Windows Hello/FIDO2 di deployment Microsoft terpilih (2022)", src: "qureshi" },
        { value: "~90%", label: "penurunan permintaan reset password pada deployment tersebut", src: "qureshi" },
        { value: "3 dari 7", label: "tahap rantai kompromi yang terlihat di dataset phishing dan intrusi publik", src: "basanta" },
        { value: "0,972", label: "F1 Random Forest pada dataset UCI Phishing Websites (11.055 data)", src: "basanta" },
      ],
    },
    takeaways: [
      "Klaim bahwa passkey tahan phishing sebagian besar terbukti: serangan yang berhasil membutuhkan usaha dan sumber daya jauh lebih besar dibanding serangan pada password.",
      "Dataset publik memiliki celah: tidak memuat tantangan MFA, penerbitan cookie sesi, pencurian dan replay token. Skor klasifikasi tinggi belum membuktikan deteksi pembajakan sesi.",
      "Hambatan adopsi passwordless: interoperabilitas, biaya perangkat, regulasi, dan kepercayaan pengguna.",
    ],
    sources: [
      { id: "berladskyy", cite: "Berladskyy & Aßmuth, 2026", title: "An Analysis of Attack Vectors Against FIDO2 Authentication", venue: "arXiv:2604.20826", note: "Alur passkey dan dua serangan: Infected Authenticator dan Authenticator Deception." },
      { id: "basanta", cite: "Basanta dkk., 2026", title: "The Erosion of Password-Based Authentication Security: A Data-Driven Evaluation of Phishing-Based Session Hijacking and MFA Bypass Techniques", venue: "IJRSI 13(7)", note: "Evaluasi dataset dan audit observabilitas rantai kompromi." },
      { id: "qureshi", cite: "Qureshi, 2026", title: "Measuring Adoption and Security Impact of Passwordless Authentication in Large-Scale Identity Systems", venue: "Int. J. Intelligence Science 16(3)", note: "Adopsi, dampak, dan tantangan autentikasi tanpa password." },
      { id: "reddy", cite: "Reddy & Neetha, 2024", title: "Analysis on Password Attacks and its Prevention", venue: "IJRPR 5(3)", note: "Kategori serangan password, kelemahan penyimpanan, dan kebijakan." },
      { id: "belguechi", cite: "Belguechi & Rosenberger, 2025", title: "Mitigate authentication attack risk on cancelable biometrics by leveraging attacker knowledge", venue: "EURASIP J. Information Security", note: "Mitigasi similarity-based attack pada biometrik yang dapat dibatalkan." },
    ],
  },
];