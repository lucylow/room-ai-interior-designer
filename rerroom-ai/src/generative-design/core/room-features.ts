import type {RoomContext} from '../../core/types';
import {clamp} from './utils';
export interface RoomFeatureSummary {openArea:number;wallArea:number;light:number;clutter:number;storage:number;balance:number;functions:string[];existingStyle:string;}
export const summarizeRoom=(room:RoomContext):RoomFeatureSummary=>{
  const openArea=Math.max(0,room.measurements.widthM*room.measurements.depthM-room.objects.reduce((s,o)=>s+o.size.width*o.size.depth*.9,0));
  const wallArea=2*(room.measurements.widthM+room.measurements.depthM)*room.measurements.ceilingM;
  const style=Object.entries(room.styleSignals).sort((a,b)=>b[1]-a[1])[0]?.[0]??'modern';
  return {openArea,wallArea,light:clamp(room.naturalLightScore),clutter:clamp(room.clutterScore),storage:clamp(room.storageScore),balance:clamp(room.visualBalanceScore),functions:room.inferredFunctions,existingStyle:style};
};
