<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'callsign', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Ambang XP kumulatif untuk naik level.
     *
     * @var array<int, int>
     */
    private const LEVEL_XP = [0, 150, 400, 800, 1400, 2200, 3200];

    /**
     * Peringkat untuk tiap level.
     *
     * @var array<int, string>
     */
    private const RANKS = [
        1 => 'Agen Pemula',
        2 => 'Analis Junior',
        3 => 'Detektif Siber',
        4 => 'Spesialis Pertahanan',
        5 => 'White-Hat Operative',
        6 => 'Elite Defender',
        7 => 'Master White-Hat',
    ];

    /**
     * Propagasi pemain: XP, level, peringkat, dan badge.
     *
     * XP dihitung dari total skor seluruh simulasi. Jika belum ada progres
     * nyata, kembalikan nilai awal yang jujur (0 XP tanpa badge).
     *
     * @return array{level: int, xp: int, xpForLevel: int, xpNextLevel: int, percentToNext: int, rank: string, badges: array<int, string>}
     */
    public function progression(): array
    {
        /** @var Collection<int, SimulationProgress> $rows */
        $rows = $this->simulationProgress()->get();

        if ($rows->isNotEmpty()) {
            $xp = (int) $rows->sum(fn (SimulationProgress $row) => (int) ($row->progress_data['total_score'] ?? 0));
            $badges = collect($rows->pluck('progress_data.earned_badges'))
                ->flatten()
                ->filter()
                ->unique()
                ->values()
                ->all();
        } else {
            $xp = 0;
            $badges = [];
        }

        $level = 1;
        foreach (self::LEVEL_XP as $index => $threshold) {
            if ($xp >= $threshold) {
                $level = $index + 1;
            } else {
                break;
            }
        }
        $level = min($level, count(self::LEVEL_XP));

        $xpForLevel = self::LEVEL_XP[$level - 1];
        $xpNextLevel = self::LEVEL_XP[$level] ?? $xpForLevel + 250;
        $percentToNext = $xpNextLevel > $xpForLevel
            ? (int) round(($xp - $xpForLevel) / ($xpNextLevel - $xpForLevel) * 100)
            : 100;

        return [
            'level' => $level,
            'xp' => $xp,
            'xpForLevel' => $xpForLevel,
            'xpNextLevel' => $xpNextLevel,
            'percentToNext' => max(0, min(100, $percentToNext)),
            'rank' => self::RANKS[$level] ?? 'Agen Pemula',
            'badges' => $badges,
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function simulationProgress(): HasMany
    {
        return $this->hasMany(SimulationProgress::class);
    }
}
