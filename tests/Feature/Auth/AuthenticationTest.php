<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function createOperator(): User
    {
        return User::factory()->create([
            'callsign' => 'hex_shadow',
            'email' => 'operator@kampus.ac.id',
            'password' => 'white-hat-2026!', // di-hash otomatis via cast 'hashed'
        ]);
    }

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertSee('Masuk Terminal White-Hat');
        $response->assertSee('csrf', false);
    }

    public function test_users_can_authenticate_with_email(): void
    {
        $this->createOperator();

        $response = $this->post('/login', [
            'identifier' => 'operator@kampus.ac.id',
            'password' => 'white-hat-2026!',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
    }

    public function test_users_can_authenticate_with_callsign(): void
    {
        $this->createOperator();

        $response = $this->post('/login', [
            'identifier' => 'hex_shadow',
            'password' => 'white-hat-2026!',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $this->createOperator();

        $response = $this->post('/login', [
            'identifier' => 'operator@kampus.ac.id',
            'password' => 'passkey-salah-123',
        ]);

        $response->assertSessionHasErrors('identifier');
        $this->assertGuest();
    }

    public function test_users_can_not_authenticate_with_unknown_identifier(): void
    {
        $response = $this->post('/login', [
            'identifier' => 'ghost_operator',
            'password' => 'white-hat-2026!',
        ]);

        $response->assertSessionHasErrors('identifier');
        $this->assertGuest();
    }

    public function test_guests_are_redirected_from_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_are_redirected_from_login(): void
    {
        $user = $this->createOperator();

        $response = $this->actingAs($user)->get('/login');

        $response->assertRedirect(route('dashboard'));
    }

    public function test_dashboard_shows_operator_callsign(): void
    {
        $user = $this->createOperator();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertSee('hex_shadow');
    }

    public function test_users_can_logout(): void
    {
        $user = $this->createOperator();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect(route('login'));
        $this->assertGuest();
    }
}
