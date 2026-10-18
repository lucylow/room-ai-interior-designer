import { RoomType } from '../../core/types';
import { PlanPoint, Zone, ZoneType, areaOfPolygon, rectPolygon } from './types';
import { RoomBoundary } from './room-boundary';

const ratios:Record<RoomType,Partial<Record<ZoneType,number>>> = {
  'living-room':{living:.42,circulation:.18,storage:.10,activity:.16,buffer:.14},
  bedroom:{sleep:.48,circulation:.18,storage:.16,activity:.08,buffer:.10},
  kitchen:{service:.48,circulation:.22,storage:.12,dining:.10,buffer:.08},
  office:{work:.54,circulation:.18,storage:.14,activity:.08,buffer:.06},
  'dining-room':{dining:.58,circulation:.22,storage:.08,buffer:.12},
  bathroom:{service:.56,circulation:.24,storage:.10,buffer:.10},
  entryway:{entry:.44,circulation:.30,storage:.18,buffer:.08},
  nursery:{sleep:.36,activity:.26,storage:.20,circulation:.10,buffer:.08},
  studio:{activity:.44,work:.22,storage:.14,circulation:.12,buffer:.08},
  other:{activity:.46,circulation:.22,storage:.12,buffer:.20}
};

export function segmentZones(boundary:RoomBoundary, roomType:RoomType, names?:Record<string,string>):Zone[] {
  const r=ratios[roomType]||ratios.other; const zones:Zone[]=[]; const entries=Object.entries(r) as [ZoneType,number][];
  let cursor=0;
  for(const [type,ratio] of entries){
    const width = boundary.width*(ratio>0.5?.52:.36); const depth=(boundary.depth*ratio)/(Math.max(.2,width/boundary.width));
    const x=boundary.points.length?Math.min(...boundary.points.map(p=>p.x))+cursor:cursor;
    const z=boundary.points.length?Math.min(...boundary.points.map(p=>p.z)):0;
    const w=Math.min(width,Math.max(.4,boundary.width-cursor-.1)); const d=Math.min(boundary.depth,Math.max(.4,depth));
    const points=rectPolygon({x,z,width:w,depth:d}); const area=areaOfPolygon(points);
    zones.push({id:`zone-${type}-${zones.length+1}`,name:names?.[type]||type.replace(/-/g,' '),type,polygon:points,priority:Math.round(ratio*100),minAreaM2:Math.max(.8,area*.65),preferredAreaM2:area,maxAreaM2:area*1.25,colorKey:`zone-${type}`,notes:[]});
    cursor += w*.82;
    if(cursor>=boundary.width-.5) cursor=boundary.width*.18;
  }
  return zones;
}
