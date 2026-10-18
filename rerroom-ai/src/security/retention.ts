export interface RetentionRecord { id: string; updatedAt: number; retentionDays: number; }
export function isExpired(record: RetentionRecord, now = Date.now()): boolean { return now > record.updatedAt + record.retentionDays * 86_400_000; }
export function expirationTimestamp(record: RetentionRecord): number { return record.updatedAt + record.retentionDays * 86_400_000; }
