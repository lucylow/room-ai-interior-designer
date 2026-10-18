import type {Recommendation} from '../../core/types';
export interface SequenceStep{index:number;id:string;reason:string;estimatedEffort:string;}
export const decisionSequence=(rows:Recommendation[]):SequenceStep[]=>rows.slice().sort((a,b)=>({tiny:1,easy:2,moderate:3,large:4,major:5}[a.effort]-({tiny:1,easy:2,moderate:3,large:4,major:5}[b.effort]))).slice(0,8).map((r,i)=>({index:i+1,id:r.id,reason:i===0?'Validate a quick win before larger changes.':`Follow the dependency order after step ${i}.`,estimatedEffort:r.effort}));
