import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';

export interface HandoffChange { type: 'source' | 'overlay' | 'approval'; message: string; blocking: boolean; }

export class HandoffChangeDetector {
  detect(model: AuthoritativeModel, overlay: DesignOverlay, pkg?: HandoffPackage): HandoffChange[] {
    const changes: HandoffChange[] = [];
    if (pkg && pkg.sourceModelRevision !== model.importedRevision) changes.push({ type: 'source', message: 'The source revision changed after the handoff package was prepared.', blocking: true });
    if (pkg && pkg.approvedOverlayId !== overlay.id) changes.push({ type: 'overlay', message: 'The selected overlay differs from the approved overlay.', blocking: true });
    if (!overlay.isApproved) changes.push({ type: 'approval', message: 'The overlay is no longer marked approved.', blocking: true });
    if (overlay.unresolvedAnchors.length) changes.push({ type: 'overlay', message: 'Unresolved anchors remain in the overlay.', blocking: true });
    return changes;
  }
}
