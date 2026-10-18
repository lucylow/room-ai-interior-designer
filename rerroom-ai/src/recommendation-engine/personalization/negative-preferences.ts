import type {UserPreferences,Recommendation} from '../core/types';
export const negativePreferencePenalty=(prefs:UserPreferences,r:Recommendation)=>{const hits=r.tags.filter(t=>prefs.dislikes.includes(t)||prefs.avoidedStyles.includes(t)||prefs.avoidedColors.includes(t)).length;return Math.min(.6,hits*.12);};
export const applyNegativePreferences=(prefs:UserPreferences,rows:Recommendation[])=>rows.map(r=>({...r,score:Math.max(0,r.score-negativePreferencePenalty(prefs,r))}));
