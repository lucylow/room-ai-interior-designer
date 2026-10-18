import type {RoomContext} from '../../core/types';
export interface BalanceMetric{value:number;label:string;confidence:number;notes:string[];}
export const measureBalance=(room:RoomContext):BalanceMetric=>{const value=Math.max(0,Math.min(1,room.visualBalanceScore));const confidence=Math.max(.3,Math.min(1,room.measurements.confidence*.7+.25));const notes:string[]=[];if(value<.45)notes.push('Metric is below the preferred planning band.');else if(value>.75)notes.push('Metric is in a strong planning band.');else notes.push('Metric is in the middle planning band.');return {value,label:'Spatial balance',confidence,notes};};
export const balancePasses=(room:RoomContext)=>measureBalance(room).value>=.6;
export const balanceDelta=(room:RoomContext,baseline:number)=>measureBalance(room).value-baseline;
