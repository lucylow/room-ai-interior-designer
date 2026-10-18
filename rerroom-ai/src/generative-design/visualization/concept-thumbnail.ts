import type {DesignConcept} from '../core/types';
export interface VisualConceptThumbnail{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const buildConceptThumbnail=(concept:DesignConcept):VisualConceptThumbnail=>({kind:'concept-thumbnail',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
