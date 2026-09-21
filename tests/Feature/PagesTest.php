<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_page_renders(): void
    {
        $this->get(route('landing'))
            ->assertOk()
            ->assertSee('Skenario Edukasi Keamanan Siber')
            ->assertSee('Phishing Detection Lab');
    }

    public function test_dashboard_page_renders(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('dashboard'))
            ->assertOk()
            ->assertSee('Skenario Pembelajaran')
            ->assertSee('50%');
    }

    public function test_guests_are_redirected_from_simulasi_page(): void
    {
        $this->get(route('simulasi.index'))->assertRedirect(route('login'));
        $this->get(route('simulasi.detail', ['simulation' => 'phishing']))->assertRedirect(route('login'));
    }

    public function test_unknown_simulation_slug_returns_404(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/simulasi/unknown')
            ->assertNotFound();

        $this->actingAs(User::factory()->create())
            ->get('/simulasi/unknown/level/1')
            ->assertNotFound();

        $this->actingAs(User::factory()->create())
            ->get('/simulasi/unknown/level/1/floor/1')
            ->assertNotFound();
    }

    public function test_authenticated_user_can_open_simulasi_index(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('simulasi.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Simulations/Index'));
    }

    public function test_authenticated_user_can_open_simulasi_detail(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('simulasi.detail', ['simulation' => 'phishing']))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Simulation/Detail')
                ->where('simulationId', 'phishing')
                ->where('levels.0.level', 1)
                ->where('levels.0.unlocked', true));
    }

    public function test_authenticated_user_can_open_level_detail(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('simulasi.level.detail', ['simulation' => 'phishing', 'level' => 1]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Simulation/LevelDetail')
                ->where('level', 1)
                ->where('unlocked', true)
                ->has('floors', 5));
    }

    public function test_authenticated_user_can_open_floor_play(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('simulasi.floor.play', ['simulation' => 'phishing', 'level' => 1, 'floor' => 1]))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Simulation/Play'));
    }
}
