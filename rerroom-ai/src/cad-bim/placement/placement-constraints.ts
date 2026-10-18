import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface PlacementConstraintsResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runPlacementConstraints(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):PlacementConstraintsResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Represents local constraints for a selected piece of furniture.']};
  return {id:`PlacementConstraints-`+candidate.id,ok:candidate.conflicts.length===0,message:'Represents local constraints for a selected piece of furniture.',next,warnings};
}
