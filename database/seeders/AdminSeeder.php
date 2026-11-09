<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASSWORD');

        if (! $email || ! $password) {
            $this->command?->error('ADMIN_EMAIL dan ADMIN_PASSWORD belum diisi di file .env');
            return;
        }

        // forceFill dipakai supaya tidak perlu mengubah $fillable di model User.
        $user = User::firstOrNew(['email' => $email]);
        $user->forceFill([
            'name' => env('ADMIN_NAME', 'Administrator'),
            'password' => Hash::make($password),
            'role' => 'admin',
            'email_verified_at' => now(),
        ])->save();

        $this->command?->info("Akun admin siap: {$email}");
    }
}
