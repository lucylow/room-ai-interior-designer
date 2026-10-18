import type {DesignConcept} from '../core/types';
export interface Visual2DLayoutOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build2DLayoutOverlay=(concept:DesignConcept):Visual2DLayoutOverlay=>({kind:'2d-layout-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
