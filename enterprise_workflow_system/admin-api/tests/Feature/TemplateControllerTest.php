<?php

namespace Tests\Feature;

use App\Models\WorkflowTemplate;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TemplateControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_paginated_templates(): void
    {
        WorkflowTemplate::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/templates');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'current_page']);
    }

    public function test_store_creates_template(): void
    {
        $response = $this->postJson('/api/v1/templates', [
            'name' => 'Expense Approval',
            'description' => 'Standard expense workflow',
            'schema' => ['steps' => ['submit', 'review', 'approve']],
            'is_active' => true,
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Expense Approval']);
    }

    public function test_store_validates_name_required(): void
    {
        $response = $this->postJson('/api/v1/templates', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }
}
