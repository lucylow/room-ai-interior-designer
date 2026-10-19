export class ProviderRequestError extends Error {
  constructor(
    readonly provider: string,
    readonly code: 'invalid_request' | 'timeout' | 'network_failure' | 'http_failure' | 'invalid_json',
    readonly retryable: boolean,
    readonly status?: number,
  ) {
    super(`${provider}_${code}${status ? `_${status}` : ''}`);
    this.name = 'ProviderRequestError';
  }
}

export async function requestJson<T>(
  provider: string,
  url: string,
  init: RequestInit,
  fetcher: typeof fetch = fetch,
  timeoutMs = 10_000,
): Promise<T> {
  if (!Number.isFinite(timeoutMs) || timeoutMs < 1) throw new ProviderRequestError(provider, 'invalid_request', false);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(url, { ...init, signal: controller.signal });
    if (!response.ok) {
      const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
      throw new ProviderRequestError(provider, 'http_failure', retryable, response.status);
    }
    try {
      const body: unknown = await response.json();
      if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('json_object_required');
      return body as T;
    } catch {
      throw new ProviderRequestError(provider, 'invalid_json', false, response.status);
    }
  } catch (error) {
    if (error instanceof ProviderRequestError) throw error;
    if (controller.signal.aborted) throw new ProviderRequestError(provider, 'timeout', true);
    throw new ProviderRequestError(provider, 'network_failure', true);
  } finally {
    clearTimeout(timer);
  }
}
