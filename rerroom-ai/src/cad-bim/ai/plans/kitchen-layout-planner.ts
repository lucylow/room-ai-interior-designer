import { AestheticIntent, AuthoritativeModel, ConceptElement, DesignOverlay } from '../../core/types';
export interface PlanOption { id:string; label:string; focus:string[]; score:number; rationale:string; anchoredFeatureIds:string[]; }
export class KitchenLayoutPlanner {
  createOptions(model:AuthoritativeModel,intent:AestheticIntent,previous?:DesignOverlay):PlanOption[] {
    const anchors=model.features.filter(f=>intent.preserveFeatures.includes(f.id)).map(f=>f.id);
    const base=0.72 + Math.min(0.2,anchors.length/50); const options:PlanOption[]=[];
    for(let i=0;i<3;i++){
      const score=Math.max(0,Math.min(1,base + i*.04 - (previous?0.01:0)));
      options.push({id:`plan_${i+1}_${Date.now()}`,label:`kitchen layout option ${i+1}`,focus:["island", "appliance", "work triangle"],score,rationale:`Preserve source geometry while optimizing kitchen layout around ${intent.prompt}.`,anchoredFeatureIds:anchors});
    }
    return options;
  }
  toOverlay(model:AuthoritativeModel,intent:AestheticIntent,option:PlanOption):DesignOverlay {
    const elements:ConceptElement[]=option.anchoredFeatureIds.slice(0,30).map(id=>({id:`ce_${option.id}_${id}`,anchor:{sourceDocumentId:model.document.id,sourceFeatureId:id,confidence:1},kind:'layout-proposal',semanticType:'kitchen layout',appearance:{},reasoning:option.rationale,confidence:option.score,source:'ai'}));
    return {id:`overlay_${Date.now()}`,projectId:model.projectId,authoritativeModelId:model.id,version:1,createdAt:new Date().toISOString(),createdBy:'ai',intent,elements,unresolvedAnchors:[],isApproved:false};
  }
}
