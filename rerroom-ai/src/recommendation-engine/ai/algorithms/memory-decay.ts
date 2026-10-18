import type {Recommendation} from '../../core/types';
export const memoryDecay=(createdAt:number,now=Date.now(),halfLifeMs=30*86400000)=>Math.pow(.5,Math.max(0,now-createdAt)/halfLifeMs);
export const decayRows=(rows:Recommendation[],now=Date.now())=>rows.map(r=>({...r,score:r.score*(.65+.35*memoryDecay(r.createdAt,now))}));
