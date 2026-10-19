
import type {DesignFeedback,UserPreferences,DesignConcept} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export function analyzerevision_language(feedback:DesignFeedback[],_concepts:DesignConcept[]):CreativeSignal{
  const relevant=feedback.filter(item=>item.action==='refine');
  const accepted=relevant.filter(item=>item.action==='save'||item.action==='accept').length;
  const rejected=relevant.filter(item=>item.action==='reject').length;
  const score=clamp(.5+(accepted-rejected)*.08+relevant.length*.02);
  return {id:'personal-revision-language',label:'Revision language',score,confidence:clamp(.55+Math.min(.35,relevant.length*.05)),source:'feedback-memory',explanation:'Refinement actions represent repeated edit language and intent.'};
}

export function applyrevision_languagePreference(signal:CreativeSignal,prefs:UserPreferences):UserPreferences{
  const priorities=[...prefs.priorities];
  if(signal.score>.68 && !priorities.includes('iterative-editing')) priorities.push('iterative-editing');
  return {...prefs,priorities:priorities.slice(0,10)};
}
