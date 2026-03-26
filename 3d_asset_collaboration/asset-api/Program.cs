using asset_api.Data;
using asset_api.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// EF Core + PostgreSQL
builder.Services.AddDbContext<AssetDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SignalR
builder.Services.AddSignalR();

// gRPC
builder.Services.AddGrpc();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
    options.AddPolicy("SignalR", policy =>
    {
        policy.SetIsOriginAllowed(_ => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});

// Health checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Swagger (all environments for now)
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

app.MapControllers();
app.MapHealthChecks("/healthz");

app.MapHub<AssetHub>("/hubs/assets").RequireCors("SignalR");
app.MapHub<IoTHub>("/hubs/iot").RequireCors("SignalR");

app.Run();
