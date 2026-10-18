import { AuthoritativeModel, DesignOverlay, AestheticIntent } from '../../core/types';
import { ConceptGenerator } from '../../ai/concept-generator';

export interface ServiceResult<T> { ok:boolean; value?:T; warnings:string[]; }
export class FieldVerificationService {
  /** marks derived measurements and tracks verification status. */
  private generator=new ConceptGenerator();
  run(model:AuthoritativeModel,intent:AestheticIntent,previous?:DesignOverlay):ServiceResult<DesignOverlay> {
    try {
      if(previous && previous.authoritativeModelId!==model.id) return {ok:false,warnings:['Previous concept belongs to another authoritative model.']};
      const overlay=previous?{...previous,id:`overlay_${Date.now()}`,parentOverlayId:previous.id,version:previous.version+1,intent,createdAt:new Date().toISOString(),isApproved:false}:this.generator.generate(model,intent);
      return {ok:true,value:overlay,warnings:['Authoritative CAD/BIM geometry was not mutated.']};
    } catch (error) { return {ok:false,warnings:[error instanceof Error?error.message:'Unknown service failure']}; }
  }
}
