<?php

return [
    /*
    |--------------------------------------------------------------------------
    | URL internal AI Service (Flask)
    |--------------------------------------------------------------------------
    |
    | Hanya dipakai server-side. Browser tidak pernah memanggil endpoint Flask
    | dan GROQ_API_KEY tetap berada di .env AI Service.
    |
    */
    'url' => env('AI_SERVICE_URL', 'http://127.0.0.1:8001'),

    'timeout' => (int) env('AI_SERVICE_TIMEOUT', 8),

    /*
    |--------------------------------------------------------------------------
    | Administrator Knowledge Base
    |--------------------------------------------------------------------------
    |
    | Daftar email dipisahkan koma. RBAC admin tidak menambah tabel baru;
    | nilai kosong berarti tidak ada yang dapat membuka halaman admin.
    |
    */
    'admin_emails' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('AI_ADMIN_EMAILS', '')),
    ))),
];
