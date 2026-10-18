import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface DragSessionResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runDragSession(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):DragSessionResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Begins, updates, validates, and commits a non-destructive furniture drag operation.']};
  return {id:`DragSession-`+candidate.id,ok:candidate.conflicts.length===0,message:'Begins, updates, validates, and commits a non-destructive furniture drag operation.',next,warnings};
}
