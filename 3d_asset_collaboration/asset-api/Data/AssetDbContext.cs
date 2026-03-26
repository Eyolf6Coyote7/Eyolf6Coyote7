using asset_api.Models;
using Microsoft.EntityFrameworkCore;

namespace asset_api.Data;

public class AssetDbContext : DbContext
{
    public AssetDbContext(DbContextOptions<AssetDbContext> options) : base(options) { }

    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<AssetVersion> AssetVersions => Set<AssetVersion>();
    public DbSet<AssetTag> AssetTags => Set<AssetTag>();
    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Asset>(e =>
        {
            e.HasKey(a => a.Id);
            e.HasOne(a => a.Brand).WithMany(b => b.Assets).HasForeignKey(a => a.BrandId);
            e.HasOne(a => a.Creator).WithMany().HasForeignKey(a => a.CreatedBy);
        });

        modelBuilder.Entity<AssetVersion>(e =>
        {
            e.HasKey(v => v.Id);
            e.HasOne(v => v.Asset).WithMany(a => a.Versions).HasForeignKey(v => v.AssetId);
        });

        modelBuilder.Entity<AssetTag>(e =>
        {
            e.HasKey(t => t.Id);
            e.HasOne(t => t.Asset).WithMany(a => a.Tags).HasForeignKey(t => t.AssetId);
        });

        modelBuilder.Entity<Brand>().HasKey(b => b.Id);
        modelBuilder.Entity<User>().HasKey(u => u.Id);
    }
}
