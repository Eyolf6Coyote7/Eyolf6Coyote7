<?php

namespace Database\Factories;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuditLogFactory extends Factory
{
    protected $model = AuditLog::class;

    public function definition(): array
    {
        return [
            'user_id' => fake()->uuid(),
            'action' => fake()->randomElement(['Created', 'Updated', 'Deleted', 'Approved', 'Rejected']),
            'entity_type' => fake()->randomElement(['User', 'Workflow', 'Template']),
            'entity_id' => fake()->numberBetween(1, 100),
            'details' => ['note' => fake()->sentence()],
        ];
    }
}
