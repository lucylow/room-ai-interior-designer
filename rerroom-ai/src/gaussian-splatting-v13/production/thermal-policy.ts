// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.

import {Gaussian,Camera,Frame,Scene,Vec3,clamp,stableHash} from '../core/types';
import {dist,project,seededUnit} from '../core/math';

export type ThermalPolicyInput={id:string;values?:number[];threshold?:number;weight?:number;tags?:string[]};
export type ThermalPolicyResult={id:string;score:number;confidence:number;actions:string[];metrics:Record<string,number>;warnings:string[]};

export function thermal_policy_mean(values:number[]=[]):number{
  if(!values.length)return 0;
  return values.reduce((s,v)=>s+v,0)/values.length;
}

export function thermal_policy_variance(values:number[]=[]):number{
  if(!values.length)return 0;
  const m=thermal_policy_mean(values);
  return values.reduce((s,v)=>s+(v-m)*(v-m),0)/values.length;
}

export function thermal_policy_trend(values:number[]=[]):number{
  if(values.length<2)return 0;
  let total=0,weight=0;
  for(let i=1;i<values.length;i++){const w=i;total+=(values[i]-values[i-1])*w;weight+=w;}
  return total/(weight||1);
}

export function thermal_policy_score(values:number[]=[],threshold=.65,weight=1):number{
  const mean=thermal_policy_mean(values);
  const variance=thermal_policy_variance(values);
  const trend=thermal_policy_trend(values);
  const stability=1-clamp(variance,0,1);
  const trendFit=clamp(.5+trend,0,1);
  const thresholdFit=threshold<=0?mean:clamp(mean/threshold,0,1);
  return clamp((mean*.48+stability*.22+trendFit*.10+thresholdFit*.20)*weight,0,1);
}

export function thermal_policy_actions(score:number,warnings:string[]=[]):string[]{
  if(warnings.length)return ['inspect','repair'];
  if(score>=.9)return ['accept','cache'];
  if(score>=.75)return ['accept','monitor'];
  if(score>=.55)return ['refine','rescore'];
  return ['recollect','reprocess'];
}

export function thermal_policy_result(id:string,values:number[]=[],warnings:string[]=[]):ThermalPolicyResult{
  const score=thermal_policy_score(values);
  const confidence=clamp(score*(1-warnings.length*.1),0,1);
  return{id:`production-thermal-policy-${stableHash(id).toString(16)}`,score,confidence,actions:thermal_policy_actions(score,warnings),metrics:{mean:thermal_policy_mean(values),variance:thermal_policy_variance(values),trend:thermal_policy_trend(values),count:values.length},warnings};
}

export function thermal_policy_window(values:number[]=[],window=5):number[]{
  return values.map((_,i)=>thermal_policy_mean(values.slice(Math.max(0,i-window+1),i+1)));
}

export function thermal_policy_robust(values:number[]=[]):number{
  if(!values.length)return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  const lo=sorted[Math.floor(sorted.length*.1)]??sorted[0];
  const hi=sorted[Math.floor(sorted.length*.9)]??sorted[sorted.length-1];
  const core=sorted.filter(v=>v>=lo&&v<=hi);
  return thermal_policy_mean(core.length?core:sorted);
}

export function thermal_policy_seed(id:string,index:number):number{return seededUnit(stableHash(`production-thermal-policy:$${id}`),index);}

export function thermal_policy_sampleScene(scene:Scene,camera?:Camera):number[]{
  const selected=camera?scene.gaussians.filter(g=>project(g.mean,camera).visible):scene.gaussians.slice();
  if(!selected.length)return [0];
  return selected.slice(0,24).map(g=>clamp((g.opacity*.55+(g.confidence??.5)*.45),0,1));
}

export function thermal_policy_distance(a:Vec3,b:Vec3):number{return dist(a,b);}

export function thermal_policy_frames(frames:Frame[]):number[]{
  if(!frames.length)return [0];
  return frames.map(f=>clamp(f.sharpness*.3+(1-f.blur)*.25+f.coverage*.25+(1-f.motion)*.2,0,1));
}

export function thermal_policy_gaussians(gaussians:Gaussian[]):number[]{
  if(!gaussians.length)return [0];
  return gaussians.slice(0,64).map(g=>clamp(g.opacity*.4+g.confidence*.4+(g.dynamic?0:.2),0,1));
}

export function thermal_policy_recommendation(result:ThermalPolicyResult):string{
  if(result.warnings.length)return 'Repair the highest-impact warning before downstream rendering.';
  if(result.score>=.85)return 'Keep the current configuration and promote it to the next pipeline stage.';
  if(result.score>=.6)return 'Refine the weakest contributing signal and rescore.';
  return 'Collect additional evidence or rebuild the affected stage.';
}

export const THERMAL_POLICY_VERSION='v13';
