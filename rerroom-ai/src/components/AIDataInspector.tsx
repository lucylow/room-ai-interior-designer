import React from 'react';
import type { SanitizedAIContext } from '../security/types';

export function AIDataInspector({ context }: { context: SanitizedAIContext | null }) {
  if (!context) return <div role="note">No AI context prepared.</div>;
  return (
    <section aria-labelledby="ai-data-inspector-title" style={{ border: '1px solid #ddd', borderRadius: 16, padding: 16 }}>
      <h3 id="ai-data-inspector-title">AI data inspector</h3>
      <p>Purpose: {context.purpose}</p>
      <p>Policy: {context.policyVersion}</p>
      <div style={{ display: 'grid', gap: 8 }}>
        {context.fields.map((field) => (
          <div key={field.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px', gap: 8 }}>
            <span>{field.name}</span><span>{field.dataClass}</span><span>{field.sensitivity}</span><span>{field.redacted ? 'redacted' : 'original'}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
