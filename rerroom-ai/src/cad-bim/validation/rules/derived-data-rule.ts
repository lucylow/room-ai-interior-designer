import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function DerivedDataRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // mark derived quantities separately from authoritative dimensions
  for(const d of pkg?.dimensions||[]) if(d.verification==='unverified') issues.push({severity:'warning',code:'DERIVED_DIMENSION',message:`${d.label} is not verified.`});
  return issues;
}
