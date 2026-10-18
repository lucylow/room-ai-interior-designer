import type {Insight,RoomContext,UserPreferences} from '../core/types';
import {metricInsight,preferenceConflictInsight} from './detectors';
export const generateBaselineInsights=(room:RoomContext,prefs:UserPreferences,now=Date.now()):Insight[]=>{
  const out:Insight[]=[
    metricInsight(room,'naturalLightScore','lighting','Natural light readiness',now),
    metricInsight(room,'circulationScore','layout','Circulation quality',now),
    metricInsight(room,'clutterScore','storage','Visual clutter',now),
    metricInsight(room,'storageScore','storage','Storage readiness',now),
    metricInsight(room,'visualBalanceScore','style','Visual balance',now),
    metricInsight(room,'accessibilityScore','accessibility','Accessibility readiness',now),
    metricInsight(room,'safetyScore','safety','Safety signal',now),
    metricInsight(room,'comfortScore','comfort','Comfort signal',now),
  ];const conflict=preferenceConflictInsight(room,prefs);if(conflict)out.push(conflict);return out;
};
