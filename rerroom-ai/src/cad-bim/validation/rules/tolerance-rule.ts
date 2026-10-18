import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function ToleranceRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // require finite positive tolerances on source dimensions
  for(const d of Object.values(model.dimensions)) if(!Number.isFinite(d.toleranceMeters) || d.toleranceMeters<=0) issues.push({severity:'warning',code:'MISSING_TOLERANCE',message:'A source dimension is missing a positive tolerance.'});
  return issues;
}
