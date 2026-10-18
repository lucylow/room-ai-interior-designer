import { safeJsonParse, validateJsonTree } from '../../security/safe-json';

export interface VersionedRecord<T> { schema: number; savedAt: number; value: T; }

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function encodeVersioned<T>(value: T, schema: number): string {
  if (!Number.isInteger(schema) || schema < 1) throw new Error('Invalid state schema version.');
  const encoded = JSON.stringify({ schema, savedAt: Date.now(), value });
  if (typeof encoded !== 'string' || encoded.length > 2_000_000) throw new Error('Persisted state is too large.');
  return encoded;
}

export function decodeVersioned<T>(text: string): VersionedRecord<T> {
  const value: unknown = safeJsonParse(text);
  validateJsonTree(value);
  if (!isRecord(value) || !Number.isInteger(value.schema) || (value.schema as number) < 1 ||
      !Number.isFinite(value.savedAt) || (value.savedAt as number) < 0 || !Object.prototype.hasOwnProperty.call(value, 'value')) {
    throw new Error('Invalid versioned state envelope.');
  }
  return value as unknown as VersionedRecord<T>;
}
