import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';

@Injectable()
export class JsonLogger extends ConsoleLogger {
  override log(message: string, context?: string): void {
    this.printMessage('log', message, context);
  }

  override error(message: string, trace?: string, context?: string): void {
    this.printMessage('error', message, context, trace);
  }

  override warn(message: string, context?: string): void {
    this.printMessage('warn', message, context);
  }

  override debug(message: string, context?: string): void {
    this.printMessage('debug', message, context);
  }

  override verbose(message: string, context?: string): void {
    this.printMessage('verbose', message, context);
  }

  private printMessage(
    level: LogLevel,
    message: string,
    context?: string,
    trace?: string,
  ): void {
    process.stdout.write(
      `${JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString(),
        context: context ?? this.context,
        traceId: undefined,
        trace,
      })}\n`,
    );
  }
}

