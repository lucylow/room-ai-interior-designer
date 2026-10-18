import { FurnitureSpec, PlacementCandidate } from '../planning/types';

interface Box { x:number; z:number; width:number; depth:number; }
function rotatedBox(p:PlacementCandidate,s:FurnitureSpec):Box{
  const quarter=Math.round((p.rotationY/(Math.PI/2)))%2; const swap=Math.abs(quarter)===1;
  return {x:p.position.x-(swap?s.dimensions.depth:s.dimensions.width)/2,z:p.position.z-(swap?s.dimensions.width:s.dimensions.depth)/2,width:swap?s.dimensions.depth:s.dimensions.width,depth:swap?s.dimensions.width:s.dimensions.depth};
}
function overlap(a:Box,b:Box,clearance=0):boolean{return Math.abs((a.x+a.width/2)-(b.x+b.width/2))*2 < a.width+b.width+clearance && Math.abs((a.z+a.depth/2)-(b.z+b.depth/2))*2 < a.depth+b.depth+clearance;}

export function detectCandidateConflicts(candidate:PlacementCandidate, spec:FurnitureSpec, existing:Array<{placement:PlacementCandidate;spec:FurnitureSpec}>):string[]{
  const a=rotatedBox(candidate,spec); const issues:string[]=[];
  for(const item of existing){ if(overlap(a,rotatedBox(item.placement,item.spec),.05)) issues.push(`collision:${item.placement.furnitureId}`); }
  if(a.x < 0 || a.z < 0) issues.push('outside-positive-room-origin');
  return issues;
}

export function clearanceEnvelope(candidate:PlacementCandidate,spec:FurnitureSpec):Box{
  const b=rotatedBox(candidate,spec); return {x:b.x-spec.clearance.left,z:b.z-spec.clearance.back,width:b.width+spec.clearance.left+spec.clearance.right,depth:b.depth+spec.clearance.front+spec.clearance.back};
}
