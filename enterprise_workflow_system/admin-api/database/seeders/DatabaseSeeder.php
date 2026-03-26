<?php

namespace Database\Seeders;

use App\Models\AuditLog;
use App\Models\User;
use App\Models\WorkflowTemplate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed 10 users
        $roles = ['admin', 'editor', 'viewer'];
        $users = [];

        for ($i = 1; $i <= 10; $i++) {
            $users[] = User::create([
                'name' => "User {$i}",
                'email' => "user{$i}@example.com",
                'password' => Hash::make('password'),
                'role' => $roles[array_rand($roles)],
            ]);
        }

        // Seed 5 workflow templates
        $templates = [
            ['name' => 'Employee Onboarding', 'description' => 'New hire onboarding workflow'],
            ['name' => 'Expense Approval', 'description' => 'Expense report approval chain'],
            ['name' => 'Leave Request', 'description' => 'PTO and leave request workflow'],
            ['name' => 'Document Review', 'description' => 'Document review and sign-off'],
            ['name' => 'Incident Report', 'description' => 'Incident reporting and resolution'],
        ];

        foreach ($templates as $t) {
            WorkflowTemplate::create([
                'name' => $t['name'],
                'description' => $t['description'],
                'schema' => ['steps' => [['name' => 'Start'], ['name' => 'Review'], ['name' => 'Complete']]],
                'is_active' => true,
            ]);
        }

        // Seed 20 audit log entries
        $actions = ['create', 'update', 'delete', 'login', 'logout'];
        $entities = ['User', 'WorkflowTemplate', 'Config'];

        for ($i = 1; $i <= 20; $i++) {
            AuditLog::create([
                'user_id' => $users[array_rand($users)]->id,
                'action' => $actions[array_rand($actions)],
                'entity_type' => $entities[array_rand($entities)],
                'entity_id' => rand(1, 10),
                'details' => ['ip' => '127.0.0.1', 'note' => "Audit entry {$i}"],
            ]);
        }
    }
}
