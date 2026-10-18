import type {Recommendation} from '../core/types';
export interface Counterfactual{recommendationId:string;baseline:number;alternative:number;gain:number;confidence:number;}
export const counterfactualScore=(rows:Recommendation[]):Counterfactual[]=>rows.map((r,i)=>{const alternative=Math.min(1,r.score+r.expectedImpact*(.25+(i%4)*.03));return {recommendationId:r.id,baseline:r.score,alternative,gain:alternative-r.score,confidence:r.confidence*.72};});
export const strongestCounterfactual=(rows:Recommendation[])=>counterfactualScore(rows).sort((a,b)=>b.gain-a.gain)[0]??null;
