import type {RoomContext} from '../../core/types';
export interface ClearanceMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureClearance=(room:RoomContext):ClearanceMetric=>{const value=Math.max(0,Math.min(1,room.circulationScore*.7+room.accessibilityScore*.3));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Clearance envelope',confidence,notes};};
export const clearancePasses=(room:RoomContext)=>measureClearance(room).value>=.6;
export const clearanceDelta=(room:RoomContext,baseline:number)=>measureClearance(room).value-baseline;
