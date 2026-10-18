import type {Recommendation} from '../../core/types';
export const calibrateMonotonic=(rows:Recommendation[]):Recommendation[]=>{let previous=1;return rows.slice().sort((a,b)=>b.confidence-a.confidence).map(r=>{const score=Math.min(previous,r.score);previous=score;return {...r,score};});};
