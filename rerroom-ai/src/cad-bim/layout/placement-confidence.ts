import { LayoutPlan, PlacementCandidate, Zone } from '../planning/types';

export interface PlacementConfidenceResult {
  id:string;
  score:number;
  summary:string;
  warnings:string[];
  changes:string[];
  metrics:Record<string,number>;
}

export class PlacementConfidence {
  run(plan:LayoutPlan|undefined,zones:Zone[]=[]):PlacementConfidenceResult {
    const warnings:string[]=[];
    const changes:string[]=[];
    if(!plan) warnings.push('No active plan selected.');
    if(zones.length===0) warnings.push('No zones available.');
    const placements=plan?.placements||[];
    const conflicts=placements.reduce((n,p)=>n+p.conflicts.length,0);
    placements.slice(0,20).forEach((p:PlacementCandidate)=>changes.push(`${p.furnitureId} @ (${p.position.x.toFixed(2)}, ${p.position.z.toFixed(2)})`));
    const score=Math.max(0,Math.min(1,.45*(placements.length?Math.min(1,placements.length/8):.2)+.35*(conflicts?0.55:1)+.2*(zones.length?1:.3)));
    return {id:`PlacementConfidence-`+(plan?.id||'empty'),score,summary:'Estimates confidence for a placement from source and collision evidence.',warnings,changes,metrics:{placements:placements.length,conflicts,zones:zones.length}};
  }
}
