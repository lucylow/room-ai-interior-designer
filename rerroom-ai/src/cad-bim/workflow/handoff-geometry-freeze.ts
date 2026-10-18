import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';

export interface GeometryFreeze {
  modelId: string;
  revision: string;
  hash: string;
  lockedFeatureIds: string[];
  createdAt: string;
}

export class HandoffGeometryFreeze {
  create(model: AuthoritativeModel, overlay: DesignOverlay, pkg: HandoffPackage): GeometryFreeze {
    if (!overlay.isApproved) throw new Error('Overlay must be approved before geometry freeze.');
    if (pkg.approvedOverlayId !== overlay.id) throw new Error('Package approval does not match overlay.');
    if (pkg.sourceModelRevision !== model.importedRevision) throw new Error('Package revision does not match source revision.');
    return {
      modelId: model.id,
      revision: model.importedRevision,
      hash: model.immutableGeometryHash,
      lockedFeatureIds: model.features.filter(f => f.authority === 'authoritative').map(f => f.id),
      createdAt: new Date().toISOString(),
    };
  }

  verify(model: AuthoritativeModel, freeze: GeometryFreeze): boolean {
    return model.id === freeze.modelId && model.importedRevision === freeze.revision && model.immutableGeometryHash === freeze.hash;
  }
}
