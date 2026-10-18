import type {DesignConcept} from '../core/types';
export interface VisualStyleFilterCard{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const buildStyleFilterCard=(concept:DesignConcept):VisualStyleFilterCard=>({kind:'style-filter-card',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
