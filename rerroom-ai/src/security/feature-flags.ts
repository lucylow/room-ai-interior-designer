export interface SecurityFeatureFlags {
  demoAI: boolean;
  encryptedLocalVault: boolean;
  privacyCenter: boolean;
  strictPromptGate: boolean;
  imageMetadataSanitizer: boolean;
  offlineSync: boolean;
}

export const SECURITY_FEATURES: SecurityFeatureFlags = {
  demoAI: true,
  encryptedLocalVault: true,
  privacyCenter: true,
  strictPromptGate: true,
  imageMetadataSanitizer: true,
  offlineSync: true,
};

export function featureEnabled(flag: keyof SecurityFeatureFlags, overrides?: Partial<SecurityFeatureFlags>): boolean {
  return overrides?.[flag] ?? SECURITY_FEATURES[flag];
}
