import { RoomContext } from '../../core/types';
import { LayoutPlan, Zone } from './types';

export interface CapacityMetric { id:string; label:string; value:number; unit:string; status:'healthy'|'tight'|'overloaded'; explanation:string; }
export interface RoomCapacityModel { roomId:string; floorAreaM2:number; usableAreaM2:number; metrics:CapacityMetric[]; score:number; recommendations:string[]; }
function status(v:number,warning:number,limit:number):CapacityMetric['status']{ return v>limit?'overloaded':v>warning?'tight':'healthy'; }
export function buildRoomCapacityModel(room:RoomContext,plan:LayoutPlan,zones:Zone[]=[]):RoomCapacityModel{
 const floorArea=room.measurements.widthM*room.measurements.depthM;
 const furnitureArea=plan.placements.reduce((s,p)=>s+0.75*0.75,0);
 const circulation=Math.max(0,floorArea-furnitureArea); const usable=Math.max(.1,floorArea*.88);
 const density=furnitureArea/usable; const zoneCount=zones.length; const movable=plan.placements.filter(p=>!p.anchor?.sourceFeatureId).length;
 const metrics:CapacityMetric[]=[
  {id:'density',label:'Furniture density',value:density*100,unit:'%',status:status(density,.55,.72),explanation:'Estimated floor area occupied by furniture'},
  {id:'circulation',label:'Free circulation',value:circulation,unit:'m²',status:status(1-circulation/Math.max(.1,floorArea),.45,.72),explanation:'Remaining floor area before detailed clearance checks'},
  {id:'zones',label:'Planning zones',value:zoneCount,unit:'zones',status:zoneCount? 'healthy':'tight',explanation:'Distinct activity zones recognized for the room'},
  {id:'flexibility',label:'Movable inventory',value:movable,unit:'items',status:movable>=3?'healthy':movable?'tight':'overloaded',explanation:'Items that can be reconfigured without moving source anchors'}
 ];
 const rec:string[]=[]; if(density>.72) rec.push('Reduce large pieces or consolidate functions.'); if(density>.55) rec.push('Protect a continuous circulation spine.'); if(zoneCount<2) rec.push('Consider defining primary and secondary activity zones.'); if(movable<3) rec.push('Introduce movable pieces for iterative layout exploration.');
 return {roomId:room.roomId,floorAreaM2:floorArea,usableAreaM2:usable,metrics,score:Math.max(0,Math.min(1,1-Math.max(0,density-.55)*1.6)),recommendations:rec};
}
