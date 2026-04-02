import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { JsonLogger } from '../common/logging/json-logger.service';
import { MetricsService } from '../common/metrics/metrics.service';

import { CreateClientDto } from './dto/create-client.dto';
import { ListClientsQueryDto } from './dto/list-clients-query.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
    private readonly metricsService: MetricsService,
    private readonly logger: JsonLogger,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const client = await this.clientsRepository.save(this.clientsRepository.create(dto));
    this.logger.log(`client_created ${client.id}`, 'ClientsService');
    await this.syncClientsTotalMetric();
    return client;
  }

  async findAll(query: ListClientsQueryDto) {
    const [items, total] = await this.clientsRepository.findAndCount({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      take: query.pageSize,
      skip: (query.page - 1) * query.pageSize,
    });

    return {
      items,
      total,
      page: query.page,
      pageSize: query.pageSize,
      totalPages: Math.max(1, Math.ceil(total / query.pageSize)),
    };
  }

  async findOne(id: string): Promise<Client> {
    const result = await this.clientsRepository.manager.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .update(Client)
        .set({ accessCount: () => '"accessCount" + 1' })
        .where('id = :id', { id })
        .execute();

      return manager.getRepository(Client).findOne({ where: { id } });
    });

    if (!result) {
      throw new NotFoundException('Client not found');
    }

    this.metricsService.clientDetailViewsTotal.inc();
    return result;
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const updated = await this.clientsRepository.save({ ...client, ...dto });
    this.logger.log(`client_updated ${id}`, 'ClientsService');
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    const client = await this.clientsRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientsRepository.softDelete(id);
    this.logger.log(`client_deleted ${id}`, 'ClientsService');
    await this.syncClientsTotalMetric();
  }

  async getDashboardSummary(limit: number) {
    const activeClients = await this.clientsRepository.count({
      where: { deletedAt: IsNull() },
    });
    const recentClients = await this.clientsRepository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
      take: limit,
    });

    const rawSeries = await this.clientsRepository
      .createQueryBuilder('client')
      .select(`TO_CHAR(DATE_TRUNC('month', client.createdAt), 'YYYY-MM')`, 'period')
      .addSelect('COUNT(*)', 'count')
      .where('client.deletedAt IS NULL')
      .groupBy(`DATE_TRUNC('month', client.createdAt)`)
      .orderBy(`DATE_TRUNC('month', client.createdAt)`, 'ASC')
      .getRawMany<{ period: string; count: string }>();

    return {
      totalClients: activeClients,
      recentClients,
      creationSeries: rawSeries.map((entry) => ({
        period: entry.period,
        count: Number(entry.count),
      })),
    };
  }

  async syncClientsTotalMetric(): Promise<void> {
    const total = await this.clientsRepository.count({ where: { deletedAt: IsNull() } });
    this.metricsService.clientsTotal.set(total);
  }
}
