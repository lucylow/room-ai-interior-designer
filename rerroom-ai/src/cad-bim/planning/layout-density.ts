import { RoomContext } from '../../core/types';
import { AuthoritativeModel } from '../core/types';
import { LayoutPlan, Zone, FurnitureSpec } from './types';

export interface LayoutDensityResult { id:string; score:number; warnings:string[]; notes:string[]; metrics:Record<string,number>; }
export function buildLayoutDensity(model:AuthoritativeModel,room:RoomContext,plan?:LayoutPlan,zones:Zone[]=[],catalog:FurnitureSpec[]=[]):LayoutDensityResult {
 const warnings:string[]=[]; const notes:string[]=[];
 const source=model.features.length; const placements=plan?.placements.length||0;
 if(!source) warnings.push('No authoritative model features.');
 if(!plan) warnings.push('No active layout plan.');
 if(zones.length===0) warnings.push('No planning zones.');
 const conflictCount=(plan?.placements||[]).reduce((sum,p)=>sum+p.conflicts.length,0);
 notes.push('Measures furniture density by room and zone.');
 if(conflictCount) notes.push(`Detected ${conflictCount} placement conflict(s).`);
 const score=Math.max(0,Math.min(1,.3*(source?1:0)+.25*(zones.length?1:.2)+.25*Math.min(1,placements/10)+.2*(conflictCount?0.55:1)));
 return {id:`LayoutDensity-`+room.roomId,score,warnings,notes,metrics:{sourceFeatures:source,placements,zones:zones.length,catalog:catalog.length,conflicts:conflictCount,roomArea:room.measurements.widthM*room.measurements.depthM}};
}
