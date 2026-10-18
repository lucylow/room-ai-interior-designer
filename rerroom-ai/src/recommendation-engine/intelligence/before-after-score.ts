import type {Recommendation} from '../core/types';
export interface BeforeAfter{recommendationId:string,before:number,after:number,gain:number,confidence:number;}
export const beforeAfter=(rows:Recommendation[]):BeforeAfter[]=>rows.map(r=>{const before=r.score;const after=Math.min(1,before+r.expectedImpact*.4);return {recommendationId:r.id,before,after,gain:after-before,confidence:r.confidence*.8};});
