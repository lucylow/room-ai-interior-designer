import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface RotationSessionResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runRotationSession(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):RotationSessionResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Manages continuous furniture rotation with snap increments.']};
  return {id:`RotationSession-`+candidate.id,ok:candidate.conflicts.length===0,message:'Manages continuous furniture rotation with snap increments.',next,warnings};
}
