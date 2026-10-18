import type {DesignConcept} from '../core/types';
export interface Visual3DStyleScene{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build3DStyleScene=(concept:DesignConcept):Visual3DStyleScene=>({kind:'3d-style-scene',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
