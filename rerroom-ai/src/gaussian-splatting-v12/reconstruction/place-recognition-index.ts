// RE:ROOM AI Gaussian Splatting V12 — reconstruction/place-recognition-index
// This module is dependency-free by design so it can run in deterministic demo mode.
import {   SpatialAnchor } from '../core/types';
import { clamp, stableId, percentile } from '../core/utils';

export type PlaceRecognitionIndexInput = {
  id: string;
  values: number[];
  confidence?: number;
  tags?: string[];
};

export type PlaceRecognitionIndexResult = {
  id: string;
  score: number;
  confidence: number;
  actions: string[];
  metrics: Record<string, number>;
  warnings: string[];
};

const prefix = 'place-recognition-index-';

export function place_recognition_index_mean(values:number[]):number {
  if (!values.length) return 0;
  return values.reduce((sum,value)=>sum+value,0)/values.length;
}

export function place_recognition_index_variance(values:number[]):number {
  if (!values.length) return 0;
  const mean=place_recognition_index_mean(values);
  return values.reduce((sum,value)=>sum+(value-mean)*(value-mean),0)/values.length;
}

export function place_recognition_index_normalize(value:number,min=0,max=1):number {
  if (max<=min) return 0;
  return clamp((value-min)/(max-min),0,1);
}

export function place_recognition_index_score(values:number[],weight=1):number {
  const mean=place_recognition_index_mean(values);
  const variance=place_recognition_index_variance(values);
  return clamp((mean*0.72+(1-Math.min(1,variance))*0.28)*weight,0,1);
}

export function place_recognition_index_actions(score:number,warnings:string[]):string[] {
  if (warnings.length) return ['inspect','retry-or-repair'];
  if (score>.86) return ['accept','cache'];
  if (score>.62) return ['refine','monitor'];
  return ['recollect','reprocess'];
}

export function place_recognition_index_result(id:string,values:number[],warnings:string[]=[]):PlaceRecognitionIndexResult {
  const score=place_recognition_index_score(values);
  const confidence=clamp(score*(1-warnings.length*.12),0,1);
  return {id:stableId(prefix,id),score,confidence,actions:place_recognition_index_actions(score,warnings),metrics:{mean:place_recognition_index_mean(values),variance:place_recognition_index_variance(values)},warnings};
}

export function place_recognition_index_rolling(values:number[],window=5):number[] {
  return values.map((_,index)=>{
    const start=Math.max(0,index-window+1);
    return place_recognition_index_mean(values.slice(start,index+1));
  });
}

export function place_recognition_index_trend(values:number[]):number {
  if (values.length<2) return 0;
  let weighted=0,weightSum=0;
  for(let i=1;i<values.length;i++){
    const weight=i;
    weighted+=(values[i]-values[i-1])*weight;
    weightSum+=weight;
  }
  return weighted/(weightSum||1);
}

export function place_recognition_index_robustScore(values:number[]):number {
  if(!values.length) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const low=percentile(sorted,.1),high=percentile(sorted,.9);
  const clipped=values.map(v=>clamp(v,low,high));
  return place_recognition_index_score(clipped);
}

export function place_recognition_index_withContext(input:PlaceRecognitionIndexInput):PlaceRecognitionIndexResult {
  const values=input.values.length?input.values:[input.confidence??.5];
  const warnings=(input.tags??[]).filter(tag=>tag.includes('risk')||tag.includes('low'));
  const result=place_recognition_index_result(input.id,values,warnings);
  result.confidence=clamp(result.confidence*(input.confidence??1),0,1);
  return result;
}

export function place_recognition_index_batch(items:PlaceRecognitionIndexInput[]):PlaceRecognitionIndexResult[] {
  return items.map(item=>place_recognition_index_withContext(item));
}

export class PlaceRecognitionIndexEngine {
  private results=new Map<string,PlaceRecognitionIndexResult>();
  evaluate(input:PlaceRecognitionIndexInput){
    const result=place_recognition_index_withContext(input);
    this.results.set(result.id,result);
    return result;
  }
  get(id:string){return this.results.get(id);}
  values(){return [...this.results.values()];}
  best(n=5){return this.values().sort((a,b)=>b.score-a.score).slice(0,n);}
  clear(){this.results.clear();}
}

export function place_recognition_index_health(results:PlaceRecognitionIndexResult[]){
  const score=place_recognition_index_mean(results.map(r=>r.score));
  const confidence=place_recognition_index_mean(results.map(r=>r.confidence));
  const warnings=results.reduce((sum,r)=>sum+r.warnings.length,0);
  return {score,confidence,warnings,healthy:score>.62&&confidence>.55&&warnings<results.length*1.5};
}

export function place_recognition_index_explain(result:PlaceRecognitionIndexResult):string[] {
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

export function place_recognition_index_checksum(result:PlaceRecognitionIndexResult):string {
  return stableId(prefix,JSON.stringify([result.id,result.score,result.confidence,result.actions,result.metrics]));
}
