import type {DesignConcept} from '../core/types';
export interface Visual3DMaterialOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build3DMaterialOverlay=(concept:DesignConcept):Visual3DMaterialOverlay=>({kind:'3d-material-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
