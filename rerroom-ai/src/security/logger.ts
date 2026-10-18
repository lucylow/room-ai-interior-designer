import { summarizeForTelemetry } from './redaction';

export interface SafeLogger {
  info(event: string, metadata?: unknown): void;
  warn(event: string, metadata?: unknown): void;
  error(event: string, metadata?: unknown): void;
}

const sink = (level: 'INFO' | 'WARN' | 'ERROR', event: string, metadata?: unknown) => {
  const line = `[RE:ROOM][${level}] ${event}${metadata === undefined ? '' : ` ${summarizeForTelemetry(metadata)}`}`;
  if (level === 'ERROR') console.error(line);
  else if (level === 'WARN') console.warn(line);
  else console.info(line);
};

export const logger: SafeLogger = {
  info: (event, metadata) => sink('INFO', event, metadata),
  warn: (event, metadata) => sink('WARN', event, metadata),
  error: (event, metadata) => sink('ERROR', event, metadata),
};
