import type { SpatialScene } from '../core/types';
import { focalPoint } from '../core/focal-point';
import { objectPlanCenter } from '../core/transform';
import { scoreLayout } from './layout-heuristics';

export interface DesignRecommendation {
  id: string;
  title: string;
  explanation: string;
  priority: 'low' | 'medium' | 'high';
  targetIds: string[];
}

export function generateRecommendations(scene: SpatialScene): DesignRecommendation[] {
  const score = scoreLayout(scene);
  const focal = focalPoint(scene);
  const recommendations: DesignRecommendation[] = [];
  if (score.collisionFree < 0.9) {
    recommendations.push({
      id: 'collision-cleanup',
      title: 'Clear blocked paths',
      explanation: 'Move overlapping pieces apart before fine styling.',
      priority: 'high',
      targetIds: scene.objects.filter(item => item.visible).map(item => item.id),
    });
  }
  if (score.openness < 0.45) {
    recommendations.push({
      id: 'open-center',
      title: 'Open the center',
      explanation: 'Reduce visual density around the primary circulation zone.',
      priority: 'medium',
      targetIds: scene.objects
        .filter(item => item.visible)
        .sort((a, b) => {
          const da = Math.hypot(objectPlanCenter(a).x - focal.x, objectPlanCenter(a).y - focal.y);
          const db = Math.hypot(objectPlanCenter(b).x - focal.x, objectPlanCenter(b).y - focal.y);
          return da - db;
        })
        .slice(0, 2)
        .map(item => item.id),
    });
  }
  if (score.balance < 0.6) {
    recommendations.push({
      id: 'balance-mass',
      title: 'Balance the room',
      explanation: 'Redistribute large pieces so the plan reads evenly from multiple viewpoints.',
      priority: 'medium',
      targetIds: scene.objects.filter(item => item.visible).slice(0, 3).map(item => item.id),
    });
  }
  if (!recommendations.length) {
    recommendations.push({
      id: 'presentation-pass',
      title: 'Create a presentation view',
      explanation: 'The layout is coherent; switch to a hero camera and review materials.',
      priority: 'low',
      targetIds: scene.objects.filter(item => item.visible).slice(0, 1).map(item => item.id),
    });
  }
  return recommendations;
}
