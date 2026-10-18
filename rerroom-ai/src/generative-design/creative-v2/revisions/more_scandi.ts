
import type {DesignConcept,RenderSpec} from '../../core/types';
import type {CreativeRevision} from '../types';
import {clamp} from '../../core/utils';

const PRESET:CreativeRevision={id:'more-scandi',label:'Push it more Scandinavian',description:'brighten timber, daylight and tactile textiles',controls:['style'],delta:0.06,preserves:['architecture','source measurements','openings'],touches:['aesthetic rendering','prompt tokens','visual hierarchy'],reversible:true};

export function getmore_scandiRevision():CreativeRevision{return PRESET;}

export function applymore_scandiRevision(concept:DesignConcept):DesignConcept{
  const render:RenderSpec={...concept.render,strength:clamp(concept.render.strength+PRESET.delta),notes:[...concept.render.notes,PRESET.description]};
  return {...concept,id:`${concept.id}--more-scandi`,title:`${concept.title} • ${PRESET.label}`,subtitle:PRESET.description,conceptText:`${concept.conceptText} Revision: ${PRESET.description}`,score:clamp(concept.score+PRESET.delta*.45),confidence:clamp(concept.confidence-0.01),render,nextPrompts:[PRESET.label,...concept.nextPrompts].slice(0,5)};
}

export function revisionPromptmore_scandi():string{return `${PRESET.label}. ${PRESET.description}. Preserve architecture, measured dimensions, openings and the existing scene composition unless explicitly requested.`;}
