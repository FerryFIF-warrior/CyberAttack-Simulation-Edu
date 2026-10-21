<?php

namespace Database\Factories;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChatMessage>
 */
class ChatMessageFactory extends Factory
{
    protected $model = ChatMessage::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_id' => ChatSession::factory(),
            'role' => 'user',
            'message' => fake()->sentence(),
            'source_refs' => null,
            'feedback' => null,
        ];
    }

    public function assistant(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'assistant',
        ]);
    }
}
