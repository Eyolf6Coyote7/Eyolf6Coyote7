using asset_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace asset_api.Controllers;

[ApiController]
[Route("api/assets")]
public class SearchController : ControllerBase
{
    private readonly AssetDbContext _db;

    public SearchController(AssetDbContext db) => _db = db;

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string q = "")
    {
        if (string.IsNullOrWhiteSpace(q))
            return Ok(Array.Empty<object>());

        var results = await _db.Assets
            .Include(a => a.Tags)
            .Where(a => EF.Functions.ILike(a.Name, $"%{q}%")
                     || a.Tags.Any(t => EF.Functions.ILike(t.Tag, $"%{q}%")))
            .OrderByDescending(a => a.UpdatedAt)
            .ToListAsync();

        return Ok(results);
    }
}
