import { AuthoritativeModel, SourceDocument } from '../../core/types';
export class GltfImporter {
  parse(projectId:string,doc:SourceDocument,text:string):AuthoritativeModel {
    let json:any={}; try{json=JSON.parse(text);}catch{ /* binary .glb should be handled by a binary adapter */ }
    const meshes=Array.isArray(json.meshes)?json.meshes.length:0; const nodes=Array.isArray(json.nodes)?json.nodes.length:0;
    return {id:`model_${doc.id}`,projectId,document:doc,features:[{id:'gltf_manifest',sourceDocumentId:doc.id,kind:'other',authority:'illustrative',properties:{meshCount:meshes,nodeCount:nodes},sourceRefs:['GLTF:manifest']}],levels:[],dimensions:{},anchors:[],importedRevision:'gltf-1',immutableGeometryHash:String(text.length)};
  }
}
