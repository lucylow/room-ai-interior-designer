import { AuthoritativeModel, DesignOverlay } from '../core/types';

export interface ImpactRow {
  featureId: string;
  status: 'safe' | 'review' | 'blocked';
  reasons: string[];
  referencedBy: string[];
}

export class SourceChangeImpactAnalyzer {
  analyze(model: AuthoritativeModel, overlay: DesignOverlay, changedFeatureIds: string[]): ImpactRow[] {
    const changed = new Set(changedFeatureIds);
    const rows: ImpactRow[] = [];

    for (const feature of model.features) {
      const referencedBy = overlay.elements
        .filter(element => element.anchor?.sourceFeatureId === feature.id)
        .map(element => element.id);
      const reasons: string[] = [];
      let status: ImpactRow['status'] = 'safe';

      if (changed.has(feature.id)) {
        reasons.push('Source feature changed in the incoming CAD/BIM revision.');
        status = 'review';
      }

      if (feature.kind === 'column' || feature.kind === 'beam') {
        reasons.push('Structural source feature requires explicit review before any removal or relocation.');
        status = status === 'safe' ? 'review' : status;
      }

      if (referencedBy.length > 0) {
        reasons.push(`Referenced by ${referencedBy.length} overlay element(s).`);
      }

      if (changed.has(feature.id) && referencedBy.length > 0 && feature.authority === 'authoritative') {
        status = 'blocked';
        reasons.push('Authoritative geometry changed while an approved concept still references it.');
      }

      rows.push({ featureId: feature.id, status, reasons, referencedBy });
    }

    return rows;
  }

  impactedOverlayElements(model: AuthoritativeModel, overlay: DesignOverlay, changedFeatureIds: string[]): string[] {
    const changed = new Set(changedFeatureIds);
    return overlay.elements
      .filter(element => !!element.anchor && changed.has(element.anchor.sourceFeatureId))
      .map(element => element.id);
  }
}
