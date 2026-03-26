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
    var allowedOrigins = new[] { "http://localhost:3003", "http://localhost:4013" };
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins).AllowAnyMethod().AllowAnyHeader();
    });
    options.AddPolicy("SignalR", policy =>
    {
        policy.WithOrigins(allowedOrigins).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});

// Health checks
builder.Services.AddHealthChecks();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapControllers();
app.MapHealthChecks("/healthz");

app.MapHub<AssetHub>("/hubs/assets").RequireCors("SignalR");
app.MapHub<IoTHub>("/hubs/iot").RequireCors("SignalR");

app.Run();
