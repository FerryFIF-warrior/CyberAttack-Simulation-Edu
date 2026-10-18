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

    public function test_attempt_rejects_floor_when_previous_floor_not_completed(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/2/attempt', [
            'choice_id' => 'safe',
        ])->assertStatus(403)
            ->assertJson([
                'success' => false,
                'code' => 'floor_locked',
                'required_floor' => 1,
            ]);

        $this->assertDatabaseMissing('simulation_progress', ['user_id' => $user->id]);
    }

    public function test_attempt_allows_next_floor_once_previous_completed(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->postJson('/api/simulations/phishing/levels/1/floors/2/attempt', [
            'choice_id' => 'neutral',
        ])->assertOk()
            ->assertJson([
                'success' => true,
                'floor_points' => 1,
                'level_score' => 5,
            ]);
    }

    public function test_attempt_unlocks_next_level_when_threshold_met(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        $this->assertTrue($progress['levels'][0]['completed']);
        $this->assertSame(20, $progress['levels'][0]['level_score']);
        $this->assertTrue($progress['levels'][1]['unlocked']);
        $this->assertSame(4, $progress['levels'][0]['floors'][0]['max_points']);
    }

    public function test_attempt_keeps_next_level_locked_below_threshold(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'risky',
            ])->assertOk();
        }

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        $this->assertTrue($progress['levels'][0]['completed']);
        $this->assertLessThan(15, $progress['levels'][0]['level_score']);
        $this->assertFalse($progress['levels'][1]['unlocked']);
    }

    public function test_attempt_unlocks_next_level_when_score_equals_threshold(): void
    {
        // Boundary inklusif: skor tepat sama dengan threshold harus membuka level berikutnya (>=)
        $this->app['config']->set('simulation.level_unlock_threshold', 20);

        $user = User::factory()->create();
        $this->actingAs($user);

        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        $this->assertSame(20, $progress['levels'][0]['level_score']);
        $this->assertTrue($progress['levels'][1]['unlocked']);
    }

    public function test_attempt_keeps_next_level_locked_when_score_just_below_threshold(): void
    {
        // Boundary: skor 17 (4+4+4+4+1) dengan threshold 20 harus tetap terkunci.
        // Pakai bruteforce karena poin netral per-floor-nya seragam (=1).
        $this->app['config']->set('simulation.level_unlock_threshold', 20);

        $user = User::factory()->create();
        $this->actingAs($user);

        foreach ([1, 2, 3, 4] as $floor) {
            $this->postJson("/api/simulations/bruteforce/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }
        $this->postJson('/api/simulations/bruteforce/levels/1/floors/5/attempt', [
            'choice_id' => 'neutral',
        ])->assertOk();

        $progress = $user->simulationProgress()->where('simulation_id', 'bruteforce')->first()->progress_data;

        $this->assertSame(17, $progress['levels'][0]['level_score']);
        $this->assertFalse($progress['levels'][1]['unlocked']);
    }

    public function test_badge_beginner_earned_when_levels_one_and_two_maxed(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Level 1 sempurna (20) → buka level 2
        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }

        // Level 2 sempurna (20) → badge beginner
        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/2/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        $this->assertSame(20, $progress['levels'][0]['level_score']);
        $this->assertSame(20, $progress['levels'][1]['level_score']);
        $this->assertContains('beginner', $progress['earned_badges']);
        // Suhu butuh SEMUA level max — level 3-5 belum dimainkan
        $this->assertNotContains('suhu', $progress['earned_badges']);
    }

    public function test_badge_not_earned_when_any_level_below_max(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Level 1 sempurna (20)
        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }

        // Level 2 hanya netral (5) — di bawah max 20
        foreach ([1, 2, 3, 4, 5] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/2/floors/{$floor}/attempt", [
                'choice_id' => 'neutral',
            ])->assertOk();
        }

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        $this->assertSame(20, $progress['levels'][0]['level_score']);
        $this->assertSame(5, $progress['levels'][1]['level_score']);
        $this->assertNotContains('beginner', $progress['earned_badges']);
        $this->assertNotContains('suhu', $progress['earned_badges']);
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
