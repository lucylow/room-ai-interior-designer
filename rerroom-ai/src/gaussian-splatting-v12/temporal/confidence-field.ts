import { Gaussian } from '../core/types';
export type ConfidenceCell={id:string;count:number;mean:number;variance:number;stability:number};
export function confidenceField(gaussians:Gaussian[],bins=16):ConfidenceCell[]{const cells=new Map<string,number[]>();for(const g of gaussians){const k=`${Math.floor(g.mean.x*bins)}:${Math.floor(g.mean.y*bins)}:${Math.floor(g.mean.z*bins)}`;const a=cells.get(k)||[];a.push(g.confidence??1);cells.set(k,a)}return [...cells].map(([id,a])=>{const mean=a.reduce((s,v)=>s+v,0)/a.length;const variance=a.reduce((s,v)=>s+(v-mean)**2,0)/a.length;return{id,count:a.length,mean,variance,stability:Math.max(0,mean-variance)}})}
export function weakestCells(cells:ConfidenceCell[],n=10){return [...cells].sort((a,b)=>a.stability-b.stability).slice(0,n)}
