using asset_api.Controllers;
using asset_api.Data;
using asset_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace asset_api.Tests;

public class AssetsControllerTests : IDisposable
{
    private readonly AssetDbContext _db;
    private readonly AssetsController _controller;

    public AssetsControllerTests()
    {
        var options = new DbContextOptionsBuilder<AssetDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _db = new AssetDbContext(options);
        _controller = new AssetsController(_db);
    }

    [Fact]
    public async Task GetAll_ReturnsOkWithAssets()
    {
        _db.Assets.Add(new Asset { Id = Guid.NewGuid(), Name = "Robot", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow });
        await _db.SaveChangesAsync();

        var result = await _controller.GetAll();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var assets = Assert.IsAssignableFrom<IEnumerable<Asset>>(okResult.Value);
        Assert.Single(assets);
    }

    [Fact]
    public async Task Get_ReturnsAssetWhenFound()
    {
        var id = Guid.NewGuid();
        _db.Assets.Add(new Asset { Id = id, Name = "Test", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow });
        await _db.SaveChangesAsync();

        var result = await _controller.Get(id);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task Get_ReturnsNotFoundWhenMissing()
    {
        var result = await _controller.Get(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task Create_ReturnsCreatedAtAction()
    {
        var asset = new Asset { Name = "New Asset" };

        var result = await _controller.Create(asset);

        var created = Assert.IsType<CreatedAtActionResult>(result);
        var createdAsset = Assert.IsType<Asset>(created.Value);
        Assert.Equal("New Asset", createdAsset.Name);
        Assert.NotEqual(Guid.Empty, createdAsset.Id);
    }

    [Fact]
    public async Task Delete_ReturnsNoContentWhenFound()
    {
        var id = Guid.NewGuid();
        _db.Assets.Add(new Asset { Id = id, Name = "ToDelete", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow });
        await _db.SaveChangesAsync();

        var result = await _controller.Delete(id);

        Assert.IsType<NoContentResult>(result);
        Assert.Null(await _db.Assets.FindAsync(id));
    }

    [Fact]
    public async Task Delete_ReturnsNotFoundWhenMissing()
    {
        var result = await _controller.Delete(Guid.NewGuid());

        Assert.IsType<NotFoundResult>(result);
    }

    public void Dispose() => _db.Dispose();
}
