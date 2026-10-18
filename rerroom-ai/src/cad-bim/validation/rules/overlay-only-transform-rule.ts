import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function OverlayOnlyTransformRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // store AI transformations as overlay deltas instead of modifying source geometry
  for(const e of overlay.elements) if(e.anchor && e.transformDelta===undefined) { /* appearance-only overlay is safe */ }
  return issues;
}
