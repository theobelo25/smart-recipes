import 'reflect-metadata';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception/prisma-client-exception.filter.js';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  const jwtSecret = configService.get<string>('JWT_SECRET');

  // Register cookie for jwt
  await app.register(fastifyCookie, {
    secret: jwtSecret, // A secret is recommended for signed cookies
  });

  // Handle PrismaClientKnownException Errors
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(port ?? 3000);
}
await bootstrap();
