import type { SpatialAIProvider, SpatialAIRequest, SpatialAIProposal } from './contracts';
import { generateRecommendations } from './recommendations';
import { validateProposal } from './validator';

function actionId(seed: string, index: number): string {
  let hash = 2166136261;
  for (const char of `${seed}:${index}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `demo-action-${(hash >>> 0).toString(16)}`;
}

export class DemoSpatialAIProvider implements SpatialAIProvider {
  async propose(request: SpatialAIRequest): Promise<SpatialAIProposal> {
    const recommendations = generateRecommendations(request.scene);
    const actions = request.scene.objects
      .filter(item => item.visible && !item.locked)
      .slice(0, Math.min(request.maxActions, 3))
      .map((item, index) => ({
        id: actionId(request.scene.metadata.id, index),
        type: 'move' as const,
        targetId: item.id,
        dx: index % 2 === 0 ? 0.1 : -0.1,
        dz: index === 1 ? 0.1 : -0.05,
        reason: recommendations[0]?.explanation ?? 'Create a more balanced composition.',
      }));
    const validated = validateProposal(request.scene, actions);
    const safeActions = validated.filter(item => item.valid).map(item => item.action);
    return {
      requestId: `demo-spatial-${request.scene.metadata.version}`,
      summary: recommendations[0]?.title ?? 'Layout reviewed',
      actions: safeActions,
      confidence: 0.82,
      evidence: recommendations.slice(0, 3).map(item => item.explanation),
    };
  }
}
