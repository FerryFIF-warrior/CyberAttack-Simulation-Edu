<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SimulationLog extends Model
{
    /**
     * Log hanya menyimpan waktu dibuat (append-only), tanpa updated_at.
     */
    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'simulation_id',
        'level_number',
        'floor_number',
        'event',
        'choice_id',
        'points',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'level_number' => 'integer',
            'floor_number' => 'integer',
            'points' => 'integer',
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Bentuk payload log untuk API dan halaman Inertia.
     *
     * @return array<string, mixed>
     */
    public function toLogArray(): array
    {
        return [
            'id' => $this->id,
            'simulation_id' => $this->simulation_id,
            'level_number' => $this->level_number,
            'floor_number' => $this->floor_number,
            'event' => $this->event,
            'choice_id' => $this->choice_id,
            'points' => $this->points,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
