import { AuthoritativeModel, DesignOverlay } from '../core/types';
import { resolveAnchor } from '../core/anchors';

export interface GroundingRow {
  elementId: string;
  anchor?: string;
  sourceKind?: string;
  sourceName?: string;
  confidence: number;
  grounded: boolean;
}

export class ConceptGroundingMap {
  build(model: AuthoritativeModel, overlay: DesignOverlay): GroundingRow[] {
    return overlay.elements.map(element => {
      if (!element.anchor) return { elementId: element.id, confidence: element.confidence, grounded: false };
      const source = resolveAnchor(model, element.anchor);
      return {
        elementId: element.id,
        anchor: element.anchor.sourceFeatureId,
        sourceKind: source?.kind,
        sourceName: source?.name,
        confidence: element.confidence * (source ? element.anchor.confidence : .2),
        grounded: !!source,
      };
    });
  }

  summarize(model: AuthoritativeModel, overlay: DesignOverlay): { grounded: number; ungrounded: number; confidence: number } {
    const rows = this.build(model, overlay);
    const grounded = rows.filter(r => r.grounded).length;
    const ungrounded = rows.length - grounded;
    const confidence = rows.length ? rows.reduce((s, r) => s + r.confidence, 0) / rows.length : 1;
    return { grounded, ungrounded, confidence };
  }
}
