export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject { [key: string]: JsonValue; }

export function isJsonValue(value: unknown): value is JsonValue {
  if (value === null) return true;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.every(isJsonValue);
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).every(isJsonValue);
  }
  return false;
}

export function toJsonSafe<T>(value: T): JsonValue {
  const seen = new WeakSet<object>();
  const encode = (input: unknown): JsonValue => {
    if (input === null || typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') return input;
    if (typeof input === 'bigint') return String(input);
    if (typeof input === 'undefined') return null;
    if (typeof input === 'function' || typeof input === 'symbol') return null;
    if (typeof input === 'object') {
      if (seen.has(input)) return '[circular]' as string;
      seen.add(input);
      if (Array.isArray(input)) return input.map(encode);
      const out: JsonObject = {};
      for (const [key, child] of Object.entries(input as Record<string, unknown>)) {
        out[key] = encode(child);
      }
      return out;
    }
    return null;
  };
  return encode(value);
}
