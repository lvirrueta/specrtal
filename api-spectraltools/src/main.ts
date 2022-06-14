import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const CORS_OPTIONS = {
  origin: '*',
  methods: 'GET,HEAD,PUT,POST,DELETE',
  allowedHeaders:
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS_OPTIONS });
  const config = new DocumentBuilder()
    .setTitle('Spectral Tools')
    .setDescription('Api de Spectral Tools')
    .setVersion('1.0')
    .addTag('EndPoints')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
