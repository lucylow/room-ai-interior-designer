import { AuthoritativeModel, ConceptElement } from '../core/types';
import { LayoutPlan } from '../planning/types';
export interface PlanFurnitureLabelsItem { id:string; label:string; linkedId?:string; value:string|number; }
export interface PlanFurnitureLabelsResult { id:string; items:PlanFurnitureLabelsItem[]; score:number; warnings:string[]; }
export function buildPlanFurnitureLabels(model:AuthoritativeModel,plan?:LayoutPlan,concepts:ConceptElement[]=[]):PlanFurnitureLabelsResult {
 const warnings:string[]=[]; const items:PlanFurnitureLabelsItem[]=[];
 if(!plan) warnings.push('No active layout.');
 model.features.slice(0,16).forEach(f=>items.push({id:'source-'+f.id,label:f.name||f.id,linkedId:f.id,value:f.authority}));
 (plan?.placements||[]).slice(0,16).forEach(p=>items.push({id:'placement-'+p.id,label:p.furnitureId,linkedId:p.id,value:Number(p.score.toFixed(3))}));
 concepts.slice(0,12).forEach(c=>items.push({id:'concept-'+c.id,label:c.semanticType,linkedId:c.id,value:Number(c.confidence.toFixed(3))}));
 const score=Math.max(0,Math.min(1,(items.length?0.9:.2)-warnings.length*.08));
 return {id:`PlanFurnitureLabels-`+model.id,items,score,warnings};
}
