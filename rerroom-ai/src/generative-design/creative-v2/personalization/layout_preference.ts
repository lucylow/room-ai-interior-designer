
import type {DesignFeedback,UserPreferences,DesignConcept} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export function analyzelayout_preference(feedback:DesignFeedback[],_concepts:DesignConcept[]):CreativeSignal{
  const relevant=feedback.filter(item=>item.reason?.toLowerCase().includes('layout')===true);
  const accepted=relevant.filter(item=>item.action==='save'||item.action==='accept').length;
  const rejected=relevant.filter(item=>item.action==='reject').length;
  const score=clamp(.5+(accepted-rejected)*.08+relevant.length*.02);
  return {id:'personal-layout-preference',label:'Layout preference',score,confidence:clamp(.55+Math.min(.35,relevant.length*.05)),source:'feedback-memory',explanation:'Layout wording can reveal preferred spatial patterns.'};
}

export function applylayout_preferencePreference(signal:CreativeSignal,prefs:UserPreferences):UserPreferences{
  const priorities=[...prefs.priorities];
  if(signal.score>.68 && !priorities.includes('layout')) priorities.push('layout');
  return {...prefs,priorities:priorities.slice(0,10)};
}
