import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface PlacementImportResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runPlacementImport(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):PlacementImportResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Validates a placement payload before applying it to a concept layout.']};
  return {id:`PlacementImport-`+candidate.id,ok:candidate.conflicts.length===0,message:'Validates a placement payload before applying it to a concept layout.',next,warnings};
}
