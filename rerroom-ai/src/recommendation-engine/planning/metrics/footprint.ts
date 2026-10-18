import type {RoomContext} from '../../core/types';
export interface FootprintMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureFootprint=(room:RoomContext):FootprintMetric=>{const value=Math.max(0,Math.min(1,Math.min(1,room.objects.reduce((s,o)=>s+o.size.width*o.size.depth,0)/Math.max(.1,room.measurements.widthM*room.measurements.depthM*.65))));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Furniture footprint',confidence,notes};};
export const footprintPasses=(room:RoomContext)=>measureFootprint(room).value>=.6;
export const footprintDelta=(room:RoomContext,baseline:number)=>measureFootprint(room).value-baseline;
