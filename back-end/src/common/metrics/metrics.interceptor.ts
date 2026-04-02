import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { route?: { path?: string } }>();
    const startedAt = process.hrtime.bigint();

    return next.handle().pipe(
      tap({
        next: () => this.observe(request, 200, startedAt),
        error: (error: { status?: number }) =>
          this.observe(request, error.status ?? 500, startedAt),
      }),
    );
  }

  private observe(
    request: Request & { method?: string; route?: { path?: string } },
    statusCode: number,
    startedAt: bigint,
  ): void {
    const durationSeconds = Number(process.hrtime.bigint() - startedAt) / 1_000_000_000;
    const labels = {
      method: request.method ?? 'UNKNOWN',
      path: request.route?.path ?? 'unmatched',
      status_code: String(statusCode),
    };

    this.metricsService.httpRequestsTotal.inc(labels);
    this.metricsService.httpRequestDuration.observe(labels, durationSeconds);
  }
}
