
import type {DesignFeedback,UserPreferences,DesignConcept} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export function analyzenovelty_preference(feedback:DesignFeedback[],concepts:DesignConcept[]):CreativeSignal{
  const relevant=feedback.filter(item=>item.action==='reroll');
  const accepted=relevant.filter(item=>item.action==='save'||item.action==='accept').length;
  const rejected=relevant.filter(item=>item.action==='reject').length;
  const score=clamp(.5+(accepted-rejected)*.08+relevant.length*.02);
  return {id:'personal-novelty-preference',label:'Novelty preference',score,confidence:clamp(.55+Math.min(.35,relevant.length*.05)),source:'feedback-memory',explanation:'Reroll frequency can proxy desired exploration.'};
}

export function applynovelty_preferencePreference(signal:CreativeSignal,prefs:UserPreferences):UserPreferences{
  const priorities=[...prefs.priorities];
  if(signal.score>.68 && !priorities.includes('novelty')) priorities.push('novelty');
  return {...prefs,priorities:priorities.slice(0,10)};
}
