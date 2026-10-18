import { AuthoritativeModel, SourceFeature } from '../core/types';
import { PlanPoint, PlanRect, rectPolygon, areaOfPolygon } from './types';

export interface RoomBoundary { roomId:string; points:PlanPoint[]; width:number; depth:number; areaM2:number; confidence:number; sourceFeatureIds:string[]; }

function featureRect(f:SourceFeature):PlanRect|undefined {
  if(!f.center || !f.size) return undefined;
  return { x:f.center.x-f.size.width/2, z:f.center.z-f.size.depth/2, width:f.size.width, depth:f.size.depth };
}

export function inferRoomBoundary(model:AuthoritativeModel, roomId:string):RoomBoundary {
  const room = model.features.find(f=>f.id===roomId && f.kind==='room');
  if(room?.geometry2d?.points?.length){
    const points = room.geometry2d.points.map(p=>({x:p.x,z:p.y}));
    const xs=points.map(p=>p.x), zs=points.map(p=>p.z);
    const width=Math.max(...xs)-Math.min(...xs), depth=Math.max(...zs)-Math.min(...zs);
    return {roomId,points,width,depth,areaM2:areaOfPolygon(points),confidence:room.authority==='authoritative'?1:.72,sourceFeatureIds:[room.id]};
  }
  const walls=model.features.filter(f=>f.kind==='wall');
  const rects=walls.map(featureRect).filter(Boolean) as PlanRect[];
  if(rects.length>=2){
    const minX=Math.min(...rects.map(r=>r.x)), minZ=Math.min(...rects.map(r=>r.z));
    const maxX=Math.max(...rects.map(r=>r.x+r.width)), maxZ=Math.max(...rects.map(r=>r.z+r.depth));
    const width=Math.max(.1,maxX-minX), depth=Math.max(.1,maxZ-minZ);
    return {roomId,points:rectPolygon({x:minX,z:minZ,width,depth}),width,depth,areaM2:width*depth,confidence:.65,sourceFeatureIds:walls.map(w=>w.id)};
  }
  return {roomId,points:rectPolygon({x:0,z:0,width:4.8,depth:4.2}),width:4.8,depth:4.2,areaM2:20.16,confidence:.35,sourceFeatureIds:[]};
}
