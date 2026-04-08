---
name: laravel-rest-crud-with-audit
description: Add a thin Laravel REST controller with paginate(20) + $request->validate() CRUD methods following the admin-api convention. Single skill covers all admin-api controllers.
when_to_use:
  - add a new REST endpoint to `admin-api` (Laravel)
  - add CRUD for a new admin entity (user / template / config / audit)
  - mentions `paginate(20)`, `request->validate`, `findOrFail`, `JsonResponse`, `App\Http\Controllers\
  - expose a new model via the admin REST surface
tech_stack:
  - laravel
  - php
  - eloquent
  - rest
harness: be
project: enterprise_workflow_system
---

## When to use

Trigger when the user asks to:
- add a new REST endpoint to `admin-api` (Laravel)
- add CRUD for a new admin entity (user / template / config / audit)
- mentions `paginate(20)`, `request->validate`, `findOrFail`, `JsonResponse`, `App\Http\Controllers\*`
- expose a new model via the admin REST surface

This skill is intentionally CONVERGED — one skill covers index / store / show / update / destroy across ALL admin-api controllers because they all follow the same recipe. Per slide thesis: backend collapses into high-coverage skills.

## Context

`admin-api` is Laravel 11 with thin controllers (no service layer, no form requests, no resources). The four canonical files:

- `admin-api/app/Http/Controllers/UserController.php:1-58` — full CRUD with `paginate(20)`, inline `$request->validate(...)`, `User::create($validated)`, `findOrFail($id)`, `update($validated)`, `delete()`
- `admin-api/app/Http/Controllers/TemplateController.php:1-30` — index + store only
- `admin-api/app/Http/Controllers/AuditLogController.php:1-30` — index with `latest()` + conditional `where(...)` filters from query string
- `admin-api/app/Http/Controllers/ConfigController.php` — config CRUD (similar shape)

Conventions:
1. **Thin controllers** — no service layer, no form request, no API resource. Validation lives inline as `$request->validate([...])`.
2. **Pagination** — `Model::paginate(20)`, never `all()` or unbounded queries.
3. **Filtering** — read query params via `$request->has('field')` + `$query->where('field', $request->input('field'))`. Chain conditions before pagination.
4. **JSON response** — return `response()->json($data)` or `response()->json($data, 201)` for creates. Status codes are explicit.
5. **Validation rules** — use Laravel's string DSL: `'required|string|max:255'`, `'required|email|unique:users'`, `'sometimes|string|in:admin,editor,viewer'`. For unique-on-update use `'sometimes|email|unique:users,email,'.$id`.
6. **Routes** declared in `routes/api.php` using `Route::apiResource('users', UserController::class)`.
7. **Models** are basic Eloquent models with `$fillable` arrays, no scopes / observers / events unless absolutely needed.

## Operating instructions

When adding `Foo` CRUD:

1. Create `app/Models/Foo.php` extending `Illuminate\Database\Eloquent\Model` with `protected $fillable = ['name', 'description', 'is_active']`.
2. Create database migration `database/migrations/<timestamp>_create_foos_table.php` with `id`, `name`, `description`, `is_active`, `timestamps`.
3. Create `app/Http/Controllers/FooController.php` extending `Illuminate\Routing\Controller`. Implement only the methods needed (`index`, `store`, `show`, `update`, `destroy`) — do NOT auto-generate stubs you won't fill.
4. Each method:
   - `index()`: `return response()->json(Foo::paginate(20));` (add filter chain if requested)
   - `store(Request $request)`: validate then `Foo::create($validated)`, return `201`
   - `show(int $id)`: `return response()->json(Foo::findOrFail($id));`
   - `update(Request $request, int $id)`: `findOrFail`, validate (use `sometimes|...`), `update($validated)`
   - `destroy(int $id)`: `findOrFail($id)->delete()`, return `200` with message
5. Add route in `routes/api.php`: `Route::apiResource('foos', FooController::class);`
6. NO service layer. NO form request. NO API resource. NO transformer. NO observer.
7. Add a `tests/Feature/FooControllerTest.php` mirroring existing feature tests.

## Reusable prompts / code patterns

Full CRUD controller (copy-paste, rename Model + validation rules):
```php
<?php

namespace App\Http\Controllers;

use App\Models\Foo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class FooController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Foo::paginate(20));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $foo = Foo::create($validated);

        return response()->json($foo, 201);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json(Foo::findOrFail($id));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $foo = Foo::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $foo->update($validated);

        return response()->json($foo);
    }

    public function destroy(int $id): JsonResponse
    {
        Foo::findOrFail($id)->delete();

        return response()->json(['message' => 'Foo deleted'], 200);
    }
}
```

Filterable index pattern (for audit-log style endpoints):
```php
public function index(Request $request): JsonResponse
{
    $query = Foo::latest();

    if ($request->has('status')) {
        $query->where('status', $request->input('status'));
    }

    if ($request->has('user_id')) {
        $query->where('user_id', $request->input('user_id'));
    }

    return response()->json($query->paginate(20));
}
```

## Anti-patterns

- Do NOT introduce a service layer / form request / API resource — the project is intentionally thin.
- Do NOT use `Model::all()` — always paginate.
- Do NOT use Laravel's policy system unless RBAC is explicitly requested.
- Do NOT extend `App\Http\Controllers\Controller` (the app's base) — extend `Illuminate\Routing\Controller` directly per the existing pattern.
- Do NOT manually map fields in `store()` / `update()` — pass `$validated` directly to `create()` / `update()`.
- Do NOT use `unique:users` without the ignore-current-id form on update — it will fail validation on no-op updates.

## References

- `admin-api/app/Http/Controllers/UserController.php:10-58` — full CRUD canonical pattern
- `admin-api/app/Http/Controllers/TemplateController.php:10-30` — minimal index + store
- `admin-api/app/Http/Controllers/AuditLogController.php:12-29` — filterable index
- `admin-api/app/Http/Controllers/ConfigController.php` — sibling controller
- `admin-api/routes/api.php` — route registration
