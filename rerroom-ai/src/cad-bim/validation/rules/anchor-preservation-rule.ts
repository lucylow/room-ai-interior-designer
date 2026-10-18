import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function AnchorPreservationRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // for each AI concept element used for layout, furniture, fixture, material, finish, or color, require a source anchor
  for(const e of overlay.elements) if(['layout-proposal','furniture','fixture','material','finish','color'].includes(e.kind) && !e.anchor) issues.push({severity:'warning',code:'UNANCHORED_CONCEPT',message:`Concept ${e.id} is not source-anchored.`});
  return issues;
}
