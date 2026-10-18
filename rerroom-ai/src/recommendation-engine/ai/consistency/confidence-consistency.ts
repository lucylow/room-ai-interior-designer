import type {Recommendation} from '../../core/types';
export const confidenceConsistency=(rows:Recommendation[])=>rows.map(r=>{const delta=Math.abs(r.confidence-r.score);return {id:r.id,score:Math.max(0,1-delta),delta};});
