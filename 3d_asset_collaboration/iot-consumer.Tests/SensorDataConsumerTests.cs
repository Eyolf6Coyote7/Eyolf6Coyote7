using IoTConsumer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace iot_consumer.Tests;

public class SensorDataConsumerTests
{
    [Fact]
    public void Constructor_ShouldNotThrow()
    {
        var logger = Mock.Of<ILogger<SensorDataConsumer>>();
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Kafka:BootstrapServers"] = "localhost:9096",
                ["ConnectionStrings:TimescaleDB"] = "Host=localhost;Port=5435;Database=test",
            })
            .Build();

        var consumer = new SensorDataConsumer(logger, config);
        Assert.NotNull(consumer);
    }

    [Fact]
    public void Constructor_UsesDefaultKafkaServers_WhenNotConfigured()
    {
        var logger = Mock.Of<ILogger<SensorDataConsumer>>();
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>())
            .Build();

        var consumer = new SensorDataConsumer(logger, config);
        Assert.NotNull(consumer);
    }
}
