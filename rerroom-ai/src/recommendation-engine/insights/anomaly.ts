import type {TrendPoint} from './types';
import {mean,std} from '../core/math';
export interface Anomaly {index:number;value:number;z:number;reason:string;}
export const detectAnomalies=(points:TrendPoint[],threshold=2):Anomaly[]=>{const ys=points.map(p=>p.value),m=mean(ys),s=std(ys);if(s<1e-9)return[];return ys.map((y,i)=>({index:i,value:y,z:(y-m)/s,reason:Math.abs((y-m)/s)>=threshold?'outside historical band':'normal'})).filter(x=>Math.abs(x.z)>=threshold);};
