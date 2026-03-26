<?php

namespace App\Http\Controllers;

use App\Models\WorkflowTemplate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TemplateController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(WorkflowTemplate::paginate(20));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'schema' => 'sometimes|array',
            'is_active' => 'sometimes|boolean',
        ]);

        $template = WorkflowTemplate::create($validated);

        return response()->json($template, 201);
    }
}
