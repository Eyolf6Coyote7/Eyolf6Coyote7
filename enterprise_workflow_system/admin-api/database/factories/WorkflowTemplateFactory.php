<?php

namespace Database\Factories;

use App\Models\WorkflowTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkflowTemplateFactory extends Factory
{
    protected $model = WorkflowTemplate::class;

    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'schema' => ['steps' => ['submit', 'review', 'approve']],
            'is_active' => fake()->boolean(80),
        ];
    }
}
