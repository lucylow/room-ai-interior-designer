import type {TrendPoint,InsightTrend} from './types';
import {mean,clamp} from '../core/math';
export const trend=(metric:string,points:TrendPoint[]):InsightTrend=>{
  if(points.length<2)return {metric,direction:'unknown',slope:0,change:0,confidence:.25,points};
  const xs=points.map((_,i)=>i),ys=points.map(p=>p.value),mx=mean(xs),my=mean(ys);
  const num=xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0),den=xs.reduce((s,x)=>s+(x-mx)**2,0);const slope=den?num/den:0;const change=ys.at(-1)!-ys[0];
  return {metric,direction:slope>.03?'improving':slope<-.03?'declining':'stable',slope,change,confidence:clamp(.45+points.length*.06),points};
};
