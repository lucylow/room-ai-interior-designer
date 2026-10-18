import type { SessionSnapshot } from '../../security/types';
import { createExternalStore, type ExternalStore } from '../store';

export interface AuthDomainState {
  session: SessionSnapshot;
  entitlements: {
    aiGeneration: boolean;
    advancedAI: boolean;
    cloudSync: boolean;
    shopping: boolean;
    construction: boolean;
    collaboration: boolean;
  };
}

export const authStore: ExternalStore<AuthDomainState> = createExternalStore({
  session: { status: 'signed-out', scopes: [], sessionVersion: 0 },
  entitlements: { aiGeneration: true, advancedAI: false, cloudSync: false, shopping: true, construction: false, collaboration: false },
});

export function setSession(session: SessionSnapshot): void {
  authStore.setState((state) => ({ ...state, session: { ...session, scopes: [...session.scopes], accessToken: undefined } }));
}

export function setEntitlements(entitlements: AuthDomainState['entitlements']): void {
  authStore.setState((state) => ({ ...state, entitlements }));
}
