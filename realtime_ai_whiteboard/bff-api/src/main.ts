import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: (
      process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:8081"
    ).split(","),
  });

  const port = process.env.PORT || 4001;
  await app.listen(port);
  logger.log(`Whiteboard BFF running on http://localhost:${port}`);
}
void bootstrap();
