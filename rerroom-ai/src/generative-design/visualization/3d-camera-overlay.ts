import type {DesignConcept} from '../core/types';
export interface Visual3DCameraOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build3DCameraOverlay=(concept:DesignConcept):Visual3DCameraOverlay=>({kind:'3d-camera-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
