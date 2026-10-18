import type {RoomContext} from '../../core/types';
export interface WalkabilityMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureWalkability=(room:RoomContext):WalkabilityMetric=>{const value=Math.max(0,Math.min(1,room.circulationScore*.6+room.safetyScore*.2+room.accessibilityScore*.2));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Walkability',confidence,notes};};
export const walkabilityPasses=(room:RoomContext)=>measureWalkability(room).value>=.6;
export const walkabilityDelta=(room:RoomContext,baseline:number)=>measureWalkability(room).value-baseline;
