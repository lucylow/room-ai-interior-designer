import { AuthoritativeModel, SourceFeature } from '../core/types';
export interface FeatureDiff { featureId:string; kind:'added'|'removed'|'changed'|'unchanged'; previous?:SourceFeature; current?:SourceFeature; changes:string[]; }
export interface RevisionDiff { fromRevision:string; toRevision:string; features:FeatureDiff[]; added:number; removed:number; changed:number; unchanged:number; }
export class SourceRevisionDiff {
  compare(previous:AuthoritativeModel,current:AuthoritativeModel):RevisionDiff {
    const map=new Map(previous.features.map(f=>[f.id,f])); const seen=new Set<string>(); const rows:FeatureDiff[]=[];
    for(const f of current.features){seen.add(f.id);const old=map.get(f.id);if(!old){rows.push({featureId:f.id,kind:'added',current:f,changes:['Feature did not exist in previous revision.']});continue;}const changes=this.diffFeature(old,f);rows.push({featureId:f.id,kind:changes.length?'changed':'unchanged',previous:old,current:f,changes});}
    for(const f of previous.features)if(!seen.has(f.id))rows.push({featureId:f.id,kind:'removed',previous:f,changes:['Feature is missing from current revision.']});
    return {fromRevision:previous.importedRevision,toRevision:current.importedRevision,features:rows,added:rows.filter(x=>x.kind==='added').length,removed:rows.filter(x=>x.kind==='removed').length,changed:rows.filter(x=>x.kind==='changed').length,unchanged:rows.filter(x=>x.kind==='unchanged').length};
  }
  private diffFeature(a:SourceFeature,b:SourceFeature):string[]{const c:string[]=[];if(a.kind!==b.kind)c.push(`kind ${a.kind} -> ${b.kind}`);if(JSON.stringify(a.size)!==JSON.stringify(b.size))c.push('size changed');if(JSON.stringify(a.center)!==JSON.stringify(b.center))c.push('center changed');if(JSON.stringify(a.geometry2d)!==JSON.stringify(b.geometry2d))c.push('2D geometry changed');if(JSON.stringify(a.properties)!==JSON.stringify(b.properties))c.push('properties changed');return c;}
}
