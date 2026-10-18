import { DesignOverlay } from '../core/types';

export interface OverlayBranch { id: string; label: string; parentId?: string; active: boolean; overlayIds: string[]; }

export class IterationBranchManager {
  private branches: OverlayBranch[] = [];

  create(label: string, parent?: DesignOverlay): OverlayBranch {
    const branch: OverlayBranch = { id: `branch_${Date.now()}_${this.branches.length}`, label, parentId: parent?.id, active: true, overlayIds: parent ? [parent.id] : [] };
    this.branches.push(branch);
    return branch;
  }

  attach(branchId: string, overlay: DesignOverlay): void {
    const branch = this.branches.find(b => b.id === branchId);
    if (!branch) throw new Error('Branch not found');
    if (overlay.parentOverlayId && !branch.overlayIds.includes(overlay.parentOverlayId)) throw new Error('Overlay parent is not part of branch lineage.');
    branch.overlayIds.push(overlay.id);
  }

  activate(branchId: string): void { for (const b of this.branches) b.active = b.id === branchId; }
  active(): OverlayBranch | undefined { return this.branches.find(b => b.active); }
  all(): OverlayBranch[] { return JSON.parse(JSON.stringify(this.branches)); }
}
