import type {Recommendation,Feedback,UserPreferences} from '../core/types';
import {applyNegativePatterns,learnNegativePatterns} from '../ai/feedback/negative-learning';
import {sessionLearn} from '../ai/feedback/session-learning';
import {rankByWeightedUtility} from '../ai/multiobjective/weighted-utility';
export const recommendationLoop=(rows:Recommendation[],prefs:UserPreferences,feedback:Feedback[])=>{let current=sessionLearn(rows,feedback);const patterns=learnNegativePatterns(feedback,current);current=applyNegativePatterns(current,patterns);const weights={score:.35,impact:.3,confidence:.2,cost:.08,effort:.07};return rankByWeightedUtility(current,weights).slice(0,Math.max(1,prefs.historyEnabled?16:12));};
