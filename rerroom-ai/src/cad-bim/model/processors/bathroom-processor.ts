import { AuthoritativeModel, DesignOverlay, ValidationIssue } from '../../core/types';

export interface BathroomProcessorResult { accepted:boolean; issues:ValidationIssue[]; featureIds:string[]; score:number; }

/** Domain processor for fixture elements. It never mutates the authoritative model. */
export class BathroomProcessor {
  readonly kind='fixture' as const;
  readonly constraints=["preserve wet-area boundaries", "preserve drain locations", "flag waterproofing scope"] as string[];

  evaluate(model:AuthoritativeModel, overlay:DesignOverlay):BathroomProcessorResult {
    const issues:ValidationIssue[]=[];
    const target=String(this.kind); const features=model.features.filter(f=>String(f.kind)===target || (['finish','material','color','layout-proposal','lighting','aesthetic'].includes(target) && ['wall','floor','ceiling'].includes(String(f.kind))));
    const featureIds=features.map(f=>f.id);
    for(const e of overlay.elements) {
      if(e.anchor && featureIds.includes(e.anchor.sourceFeatureId)) {
        if(e.confidence<0.65) issues.push({severity:'warning',code:'LOW_AI_CONFIDENCE',message:`Low AI confidence on ${e.id}`,featureId:e.anchor.sourceFeatureId});
        if(e.dimensions && features.find(f=>f.id===e.anchor?.sourceFeatureId)?.authority==='authoritative') {
          const base=features.find(f=>f.id===e.anchor?.sourceFeatureId);
          if(base?.size && Math.abs((e.dimensions.width||base.size.width)-base.size.width)>0.001) issues.push({severity:'warning',code:'DIMENSION_PROPOSAL_DIFFERS',message:`AI dimension proposal differs from source ${base.id}; source remains authoritative`,featureId:base.id});
        }
      }
    }
    return {accepted:!issues.some(i=>i.severity==='error'),issues,featureIds,score:Math.max(0,1-issues.length*.04)};
  }
}
