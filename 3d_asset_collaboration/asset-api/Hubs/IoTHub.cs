using Microsoft.AspNetCore.SignalR;

namespace asset_api.Hubs;

public class IoTHub : Hub
{
    public async Task SendSensorUpdate(string sensorId, object data)
    {
        await Clients.All.SendAsync("SensorUpdate", sensorId, data);
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }
}
