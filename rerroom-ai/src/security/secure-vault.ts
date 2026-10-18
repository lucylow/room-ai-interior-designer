import { decryptJson, encryptJson, type EncryptedEnvelope } from './crypto';
import { getSafeBrowserStorage, type KeyValueStorage } from './storage';

interface StoredVaultRecord {
  envelope: EncryptedEnvelope;
  updatedAt: number;
}

export class EncryptedBrowserVault {
  private unlocked = false;
  private passphrase?: string;
  private readonly storage: KeyValueStorage;

  constructor(
    private readonly prefix = 'rerroom:vault:',
    storage = getSafeBrowserStorage(),
  ) {
    this.storage = storage;
  }

  get isUnlocked(): boolean { return this.unlocked; }

  async unlock(passphrase: string): Promise<void> {
    const probe = this.storage.getItem(`${this.prefix}probe`);
    if (probe) {
      await decryptJson<{ ok: boolean }>(JSON.parse(probe) as EncryptedEnvelope, passphrase);
    } else {
      const envelope = await encryptJson({ ok: true }, passphrase, 'rerroom-vault-probe');
      this.storage.setItem(`${this.prefix}probe`, JSON.stringify(envelope));
    }
    this.passphrase = passphrase;
    this.unlocked = true;
  }

  lock(): void {
    this.passphrase = undefined;
    this.unlocked = false;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.requireUnlocked();
    const envelope = await encryptJson(value, this.passphrase!, `rerroom:${key}`);
    const record: StoredVaultRecord = { envelope, updatedAt: Date.now() };
    this.storage.setItem(`${this.prefix}${key}`, JSON.stringify(record));
  }

  async get<T>(key: string): Promise<T | null> {
    this.requireUnlocked();
    const raw = this.storage.getItem(`${this.prefix}${key}`);
    if (!raw) return null;
    const record = JSON.parse(raw) as StoredVaultRecord;
    return decryptJson<T>(record.envelope, this.passphrase!);
  }

  remove(key: string): void {
    this.storage.removeItem(`${this.prefix}${key}`);
  }

  destroy(): void {
    this.storage.removeItem(`${this.prefix}probe`);
    this.passphrase = undefined;
    this.unlocked = false;
    for (let i = 0; i < 50; i += 1) this.storage.removeItem(`${this.prefix}${i}`);
  }

  private requireUnlocked(): void {
    if (!this.unlocked || !this.passphrase) throw new Error('Privacy vault is locked.');
  }
}
