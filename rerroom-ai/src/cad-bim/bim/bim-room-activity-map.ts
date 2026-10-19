import { AuthoritativeModel } from '../core/types';
import { LayoutPlan, Zone } from '../planning/types';

export interface BIMRoomActivityMapRow { id:string; sourceId?:string; kind:string; label:string; value:string|number|boolean; }
export interface BIMRoomActivityMapResult { id:string; rows:BIMRoomActivityMapRow[]; warnings:string[]; score:number; }
export function buildBIMRoomActivityMap(model:AuthoritativeModel,plan?:LayoutPlan,zones:Zone[]=[]):BIMRoomActivityMapResult {
 const rows:BIMRoomActivityMapRow[]=[]; const warnings:string[]=[];
 for(const f of model.features.slice(0,40)) rows.push({id:`BIMRoomActivityMap-`+f.id,sourceId:f.id,kind:f.kind,label:f.name||f.id,value:f.authority});
 for(const z of zones.slice(0,20)) rows.push({id:`BIMRoomActivityMap-`+z.id,kind:'zone',label:z.name,value:Number(z.preferredAreaM2.toFixed(2))});
 for(const p of (plan?.placements||[]).slice(0,20)) rows.push({id:`BIMRoomActivityMap-`+p.id,sourceId:p.anchor?.sourceFeatureId,kind:'placement',label:p.furnitureId,value:Number(p.score.toFixed(3))});
 if((plan?.placements||[]).some(p=>p.anchor===undefined)) warnings.push('Some concept placements do not yet have a trusted source anchor.');
 const score=Math.max(0,Math.min(1,(rows.length?0.75:0)+.25*(warnings.length?0.4:1)));
 return {id:`BIMRoomActivityMap-`+model.id,rows,warnings,score};
}
