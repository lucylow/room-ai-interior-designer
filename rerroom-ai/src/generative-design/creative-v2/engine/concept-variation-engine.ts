
import type {DesignConcept,DesignVariant} from '../../core/types';
import type {CreativeDirection} from '../types';
import {clamp,stableSort} from '../../core/utils';

export interface VariationPlan {styleIds:string[];paletteIds:string[];layoutModes:string[];count:number;}
export function buildVariations(concept:DesignConcept,plan:VariationPlan):DesignVariant[]{
 const variants:DesignVariant[]=[];
 for(let i=0;i<plan.count;i++){
  const style=plan.styleIds[i%Math.max(1,plan.styleIds.length)]??concept.styleId;
  const palette=plan.paletteIds[i%Math.max(1,plan.paletteIds.length)]??concept.paletteId;
  const layout=plan.layoutModes[i%Math.max(1,plan.layoutModes.length)]??'open-flow';
  const sameStyle=style===concept.styleId;const samePalette=palette===concept.paletteId;
  const novelty=clamp((sameStyle?0.12:.35)+(samePalette?0.08:.22)+(layout===concept.layout?.[0]?.pattern?.toString()?0.06:.2));
  const compatibility=clamp(.72+(sameStyle?.14:0)+(samePalette?.08:0));
  const copy:DesignConcept={...concept,id:`${concept.id}-v${i+1}`,title:`${concept.title} • Variant ${i+1}`,styleId:style as any,paletteId:palette,subtitle:`Alternative ${layout} interpretation`,conceptText:`${concept.conceptText} Layout variation: ${layout}.`,score:clamp(concept.score*.7+compatibility*.2),confidence:clamp(concept.confidence*.9+compatibility*.06),render:{...concept.render,styleId:style as any,paletteId:palette,notes:[...concept.render.notes,`Variation layout=${layout}`]},nextPrompts:[`Try ${style} with ${palette}`,`Explore ${layout} layout`],createdAt:Date.now()};
  variants.push({id:copy.id,parentId:concept.id,label:copy.title,concept:copy,delta:[`style=${style}`,`palette=${palette}`,`layout=${layout}`],novelty,compatibility});
 }
 return stableSort(variants,x=>x.compatibility*.6+x.novelty*.4);
}
