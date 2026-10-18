import type { SpatialScene } from '../src/visualization/core/types';
import type { SpatialAIRequest, SpatialAIProposal } from '../src/visualization/ai/contracts';
import { validateProposal } from '../src/visualization/ai/validator';
import { DemoSpatialAIProvider } from '../src/visualization/ai/demo-provider';

export interface VisualizationAIGate {
  request(scene: SpatialScene, goal: SpatialAIRequest['goal'], maxActions?: number): Promise<{
    proposal: SpatialAIProposal;
    approvedActions: SpatialAIProposal['actions'];
    rejectedActions: SpatialAIProposal['actions'];
  }>;
}

export function createVisualizationAIGate(): VisualizationAIGate {
  const provider = new DemoSpatialAIProvider();
  return {
    async request(scene, goal, maxActions = 3) {
      const proposal = await provider.propose({ scene, goal, maxActions, demo: true });
      const validations = validateProposal(scene, proposal.actions);
      const approvedActions = validations.filter(item => item.valid).map(item => item.action);
      const approvedIds = new Set(approvedActions.map(item => item.id));
      const rejectedActions = proposal.actions.filter(item => !approvedIds.has(item.id));
      return { proposal, approvedActions, rejectedActions };
    },
  };
}
