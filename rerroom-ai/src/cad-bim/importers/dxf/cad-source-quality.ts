import { AuthoritativeModel, SourceFeature, ValidationIssue } from '../../core/types';
export interface CadSourceQualityResult { features:SourceFeature[]; issues:ValidationIssue[]; score:number; }
export class CadSourceQuality {
  /** scores CAD source completeness and ambiguity. */
  run(model:AuthoritativeModel):CadSourceQualityResult {
    const issues:ValidationIssue[]=[]; const features=model.features.filter(f=>f.layer || f.kind!=='other');
    if(features.length===0) issues.push({severity:'warning',code:'CAD_SOURCE_SPARSE',message:'CAD source contains few semantically classified features.'});
    const layerCount=new Set(features.map(f=>f.layer).filter(Boolean)).size; const score=Math.min(1,.4+Math.min(.6,features.length/50)+Math.min(.2,layerCount/20));
    return {features,issues,score};
  }
}
