import type {RoomContext} from '../../core/types';
export interface ReachabilityMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureReachability=(room:RoomContext):ReachabilityMetric=>{const value=Math.max(0,Math.min(1,room.accessibilityScore*.45+room.workflowScore*.4+room.circulationScore*.15));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Reachability',confidence,notes};};
export const reachabilityPasses=(room:RoomContext)=>measureReachability(room).value>=.6;
export const reachabilityDelta=(room:RoomContext,baseline:number)=>measureReachability(room).value-baseline;
