import type {RoomContext} from '../../core/types';
export interface FocalDistanceMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureFocalDistance=(room:RoomContext):FocalDistanceMetric=>{const value=Math.max(0,Math.min(1,room.visualBalanceScore*.65+room.circulationScore*.2+room.naturalLightScore*.15));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Focal distance',confidence,notes};};
export const focaldistancePasses=(room:RoomContext)=>measureFocalDistance(room).value>=.6;
export const focaldistanceDelta=(room:RoomContext,baseline:number)=>measureFocalDistance(room).value-baseline;
