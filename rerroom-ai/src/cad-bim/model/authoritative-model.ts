import { AuthoritativeModel, SourceFeature, DimensionalTruth } from '../core/types';
export class AuthoritativeModelStore {
  private model:AuthoritativeModel;
  constructor(model:AuthoritativeModel){this.model=JSON.parse(JSON.stringify(model));}
  snapshot():AuthoritativeModel{return JSON.parse(JSON.stringify(this.model));}
  feature(id:string):SourceFeature|undefined{return this.model.features.find(f=>f.id===id);}
  dimension(id:string):DimensionalTruth|undefined{return this.model.dimensions[id];}
  replaceRevision(nextRevision:string, nextFeatures:SourceFeature[]):void {
    if(nextFeatures.length===0) throw new Error('Cannot replace authoritative revision with empty geometry');
    this.model={...this.model,features:JSON.parse(JSON.stringify(nextFeatures)),importedRevision:nextRevision,immutableGeometryHash:hash(JSON.stringify(nextFeatures))};
  }
  assertImmutableHash(expected:string):void { if(this.model.immutableGeometryHash!==expected) throw new Error('Authoritative geometry hash mismatch'); }
}
function hash(s:string):string{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return(h>>>0).toString(16);}
