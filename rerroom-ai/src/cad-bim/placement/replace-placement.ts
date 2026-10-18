import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface ReplacePlacementResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runReplacePlacement(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):ReplacePlacementResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Replaces a catalog furniture proposal without losing the original placement intent.']};
  return {id:`ReplacePlacement-`+candidate.id,ok:candidate.conflicts.length===0,message:'Replaces a catalog furniture proposal without losing the original placement intent.',next,warnings};
}
