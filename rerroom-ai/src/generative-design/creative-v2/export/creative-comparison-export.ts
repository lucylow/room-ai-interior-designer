
import type {DesignConcept} from '../../core/types';
export interface ComparisonExport {conceptIds:string[];rows:Array<{label:string;value:string}>;}
export function exportComparison(concepts:DesignConcept[]):ComparisonExport{return {conceptIds:concepts.map(c=>c.id),rows:[{label:'styles',value:concepts.map(c=>c.styleId).join(' vs ')},{label:'palettes',value:concepts.map(c=>c.paletteId??'none').join(' vs ')},{label:'scores',value:concepts.map(c=>c.score.toFixed(2)).join(' vs ')},{label:'geometry lock',value:concepts.map(c=>String(c.render.geometryLock)).join(' vs ')}]};}
