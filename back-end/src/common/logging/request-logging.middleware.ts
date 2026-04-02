import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JsonLogger } from './json-logger.service';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: JsonLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();
    this.logger.log(`request_received ${request.method} ${request.originalUrl}`, 'HTTP');

    response.on('finish', () => {
      this.logger.log(
        JSON.stringify({
          event: 'request_completed',
          method: request.method,
          path: request.originalUrl,
          statusCode: response.statusCode,
          durationMs: Date.now() - startedAt,
        }),
        'HTTP',
      );
    });

    next();
  }
}

