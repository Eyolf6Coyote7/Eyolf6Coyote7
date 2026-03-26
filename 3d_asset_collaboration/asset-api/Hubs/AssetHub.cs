using Microsoft.AspNetCore.SignalR;

namespace asset_api.Hubs;

public class AssetHub : Hub
{
    public async Task NotifyAssetCreated(string assetId, string name)
    {
        await Clients.All.SendAsync("AssetCreated", assetId, name);
    }

    public async Task NotifyAssetUpdated(string assetId)
    {
        await Clients.All.SendAsync("AssetUpdated", assetId);
    }

    public async Task JoinAssetRoom(string assetId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, assetId);
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }
}
