import type {Feedback,Recommendation} from '../../core/types';
export const acceptancePropensity=(r:Recommendation,history:Feedback[])=>{const relevant=history.filter(f=>f.recommendationId===r.id);const p=relevant.filter(f=>f.action==='accepted'||f.action==='saved').length;const n=relevant.filter(f=>f.action==='rejected').length;return (p+1)/(p+n+2);};
export const acceptanceRank=(rows:Recommendation[],history:Feedback[])=>rows.map(r=>({recommendation:r,propensity:acceptancePropensity(r,history)})).sort((a,b)=>b.propensity-a.propensity);
