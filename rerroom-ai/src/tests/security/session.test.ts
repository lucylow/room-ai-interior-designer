import { describe, expect, it, vi } from 'vitest';
import { SessionManager, type SessionProvider } from '../../security/session';

function initialSessionProvider(overrides: Partial<SessionProvider> = {}): SessionProvider {
  return {
    signIn: async () => ({ userId: 'user-1', accessToken: 'initial-token', expiresAt: Date.now() + 60_000, scopes: ['design'] }),
    refresh: async () => ({ accessToken: 'refreshed-token', expiresAt: Date.now() + 60_000 }),
    signOut: async () => undefined,
    ...overrides,
  };
}

describe('SessionManager', () => {
  it('does not restore a token when refresh completes after sign-out', async () => {
    let finishRefresh!: (value: { accessToken: string; expiresAt: number; scopes?: string[] }) => void;
    const refresh = vi.fn(() => new Promise<{ accessToken: string; expiresAt: number }>(resolve => { finishRefresh = resolve; }));
    const provider = initialSessionProvider({
      signIn: async () => ({ userId: 'user-1', accessToken: 'expired-token', expiresAt: Date.now() - 1, scopes: [] }),
      refresh,
    });
    const session = new SessionManager(provider);
    await session.signIn('code');
    const pending = session.ensureFresh();
    expect(refresh).toHaveBeenCalledTimes(1);

    await session.signOut();
    finishRefresh({ accessToken: 'late-token', expiresAt: Date.now() + 60_000 });
    await expect(pending).rejects.toThrow(/session changed/i);
    expect(session.getSnapshot().status).toBe('signed-out');
    expect(session.getSnapshot()).not.toHaveProperty('accessToken');
    await expect(session.ensureFresh()).rejects.toThrow(/not authenticated/i);
  });

  it('does not commit a late sign-in result after sign-out', async () => {
    let finishSignIn!: (value: { userId: string; accessToken: string; expiresAt: number; scopes: string[] }) => void;
    const provider = initialSessionProvider({
      signIn: () => new Promise(resolve => { finishSignIn = resolve; }),
    });
    const session = new SessionManager(provider);
    const pendingSignIn = session.signIn('code');
    await session.signOut();
    finishSignIn({ userId: 'user-1', accessToken: 'late-token', expiresAt: Date.now() + 60_000, scopes: [] });
    await expect(pendingSignIn).rejects.toThrow(/cancelled/i);
    expect(session.getSnapshot().status).toBe('signed-out');
    expect(session.getSnapshot()).not.toHaveProperty('accessToken');
  });

  it('rejects malformed provider expiry data and clears the session', async () => {
    const session = new SessionManager(initialSessionProvider({
      signIn: async () => ({ userId: 'user-1', accessToken: 'token', expiresAt: Number.NaN, scopes: [] }),
    }));
    await expect(session.signIn('code')).rejects.toThrow(/sign-in failed/i);
    expect(session.getSnapshot().status).toBe('signed-out');
  });
});
