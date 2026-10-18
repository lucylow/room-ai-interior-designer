
import type {DesignConcept,RenderSpec} from '../../core/types';
import type {CreativeRevision} from '../types';
import {clamp} from '../../core/utils';

const PRESET:CreativeRevision={id:'more-symmetrical',label:'Increase symmetry',description:'align focal furniture and artwork around a stronger axis',controls:['layout'],delta:0.03,preserves:['architecture','source measurements','openings'],touches:['aesthetic rendering','prompt tokens','visual hierarchy'],reversible:true};

export function getmore_symmetricalRevision():CreativeRevision{return PRESET;}

export function applymore_symmetricalRevision(concept:DesignConcept):DesignConcept{
  const render:RenderSpec={...concept.render,strength:clamp(concept.render.strength+PRESET.delta),notes:[...concept.render.notes,PRESET.description]};
  return {...concept,id:`${concept.id}--more-symmetrical`,title:`${concept.title} • ${PRESET.label}`,subtitle:PRESET.description,conceptText:`${concept.conceptText} Revision: ${PRESET.description}`,score:clamp(concept.score+PRESET.delta*.45),confidence:clamp(concept.confidence-0.01),render,nextPrompts:[PRESET.label,...concept.nextPrompts].slice(0,5)};
}

export function revisionPromptmore_symmetrical():string{return `${PRESET.label}. ${PRESET.description}. Preserve architecture, measured dimensions, openings and the existing scene composition unless explicitly requested.`;}
