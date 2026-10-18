import type { DataClass, DataSensitivity, DataOrigin, DataEnvelope, ProcessingPurpose } from './types';

const SECRET_PATTERNS = [
  /^sk-[A-Za-z0-9_-]{20,}$/i,
  /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
  /^bearer\s+/i,
];

export function looksLikeSecret(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return SECRET_PATTERNS.some((pattern) => pattern.test(value.trim()));
}

export function classifyField(name: string, value: unknown): DataClass {
  const lower = name.toLowerCase();
  if (looksLikeSecret(value) || /(password|secret|token|apikey|api_key|privatekey|authorization)/.test(lower)) return 'credential';
  if (/(email|phone|contact)/.test(lower)) return 'contact';
  if (/(address|postal|location|lat|lng|longitude|latitude)/.test(lower)) return 'identity';
  if (/(image|photo|thumbnail|texture|asseturl|imageurl)/.test(lower)) return 'room-image';
  if (/(video|tour|splat|gaussian)/.test(lower)) return 'room-video';
  if (/(layout|floorplan|anchor|scene)/.test(lower)) return 'room-layout';
  if (/(width|depth|height|dimension|measurement|clearance|area)/.test(lower)) return 'measurement';
  if (/(cart|product|retailer|wishlist|shopping|affiliate)/.test(lower)) return 'shopping';
  if (/(quote|contractor|scope|permit|construction|labor)/.test(lower)) return 'construction';
  if (/(price|budget|currency|payment|billing|subscription)/.test(lower)) return 'financial';
  if (/(prompt|instruction|command|query)/.test(lower)) return 'ai-prompt';
  if (/(output|completion|response|insight)/.test(lower)) return 'ai-output';
  if (/(device|useragent|platform|model|os)/.test(lower)) return 'device';
  if (/(telemetry|analytics|event|trace|log)/.test(lower)) return 'telemetry';
  if (/(user|name|profile|account|id)/.test(lower)) return 'identity';
  return 'telemetry';
}

export function sensitivityFor(dataClass: DataClass): DataSensitivity {
  switch (dataClass) {
    case 'credential':
    case 'financial':
      return 'restricted';
    case 'contact':
    case 'room-image':
    case 'room-video':
    case 'room-layout':
    case 'construction':
      return 'sensitive';
    case 'identity':
    case 'measurement':
    case 'shopping':
    case 'ai-prompt':
    case 'ai-output':
      return 'personal';
    default:
      return 'internal';
  }
}

export function envelope<T>(
  value: T,
  name: string,
  purpose: ProcessingPurpose,
  origin: DataOrigin = 'user',
): DataEnvelope<T> {
  const dataClass = classifyField(name, value);
  return {
    value,
    dataClass,
    sensitivity: sensitivityFor(dataClass),
    origin,
    purpose,
    containsDirectIdentifier: dataClass === 'contact' || dataClass === 'identity',
  };
}
