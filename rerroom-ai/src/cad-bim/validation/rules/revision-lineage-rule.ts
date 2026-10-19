import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function RevisionLineageRule(model:AuthoritativeModel,overlay:DesignOverlay,_pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // require parent overlay lineage for iterative AI revisions
  if(overlay.version>1 && !overlay.parentOverlayId) issues.push({severity:'warning',code:'MISSING_LINEAGE',message:'Iterative overlay has no parent overlay.'});
  return issues;
}
