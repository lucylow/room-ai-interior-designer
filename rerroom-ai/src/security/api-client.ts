import { SECURITY_CONSTANTS } from './constants';
import { requestId } from './ids';
import { SessionManager } from './session';

export interface APIEnvelope<T> {
  data: T | null;
  error: { code: string; message: string } | null;
  requestId: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly requestId: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface SecureApiClientOptions {
  baseUrl: string;
  session: SessionManager;
  fetchImpl?: typeof fetch;
}

const MAX_RESPONSE_CHARS = 2_000_000;
const SAFE_ERROR_CODE = /^[a-zA-Z0-9_.-]{1,64}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export class SecureApiClient {
  private readonly fetchImpl: typeof fetch;
  private readonly baseUrl: URL;

  constructor(private readonly options: SecureApiClientOptions) {
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.baseUrl = new URL(options.baseUrl);
    const localDevelopment = this.baseUrl.hostname === 'localhost' || this.baseUrl.hostname === '127.0.0.1' || this.baseUrl.hostname === '[::1]';
    if ((this.baseUrl.protocol !== 'https:' && !(this.baseUrl.protocol === 'http:' && localDevelopment)) ||
        this.baseUrl.username || this.baseUrl.password || this.baseUrl.hash) {
      throw new Error('SecureApiClient requires a credential-free HTTPS origin outside local development.');
    }
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    if (typeof path !== 'string' || path.length > 2048 || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
      throw new Error('API path must be a same-origin absolute path.');
    }
    const url = new URL(path, this.baseUrl);
    if (url.origin !== this.baseUrl.origin || url.username || url.password) {
      throw new Error('API path must remain within the configured API origin.');
    }

    const rid = requestId();
    const token = await this.options.session.ensureFresh();
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Accept', 'application/json');
    headers.set('X-Request-ID', rid);
    headers.set('X-Client-Version', 'room-security-1');

    const controller = new AbortController();
    const callerSignal = init.signal;
    let timedOut = false;
    const abortFromCaller = () => controller.abort();
    if (callerSignal?.aborted) controller.abort();
    else callerSignal?.addEventListener('abort', abortFromCaller, { once: true });
    const timeout = globalThis.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, SECURITY_CONSTANTS.requestTimeoutMs);

    try {
      const response = await this.fetchImpl(url, { ...init, headers, signal: controller.signal });
      const declaredLength = Number(response.headers.get('content-length'));
      if (Number.isFinite(declaredLength) && declaredLength > MAX_RESPONSE_CHARS) {
        throw new ApiError('The service returned an oversized response.', 'response_too_large', response.status, rid);
      }
      const text = await response.text();
      if (text.length > MAX_RESPONSE_CHARS) {
        throw new ApiError('The service returned an oversized response.', 'response_too_large', response.status, rid);
      }

      let envelope: unknown;
      try {
        envelope = JSON.parse(text);
      } catch {
        throw new ApiError('The service returned an invalid response.', 'invalid_envelope', response.status, rid);
      }
      if (!isRecord(envelope) || !Object.prototype.hasOwnProperty.call(envelope, 'data') ||
          !Object.prototype.hasOwnProperty.call(envelope, 'error') || typeof envelope.requestId !== 'string' ||
          (envelope.error !== null && (!isRecord(envelope.error) || typeof envelope.error.code !== 'string' || typeof envelope.error.message !== 'string'))) {
        throw new ApiError('The service returned an invalid response.', 'invalid_envelope', response.status, rid);
      }
      if (!response.ok || envelope.error !== null) {
        const remoteCode = isRecord(envelope.error) && typeof envelope.error.code === 'string' && SAFE_ERROR_CODE.test(envelope.error.code)
          ? envelope.error.code
          : 'request_failed';
        throw new ApiError('The request could not be completed.', remoteCode, response.status, rid);
      }
      return envelope.data as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (timedOut) throw new ApiError('The request took too long. Please try again.', 'timeout', 408, rid);
      if (callerSignal?.aborted) throw new ApiError('The request was cancelled.', 'aborted', 499, rid);
      throw new ApiError('We could not reach the service. Please check your connection.', 'network_error', 0, rid);
    } finally {
      clearTimeout(timeout);
      callerSignal?.removeEventListener('abort', abortFromCaller);
    }
  }
}
