const MAX_DEPTH = 8;
const MAX_KEYS = 500;
const MAX_STRING = 20_000;

export function safeJsonParse<T>(text: string): T {
  if (text.length > 2_000_000) throw new Error('JSON payload is too large.');
  return JSON.parse(text) as T;
}

export function validateJsonTree(value: unknown, depth = 0, keyCount = { value: 0 }): void {
  if (depth > MAX_DEPTH) throw new Error('JSON nesting exceeds safety limit.');
  if (typeof value === 'string' && value.length > MAX_STRING) throw new Error('String exceeds safety limit.');
  if (Array.isArray(value)) {
    for (const item of value) validateJsonTree(item, depth + 1, keyCount);
    return;
  }
  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) {
      keyCount.value += 1;
      if (keyCount.value > MAX_KEYS) throw new Error('JSON object contains too many keys.');
      validateJsonTree(item, depth + 1, keyCount);
    }
  }
}
