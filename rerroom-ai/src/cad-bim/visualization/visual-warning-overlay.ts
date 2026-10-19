import {  AuthoritativeModel, ConceptElement } from '../core/types';
import { LayoutPlan, ViewMode } from '../planning/types';

export interface VisualWarningOverlayEntry { id:string; label:string; value:string|number|boolean; linkedId?:string; }
export interface VisualWarningOverlayResult { id:string; mode:ViewMode; score:number; warnings:string[]; entries:VisualWarningOverlayEntry[]; }

export function buildVisualWarningOverlay(model:AuthoritativeModel,plan?:LayoutPlan,concepts:ConceptElement[]=[],mode:ViewMode='perspective'):VisualWarningOverlayResult {
  const warnings:string[]=[]; const entries:VisualWarningOverlayEntry[]=[];
  model.features.slice(0,18).forEach(f=>entries.push({id:`VisualWarningOverlay-source-`+f.id,label:f.name||f.id,value:f.authority,linkedId:f.id}));
  (plan?.placements||[]).slice(0,18).forEach(p=>entries.push({id:`VisualWarningOverlay-placement-`+p.id,label:p.furnitureId,value:Number(p.score.toFixed(3)),linkedId:p.id}));
  concepts.slice(0,18).forEach(c=>entries.push({id:`VisualWarningOverlay-concept-`+c.id,label:c.semanticType,value:c.confidence,linkedId:c.id}));
  if(!plan) warnings.push('No active layout plan.');
  if(!model.features.length) warnings.push('No authoritative source nodes.');
  return {id:`VisualWarningOverlay-`+model.id,mode,score:Math.max(0,Math.min(1,(entries.length?0.88:.25)-(warnings.length*.08))),warnings,entries};
}
