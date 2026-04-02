import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';
import { CommonModule } from './common/common.module';
import { RequestLoggingMiddleware } from './common/logging/request-logging.middleware';
import { HealthController } from './health/health.controller';
import { MetricsController } from './metrics/metrics.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASS', 'postgres'),
        database: configService.get<string>('DB_NAME', 'teddy_db'),
        entities: [User, Client],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    ClientsModule,
  ],
  controllers: [HealthController, MetricsController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
