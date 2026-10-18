import type {Recommendation} from '../core/types';
export const freshness=(r:Recommendation,now=Date.now())=>{const age=Math.max(0,now-r.createdAt);const ttl=r.expiresAt?Math.max(1,r.expiresAt-r.createdAt):7*86400000;return Math.max(0,Math.min(1,1-age/ttl));};
export const refreshNeeded=(rows:Recommendation[],now=Date.now())=>rows.filter(r=>freshness(r,now)<.15).map(r=>r.id);
