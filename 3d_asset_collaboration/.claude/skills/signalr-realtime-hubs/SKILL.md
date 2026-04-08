---
name: signalr-realtime-hubs
description: Add a new SignalR Hub to asset-api with broadcast, room/group join, and lifecycle hooks. Single skill covers AssetHub + IoTHub patterns and any future hub.
when_to_use:
  - add a real-time push channel to `asset-api
  - broadcast events to all connected clients OR to a room of clients
  - mentions `Hub`, `Clients.All.SendAsync`, `Groups.AddToGroupAsync`, `OnConnectedAsync`, `SignalR
  - wire a frontend `useSignalR` listener to a backend event source
tech_stack:
  - aspnet-core
  - csharp
  - signalr
  - websocket
harness: be
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add a real-time push channel to `asset-api`
- broadcast events to all connected clients OR to a room of clients
- mentions `Hub`, `Clients.All.SendAsync`, `Groups.AddToGroupAsync`, `OnConnectedAsync`, `SignalR`
- wire a frontend `useSignalR` listener to a backend event source

This skill is intentionally CONVERGED — one skill covers ALL hub patterns (broadcast, group/room, lifecycle). Per slide thesis: backend collapses into high-coverage skills.

## Context

`asset-api` has TWO canonical hubs:

- `asset-api/Hubs/AssetHub.cs:1-26` — broadcasts asset lifecycle events (`AssetCreated`, `AssetUpdated`) AND supports per-asset rooms via `JoinAssetRoom(assetId)`
- `asset-api/Hubs/IoTHub.cs:1-16` — minimal sensor update broadcaster, single broadcast method

Conventions:
1. **Hub class** extends `Microsoft.AspNetCore.SignalR.Hub`. Public methods are callable from clients.
2. **Broadcast methods** call `Clients.All.SendAsync("EventName", arg1, arg2, ...)`. The event name is a string identifier the client subscribes to.
3. **Room/group methods** call `Groups.AddToGroupAsync(Context.ConnectionId, groupName)` then later `Clients.Group(groupName).SendAsync(...)`.
4. **Lifecycle hooks** override `OnConnectedAsync()` / `OnDisconnectedAsync(Exception?)` to log or dispatch lifecycle events.
5. **No DI ceremony** — simple hubs don't inject services. If a hub needs to write to the DB, inject `AssetDbContext` via primary constructor (`public FooHub(AssetDbContext db) => _db = db;`).
6. **Hub mapping** — registered in `Program.cs` with `app.MapHub<AssetHub>("/hubs/asset")` AFTER `app.UseRouting()`.
7. **Frontend** consumes via `@microsoft/signalr` `HubConnectionBuilder().withUrl("/hubs/asset").build()` then `connection.on("AssetCreated", (id, name) => { ... })`.

## Operating instructions

When adding a new hub `FooHub`:

1. Create `Hubs/FooHub.cs` extending `Hub`.
2. Add public methods for each client-callable action. Each method awaits an `async Task`.
3. For broadcast: `await Clients.All.SendAsync("FooEvent", arg1, arg2)`.
4. For room push: first `await Groups.AddToGroupAsync(Context.ConnectionId, roomKey)` from a `JoinFooRoom(string roomKey)` method, then later push via `Clients.Group(roomKey).SendAsync(...)`.
5. Override `OnConnectedAsync` if you need per-connection state.
6. Open `Program.cs` and add `app.MapHub<FooHub>("/hubs/foo")` after `app.UseRouting()`.
7. Make sure SignalR is registered: `builder.Services.AddSignalR()` in the service registration block.
8. Frontend hook (separate file under `asset-portal/src/hooks/`): `useSignalR` builds a connection, attaches `.on(...)` listeners in `useEffect`, returns the connection. Always `connection.stop()` in cleanup.

## Reusable prompts / code patterns

Broadcast-only hub:
```csharp
using Microsoft.AspNetCore.SignalR;

namespace asset_api.Hubs;

public class FooHub : Hub
{
    public async Task NotifyFooCreated(string fooId, string name)
    {
        await Clients.All.SendAsync("FooCreated", fooId, name);
    }

    public async Task NotifyFooUpdated(string fooId)
    {
        await Clients.All.SendAsync("FooUpdated", fooId);
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }
}
```

Hub with rooms (per-entity subscription):
```csharp
public class FooHub : Hub
{
    public async Task JoinFooRoom(string fooId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, fooId);
    }

    public async Task LeaveFooRoom(string fooId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, fooId);
    }

    public async Task NotifyRoom(string fooId, object payload)
    {
        await Clients.Group(fooId).SendAsync("FooRoomUpdate", payload);
    }
}
```

`Program.cs` registration:
```csharp
builder.Services.AddSignalR();
// ...
var app = builder.Build();
// ...
app.UseRouting();
app.MapHub<AssetHub>("/hubs/asset");
app.MapHub<IoTHub>("/hubs/iot");
app.MapHub<FooHub>("/hubs/foo");
```

Frontend `useSignalR` hook (asset-portal):
```ts
import { useEffect, useState } from "react";
import { HubConnectionBuilder, type HubConnection } from "@microsoft/signalr";

export function useSignalR(url: string, handlers: Record<string, (...args: unknown[]) => void>) {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const conn = new HubConnectionBuilder().withUrl(url).withAutomaticReconnect().build();
    Object.entries(handlers).forEach(([event, handler]) => conn.on(event, handler));
    conn.start().then(() => setConnection(conn));
    return () => {
      conn.stop();
    };
  }, [url]);

  return connection;
}
```

## Anti-patterns

- Do NOT use `Clients.All.SendAsync` from inside a tight loop — batch updates server-side or you flood every client.
- Do NOT skip `await` on `SendAsync` — it returns a Task and unawaited calls silently drop on disconnect.
- Do NOT broadcast PII payloads to `Clients.All` — use `Clients.Group(roomKey)` for scoped audiences.
- Do NOT hold per-connection state in instance fields — Hub is transient per call. Use `Context.ConnectionId` + a service for state.
- Do NOT skip `app.MapHub<>(...)` registration — the hub will compile but never be reachable.
- Do NOT call hub methods directly from controllers — inject `IHubContext<FooHub>` instead.

## References

- `asset-api/Hubs/AssetHub.cs:1-26` — broadcast + room pattern
- `asset-api/Hubs/IoTHub.cs:1-16` — minimal broadcast pattern
- `asset-api/Program.cs` — hub mapping registration
- `asset-portal/src/hooks/` — frontend `useSignalR` consumer location
