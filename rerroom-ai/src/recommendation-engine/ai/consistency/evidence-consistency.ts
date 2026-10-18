import type {Recommendation} from '../../core/types';
export const evidenceConsistency=(rows:Recommendation[])=>rows.map(r=>{const confidence=r.evidence.length?r.evidence.reduce((s,e)=>s+e.confidence,0)/r.evidence.length:0;const aligned=r.confidence<=confidence+.2;return {id:r.id,score:aligned?.92:.55,evidenceConfidence:confidence,aligned};});
