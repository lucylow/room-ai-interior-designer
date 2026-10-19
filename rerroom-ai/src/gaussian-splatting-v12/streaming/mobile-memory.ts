// RE:ROOM AI Gaussian Splatting V12 — streaming/mobile-memory
// This module is dependency-free by design so it can run in deterministic demo mode.
import {   SpatialAnchor } from '../core/types';
import { clamp, stableId, percentile } from '../core/utils';

export type MobileMemoryInput = {
  id: string;
  values: number[];
  confidence?: number;
  tags?: string[];
};

export type MobileMemoryResult = {
  id: string;
  score: number;
  confidence: number;
  actions: string[];
  metrics: Record<string, number>;
  warnings: string[];
};

const prefix = 'mobile-memory-';

export function mobile_memory_mean(values:number[]):number {
  if (!values.length) return 0;
  return values.reduce((sum,value)=>sum+value,0)/values.length;
}

export function mobile_memory_variance(values:number[]):number {
  if (!values.length) return 0;
  const mean=mobile_memory_mean(values);
  return values.reduce((sum,value)=>sum+(value-mean)*(value-mean),0)/values.length;
}

export function mobile_memory_normalize(value:number,min=0,max=1):number {
  if (max<=min) return 0;
  return clamp((value-min)/(max-min),0,1);
}

export function mobile_memory_score(values:number[],weight=1):number {
  const mean=mobile_memory_mean(values);
  const variance=mobile_memory_variance(values);
  return clamp((mean*0.72+(1-Math.min(1,variance))*0.28)*weight,0,1);
}

export function mobile_memory_actions(score:number,warnings:string[]):string[] {
  if (warnings.length) return ['inspect','retry-or-repair'];
  if (score>.86) return ['accept','cache'];
  if (score>.62) return ['refine','monitor'];
  return ['recollect','reprocess'];
}

export function mobile_memory_result(id:string,values:number[],warnings:string[]=[]):MobileMemoryResult {
  const score=mobile_memory_score(values);
  const confidence=clamp(score*(1-warnings.length*.12),0,1);
  return {id:stableId(prefix,id),score,confidence,actions:mobile_memory_actions(score,warnings),metrics:{mean:mobile_memory_mean(values),variance:mobile_memory_variance(values)},warnings};
}

export function mobile_memory_rolling(values:number[],window=5):number[] {
  return values.map((_,index)=>{
    const start=Math.max(0,index-window+1);
    return mobile_memory_mean(values.slice(start,index+1));
  });
}

export function mobile_memory_trend(values:number[]):number {
  if (values.length<2) return 0;
  let weighted=0,weightSum=0;
  for(let i=1;i<values.length;i++){
    const weight=i;
    weighted+=(values[i]-values[i-1])*weight;
    weightSum+=weight;
  }
  return weighted/(weightSum||1);
}

export function mobile_memory_robustScore(values:number[]):number {
  if(!values.length) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const low=percentile(sorted,.1),high=percentile(sorted,.9);
  const clipped=values.map(v=>clamp(v,low,high));
  return mobile_memory_score(clipped);
}

export function mobile_memory_withContext(input:MobileMemoryInput):MobileMemoryResult {
  const values=input.values.length?input.values:[input.confidence??.5];
  const warnings=(input.tags??[]).filter(tag=>tag.includes('risk')||tag.includes('low'));
  const result=mobile_memory_result(input.id,values,warnings);
  result.confidence=clamp(result.confidence*(input.confidence??1),0,1);
  return result;
}

export function mobile_memory_batch(items:MobileMemoryInput[]):MobileMemoryResult[] {
  return items.map(item=>mobile_memory_withContext(item));
}

export class MobileMemoryEngine {
  private results=new Map<string,MobileMemoryResult>();
  evaluate(input:MobileMemoryInput){
    const result=mobile_memory_withContext(input);
    this.results.set(result.id,result);
    return result;
  }
  get(id:string){return this.results.get(id);}
  values(){return [...this.results.values()];}
  best(n=5){return this.values().sort((a,b)=>b.score-a.score).slice(0,n);}
  clear(){this.results.clear();}
}

export function mobile_memory_health(results:MobileMemoryResult[]){
  const score=mobile_memory_mean(results.map(r=>r.score));
  const confidence=mobile_memory_mean(results.map(r=>r.confidence));
  const warnings=results.reduce((sum,r)=>sum+r.warnings.length,0);
  return {score,confidence,warnings,healthy:score>.62&&confidence>.55&&warnings<results.length*1.5};
}

export function mobile_memory_explain(result:MobileMemoryResult):string[] {
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

export function mobile_memory_checksum(result:MobileMemoryResult):string {
  return stableId(prefix,JSON.stringify([result.id,result.score,result.confidence,result.actions,result.metrics]));
}
