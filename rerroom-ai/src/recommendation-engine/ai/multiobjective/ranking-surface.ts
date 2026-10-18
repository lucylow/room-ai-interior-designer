import type {Recommendation} from '../../core/types';
export interface SurfacePoint{id:string;x:number;y:number;z:number;}
export const buildRankingSurface=(rows:Recommendation[]):SurfacePoint[]=>rows.map(r=>({id:r.id,x:r.score,y:r.expectedImpact,z:r.confidence}));
export const surfaceDistance=(a:SurfacePoint,b:SurfacePoint)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
export const nearestToIdeal=(rows:Recommendation[])=>{const surface=buildRankingSurface(rows);return surface.slice().sort((a,b)=>Math.hypot(1-b.x,1-b.y,1-b.z)-Math.hypot(1-a.x,1-a.y,1-a.z));};
