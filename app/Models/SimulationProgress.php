<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SimulationProgress extends Model
{
    protected $fillable = [
        'user_id',
        'simulation_id',
        'progress_data',
    ];

    protected $casts = [
        'progress_data' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
