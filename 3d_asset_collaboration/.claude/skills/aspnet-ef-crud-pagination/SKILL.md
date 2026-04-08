---
name: aspnet-ef-crud-pagination
description: Add an ASP.NET Core controller with EF Core CRUD endpoints, eager-loaded relations, GUID keys, and EF.Functions.ILike search. Single skill covers all asset-api controllers.
when_to_use:
  - add a new REST endpoint to `asset-api` (ASP.NET Core)
  - add CRUD for a new EF Core entity
  - mentions `[ApiController]`, `AssetDbContext`, `EF.Functions.ILike`, `Include`, `Guid`, `FromBody
  - expose a new database table via REST
tech_stack:
  - aspnet-core
  - csharp
  - ef-core
  - postgres
  - ef-functions-ilike
harness: be
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add a new REST endpoint to `asset-api` (ASP.NET Core)
- add CRUD for a new EF Core entity
- mentions `[ApiController]`, `AssetDbContext`, `EF.Functions.ILike`, `Include`, `Guid`, `FromBody`
- expose a new database table via REST

This skill is intentionally CONVERGED — one skill covers GET / POST / DELETE / SEARCH across ALL asset-api controllers. Per slide thesis: backend collapses into high-coverage skills.

## Context

`asset-api` is ASP.NET Core 8 + EF Core (Postgres). The canonical files:

- `asset-api/Controllers/AssetsController.cs:1-56` — full CRUD with GUID keys, `Include` for eager-loaded relations, `OrderByDescending`, `CreatedAtAction` for 201 responses
- `asset-api/Controllers/SearchController.cs:1-30` — search endpoint using `EF.Functions.ILike` with PostgreSQL pattern matching across multiple columns + tag join
- `asset-api/Data/AssetDbContext.cs:1-40` — DbContext with `DbSet<T>` per entity + `OnModelCreating` Fluent API for relations (`HasOne(...).WithMany(...).HasForeignKey(...)`)
- `asset-api/Models/Asset.cs` — entity with `Guid Id`, `DateTime CreatedAt/UpdatedAt`, navigation properties

Conventions:
1. **`[Route("api/v1/[controller]")]`** — versioned API base path. Controller name minus "Controller" becomes the slug.
2. **GUID keys** — every entity has `Guid Id { get; set; }`. Routes use `{id:guid}` constraint to reject non-GUID.
3. **Eager loading via `Include`** — when returning a single asset, `Include(a => a.Versions).Include(a => a.Tags)`. When returning a list, `Include(a => a.Tags)` only.
4. **Sort order** — `OrderByDescending(a => a.UpdatedAt)` is the default sort. NEVER return unsorted.
5. **Search** — uses `EF.Functions.ILike(column, $"%{query}%")` for case-insensitive PostgreSQL pattern match. Combines with `.Where(a => ... || a.Tags.Any(t => ...))` for cross-table search.
6. **POST returns 201** via `CreatedAtAction(nameof(Get), new { id = entity.Id }, entity)` — never plain `Ok(entity)` for creates.
7. **DELETE returns 204** via `NoContent()`.
8. **No DTOs** — controllers return EF entities directly. EF navigation properties get JSON-serialized.
9. **No service layer** — controllers inject `AssetDbContext` directly via primary constructor (`public XxxController(AssetDbContext db) => _db = db;`).

## Operating instructions

When adding `Foo` CRUD:

1. Create `Models/Foo.cs` as a class with `public Guid Id { get; set; }`, `public string Name { get; set; }`, `public DateTime CreatedAt { get; set; }`, `public DateTime UpdatedAt { get; set; }`. Add navigation properties for relations.
2. Open `Data/AssetDbContext.cs`. Add `public DbSet<Foo> Foos => Set<Foo>();` and an `OnModelCreating` block defining the key + relations via Fluent API.
3. Create `Controllers/FoosController.cs` with `[ApiController] [Route("api/v1/[controller]")]` attributes.
4. Inject DbContext via primary constructor: `public FoosController(AssetDbContext db) => _db = db;`.
5. Implement `[HttpGet] GetAll()`, `[HttpGet("{id:guid}")] Get(Guid id)`, `[HttpPost] Create([FromBody] Foo foo)`, `[HttpDelete("{id:guid}")] Delete(Guid id)`.
6. In `GetAll`, use `Include` for any relations needed in list view + `OrderByDescending(f => f.UpdatedAt)`.
7. In `Get(Guid id)`, eager-load EVERYTHING the detail view needs.
8. In `Create`, set `Id = Guid.NewGuid()`, `CreatedAt = DateTime.UtcNow`, `UpdatedAt = DateTime.UtcNow` BEFORE adding. Return `CreatedAtAction(nameof(Get), new { id }, entity)`.
9. Add a Flyway / EF migration for the new table.
10. NO DTO. NO AutoMapper. NO service layer. NO repository.

## Reusable prompts / code patterns

Full controller (copy + rename Model + relations):
```csharp
using asset_api.Data;
using asset_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace asset_api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class FoosController : ControllerBase
{
    private readonly AssetDbContext _db;

    public FoosController(AssetDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var foos = await _db.Foos
            .Include(f => f.Tags)
            .OrderByDescending(f => f.UpdatedAt)
            .ToListAsync();
        return Ok(foos);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var foo = await _db.Foos
            .Include(f => f.Children)
            .Include(f => f.Tags)
            .FirstOrDefaultAsync(f => f.Id == id);
        return foo is null ? NotFound() : Ok(foo);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Foo foo)
    {
        foo.Id = Guid.NewGuid();
        foo.CreatedAt = DateTime.UtcNow;
        foo.UpdatedAt = DateTime.UtcNow;
        _db.Foos.Add(foo);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = foo.Id }, foo);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var foo = await _db.Foos.FindAsync(id);
        if (foo is null) return NotFound();
        _db.Foos.Remove(foo);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
```

Search endpoint pattern (PostgreSQL ILike):
```csharp
[HttpGet("search")]
public async Task<IActionResult> Search([FromQuery] string q = "")
{
    if (string.IsNullOrWhiteSpace(q))
        return Ok(Array.Empty<object>());

    var results = await _db.Foos
        .Include(f => f.Tags)
        .Where(f => EF.Functions.ILike(f.Name, $"%{q}%")
                 || f.Tags.Any(t => EF.Functions.ILike(t.Tag, $"%{q}%")))
        .OrderByDescending(f => f.UpdatedAt)
        .ToListAsync();

    return Ok(results);
}
```

DbContext entity registration:
```csharp
public DbSet<Foo> Foos => Set<Foo>();

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Foo>(e =>
    {
        e.HasKey(f => f.Id);
        e.HasOne(f => f.Brand).WithMany(b => b.Foos).HasForeignKey(f => f.BrandId);
        e.HasMany(f => f.Tags).WithOne(t => t.Foo).HasForeignKey(t => t.FooId);
    });
}
```

## Anti-patterns

- Do NOT introduce DTOs or AutoMapper — controllers return EF entities directly.
- Do NOT use `int` IDs — always `Guid`.
- Do NOT skip `Include` — without it, navigation properties serialize as null.
- Do NOT return `Ok(entity)` for POST — use `CreatedAtAction(nameof(Get), ...)` for proper 201 + Location header.
- Do NOT use `LIKE` — use `EF.Functions.ILike` for case-insensitive search on PostgreSQL.
- Do NOT add a service layer / repository / unit-of-work — direct DbContext injection is the convention.
- Do NOT use `async void` — always `Task<IActionResult>`.
- Do NOT skip `await _db.SaveChangesAsync()` after mutations.

## References

- `asset-api/Controllers/AssetsController.cs:1-56` — full CRUD canonical
- `asset-api/Controllers/SearchController.cs:15-29` — ILike search pattern
- `asset-api/Data/AssetDbContext.cs:1-40` — DbContext with Fluent API
- `asset-api/Models/Asset.cs` — entity with GUID + nav properties
- `asset-api/Program.cs` — Kestrel + EF Core registration
