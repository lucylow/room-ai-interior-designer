import React from 'react';
import { privacyStore, setConsent } from '../state/domains/privacy-store';
import { useStoreSnapshot } from '../state/store';

export function ConsentBanner() {
  const privacy = useStoreSnapshot(privacyStore);
  const ai = privacy.consent.find((x) => x.scope === 'ai-processing');
  if (ai?.granted) return null;
  return (
    <aside role="dialog" aria-label="AI privacy choice" style={{ padding: 16, border: '1px solid #bbb', borderRadius: 16 }}>
      <strong>Choose how Room AI handles design data</strong>
      <p style={{ margin: '8px 0' }}>AI processing stays off until you enable it. You can change the choice in Settings.</p>
      <button type="button" onClick={() => setConsent({ scope: 'ai-processing', granted: true, updatedAt: Date.now(), source: 'feature-prompt', version: 1 })}>Enable AI processing</button>
    </aside>
  );
}
