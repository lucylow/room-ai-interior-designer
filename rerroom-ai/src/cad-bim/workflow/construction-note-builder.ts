import { AuthoritativeModel, DesignOverlay } from '../core/types';

export interface ConstructionNote {
  id: string;
  sourceFeatureId?: string;
  category: string;
  text: string;
  provenance: 'source' | 'ai' | 'designer';
  verificationRequired: boolean;
}

export class ConstructionNoteBuilder {
  build(model: AuthoritativeModel, overlay: DesignOverlay): ConstructionNote[] {
    return overlay.elements.map((element, index) => {
      const source = element.anchor ? model.features.find(f => f.id === element.anchor!.sourceFeatureId) : undefined;
      const structural = source?.kind === 'wall' || source?.kind === 'column' || source?.kind === 'beam';
      return {
        id: `note_${index + 1}_${element.id}`,
        sourceFeatureId: source?.id,
        category: element.kind,
        text: structural
          ? `Review the proposed ${element.semanticType} against existing ${source?.kind} geometry before construction.`
          : element.reasoning || 'Review visual intent against source model.',
        provenance: element.source === 'designer' ? 'designer' : element.source === 'ai' ? 'ai' : 'source',
        verificationRequired: element.source !== 'designer' || structural,
      };
    });
  }
}
