import type {Recommendation} from '../core/types';import {novelty} from '../learning/novelty';import {clamp} from '../core/math';
export const noveltyAdjust=(r:Recommendation,history:string[]):Recommendation=>{const n=novelty(r.title,history);return {...r,score:clamp(r.score*(.88+.12*n)),tags:n>.75?[...r.tags,'novel']:r.tags};};
export const noveltyAdjustList=(rs:Recommendation[],history:string[])=>rs.map(r=>noveltyAdjust(r,history)).sort((a,b)=>b.score-a.score);
