using Confluent.Kafka;
using Npgsql;

namespace IoTConsumer;

public class SensorDataConsumer : BackgroundService
{
    private readonly ILogger<SensorDataConsumer> _logger;
    private readonly IConfiguration _config;

    public SensorDataConsumer(ILogger<SensorDataConsumer> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var kafkaConfig = new ConsumerConfig
        {
            BootstrapServers = _config["Kafka:BootstrapServers"] ?? "localhost:9096",
            GroupId = "iot-consumer",
            AutoOffsetReset = AutoOffsetReset.Earliest,
        };

        using var consumer = new ConsumerBuilder<string, string>(kafkaConfig).Build();
        consumer.Subscribe("asset3d.iot-sensor-data");

        _logger.LogInformation("IoT Consumer started, listening on asset3d.iot-sensor-data");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var result = consumer.Consume(TimeSpan.FromSeconds(1));
                if (result == null) continue;

                _logger.LogInformation("Received sensor data: {Key} = {Value}", result.Message.Key, result.Message.Value);
                await StoreSensorReading(result.Message.Key, result.Message.Value, stoppingToken);
            }
            catch (ConsumeException ex)
            {
                _logger.LogError(ex, "Kafka consume error");
            }
        }
    }

    private async Task StoreSensorReading(string deviceId, string value, CancellationToken ct)
    {
        var connStr = _config["ConnectionStrings:TimescaleDB"] ?? "Host=localhost;Port=5435;Database=asset3d_iot;Username=asset3d;Password=asset3d_dev";

        await using var conn = new NpgsqlConnection(connStr);
        await conn.OpenAsync(ct);

        await using var cmd = new NpgsqlCommand(
            "INSERT INTO sensor_readings (time, device_id, value, unit) VALUES (NOW(), @deviceId, @value, 'celsius')",
            conn);
        cmd.Parameters.AddWithValue("deviceId", deviceId);
        cmd.Parameters.AddWithValue("value", double.TryParse(value, out var v) ? v : 0.0);

        await cmd.ExecuteNonQueryAsync(ct);
        _logger.LogDebug("Stored reading for device {DeviceId}", deviceId);
    }
}
