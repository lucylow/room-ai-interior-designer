import { AestheticIntent, DesignOverlay, ConceptElement, OverlayPatch } from '../core/types';
import { sameAnchor } from '../core/anchors';
export class RefinementEngine {
  refine(previous:DesignOverlay,nextIntent:AestheticIntent):{overlay:DesignOverlay;patches:OverlayPatch[]} {
    const now=new Date().toISOString(); const elements=previous.elements.map(e=>this.refineElement(e,nextIntent));
    const overlay:DesignOverlay={...JSON.parse(JSON.stringify(previous)),id:`overlay_${Date.now()}`,parentOverlayId:previous.id,version:previous.version+1,createdAt:now,createdBy:'ai',intent:nextIntent,elements,isApproved:false};
    const patches:OverlayPatch[]=this.diff(previous,overlay); return {overlay,patches};
  }
  private refineElement(e:ConceptElement,intent:AestheticIntent):ConceptElement{const next={...e,appearance:{...e.appearance}}; if(intent.palette?.length) next.appearance.color=intent.palette[0]; if(intent.materials?.length) next.appearance.material=intent.materials[0]; next.reasoning=`Refined from prior concept using: ${intent.prompt}`; return next;}
  private diff(a:DesignOverlay,b:DesignOverlay):OverlayPatch[]{const patches:OverlayPatch[]=[]; for(const be of b.elements){const ae=a.elements.find(x=>x.id===be.id || sameAnchor(x.anchor,be.anchor)); if(!ae)continue; if(JSON.stringify(ae.appearance)!==JSON.stringify(be.appearance)) patches.push({id:`patch_${be.id}`,overlayId:b.id,targetAnchor:be.anchor,operation:'style',path:`elements.${be.id}.appearance`,before:ae.appearance,after:be.appearance,rationale:'Incremental aesthetic refinement',createdAt:b.createdAt,author:'ai'}); } return patches;}
}
