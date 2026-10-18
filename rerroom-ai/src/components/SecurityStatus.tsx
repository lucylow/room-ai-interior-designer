import React from 'react';
import { privacyStore } from '../state/domains/privacy-store';
import { useStoreSnapshot } from '../state/store';

export function SecurityStatus() {
  const privacy = useStoreSnapshot(privacyStore);
  const label = !privacy.vault.enabled ? 'Privacy vault disabled' : privacy.vault.unlocked ? 'Privacy vault unlocked' : 'Privacy vault locked';
  return (
    <div role="status" aria-label={label} style={{ padding: 12, borderRadius: 12, border: '1px solid #ddd', display: 'flex', gap: 10, alignItems: 'center' }}>
      <span aria-hidden="true">{privacy.vault.unlocked ? '●' : '○'}</span>
      <div style={{ flex: 1 }}>
        <strong>{label}</strong>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{privacy.vault.enabled ? privacy.vault.unlocked ? 'Encrypted local vault is unlocked.' : 'Encrypted local vault is locked; app controls remain active.' : 'Optional encrypted local storage is off.'}</div>
      </div>
    </div>
  );
}
