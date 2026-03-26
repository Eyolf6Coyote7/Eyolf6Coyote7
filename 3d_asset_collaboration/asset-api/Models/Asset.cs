namespace asset_api.Models;

public class Asset
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Format { get; set; } = string.Empty;
    public int CurrentVersion { get; set; } = 1;
    public Guid BrandId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Brand? Brand { get; set; }
    public User? Creator { get; set; }
    public ICollection<AssetVersion> Versions { get; set; } = new List<AssetVersion>();
    public ICollection<AssetTag> Tags { get; set; } = new List<AssetTag>();
}
