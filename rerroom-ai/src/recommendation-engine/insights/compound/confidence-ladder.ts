import type {Recommendation} from '../../core/types';
export const confidenceLadder=(rows:Recommendation[])=>rows.slice().sort((a,b)=>b.confidence-a.confidence).map((r,i)=>({id:r.id,position:i+1,confidence:r.confidence,label:r.confidence>=.8?'strong':r.confidence>=.6?'moderate':'tentative'}));
