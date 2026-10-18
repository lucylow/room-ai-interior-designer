
import type {FurnitureIdea} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface FurnitureStyleMap {id:string;style:string;preferredShapes:string[];preferredMaterials:string[];preferredColors:string[];avoid:string[];}
export const map: FurnitureStyleMap={id:'minimalist',style:'minimalist',preferredShapes:['clean-lined','proportional','space-aware'],preferredMaterials:['oak','linen','stone'],preferredColors:['warm white','natural wood','controlled accent'],avoid:['overscale furniture','impossible circulation','structural blocking']};
export function remapminimalist(items:FurnitureIdea[]):FurnitureIdea[]{
 return items.map((item,index)=>({...item,styleTags:[...new Set([...(item.styleTags??[]),'minimalist'])],materialTags:[...new Set([...(item.materialTags??[]),...map.preferredMaterials.slice(0,2)])],colorTags:[...new Set([...(item.colorTags??[]),...map.preferredColors.slice(0,1)])],confidence:clamp((item.confidence??.7)*.92+.08),reason:`Remapped to minimalist creative vocabulary while preserving dimensions.`}));
}
export function furnitureSignals(items:FurnitureIdea[]):CreativeSignal[]{const avg=items.length?items.reduce((s,x)=>s+x.confidence,0)/items.length:.5;return [{id:'furniture-minimalist',label:'Furniture style alignment',score:avg,confidence:.76,source:'furniture-style-map',explanation:'Furniture tags are remapped to the requested style without changing measured size.'}];}
