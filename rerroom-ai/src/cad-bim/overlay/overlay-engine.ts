import { AuthoritativeModel, DesignOverlay, SourceFeature } from '../core/types';
import { resolveAnchor } from '../core/anchors';
export interface ProjectedElement { id:string; sourceFeatureId?:string; position:{x:number;y:number;z:number}; size?:{width:number;depth:number;height:number}; appearance:Record<string,unknown>; }
export class OverlayEngine {
  project(model:AuthoritativeModel,overlay:DesignOverlay):ProjectedElement[]{return overlay.elements.map(e=>{const base=e.anchor?resolveAnchor(model,e.anchor):undefined; const center=base?.center||{x:0,y:0,z:0}; const delta=e.transformDelta?.position||{x:0,y:0,z:0}; const baseSize=base?.size; const size=e.dimensions||baseSize; return {id:e.id,sourceFeatureId:e.anchor?.sourceFeatureId,position:{x:center.x+delta.x,y:center.y+delta.y,z:center.z+delta.z},size,appearance:e.appearance};});}
  canApplyToConstruction(e:{anchor?:any}):boolean{return !!e.anchor;}
}
