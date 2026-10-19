import { AuthoritativeModel } from '../core/types';
import { RoomContext } from '../../core/types';
import { LayoutPlan, Zone, FurnitureSpec } from '../planning/types';

export interface LayoutRuleEngineResult {
  id:string;
  score:number;
  summary:string;
  warnings:string[];
  changes:string[];
  metrics:Record<string,number>;
}

function placementCount(plan?:LayoutPlan):number{return plan?.placements.length||0;}

export class LayoutRuleEngine {
  run(model:AuthoritativeModel, room:RoomContext, plan:LayoutPlan|undefined, zones:Zone[]=[], catalog:FurnitureSpec[]=[]):LayoutRuleEngineResult {
    const warnings:string[]=[]; const changes:string[]=[];
    const source=model.features.length; const placements=placementCount(plan);
    if(!plan) warnings.push('No active layout plan.');
    if(source===0) warnings.push('No source geometry available.');
    if(zones.length===0) warnings.push('No functional zones available.');
    if(placements===0) warnings.push('No furniture placements available.');
    if(plan && plan.placements.some(p=>p.conflicts.length>0)) warnings.push('One or more placements contain conflicts.');
    for(const p of (plan?.placements||[]).slice(0,18)){
      changes.push(`${p.furnitureId}: ${p.position.x.toFixed(2)}m, ${p.position.z.toFixed(2)}m`);
    }
    const anchored=model.features.filter(f=>f.authority==='authoritative').length;
    const score=Math.max(0,Math.min(1,.38*(anchored/Math.max(1,source))+.2*Math.min(1,zones.length/5)+.24*Math.min(1,placements/8)+.18*(warnings.length?0.55:1)));
    return {id:`LayoutRuleEngine-${model.id}`,score,summary:'Runs rule groups against proposed furniture placement.',warnings,changes,metrics:{sourceFeatures:source,anchored,placements,zones:zones.length,catalogItems:catalog.length,roomArea:room.measurements.widthM*room.measurements.depthM}};
  }
}
