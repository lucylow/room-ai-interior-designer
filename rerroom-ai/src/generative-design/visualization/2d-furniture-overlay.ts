import type {DesignConcept} from '../core/types';
export interface Visual2DFurnitureOverlay{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const build2DFurnitureOverlay=(concept:DesignConcept):Visual2DFurnitureOverlay=>({kind:'2d-furniture-overlay',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
