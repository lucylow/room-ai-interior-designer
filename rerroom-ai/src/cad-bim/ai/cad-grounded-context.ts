import { AuthoritativeModel, AestheticIntent, AnchorReference } from '../core/types';
import { ModelQuery } from '../model/model-query';
export interface CADGroundedContext { modelRevision:string; immutableGeometryHash:string; rooms:Array<Record<string,unknown>>; anchors:AnchorReference[]; constraints:string[]; preservedFeatureIds:string[]; }
export function buildCADGroundedContext(model:AuthoritativeModel,intent:AestheticIntent):CADGroundedContext{
  const q=new ModelQuery(model); const rooms=q.rooms().map(r=>({id:r.id,name:r.name,center:r.center,size:r.size,kind:r.kind,authority:r.authority}));
  return {modelRevision:model.importedRevision,immutableGeometryHash:model.immutableGeometryHash,rooms,anchors:model.anchors,constraints:[...intent.constraints,'Do not change authoritative geometry','Do not alter source dimensions','All construction-facing dimensions must resolve to an anchor'],preservedFeatureIds:intent.preserveFeatures};
}
