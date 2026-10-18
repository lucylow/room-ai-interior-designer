import { FurnitureSpec, LayoutPlan, Zone } from './types';
import { RoomContext } from '../../core/types';

export interface PlacementSuggestion { furnitureId:string; position:{x:number;y:number;z:number}; rotationY:number; score:number; reasons:string[]; preservedAnchors:boolean; }
export interface SuggestionBatch { roomId:string; suggestions:PlacementSuggestion[]; summary:string[]; }
function candidateScore(room:RoomContext,plan:LayoutPlan,f:FurnitureSpec,x:number,z:number,zone?:Zone){
 const edge=Math.min(x,z,room.measurements.widthM-x,room.measurements.depthM-z); const edgeScore=Math.max(0,Math.min(1,edge/1.2)); const zoneBonus=zone?Math.min(1,zone.priority/5):.35; const occupied=plan.placements.filter(p=>Math.hypot(p.position.x-x,p.position.z-z)<1).length; return Math.max(0,Math.min(1,.46*edgeScore+.34*zoneBonus+.2*(occupied?0.25:1)));
}
export function suggestFurniturePlacements(room:RoomContext,plan:LayoutPlan,catalog:FurnitureSpec[],zones:Zone[]=[]):SuggestionBatch{
 const out:PlacementSuggestion[]=[];
 for(const f of catalog.slice(0,24)){ let best:PlacementSuggestion|undefined; for(let z=0.5;z<room.measurements.depthM;z+=.6) for(let x=0.5;x<room.measurements.widthM;x+=.6){ const zone=zones.find(q=>q.type==='living'||q.type==='activity'); const score=candidateScore(room,plan,f,x,z,zone); const suggestion:PlacementSuggestion={furnitureId:f.id,position:{x,y:0,z},rotationY:0,score,reasons:[],preservedAnchors:true}; suggestion.reasons.push(zone?'Supports an active zone':'Keeps the proposal flexible'); if(!best||score>best.score) best=suggestion; } if(best) out.push(best); }
 out.sort((a,b)=>b.score-a.score); return {roomId:room.roomId,suggestions:out.slice(0,16),summary:[`Evaluated ${catalog.length} catalog candidates`,`Returned ${Math.min(16,out.length)} placement suggestions`,`All suggestions are non-authoritative layout overlays`]};
}
