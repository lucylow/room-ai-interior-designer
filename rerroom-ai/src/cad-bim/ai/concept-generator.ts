import { AestheticIntent, AuthoritativeModel, ConceptElement, DesignOverlay } from '../core/types';
import { buildCADGroundedContext } from './cad-grounded-context';
export class ConceptGenerator {
  generate(model:AuthoritativeModel,intent:AestheticIntent):DesignOverlay{
    const ctx=buildCADGroundedContext(model,intent); const elements:ConceptElement[]=[];
    const anchors=model.features.filter(f=>intent.preserveFeatures.includes(f.id)).slice(0,24);
    for(const f of anchors){elements.push({id:`concept_${f.id}`,anchor:{sourceDocumentId:model.document.id,sourceFeatureId:f.id,externalId:f.externalId,confidence:1},kind:'aesthetic',semanticType:f.kind,appearance:{material:intent.materials?.[0],color:intent.palette?.[0]},reasoning:`Preserve ${f.kind} from authoritative ${ctx.modelRevision} while applying aesthetic intent.`,confidence:.88,source:'ai'});}
    return {id:`overlay_${Date.now()}`,projectId:model.projectId,authoritativeModelId:model.id,version:1,createdAt:new Date().toISOString(),createdBy:'ai',intent,elements,unresolvedAnchors:[],isApproved:false};
  }
}
