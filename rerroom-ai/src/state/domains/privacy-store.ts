import type { ConsentDecision, ConsentScope } from '../../security/types';
import { DEFAULT_CONSENT, ConsentRegistry } from '../../security/consent';
import { createExternalStore, type ExternalStore } from '../store';

export interface PrivacyDomainState {
  consent: ConsentDecision[];
  vault: { enabled: boolean; unlocked: boolean; backend: 'native-keychain' | 'web-encrypted' | 'memory' };
  retention: { roomDays: number; generatedAssetDays: number; telemetryDays: number };
  dataExports: { lastRequestedAt?: number; status: 'idle' | 'requested' | 'ready' | 'failed' };
}

export const privacyConsentRegistry = new ConsentRegistry();

export const privacyStore: ExternalStore<PrivacyDomainState> = createExternalStore({
  consent: privacyConsentRegistry.snapshot(),
  vault: { enabled: false, unlocked: false, backend: 'web-encrypted' },
  retention: { roomDays: 30, generatedAssetDays: 14, telemetryDays: 7 },
  dataExports: { status: 'idle' },
});

export function setConsent(decision: ConsentDecision): void {
  privacyConsentRegistry.set(decision.scope, decision.granted, decision.source);
  privacyStore.setState((state) => ({ ...state, consent: privacyConsentRegistry.snapshot() }));
}

export function revokeNonEssentialConsent(): void {
  privacyConsentRegistry.revokeAllExceptEssential();
  privacyStore.setState((state) => ({ ...state, consent: privacyConsentRegistry.snapshot() }));
}

/** Keep policy checks and the hydrated privacy UI in sync after versioned state restoration. */
export function syncConsentRegistry(): void {
  for (const decision of privacyStore.getSnapshot().consent) {
    privacyConsentRegistry.set(decision.scope, decision.granted, decision.source);
  }
}

export function setVaultUnlocked(unlocked: boolean): void {
  privacyStore.setState((state) => ({ ...state, vault: { ...state.vault, unlocked } }));
}

export function setVaultEnabled(enabled: boolean): void {
  privacyStore.setState((state) => ({ ...state, vault: { ...state.vault, enabled, unlocked: enabled && state.vault.unlocked } }));
}

export function setVaultBackend(backend: PrivacyDomainState['vault']['backend']): void {
  privacyStore.setState((state) => ({ ...state, vault: { ...state.vault, backend } }));
}

export function updateRetention(next: Partial<PrivacyDomainState['retention']>): void {
  privacyStore.setState((state) => ({ ...state, retention: { ...state.retention, ...next } }));
}

export function requestDataExport(): void {
  privacyStore.setState((state) => ({ ...state, dataExports: { status: 'requested', lastRequestedAt: Date.now() } }));
}

export function markExportReady(): void {
  privacyStore.setState((state) => ({ ...state, dataExports: { ...state.dataExports, status: 'ready' } }));
}

export function resetPrivacy(): void {
  const registryDefaults = Object.keys(DEFAULT_CONSENT).map((key) => ({ scope: key as ConsentScope, granted: DEFAULT_CONSENT[key as ConsentScope], updatedAt: Date.now(), source: 'system-default' as const, version: 1 }));
  for (const decision of registryDefaults) privacyConsentRegistry.set(decision.scope, decision.granted, decision.source);
  privacyStore.setState((state) => ({ ...state, consent: registryDefaults, dataExports: { status: 'idle' } }));
}
