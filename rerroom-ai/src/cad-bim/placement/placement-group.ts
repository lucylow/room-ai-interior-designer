import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface PlacementGroupResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runPlacementGroup(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):PlacementGroupResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Groups furniture into a coordinated placement cluster.']};
  return {id:`PlacementGroup-`+candidate.id,ok:candidate.conflicts.length===0,message:'Groups furniture into a coordinated placement cluster.',next,warnings};
}
