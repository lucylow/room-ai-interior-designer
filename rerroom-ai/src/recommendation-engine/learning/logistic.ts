import {sigmoid,clamp} from '../core/math';
export interface LogisticModel {weights:number[];bias:number;learningRate:number;version:string;}
export const predict=(m:LogisticModel,x:number[]):number=>sigmoid(m.bias+m.weights.reduce((s,w,i)=>s+w*(x[i]??0),0));
export const update=(m:LogisticModel,x:number[],label:0|1):LogisticModel=>{const p=predict(m,x),err=label-p;return {...m,bias:m.bias+m.learningRate*err,weights:m.weights.map((w,i)=>w+m.learningRate*err*(x[i]??0))};};
export const train=(seed:LogisticModel,rows:Array<{x:number[];y:0|1}>,epochs=4):LogisticModel=>{let m=seed;for(let e=0;e<epochs;e++)for(const r of rows)m=update(m,r.x,r.y);return {...m,version:`${m.version}-trained`};};
export const safeProbability=(m:LogisticModel,x:number[])=>clamp(predict(m,x),.01,.99);
