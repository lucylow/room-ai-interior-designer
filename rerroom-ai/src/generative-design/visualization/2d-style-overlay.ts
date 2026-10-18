import type {DesignConcept} from '../core/types';
export interface Visual2DStyleOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build2DStyleOverlay=(concept:DesignConcept):Visual2DStyleOverlay=>({kind:'2d-style-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
