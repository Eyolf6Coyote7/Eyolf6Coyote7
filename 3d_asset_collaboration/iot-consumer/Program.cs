using IoTConsumer;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<SensorDataConsumer>();
builder.Services.AddHttpClient();

var host = builder.Build();
host.Run();
