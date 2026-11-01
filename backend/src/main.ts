import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const API_PORT = 3000;
const FRONTEND_ORIGIN = 'http://localhost:5173';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: FRONTEND_ORIGIN });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(API_PORT);
}

void bootstrap();
