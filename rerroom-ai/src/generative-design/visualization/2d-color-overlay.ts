import type {DesignConcept} from '../core/types';
export interface Visual2DColorOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build2DColorOverlay=(concept:DesignConcept):Visual2DColorOverlay=>({kind:'2d-color-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
