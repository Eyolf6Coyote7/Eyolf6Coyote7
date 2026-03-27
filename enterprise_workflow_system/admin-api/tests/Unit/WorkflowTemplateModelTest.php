<?php

namespace Tests\Unit;

use App\Models\WorkflowTemplate;
use PHPUnit\Framework\TestCase;

class WorkflowTemplateModelTest extends TestCase
{
    public function test_fillable_fields(): void
    {
        $template = new WorkflowTemplate();
        $fillable = $template->getFillable();

        $this->assertContains('name', $fillable);
        $this->assertContains('description', $fillable);
        $this->assertContains('schema', $fillable);
        $this->assertContains('is_active', $fillable);
    }

    public function test_casts(): void
    {
        $template = new WorkflowTemplate();
        $casts = $template->getCasts();

        $this->assertArrayHasKey('schema', $casts);
        $this->assertEquals('array', $casts['schema']);
        $this->assertArrayHasKey('is_active', $casts);
        $this->assertEquals('boolean', $casts['is_active']);
    }
}
