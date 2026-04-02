import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller()
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get('healthz')
  async healthz() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        db: 'connected',
      };
    } catch {
      throw new HttpException(
        {
          status: 'error',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          db: 'disconnected',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}

