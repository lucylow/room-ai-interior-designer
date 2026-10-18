export const SECURITY_CONSTANTS = {
  policyVersion: '2026-10-ROOM-SECURITY-1',
  accessTokenSkewMs: 30_000,
  requestTimeoutMs: 30_000,
  maxPromptChars: 4_000,
  maxFileBytes: 25 * 1024 * 1024,
  maxImagePixels: 32_000_000,
  maxRoomObjects: 250,
  maxObjectDimensionM: 25,
  maxTranslationM: 10,
  maxRotationDeg: 360,
  vaultPBKDF2Iterations: 600_000,
  vaultSaltBytes: 16,
  aesIvBytes: 12,
  auditMaxEntries: 500,
  syncMaxAttempts: 8,
} as const;

export const DEFAULT_AI_POLICY = {
  allowClasses: [
    'room-image',
    'room-layout',
    'measurement',
    'ai-prompt',
    'shopping',
  ],
  maxPromptChars: SECURITY_CONSTANTS.maxPromptChars,
  allowImages: false,
  allowMeasurements: true,
  allowShoppingHistory: false,
  allowConstructionDetails: false,
  retentionDays: 0,
} as const;

export const SENSITIVE_KEYS = [
  'authorization',
  'cookie',
  'set-cookie',
  'accessToken',
  'refreshToken',
  'apiKey',
  'secret',
  'password',
  'token',
  'privateKey',
  'session',
] as const;
