import { AuthoritativeModel, SourceDocument, SourceFeature } from '../../core/types';
export class ObjImporter {
  parse(projectId:string,doc:SourceDocument,text:string):AuthoritativeModel {
    const verts:number[][]=[]; const features:SourceFeature[]=[]; let faceCount=0;
    for(const line of text.split(/\n/)){ const t=line.trim(); if(t.startsWith('v ')){const p=t.split(/\s+/).slice(1).map(Number); if(p.length>=3) verts.push(p.slice(0,3));}
      if(t.startsWith('f ')){faceCount++;}
    }
    const points=verts.map(v=>({x:v[0],y:v[1],z:v[2]}));
    if(points.length){ const xs=points.map(p=>p.x),ys=points.map(p=>p.y),zs=points.map(p=>p.z); features.push({id:'obj_mesh_0',sourceDocumentId:doc.id,kind:'other',authority:'derived',center:{x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2,z:(Math.min(...zs)+Math.max(...zs))/2},size:{width:Math.max(...xs)-Math.min(...xs),depth:Math.max(...ys)-Math.min(...ys),height:Math.max(...zs)-Math.min(...zs)},properties:{vertexCount:verts.length,faceCount},sourceRefs:['OBJ:mesh']}); }
    return {id:`model_${doc.id}`,projectId,document:doc,features,levels:[],dimensions:{},anchors:features.map(f=>({sourceDocumentId:doc.id,sourceFeatureId:f.id,confidence:.6})),importedRevision:'obj-1',immutableGeometryHash:String(verts.length)+'-'+faceCount};
  }
}
