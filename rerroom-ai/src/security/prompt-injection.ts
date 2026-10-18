const INJECTION_PATTERNS: Array<[RegExp, string]> = [
  [/ignore\s+(all|any|previous|prior)\s+instructions/i, 'instruction override'],
  [/system\s+prompt/i, 'system prompt reference'],
  [/developer\s+message/i, 'developer message reference'],
  [/reveal\s+(the|your)\s+(hidden|system|private)\s+instructions/i, 'hidden instruction extraction'],
  [/execute\s+(javascript|typescript|sql|shell)/i, 'code execution request'],
  [/disable\s+(security|validation|authorization|logging)/i, 'security bypass request'],
  [/send\s+.*(token|cookie|password|secret)/i, 'credential exfiltration request'],
  [/call\s+https?:\/\/[^\s]+/i, 'untrusted outbound request'],
  [/base64\s+encode\s+.*(secret|token|password)/i, 'encoding-based exfiltration'],
  [/do\s+not\s+tell\s+the\s+user/i, 'concealment request'],
];

export interface PromptRisk {
  risky: boolean;
  score: number;
  matches: string[];
}

export function detectPromptInjection(text: string): PromptRisk {
  const matches: string[] = [];
  for (const [pattern, label] of INJECTION_PATTERNS) {
    if (pattern.test(text)) matches.push(label);
  }
  return { risky: matches.length > 0, score: Math.min(100, matches.length * 25), matches };
}

export function wrapUntrustedText(label: string, text: string): string {
  const clipped = text.length > 4_000 ? `${text.slice(0, 4_000)}…` : text;
  return `<untrusted_${label}>\n${clipped}\n</untrusted_${label}>`;
}

export function sanitizeUserPrompt(text: string, maxChars = 4_000): string {
  const normalized = text.normalize('NFKC').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ');
  return normalized.slice(0, maxChars).trim();
}
