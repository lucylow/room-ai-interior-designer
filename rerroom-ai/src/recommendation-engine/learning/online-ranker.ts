import type {Recommendation} from '../core/types';import {sigmoid,clamp} from '../core/math';
export interface WeightVector {weights:Record<string,number>;bias:number;lr:number;}
export const featureMap=(r:Recommendation)=>({score:r.score,confidence:r.confidence,impact:r.expectedImpact,cost:Math.min(1,(r.estimatedCost??0)/3000),effort:{tiny:1,easy:.9,moderate:.7,large:.5,major:.25}[r.effort]});
export const predict=(w:WeightVector,r:Recommendation)=>{const f=featureMap(r);const z=w.bias+Object.entries(w.weights).reduce((s,[k,v])=>s+v*(f[k as keyof typeof f]??0),0);return sigmoid(z);};
export const update=(w:WeightVector,r:Recommendation,label:0|1)=>{const p=predict(w,r),e=label-p,f=featureMap(r);const weights={...w.weights};for(const k of Object.keys(weights))weights[k]+=w.lr*e*(f[k as keyof typeof f]??0);return {...w,bias:w.bias+w.lr*e,weights};};
export const rerank=(w:WeightVector,rs:Recommendation[])=>rs.map(r=>({...r,score:clamp(.65*r.score+.35*predict(w,r))})).sort((a,b)=>b.score-a.score);
