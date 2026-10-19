// RE:ROOM AI Gaussian Splatting V12 — render/render-pass-planner
// This module is dependency-free by design so it can run in deterministic demo mode.
import {   SpatialAnchor } from '../core/types';
import { clamp, stableId, percentile } from '../core/utils';

export type RenderPassPlannerInput = {
  id: string;
  values: number[];
  confidence?: number;
  tags?: string[];
};

export type RenderPassPlannerResult = {
  id: string;
  score: number;
  confidence: number;
  actions: string[];
  metrics: Record<string, number>;
  warnings: string[];
};

const prefix = 'render-pass-planner-';

export function render_pass_planner_mean(values:number[]):number {
  if (!values.length) return 0;
  return values.reduce((sum,value)=>sum+value,0)/values.length;
}

export function render_pass_planner_variance(values:number[]):number {
  if (!values.length) return 0;
  const mean=render_pass_planner_mean(values);
  return values.reduce((sum,value)=>sum+(value-mean)*(value-mean),0)/values.length;
}

export function render_pass_planner_normalize(value:number,min=0,max=1):number {
  if (max<=min) return 0;
  return clamp((value-min)/(max-min),0,1);
}

export function render_pass_planner_score(values:number[],weight=1):number {
  const mean=render_pass_planner_mean(values);
  const variance=render_pass_planner_variance(values);
  return clamp((mean*0.72+(1-Math.min(1,variance))*0.28)*weight,0,1);
}

export function render_pass_planner_actions(score:number,warnings:string[]):string[] {
  if (warnings.length) return ['inspect','retry-or-repair'];
  if (score>.86) return ['accept','cache'];
  if (score>.62) return ['refine','monitor'];
  return ['recollect','reprocess'];
}

export function render_pass_planner_result(id:string,values:number[],warnings:string[]=[]):RenderPassPlannerResult {
  const score=render_pass_planner_score(values);
  const confidence=clamp(score*(1-warnings.length*.12),0,1);
  return {id:stableId(prefix,id),score,confidence,actions:render_pass_planner_actions(score,warnings),metrics:{mean:render_pass_planner_mean(values),variance:render_pass_planner_variance(values)},warnings};
}

export function render_pass_planner_rolling(values:number[],window=5):number[] {
  return values.map((_,index)=>{
    const start=Math.max(0,index-window+1);
    return render_pass_planner_mean(values.slice(start,index+1));
  });
}

export function render_pass_planner_trend(values:number[]):number {
  if (values.length<2) return 0;
  let weighted=0,weightSum=0;
  for(let i=1;i<values.length;i++){
    const weight=i;
    weighted+=(values[i]-values[i-1])*weight;
    weightSum+=weight;
  }
  return weighted/(weightSum||1);
}

export function render_pass_planner_robustScore(values:number[]):number {
  if(!values.length) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const low=percentile(sorted,.1),high=percentile(sorted,.9);
  const clipped=values.map(v=>clamp(v,low,high));
  return render_pass_planner_score(clipped);
}

export function render_pass_planner_withContext(input:RenderPassPlannerInput):RenderPassPlannerResult {
  const values=input.values.length?input.values:[input.confidence??.5];
  const warnings=(input.tags??[]).filter(tag=>tag.includes('risk')||tag.includes('low'));
  const result=render_pass_planner_result(input.id,values,warnings);
  result.confidence=clamp(result.confidence*(input.confidence??1),0,1);
  return result;
}

export function render_pass_planner_batch(items:RenderPassPlannerInput[]):RenderPassPlannerResult[] {
  return items.map(item=>render_pass_planner_withContext(item));
}

export class RenderPassPlannerEngine {
  private results=new Map<string,RenderPassPlannerResult>();
  evaluate(input:RenderPassPlannerInput){
    const result=render_pass_planner_withContext(input);
    this.results.set(result.id,result);
    return result;
  }
  get(id:string){return this.results.get(id);}
  values(){return [...this.results.values()];}
  best(n=5){return this.values().sort((a,b)=>b.score-a.score).slice(0,n);}
  clear(){this.results.clear();}
}

export function render_pass_planner_health(results:RenderPassPlannerResult[]){
  const score=render_pass_planner_mean(results.map(r=>r.score));
  const confidence=render_pass_planner_mean(results.map(r=>r.confidence));
  const warnings=results.reduce((sum,r)=>sum+r.warnings.length,0);
  return {score,confidence,warnings,healthy:score>.62&&confidence>.55&&warnings<results.length*1.5};
}

export function render_pass_planner_explain(result:RenderPassPlannerResult):string[] {
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

export function render_pass_planner_checksum(result:RenderPassPlannerResult):string {
  return stableId(prefix,JSON.stringify([result.id,result.score,result.confidence,result.actions,result.metrics]));
}
