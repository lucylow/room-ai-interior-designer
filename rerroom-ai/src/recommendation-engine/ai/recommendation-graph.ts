import type {Recommendation} from '../core/types';
export interface GraphEdge {from:string;to:string;weight:number;reason:string;}
export const buildRecommendationGraph=(rows:Recommendation[]):GraphEdge[]=>{const edges:GraphEdge[]=[];for(let i=0;i<rows.length;i++){for(let j=i+1;j<rows.length;j++){const a=rows[i],b=rows[j];const shared=a.tags.filter(t=>b.tags.includes(t));const sameCategory=a.category===b.category;const weight=Math.min(1,shared.length*.22+(sameCategory?.18:0));if(weight>.2)edges.push({from:a.id,to:b.id,weight,reason:shared.length?`Shared tags: ${shared.slice(0,3).join(', ')}`:'Same recommendation category.'});}}return edges.sort((a,b)=>b.weight-a.weight);};
export const neighbors=(edges:GraphEdge[],id:string,limit=6)=>edges.filter(e=>e.from===id||e.to===id).slice(0,limit);
