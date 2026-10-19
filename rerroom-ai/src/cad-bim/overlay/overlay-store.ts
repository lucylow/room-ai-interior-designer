import { DesignOverlay, OverlayPatch } from '../core/types';
export class OverlayStore {
  private overlays:DesignOverlay[]=[]; private patches:OverlayPatch[]=[];
  create(overlay:DesignOverlay):DesignOverlay{this.overlays.push(JSON.parse(JSON.stringify(overlay)));return overlay;}
  get(id:string){return this.overlays.find(o=>o.id===id);}
  addPatch(patch:OverlayPatch):void{this.patches.push(JSON.parse(JSON.stringify(patch)));}
  patchesFor(overlayId:string):OverlayPatch[]{return this.patches.filter(p=>p.overlayId===overlayId);}
  approve(id:string):DesignOverlay{const o=this.get(id);if(!o)throw new Error('Overlay not found');o.isApproved=true;return o;}
  versions(overlayId:string){return this.overlays.filter(o=>o.parentOverlayId===overlayId||o.id===overlayId).sort((a,b)=>a.version-b.version);}
  all(){return JSON.parse(JSON.stringify(this.overlays));}
}
