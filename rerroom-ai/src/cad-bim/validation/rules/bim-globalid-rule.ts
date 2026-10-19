import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function BimGlobalidRule(model:AuthoritativeModel,_overlay:DesignOverlay,_pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // retain IFC GlobalId on BIM-derived entities when available
  for(const f of model.features) if(f.bimClass && f.authority==='authoritative' && !f.externalId) issues.push({severity:'warning',code:'MISSING_GLOBAL_ID',message:`BIM feature ${f.id} has no external id.`});
  return issues;
}
