<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected array $validPayload = [
        'callsign' => 'hex_shadow',
        'email' => 'operator@kampus.ac.id',
        'password' => 'white-hat-2026!',
        'password_confirmation' => 'white-hat-2026!',
        'ethics_pact' => '1',
    ];

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
        $response->assertSee('Registrasi Operator Baru');
        $response->assertSee('csrf', false); // form punya token CSRF
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', $this->validPayload);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();

        $user = User::where('email', 'operator@kampus.ac.id')->first();
        $this->assertNotNull($user);
        $this->assertSame('hex_shadow', $user->callsign);
        $this->assertSame('hex_shadow', $user->name);
        // Password tersimpan sebagai hash bcrypt, bukan plaintext
        $this->assertNotSame('white-hat-2026!', $user->password);
        $this->assertTrue(Hash::check('white-hat-2026!', $user->password));
    }

    public function test_registration_rejects_short_callsign(): void
    {
        $response = $this->post('/register', array_merge($this->validPayload, ['callsign' => 'ab']));

        $response->assertSessionHasErrors('callsign');
        $this->assertGuest();
    }

    public function test_registration_rejects_duplicate_email(): void
    {
        User::factory()->create(['email' => 'operator@kampus.ac.id']);

        $response = $this->post('/register', $this->validPayload);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_registration_rejects_duplicate_callsign(): void
    {
        User::factory()->create(['callsign' => 'hex_shadow']);

        $response = $this->post('/register', $this->validPayload);

        $response->assertSessionHasErrors('callsign');
        $this->assertGuest();
    }

    public function test_registration_requires_password_confirmation(): void
    {
        $response = $this->post('/register', array_merge($this->validPayload, [
            'password_confirmation' => 'berbeda-sekali-123',
        ]));

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }

    public function test_registration_requires_min_12_char_password(): void
    {
        $response = $this->post('/register', array_merge($this->validPayload, [
            'password' => 'pendek123',
            'password_confirmation' => 'pendek123',
        ]));

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }

    public function test_registration_requires_ethics_pact_accepted(): void
    {
        $payload = $this->validPayload;
        unset($payload['ethics_pact']);

        $response = $this->post('/register', $payload);

        $response->assertSessionHasErrors('ethics_pact');
        $this->assertGuest();
    }

    public function test_authenticated_users_are_redirected_from_register(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/register');

        $response->assertRedirect(route('dashboard'));
    }
}
