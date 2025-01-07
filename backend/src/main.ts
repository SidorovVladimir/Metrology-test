import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
