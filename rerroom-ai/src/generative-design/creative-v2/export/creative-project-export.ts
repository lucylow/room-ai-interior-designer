
import type {DesignConcept,GenerationResult} from '../../core/types';
export interface CreativeProjectExport {version:string;createdAt:number;selected?:string;concepts:Array<{id:string;style:string;palette?:string;prompt:string;geometryLock:boolean;}>;insights:number;}
export function exportCreativeProject(result:GenerationResult):CreativeProjectExport{return {version:'creative-v2',createdAt:Date.now(),selected:result.selected?.id,concepts:result.concepts.map(c=>({id:c.id,style:c.styleId,palette:c.paletteId,prompt:c.render.positivePrompt,geometryLock:c.render.geometryLock})),insights:result.insights.length};}
