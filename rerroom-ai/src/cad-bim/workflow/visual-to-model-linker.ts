import { AuthoritativeModel, AnchorReference, DesignOverlay, ConceptElement, SourceFeature } from '../core/types';
import { rectanglePolygon } from '../core/geometry';

export interface VisualCandidate {
  label: string;
  center: { x: number; y: number; z: number };
  width: number;
  depth: number;
  confidence: number;
}

export class VisualToModelLinker {
  link(model: AuthoritativeModel, overlay: DesignOverlay, candidates: VisualCandidate[]): ConceptElement[] {
    return candidates.map((candidate, index) => {
      const source = this.closest(model.features, candidate);
      const anchor: AnchorReference | undefined = source ? {
        sourceDocumentId: model.document.id,
        sourceFeatureId: source.id,
        externalId: source.externalId,
        confidence: candidate.confidence,
      } : undefined;
      return {
        id: `visual_link_${Date.now()}_${index}`,
        anchor,
        kind: anchor ? 'furniture' : 'aesthetic',
        semanticType: candidate.label,
        transformDelta: anchor && source?.center ? {
          position: {
            x: candidate.center.x - source.center.x,
            y: candidate.center.y - source.center.y,
            z: candidate.center.z - source.center.z,
          },
        } : undefined,
        dimensions: { width: candidate.width, depth: candidate.depth, height: 1 },
        appearance: {},
        reasoning: anchor ? 'Linked to nearest source feature as a reversible visual proposal.' : 'Illustrative visual object without sufficient source evidence.',
        confidence: candidate.confidence,
        source: 'ai',
      };
    });
  }

  footprint(candidate: VisualCandidate) {
    return rectanglePolygon({ x: candidate.center.x, y: candidate.center.y }, { width: candidate.width, depth: candidate.depth, height: 0 });
  }

  private closest(features: SourceFeature[], candidate: VisualCandidate): SourceFeature | undefined {
    let best: SourceFeature | undefined;
    let distance = Infinity;
    for (const feature of features) {
      if (!feature.center) continue;
      const d = Math.hypot(feature.center.x - candidate.center.x, feature.center.y - candidate.center.y);
      if (d < distance && d < 2.5) { distance = d; best = feature; }
    }
    return best;
  }
}
