import type {RoomContext} from '../core/types';
export interface SpaceMetricSet {roomArea:number;occupiedArea:number;openArea:number;occupancyRatio:number;circulationRatio:number;openingRisk:number;balance:number;}
export const layoutSpaceMetrics=(room:RoomContext):SpaceMetricSet=>{
 const area=room.measurements.widthM*room.measurements.depthM;
 const occupied=room.objects.reduce((s,o)=>s+o.size.width*o.size.depth,0);
 const open=Math.max(0,area-occupied); const circulation=Math.max(0,Math.min(1,open/Math.max(1,area)));
 const openingRisk=room.openings.reduce((s,o)=>s+(room.objects.some(x=>Math.abs(x.position.x-o.x)<(o.width+1)/2)?1:0),0)/Math.max(1,room.openings.length);
 return {roomArea:area,occupiedArea:occupied,openArea:open,occupancyRatio:occupied/Math.max(area,.001),circulationRatio:circulation,openingRisk,balance:room.visualBalanceScore};
};
