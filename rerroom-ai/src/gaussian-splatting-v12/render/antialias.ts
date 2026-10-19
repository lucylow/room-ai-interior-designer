export type AAConfig={sigma:number;sharpen:number;temporalBlend:number};
export function chooseAA(scale:number,motion:number):AAConfig{return{sigma:Math.max(.5,1.8-scale*1.2),sharpen:Math.min(.8,.2+scale*.5),temporalBlend:Math.max(0,Math.min(.9,1-motion))}}
export function blend(a:number,b:number,t:number){return a*(1-t)+b*t}
export function stabilize(current:number[],previous:number[],t:number){const n=Math.min(current.length,previous.length);const out=new Array(current.length);for(let i=0;i<n;i++)out[i]=blend(current[i],previous[i],t);for(let i=n;i<current.length;i++)out[i]=current[i];return out}
