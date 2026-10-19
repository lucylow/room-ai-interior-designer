import { VisualAsset, VisualMetrics, clamp } from './types';
export function assetVector(a:VisualAsset, m?:VisualMetrics):number[]{ const s=m?.overall??0.5; return [a.width/4096,a.height/4096,s, a.kind.length/12]; }
export function cosine(a:number[],b:number[]):number{ const dot=a.reduce((v,x,i)=>v+x*(b[i]??0),0); const na=Math.hypot(...a), nb=Math.hypot(...b); return na&&nb?clamp(dot/(na*nb),-1,1):0; }
