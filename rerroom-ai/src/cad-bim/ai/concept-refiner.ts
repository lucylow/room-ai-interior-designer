import { AestheticIntent, AuthoritativeModel, DesignOverlay, OverlayPatch } from '../core/types';
import { RefinementEngine } from '../overlay/refinement-engine';
export class ConceptRefiner { constructor(private engine=new RefinementEngine()){} refine(model:AuthoritativeModel,previous:DesignOverlay,intent:AestheticIntent):{overlay:DesignOverlay;patches:OverlayPatch[]}{if(previous.authoritativeModelId!==model.id)throw new Error('Concept is tied to a different authoritative model');return this.engine.refine(previous,intent);} }
