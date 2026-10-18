
import type {DesignConcept} from '../../core/types';
export interface PromptExport {id:string;positive:string;negative:string[];constraints:string[];seed:number;style:string;palette?:string;}
export function exportPrompt(c:DesignConcept):PromptExport{return {id:c.render.id,positive:c.render.positivePrompt,negative:c.render.negativePrompt,constraints:c.evidence,seed:c.render.seed,style:c.styleId,palette:c.paletteId};}
