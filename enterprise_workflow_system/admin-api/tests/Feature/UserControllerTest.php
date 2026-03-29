<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_paginated_users(): void
    {
        User::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/users');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'current_page', 'per_page']);
    }

    public function test_store_creates_user_with_valid_data(): void
    {
        $response = $this->postJson('/api/v1/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'role' => 'editor',
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Test User']);

        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_store_validates_required_fields(): void
    {
        $response = $this->postJson('/api/v1/users', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_store_validates_email_unique(): void
    {
        User::factory()->create(['email' => 'taken@example.com']);

        $response = $this->postJson('/api/v1/users', [
            'name' => 'User',
            'email' => 'taken@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_store_validates_role_enum(): void
    {
        $response = $this->postJson('/api/v1/users', [
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => 'password123',
            'role' => 'superadmin',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['role']);
    }

    public function test_show_returns_user(): void
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/v1/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $user->id]);
    }

    public function test_show_returns_404_for_missing_user(): void
    {
        $response = $this->getJson('/api/v1/users/9999');

        $response->assertStatus(404);
    }

    public function test_update_modifies_user(): void
    {
        $user = User::factory()->create();

        $response = $this->putJson("/api/v1/users/{$user->id}", [
            'name' => 'Updated Name',
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Name']);
    }

    public function test_destroy_deletes_user(): void
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/v1/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'User deleted']);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
