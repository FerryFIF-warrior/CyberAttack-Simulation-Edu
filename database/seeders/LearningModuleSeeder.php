<?php

namespace Database\Seeders;

use App\Models\LearningModule;
use Illuminate\Database\Seeder;

class LearningModuleSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['Phishing', 'phishing', 'Menipu manusia, bukan menembus sistem.', 1],
            ['Brute Force', 'bruteforce', 'Mencoba kombinasi terus-menerus sampai ada yang cocok.', 2],
            ['SQL Injection', 'sqli', 'Input pengguna berubah menjadi perintah database.', 3],
            ['Authentication Attack', 'auth', 'Menyerang cara sistem memastikan siapa penggunanya.', 4],
        ];

        foreach ($rows as [$title, $type, $summary, $order]) {
            LearningModule::firstOrCreate(
                ['title' => $title],
                [
                    'attack_type' => $type,
                    'difficulty' => 'Beginner',
                    'summary' => $summary,
                    'sort_order' => $order,
                    'status' => 'published',
                ]
            );
        }
    }
}
