import { RoomContext } from '../../core/types';
import { LayoutPlan, Zone } from './types';

export interface HeatCell { x:number; z:number; value:number; occupied:boolean; zoneId?:string; label:string; }
export interface LayoutHeatmap { roomId:string; columns:number; rows:number; cellSize:number; cells:HeatCell[]; min:number; max:number; hotspots:Array<{x:number;z:number;reason:string}>; }
function inside(x:number,z:number,zone:Zone){ let hit=false; for(let i=0,j=zone.polygon.length-1;i<zone.polygon.length;j=i++){const a=zone.polygon[i],b=zone.polygon[j]; const cross=((a.z>z)!=(b.z>z))&&(x<(b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x); if(cross) hit=!hit;} return hit; }
function occupancy(x:number,z:number,plan:LayoutPlan){ return plan.placements.some(p=>Math.hypot(p.position.x-x,p.position.z-z)<.6); }
export function buildRoomLayoutHeatmap(room:RoomContext,plan:LayoutPlan,zones:Zone[]=[],cellSize=.5):LayoutHeatmap{
 const width=room.measurements.widthM, depth=room.measurements.depthM; const columns=Math.max(1,Math.ceil(width/cellSize)),rows=Math.max(1,Math.ceil(depth/cellSize)); const cells:HeatCell[]=[];
 for(let r=0;r<rows;r++) for(let c=0;c<columns;c++){ const x=(c+.5)*cellSize,z=(r+.5)*cellSize; const occupied=occupancy(x,z,plan); const zone=zones.find(q=>inside(x,z,q)); const proximity=plan.placements.reduce((s,p)=>s+Math.max(0,1-Math.hypot(p.position.x-x,p.position.z-z)/2),0); cells.push({x,z,value:Math.min(1,(occupied?.7:0)+proximity*.18),occupied,zoneId:zone?.id,label:zone?.name||'unassigned'}); }
 const vals=cells.map(c=>c.value); const min=Math.min(...vals),max=Math.max(...vals); const hotspots=cells.filter(c=>c.value>.78).slice(0,12).map(c=>({x:c.x,z:c.z,reason:c.occupied?'Furniture concentration':'High spatial activity'}));
 return {roomId:room.roomId,columns,rows,cellSize,cells,min,max,hotspots};
}
