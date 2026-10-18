import type { SpatialScene } from '../core/types';

export type SpatialAction =
  | { id: string; type: 'move'; targetId: string; dx: number; dz: number; reason: string }
  | { id: string; type: 'rotate'; targetId: string; rotationY: number; reason: string }
  | { id: string; type: 'resize'; targetId: string; width: number; depth: number; reason: string }
  | { id: string; type: 'hide'; targetId: string; reason: string }
  | { id: string; type: 'highlight'; targetId: string; reason: string };

export interface SpatialAIRequest {
  scene: SpatialScene;
  goal: 'improve-circulation' | 'balance-layout' | 'focus' | 'make-cozier' | 'make-airier';
  maxActions: number;
  demo: boolean;
}

export interface SpatialAIProposal {
  requestId: string;
  summary: string;
  actions: SpatialAction[];
  confidence: number;
  evidence: string[];
}

export interface SpatialAIProvider {
  propose(request: SpatialAIRequest): Promise<SpatialAIProposal>;
}

export interface SpatialObjectDescription {
  id: string;
  label: string;
  type: string;
  center: { x: number; y: number; z: number };
  footprintM2: number;
  selected: boolean;
}
