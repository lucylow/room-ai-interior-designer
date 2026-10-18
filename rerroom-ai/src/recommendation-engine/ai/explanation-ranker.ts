import type {Recommendation} from '../core/types';
export interface ExplanationRank{recommendationId:string;clarity:number;evidenceDensity:number;actionability:number;final:number;}
export const rankExplanations=(rows:Recommendation[]):ExplanationRank[]=>rows.map(r=>{const clarity=r.rationale.length>40?.9:.65;const evidenceDensity=Math.min(1,r.evidence.length/4);const actionability=r.actions.some(a=>a.type!=='none')?.95:.45;return {recommendationId:r.id,clarity,evidenceDensity,actionability,final:Math.min(1,clarity*.35+evidenceDensity*.3+actionability*.35)};}).sort((a,b)=>b.final-a.final);
