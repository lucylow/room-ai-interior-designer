import type {Insight} from '../../core/types';
export interface InsightCluster{key:string;count:number;ids:string[];confidence:number;}
export const clusterInsights=(rows:Insight[]):InsightCluster[]=>{const map=new Map<string,Insight[]>();for(const i of rows){const key=i.category;(map.get(key)??map.set(key,[]).get(key)!).push(i);}return [...map.entries()].map(([key,items])=>({key,count:items.length,ids:items.map(i=>i.id),confidence:items.reduce((s,i)=>s+i.confidence,0)/items.length})).sort((a,b)=>b.count-a.count);};
