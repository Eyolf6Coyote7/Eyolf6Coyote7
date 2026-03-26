namespace asset_api.Models;

public class Brand
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string MinioBucket { get; set; } = string.Empty;

    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}
