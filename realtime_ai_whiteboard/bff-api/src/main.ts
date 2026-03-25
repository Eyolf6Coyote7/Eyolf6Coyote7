import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8081'],
  });
  await app.listen(process.env.PORT || 4001);
  console.log(`Whiteboard BFF running on http://localhost:${process.env.PORT || 4001}`);
}
bootstrap();
