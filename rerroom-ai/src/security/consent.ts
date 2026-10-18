import type { ConsentDecision, ConsentScope } from './types';

const CONSENT_VERSION = 1;

export const DEFAULT_CONSENT: Record<ConsentScope, boolean> = {
  'local-storage': true,
  'cloud-storage': false,
  'ai-processing': false,
  'ai-memory': false,
  analytics: false,
  commerce: false,
  'construction-sharing': false,
  diagnostics: true,
};

export class ConsentRegistry {
  private decisions: ConsentDecision[];

  constructor(initial?: ConsentDecision[]) {
    this.decisions = initial ?? Object.entries(DEFAULT_CONSENT).map(([scope, granted]) => ({
      scope: scope as ConsentScope,
      granted,
      updatedAt: Date.now(),
      source: 'system-default',
      version: CONSENT_VERSION,
    }));
  }

  get(scope: ConsentScope): boolean {
    return this.decisions.find((item) => item.scope === scope)?.granted ?? false;
  }

  set(scope: ConsentScope, granted: boolean, source: ConsentDecision['source'] = 'settings'): ConsentDecision {
    const next: ConsentDecision = {
      scope,
      granted,
      updatedAt: Date.now(),
      source,
      version: CONSENT_VERSION,
    };
    this.decisions = [...this.decisions.filter((item) => item.scope !== scope), next];
    return next;
  }

  snapshot(): ConsentDecision[] {
    return [...this.decisions];
  }

  require(scope: ConsentScope): void {
    if (!this.get(scope)) throw new Error(`Consent denied for scope: ${scope}`);
  }

  revokeAllExceptEssential(): void {
    for (const scope of Object.keys(DEFAULT_CONSENT) as ConsentScope[]) {
      if (scope !== 'local-storage' && scope !== 'diagnostics') this.set(scope, false, 'settings');
    }
  }
}
