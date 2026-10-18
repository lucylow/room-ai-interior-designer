import { PlacementCandidate, FurnitureSpec, LayoutPlan } from '../planning/types';

export interface PlacementLabelsResult {
  id:string; ok:boolean; message:string; next?:PlacementCandidate; warnings:string[];
}
export function runPlacementLabels(candidate:PlacementCandidate,spec:FurnitureSpec,plan?:LayoutPlan):PlacementLabelsResult {
  const warnings:string[]=[];
  if(!candidate || !spec) return {id:'invalid',ok:false,message:'Missing candidate or furniture specification.',warnings:['Missing input.']};
  if(candidate.conflicts.length) warnings.push(...candidate.conflicts.map(c=>`Conflict: ${c}`));
  if(plan && !plan.placements.some(p=>p.id===candidate.id)) warnings.push('Candidate is not currently in the active plan.');
  const next={...candidate,reasons:[...candidate.reasons,'Creates concise labels and measurement chips for plan and 3D views.']};
  return {id:`PlacementLabels-`+candidate.id,ok:candidate.conflicts.length===0,message:'Creates concise labels and measurement chips for plan and 3D views.',next,warnings};
}
