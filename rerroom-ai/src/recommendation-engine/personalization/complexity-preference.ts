import type {UserPreferences,Recommendation} from '../core/types';
export const complexityPreference=(prefs:UserPreferences,r:Recommendation)=>{const household=prefs.householdNeeds.length;const effort={tiny:0.05,easy:.15,moderate:.35,large:.6,major:.8}[r.effort];return Math.max(0,Math.min(1,.55-household*.02-effort*.25));};
