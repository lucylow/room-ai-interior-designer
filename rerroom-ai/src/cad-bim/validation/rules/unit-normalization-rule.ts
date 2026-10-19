import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function UnitNormalizationRule(model:AuthoritativeModel,_overlay:DesignOverlay,_pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // require a positive conversion factor into canonical meters
  if(!Number.isFinite(model.document.sourceUnitScaleToMeters) || model.document.sourceUnitScaleToMeters<=0) issues.push({severity:'error',code:'INVALID_UNIT_SCALE',message:'Source unit scale must be positive.'});
  return issues;
}
