import { detectPromptInjection, sanitizeUserPrompt, wrapUntrustedText } from './prompt-injection';
import { redactText } from './redaction';
import type { AIDataPolicy, DataClass, ProcessingPurpose, SanitizedAIContext } from './types';
import { AIDataPolicyEngine } from './ai-data-policy';
import { requestId } from './ids';

export interface ContextField {
  name: string;
  dataClass: DataClass;
  value: unknown;
}

export interface BuildContextResult {
  context: SanitizedAIContext;
  blocked: string[];
  warnings: string[];
}

const PRIVATE_FIELD_KEY = /(?:^|_)(?:id|ids|name|label|address|email|phone|contact|image|video|uri|url|token|secret|password|credential|authorization|cookie|notes?|financial|contractor|identity|user|key)(?:_|$)/i;

function sanitizeStructured(value: unknown, depth = 0): { value: unknown; changed: boolean } {
  if (depth > 8) return { value: '[REDACTED:depth-limit]', changed: true };
  if (typeof value === 'string') {
    const redacted = redactText(value);
    return { value: redacted.value.slice(0, 4_000), changed: redacted.value !== value || redacted.value.length > 4_000 };
  }
  if (typeof value === 'number') return { value: Number.isFinite(value) ? value : null, changed: !Number.isFinite(value) };
  if (value === null || typeof value === 'boolean') return { value, changed: false };
  if (Array.isArray(value)) {
    const items = value.slice(0, 250).map((item) => sanitizeStructured(item, depth + 1));
    return { value: items.map((item) => item.value), changed: value.length > 250 || items.some((item) => item.changed) };
  }
  if (value && typeof value === 'object') {
    const output: Record<string, unknown> = {};
    let changed = false;
    for (const [key, item] of Object.entries(value).slice(0, 100)) {
      const normalizedKey = key.replace(/([a-z0-9])([A-Z])/g, '$1_$2');
      if (PRIVATE_FIELD_KEY.test(normalizedKey)) {
        changed = true;
        continue;
      }
      const sanitized = sanitizeStructured(item, depth + 1);
      output[key] = sanitized.value;
      changed ||= sanitized.changed;
    }
    if (Object.keys(value).length > 100) changed = true;
    return { value: output, changed };
  }
  return { value: null, changed: true };
}

function safeFieldName(name: string, index: number, dataClass: DataClass): string {
  const normalized = name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9]/g, '_');
  const safe = name.replace(/[^A-Za-z0-9_-]/g, '_').slice(0, 64);
  return safe && !PRIVATE_FIELD_KEY.test(normalized) ? safe : `${dataClass.replace(/-/g, '_')}_${index + 1}`;
}

export function buildAIContext(
  fields: ContextField[],
  purpose: ProcessingPurpose,
  engine: AIDataPolicyEngine,
  policy: AIDataPolicy,
): BuildContextResult {
  const accepted: SanitizedAIContext['fields'] = [];
  const blocked: string[] = [];
  const warnings: string[] = [];

  for (const field of fields) {
    if (!engine.canProcess(field.dataClass, purpose)) {
      blocked.push(field.name);
      continue;
    }
    const fieldName = safeFieldName(field.name, accepted.length, field.dataClass);
    if (field.dataClass === 'ai-prompt') {
      const raw = typeof field.value === 'string' ? field.value : String(field.value ?? '');
      const risk = detectPromptInjection(raw);
      if (risk.risky) warnings.push(`${fieldName}: prompt-injection-risk:${risk.matches.join(',')}`);
      const sanitized = sanitizeUserPrompt(raw, policy.maxPromptChars);
      const redacted = redactText(sanitized);
      accepted.push({ name: fieldName, dataClass: field.dataClass, value: wrapUntrustedText('user_prompt', redacted.value), sensitivity: 'personal', redacted: redacted.redactions.length > 0 });
      continue;
    }
    if (typeof field.value === 'string') {
      const redacted = redactText(field.value);
      accepted.push({ name: fieldName, dataClass: field.dataClass, value: redacted.value, sensitivity: field.dataClass === 'credential' ? 'restricted' : 'personal', redacted: redacted.redactions.length > 0 });
    } else {
      const sanitized = sanitizeStructured(field.value);
      accepted.push({ name: fieldName, dataClass: field.dataClass, value: sanitized.value, sensitivity: field.dataClass === 'credential' ? 'restricted' : 'personal', redacted: sanitized.changed });
    }
  }

  return {
    context: {
      requestId: requestId(),
      purpose,
      fields: accepted,
      policyVersion: 'ai-policy-1',
    },
    blocked,
    warnings,
  };
}
