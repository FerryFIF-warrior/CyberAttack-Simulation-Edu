<?php

namespace App\Support;

/**
 * Katalog skenario lab (data dummy).
 * Nanti bisa diganti Eloquent model (Lab + LabProgress) tanpa mengubah view.
 */
class LabCatalog
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public static function all(): array
    {
        return [
            [
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
            [
                'slug' => 'brute-force',
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
            [
                'slug' => 'sql-injection',
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
        ];
    }
}
