import { AuthoritativeModel, ConceptElement } from '../core/types';
import { LayoutPlan, ViewMode } from '../planning/types';

export interface LightingPreviewResult {
  id:string; kind:string; score:number; warnings:string[]; metadata:Record<string,string|number|boolean>; 
  nodes:Array<{id:string;label:string;visible:boolean;position:{x:number;y:number;z:number};sourceId?:string}>;
}

export function buildLightingPreview(model:AuthoritativeModel,layout?:LayoutPlan,concepts:ConceptElement[]=[],mode:ViewMode='perspective'):LightingPreviewResult {
  const warnings:string[]=[]; const base=model.features.map(f=>({id:f.id,label:f.name||f.id,visible:true,position:f.center||{x:0,y:0,z:0},sourceId:f.id}));
  const conceptNodes=concepts.map(c=>({id:c.id,label:c.semanticType,visible:true,position:c.transformDelta?.position||{x:0,y:0,z:0},sourceId:c.anchor?.sourceFeatureId}));
  const planNodes=(layout?.placements||[]).map(p=>({id:p.id,label:p.furnitureId,visible:true,position:p.position}));
  if(model.features.length===0) warnings.push('Source model has no features.');
  if(mode==='section' && !model.levels.length) warnings.push('Section view has no source levels.');
  const score=Math.max(0,Math.min(1,.45*(base.length>0?1:0)+.25*(planNodes.length>0?1:.4)+.2*(conceptNodes.length>0?1:.5)+.1*(warnings.length?0:.9)));
  return {id:`$LightingPreview-`+model.id,kind:'$LightingPreview',score,warnings,metadata:{mode,sourceFeatures:base.length,concepts:conceptNodes.length,placements:planNodes.length},nodes:[...base,...conceptNodes,...planNodes]};
}
