import type { SpatialScene } from '../core/types';
import type { SpatialAIRequest, SpatialAIProposal } from '../ai/contracts';
import { validateProposal } from '../ai/validator';
import { DemoSpatialAIProvider } from '../ai/demo-provider';
import { privacyConsentRegistry } from '../../state/domains/privacy-store';

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
      if (!privacyConsentRegistry.get('ai-processing')) {
        throw new Error('AI processing consent is required before requesting layout recommendations.');
      }
      // This provider is deterministic and local-only; it never sends the scene to a server.
      const proposal = await provider.propose({ scene, goal, maxActions, demo: true });
      const validations = validateProposal(scene, proposal.actions);
      const approvedActions = validations.filter((item) => item.valid).map((item) => item.action);
      const approvedIds = new Set(approvedActions.map((item) => item.id));
      const rejectedActions = proposal.actions.filter((item) => !approvedIds.has(item.id));
      return { proposal, approvedActions, rejectedActions };
    },
  };
}
