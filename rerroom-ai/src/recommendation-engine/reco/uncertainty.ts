import type {Recommendation,Evidence} from '../core/types';
import {clamp,entropy} from '../core/math';
export const uncertainty=(evidence:Evidence[]):number=>{
  if(!evidence.length)return 1;const cs=evidence.map(e=>e.confidence);const spread=Math.max(...cs)-Math.min(...cs);return clamp(.35*(1-Math.min(...cs))+.35*spread+.3*(1-entropy(cs.map(c=>c))/Math.max(1,Math.log2(cs.length))));
};
export const uncertaintyAdjustedScore=(r:Recommendation):number=>clamp(r.score*(1-uncertainty(r.evidence)*.35));
