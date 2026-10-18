import { AuthoritativeModel, ConceptElement } from '../core/types';
import { LayoutPlan } from '../planning/types';
export interface ThreeDSelectionOverlayItem { id:string; label:string; linkedId?:string; value:string|number; }
export interface ThreeDSelectionOverlayResult { id:string; items:ThreeDSelectionOverlayItem[]; score:number; warnings:string[]; }
export function buildThreeDSelectionOverlay(model:AuthoritativeModel,plan?:LayoutPlan,concepts:ConceptElement[]=[]):ThreeDSelectionOverlayResult {
 const warnings:string[]=[]; const items:ThreeDSelectionOverlayItem[]=[];
 if(!plan) warnings.push('No active layout.');
 model.features.slice(0,16).forEach(f=>items.push({id:'source-'+f.id,label:f.name||f.id,linkedId:f.id,value:f.authority}));
 (plan?.placements||[]).slice(0,16).forEach(p=>items.push({id:'placement-'+p.id,label:p.furnitureId,linkedId:p.id,value:Number(p.score.toFixed(3))}));
 concepts.slice(0,12).forEach(c=>items.push({id:'concept-'+c.id,label:c.semanticType,linkedId:c.id,value:Number(c.confidence.toFixed(3))}));
 const score=Math.max(0,Math.min(1,(items.length?0.9:.2)-warnings.length*.08));
 return {id:`ThreeDSelectionOverlay-`+model.id,items,score,warnings};
}
