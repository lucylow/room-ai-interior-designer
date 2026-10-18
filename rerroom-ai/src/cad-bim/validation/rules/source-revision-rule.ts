import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function SourceRevisionRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // carry the authoritative source revision into every handoff
  if(pkg && pkg.sourceModelRevision!==model.importedRevision) issues.push({severity:'error',code:'REVISION_MISMATCH',message:'Handoff revision does not match current source revision.'});
  return issues;
}
