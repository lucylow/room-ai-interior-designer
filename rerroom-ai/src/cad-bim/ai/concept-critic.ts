import { AuthoritativeModel, DesignOverlay, ValidationIssue } from '../core/types';
import { resolveAnchor } from '../core/anchors';
export interface ConceptCritique { score:number; issues:ValidationIssue[]; notes:string[]; }
export class ConceptCritic {
  critique(model:AuthoritativeModel,overlay:DesignOverlay):ConceptCritique{const issues:ValidationIssue[]=[];let score=1;for(const e of overlay.elements){if(e.anchor&&!resolveAnchor(model,e.anchor)){issues.push({severity:'error',code:'BROKEN_ANCHOR',message:`${e.id} has no valid source feature`,featureId:e.anchor.sourceFeatureId});score-=.2;}if(!e.reasoning) {issues.push({severity:'warning',code:'NO_REASONING',message:`${e.id} has no rationale`});score-=.03;}if(e.confidence<.6)score-=.05;}return {score:Math.max(0,score),issues,notes:['Aesthetic critique is separate from dimensional truth.','Approval should not imply permit or engineering review.']};}
}
