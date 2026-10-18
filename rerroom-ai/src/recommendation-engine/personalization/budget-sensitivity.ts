import type {UserPreferences,Recommendation} from '../core/types';
export const budgetSensitivity=(prefs:UserPreferences,rows:Recommendation[])=>{const cap=prefs.budgetMax??0;return rows.map(r=>{const c=r.estimatedCost??0;const ratio=cap?c/cap:0;const penalty=cap?Math.min(.5,ratio*.35):0;return {...r,score:Math.max(0,r.score-penalty)};});};
