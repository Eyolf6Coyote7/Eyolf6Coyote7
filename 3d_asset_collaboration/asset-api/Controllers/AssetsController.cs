using asset_api.Data;
using asset_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace asset_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    private readonly AssetDbContext _db;

    public AssetsController(AssetDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var assets = await _db.Assets
            .Include(a => a.Tags)
            .OrderByDescending(a => a.UpdatedAt)
            .ToListAsync();
        return Ok(assets);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var asset = await _db.Assets
            .Include(a => a.Versions)
            .Include(a => a.Tags)
            .FirstOrDefaultAsync(a => a.Id == id);
        return asset is null ? NotFound() : Ok(asset);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Asset asset)
    {
        asset.Id = Guid.NewGuid();
        asset.CreatedAt = DateTime.UtcNow;
        asset.UpdatedAt = DateTime.UtcNow;
        _db.Assets.Add(asset);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = asset.Id }, asset);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var asset = await _db.Assets.FindAsync(id);
        if (asset is null) return NotFound();
        _db.Assets.Remove(asset);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
