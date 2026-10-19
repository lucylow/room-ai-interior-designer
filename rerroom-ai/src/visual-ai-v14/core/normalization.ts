import { DatasetRecord, clamp } from './types';
export function normalizeRecord(r:DatasetRecord):DatasetRecord{ return {...r, quality:clamp(r.quality), labels:[...new Set(r.labels)].sort()}; }
export function normalizeBatch(rs:DatasetRecord[]):DatasetRecord[]{ return rs.map(normalizeRecord); }
