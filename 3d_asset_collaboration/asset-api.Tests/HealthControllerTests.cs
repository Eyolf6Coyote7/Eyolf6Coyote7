using asset_api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace asset_api.Tests;

public class HealthControllerTests
{
    [Fact]
    public void Get_ReturnsHealthyStatus()
    {
        var controller = new HealthController();

        var result = controller.Get();

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }
}
