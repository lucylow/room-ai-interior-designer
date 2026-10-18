import React, { useMemo, useState } from 'react';
import type { SpatialScene } from '../core/types';
import { validateProposal } from '../ai/validator';
import { createVisualizationAIGate } from '../integration/ai-gate';

export function AISpatialSuggestions({
  scene,
  onPreview,
  aiEnabled = false,
  onRequireConsent,
}: {
  scene: SpatialScene;
  onPreview?: (scene: SpatialScene) => void;
  aiEnabled?: boolean;
  onRequireConsent?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('Ask AI to review the current layout.');
  const gate = useMemo(() => createVisualizationAIGate(), []);

  async function run() {
    if (!aiEnabled) {
      setSummary('AI layout review is off until AI-processing consent is granted.');
      onRequireConsent?.();
      return;
    }
    setLoading(true);
    try {
      const result = await gate.request(scene, 'improve-circulation', 3);
      const checks = validateProposal(scene, result.approvedActions);
      const next = checks.reduce((current, check) => check.valid && check.preview ? check.preview : current, scene);
      setSummary(`${result.proposal.summary} · ${result.approvedActions.length} approved, ${result.rejectedActions.length} blocked`);
      onPreview?.(next);
    } catch (error) {
      setSummary(error instanceof Error ? error.message : 'AI layout review was blocked.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside aria-label="AI spatial suggestions" style={{ padding: 14, background: '#FFF', border: '1px solid #E2E3E8', borderRadius: 14 }}>
      <strong>AI Layout Review</strong>
      <p style={{ color: '#6D7280', fontSize: 13 }}>{summary}</p>
      <button type="button" onClick={run} disabled={loading}>
        {loading ? 'Reviewing…' : aiEnabled ? 'Review layout' : 'Enable AI in Privacy settings'}
      </button>
    </aside>
  );
}
