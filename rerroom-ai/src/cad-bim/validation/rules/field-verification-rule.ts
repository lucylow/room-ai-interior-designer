import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function FieldVerificationRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // flag scan-derived or estimated measurements for field verification
  for(const d of pkg?.dimensions||[]) if(d.verification==='unverified') issues.push({severity:'warning',code:'FIELD_VERIFY',message:`${d.label} should be verified in field conditions.`});
  return issues;
}
