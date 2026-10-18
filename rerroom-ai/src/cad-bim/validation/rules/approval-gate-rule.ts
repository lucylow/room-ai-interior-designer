import { AuthoritativeModel, DesignOverlay, HandoffPackage, ValidationIssue } from '../../core/types';
export function ApprovalGateRule(model:AuthoritativeModel,overlay:DesignOverlay,pkg?:HandoffPackage):ValidationIssue[] {
  const issues:ValidationIssue[]=[];
  // require the approved overlay id to match the overlay being handed off
  if(pkg && pkg.approvedOverlayId!==overlay.id) issues.push({severity:'error',code:'APPROVAL_GATE',message:'Handoff overlay is not the approved overlay.'});
  return issues;
}
