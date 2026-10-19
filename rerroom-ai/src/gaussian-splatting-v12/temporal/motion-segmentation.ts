import { Gaussian } from '../core/types';
import { distance } from '../core/utils';
export type MotionLabel='static'|'slow'|'dynamic';
export type MotionScore={id:string;velocity:number;acceleration:number;label:MotionLabel};
export function scoreMotion(prev:Gaussian[],curr:Gaussian[],dtMs:number):MotionScore[]{const map=new Map(prev.map(g=>[g.id,g]));return curr.map(g=>{const p=map.get(g.id);const velocity=p?distance(p.mean,g.mean)/(Math.max(1,dtMs)/1000):0;const label:MotionLabel=velocity>.8?'dynamic':velocity>.15?'slow':'static';return{id:g.id,velocity,acceleration:0,label}})}
export function summarizeMotion(scores:MotionScore[]){return {static:scores.filter(s=>s.label==='static').length,slow:scores.filter(s=>s.label==='slow').length,dynamic:scores.filter(s=>s.label==='dynamic').length,meanVelocity:scores.reduce((s,x)=>s+x.velocity,0)/(scores.length||1)}}
