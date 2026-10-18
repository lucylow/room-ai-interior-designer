import { AuthoritativeModel, SourceDocument, SourceFeature } from '../../core/types';
export class SvgImporter {
  parse(projectId:string,doc:SourceDocument,text:string):AuthoritativeModel {
    const features:SourceFeature[]=[]; const rects=[...text.matchAll(/<rect[^>]*>/gi)];
    rects.forEach((m,i)=>{const tag=m[0]; const n=(k:string)=>{const mm=tag.match(new RegExp(`${k}=["']([^"']+)["']`,'i')); return mm?Number(mm[1]):0}; const x=n('x'),y=n('y'),w=n('width'),h=n('height'); features.push({id:`svg_rect_${i}`,sourceDocumentId:doc.id,kind:'other',authority:'derived',geometry2d:{points:[{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}]},size:{width:w,depth:h,height:0},properties:{svgElement:'rect'},sourceRefs:[`SVG:${i}`]});});
    const model:AuthoritativeModel={id:`model_${doc.id}`,projectId,document:doc,features,levels:[],dimensions:{},anchors:features.map(f=>({sourceDocumentId:doc.id,sourceFeatureId:f.id,confidence:.65})),importedRevision:'svg-1',immutableGeometryHash:String(text.length)}; return model;
  }
}
