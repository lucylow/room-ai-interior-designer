import type {Recommendation} from '../core/types';import type {PreferenceProfile} from './preference-profile';import {clamp} from '../core/math';
export const personalizeScore=(r:Recommendation,p:PreferenceProfile)=>{const category=p.categoryAffinity[r.category]??0;const style=r.tags.reduce((s,t)=>s+(p.styleAffinity[t]??0),0)/Math.max(1,r.tags.length);return clamp(r.score+category*.5+style*.08);};
export const personalizeList=(rs:Recommendation[],p:PreferenceProfile)=>rs.map(r=>({...r,score:personalizeScore(r,p)})).sort((a,b)=>b.score-a.score);
