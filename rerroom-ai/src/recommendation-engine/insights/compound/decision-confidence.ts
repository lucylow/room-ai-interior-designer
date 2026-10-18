import type {Recommendation,Insight} from '../../core/types';
export const decisionConfidence=(rows:Recommendation[],insights:Insight[])=>{const a=rows.length?rows.reduce((s,r)=>s+r.confidence,0)/rows.length:0;const b=insights.length?insights.reduce((s,i)=>s+i.confidence,0)/insights.length:0;const evidence=rows.length?rows.filter(r=>r.evidence.length>=2).length/rows.length:0;return Math.min(1,a*.45+b*.3+evidence*.25);};
export const decisionBand=(score:number)=>score>=.8?'high':score>=.6?'moderate':'low';
