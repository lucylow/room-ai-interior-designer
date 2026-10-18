import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function CoordinateRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // use canonical z-up coordinates for normalized geometry
  if(model.document.coordinateSystem!=='canonical-z-up') issues.push({severity:'warning',code:'COORDINATE_REVIEW',message:'Model should be normalized before construction-facing export.'});
  return issues;
}
