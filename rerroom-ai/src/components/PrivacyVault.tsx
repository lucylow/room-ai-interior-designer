import { useEffect, useMemo, useState } from 'react';
import { EncryptedBrowserVault } from '../security/secure-vault';
import { privacyStore, setVaultBackend, setVaultEnabled, setVaultUnlocked } from '../state/domains/privacy-store';
import { useStoreSnapshot } from '../state/store';

export function PrivacyVault() {
  const privacy = useStoreSnapshot(privacyStore);
  const vault = useMemo(() => new EncryptedBrowserVault(), []);
  const [passphrase, setPassphrase] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => () => {
    vault.lock();
    setVaultUnlocked(false);
  }, [vault]);

  const enable = (enabled: boolean) => {
    if (!enabled) {
      vault.lock();
      setVaultUnlocked(false);
      setPassphrase('');
    } else {
      setVaultBackend('web-encrypted');
    }
    setVaultEnabled(enabled);
    setNotice(enabled ? 'Vault enabled. Choose a passphrase to unlock it.' : 'Vault disabled and locked.');
  };

  const unlock = async () => {
    try {
      await vault.unlock(passphrase);
      setVaultUnlocked(true);
      setNotice('Vault unlocked in memory. The passphrase is not saved.');
      setPassphrase('');
    } catch {
      setVaultUnlocked(false);
      setNotice('Could not unlock the vault. Use a passphrase of at least 12 characters and a secure browser context.');
    }
  };

  return (
    <section aria-labelledby="privacy-vault-title" style={{ display: 'grid', gap: 10, border: '1px solid #ddd', borderRadius: 16, padding: 16 }}>
      <div>
        <h3 id="privacy-vault-title">Encrypted local vault</h3>
        <p>Optional browser-only encryption for future opted-in records. No passphrase is uploaded or persisted.</p>
      </div>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input type="checkbox" checked={privacy.vault.enabled} onChange={(event) => enable(event.target.checked)} />
        Enable the local vault
      </label>
      {privacy.vault.enabled ? (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="password"
            autoComplete="new-password"
            minLength={12}
            value={passphrase}
            onChange={(event) => setPassphrase(event.target.value)}
            placeholder="Vault passphrase (12+ characters)"
            aria-label="Vault passphrase"
            disabled={privacy.vault.unlocked}
          />
          {privacy.vault.unlocked ? (
            <button type="button" onClick={() => { vault.lock(); setVaultUnlocked(false); setNotice('Vault locked.'); }}>Lock vault</button>
          ) : (
            <button type="button" onClick={unlock} disabled={passphrase.length < 12}>Unlock vault</button>
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite">{notice || (privacy.vault.enabled ? 'Locked until you enter your passphrase.' : 'Vault is off by default.')}</p>
      <small>Local AES-GCM encryption is one protection layer, not a substitute for secure server controls.</small>
    </section>
  );
}
