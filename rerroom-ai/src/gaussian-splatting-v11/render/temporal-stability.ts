import type { ProjectedSplat } from '../core/types';
export interface TemporalReport {stable:number;unstable:number;stabilityScore:number;}
export function compareFrames(a:ProjectedSplat[],b:ProjectedSplat[]):TemporalReport{const bm=new Map(b.map(x=>[x.id,x]));let stable=0,unstable=0;for(const s of a){const t=bm.get(s.id);if(!t){unstable++;continue;}const delta=Math.hypot(s.center[0]-t.center[0],s.center[1]-t.center[1]);if(delta<2&&Math.abs(s.depth-t.depth)<0.03)stable++;else unstable++;}const total=Math.max(1,stable+unstable);return {stable,unstable,stabilityScore:stable/total};}
