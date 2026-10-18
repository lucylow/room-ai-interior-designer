import { SECURITY_CONSTANTS } from './constants';
import { base64ToBytes, bytesToBase64, decodeUtf8, utf8 } from './encoding';

export interface EncryptedEnvelope {
  v: 1;
  alg: 'PBKDF2-SHA256/AES-256-GCM';
  salt: string;
  iv: string;
  ciphertext: string;
  aad?: string;
}

function requireCrypto(): Crypto {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Web Crypto is unavailable. Use HTTPS or a secure local environment.');
  }
  return globalThis.crypto;
}

/** Copy into an owned ArrayBuffer for Web Crypto's stricter DOM typings. */
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export async function deriveVaultKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  if (passphrase.length < 12) throw new Error('Vault passphrase must be at least 12 characters.');
  const c = requireCrypto();
  const material = await c.subtle.importKey('raw', toArrayBuffer(utf8(passphrase)), 'PBKDF2', false, ['deriveKey']);
  return c.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: toArrayBuffer(salt),
      iterations: SECURITY_CONSTANTS.vaultPBKDF2Iterations,
      hash: 'SHA-256',
    },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptJson(
  value: unknown,
  passphrase: string,
  aad?: string,
): Promise<EncryptedEnvelope> {
  const c = requireCrypto();
  const salt = c.getRandomValues(new Uint8Array(SECURITY_CONSTANTS.vaultSaltBytes));
  const iv = c.getRandomValues(new Uint8Array(SECURITY_CONSTANTS.aesIvBytes));
  const key = await deriveVaultKey(passphrase, salt);
  const additionalData = aad ? utf8(aad) : undefined;
  const ciphertext = await c.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: toArrayBuffer(iv),
      additionalData: additionalData ? toArrayBuffer(additionalData) : undefined,
      tagLength: 128,
    },
    key,
    toArrayBuffer(utf8(JSON.stringify(value))),
  );
  return {
    v: 1,
    alg: 'PBKDF2-SHA256/AES-256-GCM',
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
    aad,
  };
}

export async function decryptJson<T>(
  envelope: EncryptedEnvelope,
  passphrase: string,
): Promise<T> {
  if (envelope.v !== 1 || envelope.alg !== 'PBKDF2-SHA256/AES-256-GCM') {
    throw new Error('Unsupported encrypted envelope version.');
  }
  const c = requireCrypto();
  const key = await deriveVaultKey(passphrase, base64ToBytes(envelope.salt));
  const plaintext = await c.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: toArrayBuffer(base64ToBytes(envelope.iv)),
      additionalData: envelope.aad ? toArrayBuffer(utf8(envelope.aad)) : undefined,
      tagLength: 128,
    },
    key,
    toArrayBuffer(base64ToBytes(envelope.ciphertext)),
  );
  return JSON.parse(decodeUtf8(new Uint8Array(plaintext))) as T;
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await requireCrypto().subtle.digest('SHA-256', toArrayBuffer(utf8(value)));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
