import { AuthoritativeModel, DesignOverlay } from '../core/types';
import { ConceptCritic } from './concept-critic';
export interface ApprovalReadiness { ready:boolean; score:number; reasons:string[]; blockers:string[]; }
export function assessApprovalReadiness(model:AuthoritativeModel,overlay:DesignOverlay):ApprovalReadiness{const c=new ConceptCritic().critique(model,overlay);const blockers=c.issues.filter(x=>x.severity==='error').map(x=>x.message);const reasons=['Authoritative model remains unchanged','Overlay elements retain source anchors'];if(overlay.unresolvedAnchors.length)blockers.push('Unresolved anchors remain');return {ready:blockers.length===0&&c.score>=.8,score:c.score,reasons,blockers};}
