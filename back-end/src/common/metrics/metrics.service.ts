import { Injectable } from '@nestjs/common';
import {
  Counter,
  Gauge,
  Histogram,
  Registry,
  collectDefaultMetrics,
} from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry = new Registry();

  readonly httpRequestsTotal = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'path', 'status_code'],
    registers: [this.registry],
  });

  readonly httpRequestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'path', 'status_code'],
    buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5],
    registers: [this.registry],
  });

  readonly clientsTotal = new Gauge({
    name: 'clients_total',
    help: 'Current total of active clients',
    registers: [this.registry],
  });

  readonly clientDetailViewsTotal = new Counter({
    name: 'client_detail_views_total',
    help: 'Total client detail views',
    registers: [this.registry],
  });

  constructor() {
    collectDefaultMetrics({ register: this.registry });
  }

  async serialize(): Promise<string> {
    return this.registry.metrics();
  }
}

