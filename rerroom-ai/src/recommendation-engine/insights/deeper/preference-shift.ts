import type {Recommendation} from '../../core/types';
export const recommendationPreferenceShift=(history:Recommendation[])=>{const totals:Record<string,number>={};for(const r of history){for(const tag of r.tags)totals[tag]=(totals[tag]??0)+r.score;}const top=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,8);return {top,diversity:Object.keys(totals).length};};
