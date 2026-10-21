<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    use HasFactory;

    /**
     * Pesan hanya menyimpan waktu dibuat, tanpa updated_at.
     */
    public const UPDATED_AT = null;

    protected $fillable = [
        'session_id',
        'role',
        'message',
        'source_refs',
        'feedback',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'source_refs' => 'array',
            'feedback' => 'integer',
            'created_at' => 'datetime',
        ];
    }

    public function session(): BelongsTo
    {
        return $this->belongsTo(ChatSession::class, 'session_id');
    }

    /**
     * @return array<string, mixed>
     */
    public function toChatArray(): array
    {
        return [
            'id' => $this->id,
            'role' => $this->role,
            'message' => $this->message,
            'source_refs' => $this->source_refs ?? [],
            'feedback' => $this->feedback,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
