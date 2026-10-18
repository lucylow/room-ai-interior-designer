import type {DesignConcept} from '../core/types';
export interface VisualBeforeAfter{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const buildBeforeAfter=(concept:DesignConcept):VisualBeforeAfter=>({kind:'before-after',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
