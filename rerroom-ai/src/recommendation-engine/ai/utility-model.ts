import type {Recommendation,UserPreferences} from '../core/types';
export const utility=(r:Recommendation,prefs:UserPreferences)=>{const priority=prefs.priorities.includes(r.category)?1.15:1;const maintain=r.category==='maintenance'?1.05:1;const cost=(r.estimatedCost??0)/(prefs.budgetMax??Math.max(1,(r.estimatedCost??0)*2));return Math.max(0,Math.min(1,r.score*.48+r.expectedImpact*.32+r.confidence*.2))*priority*maintain-Math.min(.35,cost*.18);};
export const sortByUtility=(rows:Recommendation[],prefs:UserPreferences)=>rows.slice().sort((a,b)=>utility(b,prefs)-utility(a,prefs));
