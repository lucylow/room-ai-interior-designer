import type {DesignConcept} from '../core/types';
export interface Visual3DLightingOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build3DLightingOverlay=(concept:DesignConcept):Visual3DLightingOverlay=>({kind:'3d-lighting-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
