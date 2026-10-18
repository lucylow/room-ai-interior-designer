import type {Recommendation} from '../../core/types';
export const namingConsistency=(rows:Recommendation[])=>{const normalized=rows.map(r=>r.title.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim());const duplicates=normalized.filter((x,i)=>normalized.indexOf(x)!==i);return {score:rows.length?1-duplicates.length/rows.length:1,duplicates};};
