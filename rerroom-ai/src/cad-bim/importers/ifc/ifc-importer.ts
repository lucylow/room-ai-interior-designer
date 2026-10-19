import { AuthoritativeModel, BIMClass, BIMEntity, BIMIndex, SourceDocument, SourceFeature } from '../../core/types';
import { tokenizeStep } from './step-tokenizer';

const CLASS_MAP:Record<string,BIMClass>={IFCWALL:'IfcWall',IFCSLAB:'IfcSlab',IFCROOF:'IfcRoof',IFCSPACE:'IfcSpace',IFCDOOR:'IfcDoor',IFCWINDOW:'IfcWindow',IFCOPENINGELEMENT:'IfcOpeningElement',IFCCOLUMN:'IfcColumn',IFCBEAM:'IfcBeam',IFCFURNISHINGELEMENT:'IfcFurnishingElement',IFCFURNITURE:'IfcFurniture'};
export class IfcImporter {
  parse(projectId:string,doc:SourceDocument,text:string):AuthoritativeModel {
    const entities=tokenizeStep(text); const features:SourceFeature[]=[]; const bim:BIMEntity[]=[];
    for(const e of entities){ const cls=CLASS_MAP[e.keyword]; if(!cls) continue; const gid=this.extractGlobalId(e.args); const id=`ifc_${e.expressId}`; const kind=this.kindFromClass(cls); const f:SourceFeature={id,sourceDocumentId:doc.id,externalId:gid,kind,bimClass:cls,authority:'authoritative',properties:{expressId:e.expressId,keyword:e.keyword},sourceRefs:[`IFC:#${e.expressId}`]}; features.push(f); bim.push({id,expressId:e.expressId,className:cls,globalId:gid,propertySets:[],sourceRefs:[`IFC:#${e.expressId}`]}); }
    return {id:`model_${doc.id}`,projectId,document:doc,features,levels:[],dimensions:{},anchors:features.map(f=>({sourceDocumentId:doc.id,sourceFeatureId:f.id,externalId:f.externalId,confidence:1})),importedRevision:'ifc-1',immutableGeometryHash:String(entities.length)+'-'+text.length};
  }
  buildIndex(docId:string,text:string):BIMIndex { const entities=tokenizeStep(text); const mapped:BIMEntity[]=entities.map(e=>({id:`ifc_${e.expressId}`,expressId:e.expressId,className:CLASS_MAP[e.keyword]||'Unknown',globalId:this.extractGlobalId(e.args),propertySets:[],sourceRefs:[`IFC:#${e.expressId}`]})); return {documentId:docId,entities:mapped,entityByExpressId:Object.fromEntries(mapped.map(e=>[e.expressId,e])),wallIds:mapped.filter(e=>e.className==='IfcWall').map(e=>e.id),openingIds:mapped.filter(e=>e.className==='IfcOpeningElement'||e.className==='IfcDoor'||e.className==='IfcWindow').map(e=>e.id),spaceIds:mapped.filter(e=>e.className==='IfcSpace').map(e=>e.id),fixtureIds:mapped.filter(e=>e.className==='IfcFurnishingElement'||e.className==='IfcFurniture').map(e=>e.id)}; }
  private extractGlobalId(args:string):string|undefined { const m=args.match(/'([0-9A-Za-z_$-]{10,})'/); return m?.[1]; }
  private kindFromClass(cls:BIMClass):SourceFeature['kind'] { const map:any={IfcWall:'wall',IfcSlab:'floor',IfcRoof:'ceiling',IfcSpace:'room',IfcDoor:'door',IfcWindow:'window',IfcOpeningElement:'opening',IfcColumn:'column',IfcBeam:'beam',IfcFurniture:'furniture',IfcFurnishingElement:'furniture'}; return map[cls]||'other'; }
}
