import type {RoomContext} from '../../core/types';
export interface WallCoverageMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureWallCoverage=(room:RoomContext):WallCoverageMetric=>{const value=Math.max(0,Math.min(1,Math.min(1,room.objects.reduce((s,o)=>s+o.size.width,0)/Math.max(.1,room.measurements.widthM*2))));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Wall coverage',confidence,notes};};
export const wallcoveragePasses=(room:RoomContext)=>measureWallCoverage(room).value>=.6;
export const wallcoverageDelta=(room:RoomContext,baseline:number)=>measureWallCoverage(room).value-baseline;
