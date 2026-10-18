import { AuthoritativeModel, AestheticIntent, DesignOverlay } from '../core/types';
import { ConceptGenerator } from './concept-generator';
import { ConceptCritic } from './concept-critic';
import { assessApprovalReadiness } from './approval-readiness';
export interface GroundedConceptResult { overlay:DesignOverlay; critique:ReturnType<ConceptCritic['critique']>; approval:ReturnType<typeof assessApprovalReadiness>; provenance:{sourceModelId:string;sourceRevision:string;geometryHash:string}; }
export class GroundedConceptPipeline { generate(model:AuthoritativeModel,intent:AestheticIntent):GroundedConceptResult{const overlay=new ConceptGenerator().generate(model,intent);const critique=new ConceptCritic().critique(model,overlay);const approval=assessApprovalReadiness(model,overlay);return {overlay,critique,approval,provenance:{sourceModelId:model.id,sourceRevision:model.importedRevision,geometryHash:model.immutableGeometryHash}};} }
