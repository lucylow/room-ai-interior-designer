import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface DuplicatePlacementResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runDuplicatePlacement(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):DuplicatePlacementResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Duplicates a concept placement while preserving its source/model lineage.']};
  return {id:`DuplicatePlacement-`+candidate.id,ok:candidate.conflicts.length===0,message:'Duplicates a concept placement while preserving its source/model lineage.',next,warnings};
}
