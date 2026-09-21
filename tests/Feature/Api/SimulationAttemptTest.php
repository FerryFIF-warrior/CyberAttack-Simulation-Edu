<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SimulationAttemptTest extends TestCase
{
    use RefreshDatabase;

    public function test_attempt_requires_authentication(): void
    {
        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertUnauthorized();
    }

    public function test_progress_requires_authentication(): void
    {
        $this->getJson('/api/me/simulation-progress')->assertUnauthorized();
    }

    public function test_attempt_saves_floor_completion(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk()
            ->assertJson([
                'success' => true,
                'floor_points' => 4,
                'level_completed' => false,
            ]);

        $this->assertDatabaseHas('simulation_progress', [
            'user_id' => $user->id,
            'simulation_id' => 'phishing',
        ]);

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first();
        $this->assertNotNull($progress);
        $this->assertSame(1, $progress->progress_data['completed_floor_count']);
        $this->assertSame(4, $progress->progress_data['levels'][0]['level_score']);
        $this->assertSame(4, $progress->progress_data['total_score']);
        $this->assertSame(3, $progress->progress_data['completion_percent']);
    }

    public function test_attempt_rejects_unknown_simulation(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/unknown-sim/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertNotFound();
    }

    public function test_attempt_rejects_invalid_choice(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'invalid',
        ])->assertUnprocessable();
    }

    public function test_attempt_rejects_floor_out_of_range(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/99/attempt', [
            'choice_id' => 'safe',
        ])->assertStatus(400);
    }

    public function test_attempt_rejects_locked_level(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/2/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertStatus(403);
    }

    public function test_progress_returns_attempted_simulations(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->getJson('/api/me/simulation-progress')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('progress.phishing.completed_floor_count', 1);
    }
}
