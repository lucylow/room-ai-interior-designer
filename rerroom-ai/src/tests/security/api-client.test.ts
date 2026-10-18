import { describe, expect, it, vi } from 'vitest';
import { ApiError, SecureApiClient } from '../../security/api-client';
import { SessionManager, type SessionProvider } from '../../security/session';

function authenticatedSession() {
  const provider: SessionProvider = {
    signIn: async () => ({ userId: 'user-1', accessToken: 'test-access-token', expiresAt: Date.now() + 60_000, scopes: [] }),
    refresh: async () => ({ accessToken: 'refreshed-token', expiresAt: Date.now() + 60_000 }),
    signOut: async () => undefined,
  };
  const session = new SessionManager(provider);
  return session.signIn('test-code').then(() => session);
}

const okEnvelope = { data: { ok: true }, error: null, requestId: 'server-request-id' };

describe('SecureApiClient', () => {
  it('rejects protocol-relative paths before sending an Authorization header', async () => {
    const session = await authenticatedSession();
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(okEnvelope))) as unknown as typeof fetch;
    const client = new SecureApiClient({ baseUrl: 'https://api.example.test', session, fetchImpl });
    await expect(client.request('//attacker.example/collect')).rejects.toThrow(/same-origin/i);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('does not expose a remote error message that could contain credentials', async () => {
    const session = await authenticatedSession();
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ data: null, error: { code: 'bad_request', message: 'Bearer top-secret-value' }, requestId: 'server-id' }), { status: 500 })) as unknown as typeof fetch;
    const client = new SecureApiClient({ baseUrl: 'https://api.example.test', session, fetchImpl });
    const request = client.request('/private');
    await expect(request).rejects.toMatchObject({ name: 'ApiError', code: 'bad_request', message: 'The request could not be completed.' });
    await expect(request).rejects.not.toThrow('top-secret-value');
  });

  it('rejects malformed API envelopes instead of returning unchecked values', async () => {
    const session = await authenticatedSession();
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ data: { ok: true } }))) as unknown as typeof fetch;
    const client = new SecureApiClient({ baseUrl: 'https://api.example.test', session, fetchImpl });
    await expect(client.request('/private')).rejects.toMatchObject({ code: 'invalid_envelope' });
  });

  it('propagates caller abort as a safe cancellation error', async () => {
    const session = await authenticatedSession();
    const fetchImpl: typeof fetch = ((_input: RequestInfo | URL, init?: RequestInit) => new Promise<Response>((_resolve, reject) => {
      const abort = () => reject(new DOMException('Aborted', 'AbortError'));
      if (init?.signal?.aborted) abort();
      else init?.signal?.addEventListener('abort', abort, { once: true });
    })) as typeof fetch;
    const client = new SecureApiClient({ baseUrl: 'https://api.example.test', session, fetchImpl });
    const controller = new AbortController();
    const request = client.request('/private', { signal: controller.signal });
    controller.abort();
    await expect(request).rejects.toBeInstanceOf(ApiError);
    await expect(request).rejects.toMatchObject({ code: 'aborted', status: 499 });
  });
});
