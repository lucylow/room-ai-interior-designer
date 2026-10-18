import { AuthoritativeModel, DesignOverlay } from '../core/types';

export interface ComparisonRow {
  id: string;
  sourceKind: string;
  anchored: boolean;
  visualChange: boolean;
  sourceDimensionsPreserved: boolean;
  note: string;
}

export class SourceVsConceptReport {
  compare(model: AuthoritativeModel, overlay: DesignOverlay): ComparisonRow[] {
    return model.features.map(feature => {
      const concepts = overlay.elements.filter(e => e.anchor?.sourceFeatureId === feature.id);
      const visualChange = concepts.some(e => Object.keys(e.appearance).length > 0 || !!e.transformDelta);
      const dimensionChange = concepts.some(e => e.dimensions && feature.size && JSON.stringify(e.dimensions) !== JSON.stringify(feature.size));
      return {
        id: feature.id,
        sourceKind: feature.kind,
        anchored: concepts.length > 0,
        visualChange,
        sourceDimensionsPreserved: !dimensionChange,
        note: dimensionChange ? 'Concept contains a dimensional proposal; source dimensions remain authoritative.' : 'No dimensional source mutation detected.',
      };
    });
  }

  unchangedCount(model: AuthoritativeModel, overlay: DesignOverlay): number {
    return this.compare(model, overlay).filter(r => r.sourceDimensionsPreserved).length;
  }
}
