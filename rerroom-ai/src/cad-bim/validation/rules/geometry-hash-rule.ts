import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function GeometryHashRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // ensure handoff revision matches the authoritative model revision
  if(pkg && pkg.sourceModelRevision!==model.importedRevision) issues.push({severity:'error',code:'SOURCE_REVISION_MISMATCH',message:'Current model differs from the source revision recorded at approval.'});
  return issues;
}
