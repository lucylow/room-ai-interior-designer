const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE = /\b(?:\+?\d[\d .()\-]{7,}\d)\b/g;
const ADDRESS = /\b\d{1,6}\s+(?:[A-Z0-9.'-]+\s+){0,5}(?:street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|court|ct|way|place|pl)\b/gi;
const BEARER = /\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi;
const JWT = /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g;
const API_KEY = /\b(?:sk|pk|rk|api)[-_][A-Za-z0-9_-]{12,}\b/gi;
const CARD = /\b(?:\d[ -]*?){13,19}\b/g;
const SECRET_WORD = /(password|passphrase|secret|private key|access token|refresh token)\s*[:=]\s*[^\s,;]+/gi;

export interface RedactionResult {
  value: string;
  redactions: string[];
}

export function redactText(value: string): RedactionResult {
  let output = value;
  const redactions: string[] = [];
  const apply = (pattern: RegExp, marker: string) => {
    if (pattern.test(output)) redactions.push(marker);
    output = output.replace(pattern, `[REDACTED:${marker}]`);
  };
  apply(EMAIL, 'email');
  apply(PHONE, 'phone');
  apply(ADDRESS, 'address');
  apply(BEARER, 'bearer');
  apply(JWT, 'jwt');
  apply(API_KEY, 'api-key');
  apply(CARD, 'payment');
  apply(SECRET_WORD, 'secret');
  return { value: output, redactions: [...new Set(redactions)] };
}

export function redactObject(value: unknown, path = 'root'): unknown {
  if (typeof value === 'string') return redactText(value).value;
  if (Array.isArray(value)) return value.map((item, index) => redactObject(item, `${path}[${index}]`));
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      if (/^(password|secret|token|accessToken|refreshToken|apiKey|authorization|cookie)$/i.test(key)) {
        out[key] = '[REDACTED:secret-field]';
      } else {
        out[key] = redactObject(item, `${path}.${key}`);
      }
    }
    return out;
  }
  return value;
}

export function summarizeForTelemetry(value: unknown): string {
  const redacted = redactObject(value);
  const serialized = JSON.stringify(redacted);
  return serialized.length > 600 ? `${serialized.slice(0, 600)}…` : serialized;
}
