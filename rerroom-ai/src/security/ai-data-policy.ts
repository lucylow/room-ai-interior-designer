import type { AIDataPolicy, ConsentScope, DataClass, ProcessingPurpose } from './types';
import { ConsentRegistry } from './consent';

export const PURPOSE_TO_CONSENT: Record<ProcessingPurpose, ConsentScope> = {
  'core-design': 'local-storage',
  'room-understanding': 'ai-processing',
  'ai-generation': 'ai-processing',
  'ai-memory': 'ai-memory',
  shopping: 'commerce',
  construction: 'construction-sharing',
  analytics: 'analytics',
  support: 'diagnostics',
  security: 'diagnostics',
};

export class AIDataPolicyEngine {
  constructor(
    private readonly consent: ConsentRegistry,
    private readonly policy: AIDataPolicy,
  ) {}

  canProcess(dataClass: DataClass, purpose: ProcessingPurpose): boolean {
    if (!this.consent.get(PURPOSE_TO_CONSENT[purpose])) return false;
    if (!this.policy.allowClasses.includes(dataClass)) return false;
    if (dataClass === 'room-image' && !this.policy.allowImages) return false;
    if (dataClass === 'measurement' && !this.policy.allowMeasurements) return false;
    if (dataClass === 'shopping' && !this.policy.allowShoppingHistory) return false;
    if (dataClass === 'construction' && !this.policy.allowConstructionDetails) return false;
    return true;
  }

  explain(dataClass: DataClass, purpose: ProcessingPurpose): string {
    if (!this.consent.get(PURPOSE_TO_CONSENT[purpose])) return `Consent is not granted for ${PURPOSE_TO_CONSENT[purpose]}.`;
    if (!this.canProcessIgnoringConsent(dataClass)) return `Data class ${dataClass} is excluded by the active AI policy.`;
    return `Data class ${dataClass} is allowed for ${purpose}.`;
  }

  private canProcessIgnoringConsent(dataClass: DataClass): boolean {
    if (!this.policy.allowClasses.includes(dataClass)) return false;
    if (dataClass === 'room-image' && !this.policy.allowImages) return false;
    if (dataClass === 'measurement' && !this.policy.allowMeasurements) return false;
    if (dataClass === 'shopping' && !this.policy.allowShoppingHistory) return false;
    if (dataClass === 'construction' && !this.policy.allowConstructionDetails) return false;
    return true;
  }

  maxPromptChars(): number { return this.policy.maxPromptChars; }
  retentionDays(): number { return this.policy.retentionDays; }
}
