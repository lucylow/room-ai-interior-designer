import { createExternalStore, type ExternalStore } from '../store';
import type { VisualAIPipelineOutput } from '../../visual-ai-v14/core/visual-ai-v14-engine';
import type { VisualInsight, VisualMetrics } from '../../visual-ai-v14/core/types';

export interface VisualRevisionRecord {
  id: string;
  roomId: string;
  conceptRevisionId: string;
  sourceRevision: string;
  recordedAt: number;
  metrics: VisualMetrics;
  regressionGate: VisualAIPipelineOutput['gate'];
  insights: VisualInsight[];
  syntheticDatasetRecords: number;
}

export interface VisualAIV14State {
  revisionsByRoom: Record<string, VisualRevisionRecord[]>;
}

export const visualAIV14Store: ExternalStore<VisualAIV14State> = createExternalStore({ revisionsByRoom: {} });

/** Attach deterministic visual QA to a concept revision without replacing CAD/BIM source geometry. */
export function recordVisualAIV14Revision(input: {
  roomId: string;
  conceptRevisionId: string;
  sourceRevision: string;
  result: Pick<VisualAIPipelineOutput, 'metrics' | 'gate' | 'insights' | 'dataset'>;
  recordedAt?: number;
}): VisualRevisionRecord {
  if (!input.roomId || !input.conceptRevisionId || !input.sourceRevision) {
    throw new Error('Visual revision records require room, concept, and source revision identifiers.');
  }
  const record: VisualRevisionRecord = {
    id: `${input.roomId}:${input.conceptRevisionId}`,
    roomId: input.roomId,
    conceptRevisionId: input.conceptRevisionId,
    sourceRevision: input.sourceRevision,
    recordedAt: input.recordedAt ?? Date.now(),
    metrics: { ...input.result.metrics },
    regressionGate: { ...input.result.gate },
    insights: input.result.insights.map((insight) => ({ ...insight, evidence: [...insight.evidence] })),
    syntheticDatasetRecords: input.result.dataset.length,
  };
  visualAIV14Store.setState((state) => {
    const previous = state.revisionsByRoom[input.roomId] ?? [];
    const next = [...previous.filter((item) => item.id !== record.id), record].slice(-50);
    return { ...state, revisionsByRoom: { ...state.revisionsByRoom, [input.roomId]: next } };
  });
  return record;
}

export function getVisualAIV14Revisions(roomId: string): VisualRevisionRecord[] {
  return visualAIV14Store.getSnapshot().revisionsByRoom[roomId] ?? [];
}

export function clearVisualAIV14Revisions(roomId: string): void {
  visualAIV14Store.setState((state) => {
    if (!(roomId in state.revisionsByRoom)) return state;
    const revisionsByRoom = { ...state.revisionsByRoom };
    delete revisionsByRoom[roomId];
    return { ...state, revisionsByRoom };
  });
}
