import { Global, Module } from '@nestjs/common';

import { JsonLogger } from './logging/json-logger.service';
import { MetricsService } from './metrics/metrics.service';

@Global()
@Module({
  providers: [JsonLogger, MetricsService],
  exports: [JsonLogger, MetricsService],
})
export class CommonModule {}

