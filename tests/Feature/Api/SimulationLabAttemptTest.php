<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SimulationLabAttemptTest extends TestCase
{
    use RefreshDatabase;

    private const SIMULATIONS = ['phishing', 'bruteforce', 'sqli', 'auth'];

    public function test_each_lab_level1_accepts_attempt_with_config_points(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            $user = User::factory()->create();
            $this->actingAs($user);

            $expected = config("simulation.floor_choice_points.{$simulationId}.1.1.risky");

            $this->postJson("/api/simulations/{$simulationId}/levels/1/floors/1/attempt", [
                'choice_id' => 'risky',
            ])->assertOk()
                ->assertJson([
                    'success' => true,
                    'floor_points' => $expected,
                    'level_completed' => false,
                ]);

            $this->assertDatabaseHas('simulation_progress', [
                'user_id' => $user->id,
                'simulation_id' => $simulationId,
            ]);
        }
    }

    public function test_each_lab_level1_completes_at_perfect_score_and_unlocks_level2(): void
    {
        foreach (self::SIMULATIONS as $simulationId) {
            $user = User::factory()->create();
            $this->actingAs($user);

            foreach ([1, 2, 3, 4, 5] as $floor) {
                $this->postJson("/api/simulations/{$simulationId}/levels/1/floors/{$floor}/attempt", [
                    'choice_id' => 'safe',
                ])->assertOk()
                    ->assertJson([
                        'success' => true,
                        'floor_points' => 4,
                    ]);
            }

            $progress = $user->simulationProgress()->where('simulation_id', $simulationId)->first()->progress_data;

            $this->assertTrue($progress['levels'][0]['completed'], "{$simulationId}: level 1 harus completed.");
            $this->assertSame(20, $progress['levels'][0]['level_score'], "{$simulationId}: skor perfect L1 harus 20.");
            $this->assertTrue($progress['levels'][1]['unlocked'], "{$simulationId}: level 2 harus terbuka.");
            $this->assertSame(20, $progress['total_score'], "{$simulationId}: total_score harus 20.");
        }
    }

    public function test_phishing_variable_points_are_recorded_from_floor_config(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Phishing floor 3 risky = -6 (paling berat), floor 2 risky = -4
        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'risky',
        ])->assertOk()->assertJson(['floor_points' => -2]);

        $this->postJson('/api/simulations/phishing/levels/1/floors/2/attempt', [
            'choice_id' => 'risky',
        ])->assertOk()->assertJson(['floor_points' => -4]);

        $this->postJson('/api/simulations/phishing/levels/1/floors/3/attempt', [
            'choice_id' => 'risky',
        ])->assertOk()->assertJson(['floor_points' => -6]);

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        // best_points tidak pernah negatif (max(0, floorPoints)), jadi skor level tetap 0
        $this->assertSame(0, $progress['levels'][0]['level_score']);
        $this->assertSame(0, $progress['levels'][0]['floors'][2]['best_points']);
        $this->assertFalse($progress['levels'][1]['unlocked']);
    }

    public function test_phishing_floor5_neutral_scores_zero(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        foreach ([1, 2, 3, 4] as $floor) {
            $this->postJson("/api/simulations/phishing/levels/1/floors/{$floor}/attempt", [
                'choice_id' => 'safe',
            ])->assertOk();
        }

        // Phishing floor 5 neutral = 0
        $this->postJson('/api/simulations/phishing/levels/1/floors/5/attempt', [
            'choice_id' => 'neutral',
        ])->assertOk()->assertJson(['floor_points' => 0]);

        $progress = $user->simulationProgress()->where('simulation_id', 'phishing')->first()->progress_data;

        $this->assertSame(16, $progress['levels'][0]['level_score']);
        $this->assertTrue($progress['levels'][0]['completed']);
        // 16 >= threshold 15 → level 2 tetap terbuka
        $this->assertTrue($progress['levels'][1]['unlocked']);
    }

    public function test_sqli_floor1_risky_scores_zero_not_negative(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/sqli/levels/1/floors/1/attempt', [
            'choice_id' => 'risky',
        ])->assertOk()->assertJson(['floor_points' => 0]);

        $progress = $user->simulationProgress()->where('simulation_id', 'sqli')->first()->progress_data;

        $this->assertSame(0, $progress['levels'][0]['floors'][0]['best_points']);
        $this->assertSame(4, $progress['levels'][0]['floors'][0]['max_points']);
    }
}
