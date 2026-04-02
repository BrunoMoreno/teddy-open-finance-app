import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { JsonLogger } from '../common/logging/json-logger.service';
import { MetricsService } from '../common/metrics/metrics.service';

import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

describe('ClientsService', () => {
  const repository = {
    save: jest.fn(),
    create: jest.fn((value) => value),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
    softDelete: jest.fn(),
    find: jest.fn(),
    manager: {
      transaction: jest.fn(),
    },
    createQueryBuilder: jest.fn(),
  } as unknown as Repository<Client>;
  const metrics = {
    clientsTotal: { set: jest.fn() },
    clientDetailViewsTotal: { inc: jest.fn() },
  } as unknown as MetricsService;
  const logger = { log: jest.fn() } as unknown as JsonLogger;
  const service = new ClientsService(repository, metrics, logger);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a client', async () => {
    repository.save = jest.fn().mockResolvedValue({ id: '1', name: 'Eduardo' });
    repository.count = jest.fn().mockResolvedValue(1);

    const result = await service.create({
      name: 'Eduardo',
      salary: 3500,
      companyValue: 120000,
    });

    expect(result.id).toBe('1');
  });

  it('lists active clients', async () => {
    repository.findAndCount = jest
      .fn()
      .mockResolvedValue([[{ id: '1', name: 'Eduardo' }], 1]);

    const result = await service.findAll({ page: 1, pageSize: 16, recentLimit: 5 });

    expect(result.total).toBe(1);
    expect(result.items).toHaveLength(1);
  });

  it('increments access count on detail fetch', async () => {
    repository.manager.transaction = jest.fn().mockImplementation(async (callback) =>
      callback({
        createQueryBuilder: () => ({
          update: () => ({
            set: () => ({
              where: () => ({
                execute: jest.fn(),
              }),
            }),
          }),
        }),
        getRepository: () => ({
          findOne: jest.fn().mockResolvedValue({ id: '1', accessCount: 2 }),
        }),
      }),
    );

    const result = await service.findOne('1');

    expect(result.accessCount).toBe(2);
  });

  it('updates a client', async () => {
    repository.findOne = jest.fn().mockResolvedValue({ id: '1', name: 'Old' });
    repository.save = jest.fn().mockResolvedValue({ id: '1', name: 'New' });

    const result = await service.update('1', { name: 'New' });

    expect(result.name).toBe('New');
  });

  it('throws when deleting a missing client', async () => {
    repository.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.softDelete('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});

