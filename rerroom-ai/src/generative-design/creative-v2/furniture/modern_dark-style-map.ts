
import type {FurnitureIdea} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export interface FurnitureStyleMap {id:string;style:string;preferredShapes:string[];preferredMaterials:string[];preferredColors:string[];avoid:string[];}
export const map: FurnitureStyleMap={id:'modern-dark',style:'modern-dark',preferredShapes:['clean-lined','proportional','space-aware'],preferredMaterials:['oak','linen','stone'],preferredColors:['warm white','natural wood','controlled accent'],avoid:['overscale furniture','impossible circulation','structural blocking']};
export function remapmodern_dark(items:FurnitureIdea[]):FurnitureIdea[]{
 return items.map((item,_index)=>({...item,styleTags:[...new Set([...(item.styleTags??[]),'modern-dark'])],materialTags:[...new Set([...(item.materialTags??[]),...map.preferredMaterials.slice(0,2)])],colorTags:[...new Set([...(item.colorTags??[]),...map.preferredColors.slice(0,1)])],confidence:clamp((item.confidence??.7)*.92+.08),reason:`Remapped to modern-dark creative vocabulary while preserving dimensions.`}));
}
export function furnitureSignals(items:FurnitureIdea[]):CreativeSignal[]{const avg=items.length?items.reduce((s,x)=>s+x.confidence,0)/items.length:.5;return [{id:'furniture-modern-dark',label:'Furniture style alignment',score:avg,confidence:.76,source:'furniture-style-map',explanation:'Furniture tags are remapped to the requested style without changing measured size.'}];}
