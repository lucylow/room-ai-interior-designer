
import type {DesignFeedback,UserPreferences,DesignConcept} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';

export function analyzepalette_rejection(feedback:DesignFeedback[],concepts:DesignConcept[]):CreativeSignal{
  const relevant=feedback.filter(item=>(item.paletteOverride??'').length>0 && item.action==='reject');
  const accepted=relevant.filter(item=>item.action==='save'||item.action==='accept').length;
  const rejected=relevant.filter(item=>item.action==='reject').length;
  const score=clamp(.5+(accepted-rejected)*.08+relevant.length*.02);
  return {id:'personal-palette-rejection',label:'Rejected palettes',score,confidence:clamp(.55+Math.min(.35,relevant.length*.05)),source:'feedback-memory',explanation:'Rejected palette overrides should reduce repetition.'};
}

export function applypalette_rejectionPreference(signal:CreativeSignal,prefs:UserPreferences):UserPreferences{
  const priorities=[...prefs.priorities];
  if(signal.score>.68 && !priorities.includes('color-avoidance')) priorities.push('color-avoidance');
  return {...prefs,priorities:priorities.slice(0,10)};
}
