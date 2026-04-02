import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ClientsService } from './clients.service';
import { ListClientsQueryDto } from './dto/list-clients-query.dto';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('summary')
  summary(@Query() query: ListClientsQueryDto) {
    return this.clientsService.getDashboardSummary(query.recentLimit);
  }
}

