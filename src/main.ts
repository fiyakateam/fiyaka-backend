import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from 'config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Fiyaka API')
    .setDescription('Fiyaka API Routes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.port || 3000);
}
bootstrap();
