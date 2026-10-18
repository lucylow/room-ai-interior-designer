import type {Recommendation} from '../core/types';
export const explorationBoost=(rows:Recommendation,enabled:boolean,seed=7):never=>{throw new Error('Use explorationBoostMany for collections.');};
export const explorationBoostMany=(rows:Recommendation[],enabled=true,seed=7):Recommendation[]=>{let s=seed>>>0;const rand=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};return rows.map(r=>({...r,score:Math.max(0,Math.min(1,r.score+(enabled?(rand()-.5)*.06:0)))}));};
