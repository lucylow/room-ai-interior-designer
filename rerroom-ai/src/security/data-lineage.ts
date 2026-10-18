import type { DataClass, ProcessingPurpose } from './types';
import { randomId } from './ids';

export interface LineageRecord { id: string; name: string; dataClass: DataClass; purpose: ProcessingPurpose; decision: 'allowed' | 'blocked'; reason: string; timestamp: number; }

export class DataLineageLog {
  private records: LineageRecord[] = [];
  record(input: Omit<LineageRecord, 'id' | 'timestamp'>): LineageRecord { const record = { ...input, id: randomId('lineage'), timestamp: Date.now() }; this.records = [...this.records, record].slice(-1000); return record; }
  list(): LineageRecord[] { return [...this.records]; }
}
