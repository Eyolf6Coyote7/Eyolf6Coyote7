<?php

namespace Tests\Unit;

use App\Models\AuditLog;
use PHPUnit\Framework\TestCase;

class AuditLogModelTest extends TestCase
{
    public function test_fillable_fields(): void
    {
        $log = new AuditLog();
        $fillable = $log->getFillable();

        $this->assertContains('user_id', $fillable);
        $this->assertContains('action', $fillable);
        $this->assertContains('entity_type', $fillable);
        $this->assertContains('entity_id', $fillable);
        $this->assertContains('details', $fillable);
    }

    public function test_casts(): void
    {
        $log = new AuditLog();
        $casts = $log->getCasts();

        $this->assertArrayHasKey('details', $casts);
        $this->assertEquals('array', $casts['details']);
    }
}
