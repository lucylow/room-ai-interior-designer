import type {DesignConcept} from '../core/types';
export interface VisualLayoutAdviceCard{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const buildLayoutAdviceCard=(concept:DesignConcept):VisualLayoutAdviceCard=>({kind:'layout-advice-card',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
