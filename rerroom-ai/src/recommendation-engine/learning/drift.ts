import {mean,std,clamp} from '../core/math';
export interface DriftReport {feature:string;baselineMean:number;currentMean:number;z:number;drift:number;status:'ok'|'watch'|'shift';}
export const featureDrift=(feature:string,baseline:number[],current:number[]):DriftReport=>{const bm=mean(baseline),cm=mean(current),s=Math.max(std(baseline),.02),z=(cm-bm)/s,drift=clamp(Math.abs(z)/4);return {feature,baselineMean:bm,currentMean:cm,z,drift,status:Math.abs(z)>3?'shift':Math.abs(z)>1.8?'watch':'ok'};};
