import type {FeatureVector} from '../core/types';
import {clamp,round} from '../core/math';

export interface Importance {name:string; importance:number; signed:number; rank:number; reason:string;}

export const rankImportance=(vector:FeatureVector,weights:Record<string,number>={}):Importance[]=>{
  const rows=vector.values.map((feature,index)=>{
    const w=weights[feature.name]??1;
    const signed=feature.value*w*feature.confidence;
    const importance=clamp(Math.abs(signed),0,1);
    return {name:feature.name,importance,signed,rank:index+1,reason:`${feature.name} contributes ${round(importance,3)} after confidence weighting.`};
  }).sort((a,b)=>b.importance-a.importance);
  return rows.map((row,index)=>({...row,rank:index+1}));
};

export const topImportance=(vector:FeatureVector,limit=8):Importance[]=>rankImportance(vector).slice(0,limit);
