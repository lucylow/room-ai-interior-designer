import type {Insight} from '../../core/types';
export const stabilityScore=(rows:Insight[])=>{const vals=rows.map(r=>r.metric??0);if(vals.length<2)return 1;const mean=vals.reduce((a,b)=>a+b,0)/vals.length;const variance=vals.reduce((s,v)=>s+(v-mean)**2,0)/vals.length;return Math.max(0,Math.min(1,1-Math.sqrt(variance)));};
