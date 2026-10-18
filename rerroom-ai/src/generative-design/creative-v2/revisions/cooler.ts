
import type {DesignConcept,RenderSpec} from '../../core/types';
import type {CreativeRevision} from '../types';
import {clamp} from '../../core/utils';

const PRESET:CreativeRevision={id:'cooler',label:'Make the concept cooler',description:'shift accents toward blue/green neutrals',controls:['palette'],delta:-0.06,preserves:['architecture','source measurements','openings'],touches:['aesthetic rendering','prompt tokens','visual hierarchy'],reversible:true};

export function getcoolerRevision():CreativeRevision{return PRESET;}

export function applycoolerRevision(concept:DesignConcept):DesignConcept{
  const render:RenderSpec={...concept.render,strength:clamp(concept.render.strength+PRESET.delta),notes:[...concept.render.notes,PRESET.description]};
  return {...concept,id:`${concept.id}--cooler`,title:`${concept.title} • ${PRESET.label}`,subtitle:PRESET.description,conceptText:`${concept.conceptText} Revision: ${PRESET.description}`,score:clamp(concept.score+PRESET.delta*.45),confidence:clamp(concept.confidence-0.01),render,nextPrompts:[PRESET.label,...concept.nextPrompts].slice(0,5)};
}

export function revisionPromptcooler():string{return `${PRESET.label}. ${PRESET.description}. Preserve architecture, measured dimensions, openings and the existing scene composition unless explicitly requested.`;}
