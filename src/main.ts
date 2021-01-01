import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from 'config/env';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(env.port || 3000);
}
bootstrap();
