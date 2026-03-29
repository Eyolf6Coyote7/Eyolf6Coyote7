<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'details',
    ];

    protected function casts(): array
    {
        return [
            'details' => 'array',
        ];
    }

    /**
     * user_id stores a UUID from Keycloak/JPA users table.
     * No FK constraint since the users table uses UUID primary keys.
     */
    public function getUserIdAttribute($value): ?string
    {
        return $value;
    }
}
