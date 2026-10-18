import { SECURITY_CONSTANTS } from './constants';
import type { SessionSnapshot } from './types';

export interface SessionProvider {
  signIn(credentials: { authorizationCode: string }): Promise<{ userId: string; accessToken: string; expiresAt: number; scopes: string[] }>;
  refresh(): Promise<{ accessToken: string; expiresAt: number; scopes?: string[] }>;
  signOut(): Promise<void>;
}

function validTokenResult(value: { accessToken: string; expiresAt: number; scopes?: string[] }): boolean {
  return typeof value.accessToken === 'string' && value.accessToken.length > 0 && value.accessToken.length <= 16_384 &&
    Number.isFinite(value.expiresAt) && value.expiresAt > 0 &&
    (value.scopes === undefined || (Array.isArray(value.scopes) && value.scopes.every(scope => typeof scope === 'string' && scope.length <= 256)));
}

export class SessionManager {
  private snapshot: SessionSnapshot = { status: 'signed-out', scopes: [], sessionVersion: 0 };
  private refreshPromise?: Promise<void>;
  private operationId = 0;

  constructor(private readonly provider: SessionProvider) {}

  getSnapshot(): SessionSnapshot { return { ...this.snapshot, scopes: [...this.snapshot.scopes] }; }

  async signIn(authorizationCode: string): Promise<void> {
    if (typeof authorizationCode !== 'string' || authorizationCode.length === 0 || authorizationCode.length > 16_384) {
      throw new Error('Sign-in credentials are invalid.');
    }
    const operation = ++this.operationId;
    this.snapshot = { ...this.snapshot, status: 'signing-in', accessToken: undefined, accessTokenExpiresAt: undefined };
    try {
      const result = await this.provider.signIn({ authorizationCode });
      if (operation !== this.operationId) throw new Error('Sign-in was superseded.');
      if (!result || typeof result.userId !== 'string' || !result.userId || !validTokenResult(result)) {
        throw new Error('Invalid session response.');
      }
      this.snapshot = {
        status: 'authenticated',
        userId: result.userId,
        accessToken: result.accessToken,
        accessTokenExpiresAt: result.expiresAt,
        scopes: [...result.scopes],
        sessionVersion: this.snapshot.sessionVersion + 1,
      };
    } catch {
      if (operation === this.operationId) {
        this.snapshot = { status: 'signed-out', scopes: [], sessionVersion: this.snapshot.sessionVersion + 1 };
      }
      throw new Error('Sign-in failed or was cancelled.');
    }
  }

  async ensureFresh(): Promise<string> {
    const current = this.snapshot;
    if (current.status !== 'authenticated' && current.status !== 'refreshing') throw new Error('Session is not authenticated.');
    if (current.accessToken && current.accessTokenExpiresAt && current.accessTokenExpiresAt - Date.now() > SECURITY_CONSTANTS.accessTokenSkewMs) {
      return current.accessToken;
    }
    const operation = this.operationId;
    const version = current.sessionVersion;
    if (!this.refreshPromise) {
      this.refreshPromise = this.refreshInternal(operation, version).finally(() => { this.refreshPromise = undefined; });
    }
    await this.refreshPromise;
    if (operation !== this.operationId || this.snapshot.status !== 'authenticated' || this.snapshot.sessionVersion !== version || !this.snapshot.accessToken) {
      throw new Error('Session changed while refreshing.');
    }
    return this.snapshot.accessToken;
  }

  async signOut(): Promise<void> {
    this.operationId += 1;
    this.snapshot = { status: 'signed-out', scopes: [], sessionVersion: this.snapshot.sessionVersion + 1 };
    try {
      await this.provider.signOut();
    } catch {
      // Local credentials are already cleared. Do not log or retain provider error details.
      console.warn('[RE:ROOM] Remote sign-out did not complete; local session was cleared.');
    }
  }

  private async refreshInternal(operation: number, version: number): Promise<void> {
    if (operation !== this.operationId || this.snapshot.sessionVersion !== version) throw new Error('Session changed before refresh.');
    this.snapshot = { ...this.snapshot, status: 'refreshing', accessToken: undefined, accessTokenExpiresAt: undefined };
    try {
      const result = await this.provider.refresh();
      if (operation !== this.operationId || this.snapshot.sessionVersion !== version || this.snapshot.status !== 'refreshing') return;
      if (!result || !validTokenResult(result)) throw new Error('Invalid refresh response.');
      this.snapshot = {
        ...this.snapshot,
        status: 'authenticated',
        accessToken: result.accessToken,
        accessTokenExpiresAt: result.expiresAt,
        scopes: result.scopes ?? this.snapshot.scopes,
      };
    } catch {
      if (operation !== this.operationId || this.snapshot.sessionVersion !== version || this.snapshot.status !== 'refreshing') return;
      this.snapshot = { status: 'expired', scopes: [], sessionVersion: this.snapshot.sessionVersion + 1 };
      throw new Error('Session refresh failed.');
    }
  }
}
