import { AuthoritativeModel, DesignOverlay, SourceFeature, Vec3 } from '../core/types';

export interface FenceDecision {
  featureId: string;
  canMove: boolean;
  canResize: boolean;
  canRestyle: boolean;
  reason: string;
}

export class GeometryAuthorityFence {
  evaluate(model: AuthoritativeModel, overlay: DesignOverlay): FenceDecision[] {
    const decisions: FenceDecision[] = [];
    const anchored = new Set(overlay.elements.filter(e => e.anchor).map(e => e.anchor!.sourceFeatureId));
    for (const feature of model.features) {
      const structural = feature.kind === 'wall' || feature.kind === 'column' || feature.kind === 'beam' || feature.kind === 'opening';
      const anchoredByConcept = anchored.has(feature.id);
      decisions.push({
        featureId: feature.id,
        canMove: !structural && !anchoredByConcept,
        canResize: !structural && !feature.bimClass,
        canRestyle: true,
        reason: structural ? 'Authoritative architectural/structural geometry remains locked.' : 'Feature can be styled without changing source geometry.',
      });
    }
    return decisions;
  }

  isSourceGeometry(value: unknown): boolean {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<SourceFeature>;
    return typeof candidate.id === 'string' && typeof candidate.sourceDocumentId === 'string' && typeof candidate.kind === 'string';
  }

  rejectMutation(feature: SourceFeature, proposed: Partial<SourceFeature>): string | undefined {
    if (feature.authority !== 'authoritative') return undefined;
    for (const key of ['center', 'size', 'geometry2d', 'transform'] as const) {
      if (proposed[key] !== undefined && JSON.stringify(proposed[key]) !== JSON.stringify(feature[key])) {
        return `Mutation of authoritative ${key} is not allowed for feature ${feature.id}.`;
      }
    }
    return undefined;
  }
}
