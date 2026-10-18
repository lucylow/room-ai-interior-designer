
import type {DesignConcept} from '../../core/types';
export interface ConceptCardModel {id:string;title:string;styleLabel:string;paletteLabel:string;score:number;confidence:number;badges:string[];nextActions:string[];}
export function conceptCard(concept:DesignConcept):ConceptCardModel{return {id:concept.id,title:concept.title,styleLabel:concept.styleId.replace(/-/g,' '),paletteLabel:(concept.paletteId??'custom').replace(/-/g,' '),score:concept.score,confidence:concept.confidence,badges:[concept.render.geometryLock?'Geometry locked':'Review geometry',`${concept.layout.length} layout options`,`${concept.nextPrompts.length} next prompts`],nextActions:['Open 2D plan','Open 3D view','Compare palette','Refine one variable']};}
