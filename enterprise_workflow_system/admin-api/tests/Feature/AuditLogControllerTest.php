<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuditLogControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_paginated_audit_log(): void
    {
        AuditLog::factory()->count(5)->create();

        $response = $this->getJson('/api/audit-log');

        $response->assertStatus(200)
            ->assertJsonStructure(['data', 'current_page']);
    }

    public function test_index_filters_by_action(): void
    {
        AuditLog::factory()->create(['action' => 'Created']);
        AuditLog::factory()->create(['action' => 'Deleted']);

        $response = $this->getJson('/api/audit-log?action=Created');

        $response->assertStatus(200);
        $data = $response->json('data');
        foreach ($data as $entry) {
            $this->assertEquals('Created', $entry['action']);
        }
    }

    public function test_index_filters_by_entity_type(): void
    {
        AuditLog::factory()->create(['entity_type' => 'User']);
        AuditLog::factory()->create(['entity_type' => 'Workflow']);

        $response = $this->getJson('/api/audit-log?entity_type=User');

        $response->assertStatus(200);
    }
}
