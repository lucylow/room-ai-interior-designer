import type {Recommendation} from '../../core/types';
export interface NextStep{id:string;label:string;score:number;reason:string;}
export const bestNextStep=(rows:Recommendation[]):NextStep|null=>{const ranked=rows.map(r=>({id:r.id,label:r.title,score:r.expectedImpact*.55+r.confidence*.3+r.score*.15,reason:r.rationale})).sort((a,b)=>b.score-a.score);return ranked[0]??null;};
export const nextStepQueue=(rows:Recommendation[],limit=5)=>rows.map(r=>({id:r.id,label:r.title,score:r.expectedImpact*.55+r.confidence*.3+r.score*.15,reason:r.rationale})).sort((a,b)=>b.score-a.score).slice(0,limit);
