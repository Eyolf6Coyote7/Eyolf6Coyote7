namespace asset_api.Models;

public class AssetVersion
{
    public Guid Id { get; set; }
    public Guid AssetId { get; set; }
    public int VersionNumber { get; set; }
    public string MinioObjectKey { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public Asset? Asset { get; set; }
}
