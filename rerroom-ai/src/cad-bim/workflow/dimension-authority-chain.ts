import { AuthoritativeModel, AnchorReference, HandoffDimension } from '../core/types';
export type AuthoritySource='cad'|'bim'|'survey'|'designer-confirmed'|'derived'|'ai-estimate';
export interface AuthorityValue { value:number; source:AuthoritySource; confidence:number; anchor?:AnchorReference; note:string; }
export class DimensionAuthorityChain {
  resolve(model:AuthoritativeModel,featureId:string,key:'width'|'depth'|'height'|'length'|'area'|'volume'):AuthorityValue|undefined {
    const d=model.dimensions[featureId]; const f=model.features.find(x=>x.id===featureId); if(!f)return undefined;
    const anchor={sourceDocumentId:model.document.id,sourceFeatureId:featureId,externalId:f.externalId,confidence:f.authority==='authoritative'?1:.7};
    const v=d?.[key as keyof typeof d]; if(typeof v==='number')return {value:v,source:d.measuredFrom==='survey'?'survey':d.measuredFrom==='bim'?'bim':d.measuredFrom==='cad'?'cad':d.measuredFrom==='derived'?'derived':'designer-confirmed',confidence:anchor.confidence,anchor,note:'Resolved from stored source dimensional truth'};
    const size=f.size; if(size){const fallback:any={width:size.width,depth:size.depth,height:size.height,length:Math.max(size.width,size.depth,size.height)};if(typeof fallback[key]==='number')return {value:fallback[key],source:'derived',confidence:.55,anchor,note:'Derived from feature size; verify before construction.'};}
    return undefined;
  }
  toHandoff(model:AuthoritativeModel,featureId:string,key:'width'|'depth'|'height'|'length'):HandoffDimension|undefined {const a=this.resolve(model,featureId,key);if(!a)return undefined;return {label:`${featureId} ${key}`,value:Math.round(a.value*1000),unit:'mm',tolerance:Math.round((model.dimensions[featureId]?.toleranceMeters||.01)*1000),sourceAnchor:a.anchor,verification:a.source==='cad'?'source-cad':a.source==='bim'?'source-bim':a.source==='survey'?'survey':a.source==='designer-confirmed'?'designer-confirmed':'unverified'};}
}
