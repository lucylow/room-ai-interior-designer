import { Gaussian } from '../core/types';
export type SceneEntity={id:string;label:string;confidence:number;count:number;materials:string[]};
export function summarizeScene(gaussians:Gaussian[]):SceneEntity[]{const map=new Map<string,Gaussian[]>();for(const g of gaussians){const label=g.semantic||'unclassified';const a=map.get(label)||[];a.push(g);map.set(label,a)}return [...map].map(([label,a],i)=>({id:`entity-${i}`,label,confidence:a.reduce((s,g)=>s+(g.confidence??1),0)/a.length,count:a.length,materials:[...new Set(a.map(g=>g.material||'unknown'))]})).sort((a,b)=>b.count-a.count)}
export function sceneComplexity(entities:SceneEntity[]){return Math.min(1,entities.length/32 + entities.reduce((s,e)=>s+(e.count>100?0.02:0),0))}
