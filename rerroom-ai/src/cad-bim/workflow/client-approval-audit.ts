import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';

export interface ApprovalAudit {
  overlayId: string;
  sourceRevision: string;
  sourceHash: string;
  approvedAt: string;
  approvedBy: string;
  warnings: string[];
  immutableSource: boolean;
}

export class ClientApprovalAudit {
  create(model: AuthoritativeModel, overlay: DesignOverlay, approvedBy: string): ApprovalAudit {
    const warnings: string[] = [];
    if (!overlay.isApproved) warnings.push('Approval record created before overlay approval flag was set.');
    if (overlay.authoritativeModelId !== model.id) warnings.push('Overlay/model association is inconsistent.');
    if (overlay.unresolvedAnchors.length) warnings.push('Unresolved anchors are present.');
    return {
      overlayId: overlay.id,
      sourceRevision: model.importedRevision,
      sourceHash: model.immutableGeometryHash,
      approvedAt: new Date().toISOString(),
      approvedBy,
      warnings,
      immutableSource: true,
    };
  }

  verifyAgainstHandoff(audit: ApprovalAudit, pkg: HandoffPackage): boolean {
    return audit.overlayId === pkg.approvedOverlayId && audit.sourceRevision === pkg.sourceModelRevision;
  }
}
