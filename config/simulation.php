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
    | Skor minimum pada level sebelumnya untuk membuka level berikutnya.
    |--------------------------------------------------------------------------
    */
    'level_unlock_threshold' => 15,

    /*
    |--------------------------------------------------------------------------
    | Poin per pilihan jawaban floor. Nilai maksimum dipakai sebagai
    | max_points per floor.
    |--------------------------------------------------------------------------
    */
    'choice_points' => [
        'safe' => 4,
        'neutral' => 1,
        'risky' => -2,
    ],

    /*
    |--------------------------------------------------------------------------
    | Poin per pilihan untuk floor tertentu (menimpa choice_points global).
    | Struktur: simulationId -> levelNumber -> floorNumber -> choiceId => poin.
    | Nilai ini HARUS sinkron dengan `points` di file konten TS
    | resources/js/features/simulation/data/{sim}/level-{l}/floor-{n}.ts
    | (dicegah test FloorContentSyncTest).
    | Floor yang tidak dicantumkan di sini memakai choice_points global.
    |--------------------------------------------------------------------------
    */
    'floor_choice_points' => [
        'phishing' => [
            1 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -4],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -6],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -4],
                5 => ['safe' => 4, 'neutral' => 0, 'risky' => -5],
            ],
            2 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => -3],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -4],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -4],
                4 => ['safe' => 4, 'neutral' => 0, 'risky' => -4],
                5 => ['safe' => 4, 'neutral' => 0, 'risky' => -5],
            ],
            3 => [
                1 => ['safe' => 4, 'neutral' => -1, 'risky' => -3],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -4],
                4 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                6 => ['safe' => 2, 'neutral' => 1, 'risky' => -5],
            ],
            4 => [
                1 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                2 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                3 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                4 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                6 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                7 => ['safe' => 2, 'neutral' => -2, 'risky' => -4],
            ],
        ],
        'bruteforce' => [
            1 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                5 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
            ],
            2 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                5 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
            ],
            3 => [
                1 => ['safe' => 4, 'neutral' => -1, 'risky' => -3],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => -2, 'risky' => -3],
                4 => ['safe' => 3, 'neutral' => 1, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                6 => ['safe' => 2, 'neutral' => 1, 'risky' => -5],
            ],
            4 => [
                1 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                2 => ['safe' => 3, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 3, 'neutral' => 1, 'risky' => -3],
                4 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                6 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                7 => ['safe' => 2, 'neutral' => -2, 'risky' => -4],
            ],
        ],
        'sqli' => [
            1 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => 0],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                5 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
            ],
            2 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => 0],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                5 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
            ],
            3 => [
                1 => ['safe' => 4, 'neutral' => -2, 'risky' => -3],
                2 => ['safe' => 4, 'neutral' => 0, 'risky' => -4],
                3 => ['safe' => 4, 'neutral' => -1, 'risky' => -3],
                4 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                6 => ['safe' => 2, 'neutral' => 1, 'risky' => -5],
            ],
            4 => [
                1 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                2 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                3 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                4 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => -1, 'risky' => -4],
                6 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                7 => ['safe' => 2, 'neutral' => -2, 'risky' => -3],
            ],
        ],
        'auth' => [
            1 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                5 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
            ],
            2 => [
                1 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                3 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                4 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
                5 => ['safe' => 4, 'neutral' => 1, 'risky' => -2],
            ],
            3 => [
                1 => ['safe' => 4, 'neutral' => -1, 'risky' => -3],
                2 => ['safe' => 4, 'neutral' => 1, 'risky' => -4],
                3 => ['safe' => 4, 'neutral' => -1, 'risky' => -2],
                4 => ['safe' => 3, 'neutral' => -2, 'risky' => -3],
                5 => ['safe' => 3, 'neutral' => 1, 'risky' => -4],
                6 => ['safe' => 2, 'neutral' => 1, 'risky' => -5],
            ],
            4 => [
                1 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                2 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                3 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                4 => ['safe' => 3, 'neutral' => -1, 'risky' => -2],
                5 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                6 => ['safe' => 3, 'neutral' => -1, 'risky' => -3],
                7 => ['safe' => 2, 'neutral' => -2, 'risky' => -4],
            ],
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
