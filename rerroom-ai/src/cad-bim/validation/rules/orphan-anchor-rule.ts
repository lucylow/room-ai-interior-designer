import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function OrphanAnchorRule(model:AuthoritativeModel,overlay:DesignOverlay,_pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // block release when the overlay contains unresolved anchors
  for(const id of overlay.unresolvedAnchors) issues.push({severity:'error',code:'ORPHAN_ANCHOR',message:`Unresolved anchor ${id}`});
  return issues;
}
