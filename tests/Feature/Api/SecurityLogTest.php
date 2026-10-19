<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityLogTest extends TestCase
{
    use RefreshDatabase;

    public function test_security_logs_endpoint_requires_authentication(): void
    {
        $this->getJson('/api/me/security-logs')->assertUnauthorized();
    }

    public function test_attempt_creates_security_log(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->assertDatabaseHas('simulation_logs', [
            'user_id' => $user->id,
            'simulation_id' => 'phishing',
            'level_number' => 1,
            'floor_number' => 1,
            'event' => 'floor_attempt',
            'choice_id' => 'safe',
            'points' => 4,
        ]);
    }

    public function test_locked_floor_attempt_does_not_create_log(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/2/attempt', [
            'choice_id' => 'safe',
        ])->assertStatus(403);

        $this->assertDatabaseCount('simulation_logs', 0);
    }

    public function test_invalid_choice_does_not_create_log(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'invalid',
        ])->assertUnprocessable();

        $this->assertDatabaseCount('simulation_logs', 0);
    }

    public function test_security_logs_only_returns_own_logs(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($owner);
        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->actingAs($other);
        $this->postJson('/api/simulations/bruteforce/levels/1/floors/1/attempt', [
            'choice_id' => 'neutral',
        ])->assertOk();

        $response = $this->getJson('/api/me/security-logs')->assertOk();

        $this->assertCount(1, $response->json('logs'));
        $this->assertSame('bruteforce', $response->json('logs.0.simulation_id'));
    }

    public function test_security_logs_returns_newest_first(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->postJson('/api/simulations/phishing/levels/1/floors/2/attempt', [
            'choice_id' => 'neutral',
        ])->assertOk();

        $response = $this->getJson('/api/me/security-logs')->assertOk();

        $this->assertSame(2, $response->json('logs.0.floor_number'));
        $this->assertSame(1, $response->json('logs.1.floor_number'));
    }

    public function test_security_logs_can_be_filtered_by_simulation(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->postJson('/api/simulations/bruteforce/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $response = $this->getJson('/api/me/security-logs?simulation_id=bruteforce')->assertOk();

        $this->assertCount(1, $response->json('logs'));
        $this->assertSame('bruteforce', $response->json('logs.0.simulation_id'));
    }

    public function test_security_log_page_requires_authentication(): void
    {
        $this->get('/security-log')->assertRedirect('/login');
    }

    public function test_security_log_page_lists_user_logs(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->postJson('/api/simulations/phishing/levels/1/floors/1/attempt', [
            'choice_id' => 'safe',
        ])->assertOk();

        $this->get('/security-log')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('SecurityLog/Index')
                ->has('logs', 1)
                ->where('logs.0.simulation_id', 'phishing')
            );
    }
}
