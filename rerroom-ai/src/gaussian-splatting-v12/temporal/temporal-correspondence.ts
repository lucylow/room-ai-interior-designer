import { Gaussian } from '../core/types';
import { distance } from '../core/utils';
export type Correspondence={from:string;to:string;distance:number;confidence:number};
export function matchFrame(prev:Gaussian[],next:Gaussian[],maxDistance=.1):Correspondence[]{const out:Correspondence[]=[];for(const a of prev){let best:Gaussian|undefined;let bestD=Infinity;for(const b of next){const d=distance(a.mean,b.mean);if(d<bestD){bestD=d;best=b}}if(best&&bestD<=maxDistance)out.push({from:a.id,to:best.id,distance:bestD,confidence:Math.exp(-bestD/maxDistance)})}return out}
export function trackStability(c:Correspondence[]){return c.reduce((s,x)=>s+x.confidence,0)/(c.length||1)}
