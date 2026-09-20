<?php

namespace Tests\Feature;

use Tests\TestCase;

class PagesTest extends TestCase
{
    public function test_landing_page_renders(): void
    {
        $this->get(route('landing'))
            ->assertOk()
            ->assertSee('Skenario Edukasi Keamanan Siber')
            ->assertSee('Phishing Detection Lab');
    }

    public function test_dashboard_page_renders(): void
    {
        $this->get(route('dashboard'))
            ->assertOk()
            ->assertSee('Skenario Pembelajaran')
            ->assertSee('67%');
    }
}
