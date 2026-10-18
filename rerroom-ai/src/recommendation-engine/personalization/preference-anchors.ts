import type {UserPreferences,Recommendation} from '../core/types';
export const preferenceAnchors=(prefs:UserPreferences,rows:Recommendation[])=>{const anchors=[...prefs.preferredStyles,...prefs.preferredColors,...prefs.materials,...prefs.householdNeeds];return anchors.map(anchor=>({anchor,support:rows.filter(r=>r.tags.includes(anchor)).length})).sort((a,b)=>b.support-a.support);};
