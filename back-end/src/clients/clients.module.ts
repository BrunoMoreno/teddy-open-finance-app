import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '../common/common.module';

import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DashboardController } from './dashboard.controller';
import { Client } from './entities/client.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController, DashboardController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
