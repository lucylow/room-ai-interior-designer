export const AI_POLICY_CASES = [
  { purpose: 'room-understanding', dataClass: 'room-image', expected: 'allowed' },
  { purpose: 'room-understanding', dataClass: 'credential', expected: 'blocked' },
  { purpose: 'ai-generation', dataClass: 'room-layout', expected: 'allowed' },
  { purpose: 'ai-generation', dataClass: 'financial', expected: 'blocked' },
  { purpose: 'shopping', dataClass: 'shopping', expected: 'blocked-unless-commerce-consent' },
  { purpose: 'construction', dataClass: 'construction', expected: 'blocked-unless-construction-consent' },
  { purpose: 'analytics', dataClass: 'room-image', expected: 'blocked' },
  { purpose: 'security', dataClass: 'device', expected: 'allowed-with-diagnostics' },
  { purpose: 'support', dataClass: 'ai-prompt', expected: 'allowed-with-diagnostics' },
] as const;
