import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface PlacementLocksResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runPlacementLocks(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):PlacementLocksResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Locks designer-approved concept placements against accidental edits.']};
  return {id:`PlacementLocks-`+candidate.id,ok:candidate.conflicts.length===0,message:'Locks designer-approved concept placements against accidental edits.',next,warnings};
}
