import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from 'config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Fiyaka API')
    .setDescription('Fiyaka API Routes')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(env.swaggerPath, app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(env.port || 3000);
}
bootstrap();
