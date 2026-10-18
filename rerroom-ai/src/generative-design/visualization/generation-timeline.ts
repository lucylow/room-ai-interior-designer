import type {DesignConcept} from '../core/types';
export interface VisualGenerationTimeline{kind:string;label:string;payload:Record<string,string|number|boolean>;}
export const buildGenerationTimeline=(concept:DesignConcept):VisualGenerationTimeline=>({kind:'generation-timeline',label:concept.title,payload:{style:concept.styleId,palette:concept.paletteId??'',score:Number(concept.score.toFixed(3)),geometryLock:concept.render.geometryLock}});
