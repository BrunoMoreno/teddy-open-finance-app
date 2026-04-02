import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { ClientsService } from './clients/clients.service';
import { ApiExceptionFilter } from './common/http/api-exception.filter';
import { JsonLogger } from './common/logging/json-logger.service';
import { MetricsInterceptor } from './common/metrics/metrics.interceptor';
import { MetricsService } from './common/metrics/metrics.service';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(JsonLogger);
  app.useLogger(logger);
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new MetricsInterceptor(app.get(MetricsService)));

  setupSwagger(app);
  await app.get(AuthService).ensureAdminSeed();
  await app.get(ClientsService).syncClientsTotalMetric();

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  logger.log(`server_started ${port}`, 'Bootstrap');
}

void bootstrap();

