import React from 'react';
import { privacyStore, requestDataExport, revokeNonEssentialConsent, updateRetention, setConsent } from '../state/domains/privacy-store';
import { useStoreSnapshot } from '../state/store';

export function PrivacyCenter() {
  const state = useStoreSnapshot(privacyStore);
  return (
    <section aria-labelledby="privacy-center-title" style={{ display: 'grid', gap: 16 }}>
      <header>
        <h2 id="privacy-center-title">Privacy Center</h2>
        <p>Control AI processing, cloud storage, analytics, sharing, retention, and data export.</p>
      </header>
      <div style={{ display: 'grid', gap: 8 }}>
        {state.consent.map((decision) => (
          <label key={decision.scope} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={decision.granted}
              disabled={decision.scope === 'local-storage' || decision.scope === 'diagnostics'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConsent({ ...decision, granted: event.target.checked, updatedAt: Date.now(), source: 'settings' })}
            />
            <span>{decision.scope.replace(/-/g, ' ')}</span>
          </label>
        ))}
      </div>
      <div>
        <h3>Retention</h3>
        <label>Room data days <input type="number" min={0} max={365} value={state.retention.roomDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRetention({ roomDays: Number(e.target.value) || 0 })} /></label>
        <label>Generated assets days <input type="number" min={0} max={365} value={state.retention.generatedAssetDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRetention({ generatedAssetDays: Number(e.target.value) || 0 })} /></label>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={revokeNonEssentialConsent}>Turn off optional processing</button>
        <button type="button" onClick={requestDataExport}>Request my data export</button>
      </div>
      <p aria-live="polite">Export status: {state.dataExports.status}</p>
    </section>
  );
}
