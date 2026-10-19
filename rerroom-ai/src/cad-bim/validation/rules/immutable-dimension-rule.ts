import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function ImmutableDimensionRule(model:AuthoritativeModel,overlay:DesignOverlay,_pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // do not treat AI proposed dimensions as authoritative when source geometry exists
  for(const e of overlay.elements) if(e.dimensions && e.anchor) issues.push({severity:'info',code:'DIMENSION_GUARD',message:`Dimensions on ${e.id} are proposal values; authoritative source remains canonical.`});
  return issues;
}
