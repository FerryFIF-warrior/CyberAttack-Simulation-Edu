<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Katalog lab skenario simulasi (single source of truth).
    | Key larik = slug kanonik yang dipakai di route, API, dan frontend.
    |--------------------------------------------------------------------------
    */
    'labs' => [
        'phishing' => [
            'slug' => 'phishing',
            'code' => 'Modul 01',
            'category' => 'Social Engineering',
            'vector' => 'Social Engineering Vector',
            'lab_name' => 'Phishing Detection Lab',
            'lab_summary' => 'Pengenalan spoofed email & fake URL, deteksi indikator penipuan pada header, serta verifikasi header autentikasi pada analisis.',
            'lab_cta' => 'Buka Lab Phishing',
            'title' => 'Deteksi & Analisis Email Phishing',
            'summary' => 'Pelajari cara mengenali indikator manipulasi email palsu, menganalisis header pengirim, dan mengevaluasi URL tipuan secara aman.',
            'tags' => ['SPF/DKIM Inspection', 'URL Spoofing'],
            'roadmap' => 'Analisis Header & Evaluasi URL',
            'competency' => 'Phishing',
        ],
        'bruteforce' => [
            'slug' => 'bruteforce',
            'code' => 'Modul 02',
            'category' => 'Auth Security',
            'vector' => 'Authentication Vector',
            'lab_name' => 'Brute Force Defense Lab',
            'lab_summary' => 'Pemahaman pola lonjakan permintaan login otomatis, penelusuran log, serta penerapan konfigurasi rate limiting & lockout timer.',
            'lab_cta' => 'Buka Lab Brute Force',
            'title' => 'Pertahanan Serangan Brute Force',
            'summary' => 'Pahami pola lonjakan permintaan login otomatis pada log autentikasi dan terapkan mitigasi rate-limiting serta lockout timer.',
            'tags' => ['Rate Limiting', 'Log Telemetry'],
            'roadmap' => 'Log Telemetri & Rate-Limiting',
            'competency' => 'Brute Force',
        ],
        'sqli' => [
            'slug' => 'sqli',
            'code' => 'Modul 03',
            'category' => 'Web App Vulnerability',
            'vector' => 'Query Injection Vector',
            'lab_name' => 'SQL Injection Analysis Lab',
            'lab_summary' => 'Pemahaman input injection tanpa sanitasi data, analisis respon error database dummy, dan implementasi parameterized queries.',
            'lab_cta' => 'Buka Lab SQLi',
            'title' => 'Mitigasi SQL Injection Terpadu',
            'summary' => 'Pelajari cara kerja celah dinamis query tanpa sanitasi data dan terapkan teknik parameterized queries untuk melindungi database dummy.',
            'tags' => ['Query Sanitization', 'Prepared Statements'],
            'roadmap' => 'Parameterized Queries Mitigasi',
            'competency' => 'SQL Injection',
        ],
        'auth' => [
            'slug' => 'auth',
            'code' => 'Modul 04',
            'category' => 'Auth Security',
            'vector' => 'Authentication Vector',
            'lab_name' => 'Authentication Defense Lab',
            'lab_summary' => 'Pemahaman serangan autentikasi seperti credential stuffing & session hijacking, analisis log autentikasi, dan penerapan MFA serta kebijakan session aman.',
            'lab_cta' => 'Buka Lab Auth',
            'title' => 'Pertahanan Serangan Autentikasi',
            'summary' => 'Pelajari pola credential stuffing, brute force akun, dan pencurian session lalu terapkan MFA dan session hardening pada sandbox dummy.',
            'tags' => ['MFA Hardening', 'Session Security'],
            'roadmap' => 'MFA & Session Hardening',
            'competency' => 'Authentication',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Konfigurasi level per simulasi (5 level; floorCount & maxScore).
    |--------------------------------------------------------------------------
    */
    'levels' => [
        'phishing' => [
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 6, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
        ],
        'bruteforce' => [
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 6, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
        ],
        'sqli' => [
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 6, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
        ],
        'auth' => [
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 5, 'maxScore' => 20],
            ['floorCount' => 6, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
            ['floorCount' => 7, 'maxScore' => 20],
        ],
    ],
];
