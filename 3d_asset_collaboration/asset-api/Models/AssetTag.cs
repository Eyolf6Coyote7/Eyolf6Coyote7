namespace asset_api.Models;

public class AssetTag
{
    public Guid Id { get; set; }
    public Guid AssetId { get; set; }
    public string Tag { get; set; } = string.Empty;
    public string Source { get; set; } = "manual"; // manual | ai

    public Asset? Asset { get; set; }
}
