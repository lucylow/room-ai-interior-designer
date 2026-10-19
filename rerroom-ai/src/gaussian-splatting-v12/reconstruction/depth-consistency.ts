// RE:ROOM AI Gaussian Splatting V12 — reconstruction/depth-consistency
// This module is dependency-free by design so it can run in deterministic demo mode.
import {   SpatialAnchor } from '../core/types';
import { clamp, stableId, percentile } from '../core/utils';

export type DepthConsistencyInput = {
  id: string;
  values: number[];
  confidence?: number;
  tags?: string[];
};

export type DepthConsistencyResult = {
  id: string;
  score: number;
  confidence: number;
  actions: string[];
  metrics: Record<string, number>;
  warnings: string[];
};

const prefix = 'depth-consistency-';

export function depth_consistency_mean(values:number[]):number {
  if (!values.length) return 0;
  return values.reduce((sum,value)=>sum+value,0)/values.length;
}

export function depth_consistency_variance(values:number[]):number {
  if (!values.length) return 0;
  const mean=depth_consistency_mean(values);
  return values.reduce((sum,value)=>sum+(value-mean)*(value-mean),0)/values.length;
}

export function depth_consistency_normalize(value:number,min=0,max=1):number {
  if (max<=min) return 0;
  return clamp((value-min)/(max-min),0,1);
}

export function depth_consistency_score(values:number[],weight=1):number {
  const mean=depth_consistency_mean(values);
  const variance=depth_consistency_variance(values);
  return clamp((mean*0.72+(1-Math.min(1,variance))*0.28)*weight,0,1);
}

export function depth_consistency_actions(score:number,warnings:string[]):string[] {
  if (warnings.length) return ['inspect','retry-or-repair'];
  if (score>.86) return ['accept','cache'];
  if (score>.62) return ['refine','monitor'];
  return ['recollect','reprocess'];
}

export function depth_consistency_result(id:string,values:number[],warnings:string[]=[]):DepthConsistencyResult {
  const score=depth_consistency_score(values);
  const confidence=clamp(score*(1-warnings.length*.12),0,1);
  return {id:stableId(prefix,id),score,confidence,actions:depth_consistency_actions(score,warnings),metrics:{mean:depth_consistency_mean(values),variance:depth_consistency_variance(values)},warnings};
}

export function depth_consistency_rolling(values:number[],window=5):number[] {
  return values.map((_,index)=>{
    const start=Math.max(0,index-window+1);
    return depth_consistency_mean(values.slice(start,index+1));
  });
}

export function depth_consistency_trend(values:number[]):number {
  if (values.length<2) return 0;
  let weighted=0,weightSum=0;
  for(let i=1;i<values.length;i++){
    const weight=i;
    weighted+=(values[i]-values[i-1])*weight;
    weightSum+=weight;
  }
  return weighted/(weightSum||1);
}

export function depth_consistency_robustScore(values:number[]):number {
  if(!values.length) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const low=percentile(sorted,.1),high=percentile(sorted,.9);
  const clipped=values.map(v=>clamp(v,low,high));
  return depth_consistency_score(clipped);
}

export function depth_consistency_withContext(input:DepthConsistencyInput):DepthConsistencyResult {
  const values=input.values.length?input.values:[input.confidence??.5];
  const warnings=(input.tags??[]).filter(tag=>tag.includes('risk')||tag.includes('low'));
  const result=depth_consistency_result(input.id,values,warnings);
  result.confidence=clamp(result.confidence*(input.confidence??1),0,1);
  return result;
}

export function depth_consistency_batch(items:DepthConsistencyInput[]):DepthConsistencyResult[] {
  return items.map(item=>depth_consistency_withContext(item));
}

export class DepthConsistencyEngine {
  private results=new Map<string,DepthConsistencyResult>();
  evaluate(input:DepthConsistencyInput){
    const result=depth_consistency_withContext(input);
    this.results.set(result.id,result);
    return result;
  }
  get(id:string){return this.results.get(id);}
  values(){return [...this.results.values()];}
  best(n=5){return this.values().sort((a,b)=>b.score-a.score).slice(0,n);}
  clear(){this.results.clear();}
}

export function depth_consistency_health(results:DepthConsistencyResult[]){
  const score=depth_consistency_mean(results.map(r=>r.score));
  const confidence=depth_consistency_mean(results.map(r=>r.confidence));
  const warnings=results.reduce((sum,r)=>sum+r.warnings.length,0);
  return {score,confidence,warnings,healthy:score>.62&&confidence>.55&&warnings<results.length*1.5};
}

export function depth_consistency_explain(result:DepthConsistencyResult):string[] {
  const messages:string[]=[];
  if(result.score>.86) messages.push('high signal quality');
  else if(result.score>.62) messages.push('moderate signal quality');
  else messages.push('weak signal quality');
  if(result.confidence>.8) messages.push('high confidence');
  else if(result.confidence>.5) messages.push('moderate confidence');
  else messages.push('low confidence');
  if(result.warnings.length) messages.push(`warnings=${result.warnings.length}`);
  return messages;
}

export function depth_consistency_checksum(result:DepthConsistencyResult):string {
  return stableId(prefix,JSON.stringify([result.id,result.score,result.confidence,result.actions,result.metrics]));
}
