import { sha256Hex } from './crypto';

export async function bodyDigest(body: unknown): Promise<string> {
  return sha256Hex(JSON.stringify(body ?? null));
}

export interface IntegrityMetadata {
  requestId: string;
  bodyHash: string;
  sentAt: number;
  nonce: string;
}

export async function createIntegrityMetadata(requestId: string, body: unknown, nonce: string): Promise<IntegrityMetadata> {
  return { requestId, bodyHash: await bodyDigest(body), sentAt: Date.now(), nonce };
}
