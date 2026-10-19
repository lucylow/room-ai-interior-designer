import { Vec2 } from '../core/types';
export type Fovea={center:Vec2;inner:number;outer:number;qualityBoost:number};
export function weight(point:Vec2,f:Fovea){const d=Math.hypot(point.x-f.center.x,point.y-f.center.y);if(d<=f.inner)return 1+f.qualityBoost; if(d>=f.outer)return .45; const t=(d-f.inner)/(f.outer-f.inner); return (1+f.qualityBoost)*(1-t)+.45*t}
export function bucket(points:Vec2[],f:Fovea){return points.map(p=>({point:p,weight:weight(p,f)})).sort((a,b)=>b.weight-a.weight)}
export function estimatedSavings(points:Vec2[],f:Fovea){const w=points.reduce((s,p)=>s+weight(p,f),0)/(points.length||1);return Math.max(0,1-w)}
