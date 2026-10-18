import { describe, expect, it } from 'vitest';
import { encryptJson, decryptJson, sha256Hex } from '../../security/crypto';

describe('crypto', () => {
  it('encrypts and decrypts a JSON payload', async () => {
    const input = { roomId: 'room-1', note: 'warm modern', nested: { value: 42 } };
    const envelope = await encryptJson(input, 'correct horse battery staple', 'test-aad');
    expect(await decryptJson(envelope, 'correct horse battery staple')).toEqual(input);
  });

  it('rejects the wrong passphrase', async () => {
    const envelope = await encryptJson({ ok: true }, 'correct horse battery staple');
    await expect(decryptJson(envelope, 'different passphrase')).rejects.toBeTruthy();
  });

  it('produces a stable SHA-256 digest', async () => {
    expect(await sha256Hex('hello')).toBe(await sha256Hex('hello'));
    expect(await sha256Hex('hello')).not.toBe(await sha256Hex('HELLO'));
  });
});
