import { AuthoritativeModel, DesignOverlay, SourceFeature } from '../core/types';
export interface ClearanceMapResult { values:Array<Record<string,string|number>>; warnings:string[]; }
export class ClearanceMap {
  /** calculates clearance samples around anchored objects. */
  run(model:AuthoritativeModel,overlay?:DesignOverlay):ClearanceMapResult {
    const values:Array<Record<string,string|number>>=[]; const warnings:string[]=[];
    const source=model.features.filter(f=>f.center||f.geometry2d||f.size);
    for(const f of source){
      const size=f.size||{width:0,depth:0,height:0}; const c=f.center||{x:0,y:0,z:0};
      values.push({featureId:f.id,kind:f.kind,x:Number(c.x.toFixed(4)),y:Number(c.y.toFixed(4)),z:Number(c.z.toFixed(4)),width:Number(size.width.toFixed(4)),depth:Number(size.depth.toFixed(4)),height:Number(size.height.toFixed(4))});
    }
    if(!source.length) warnings.push('No source geometry was available for this planning calculation.');
    if(overlay && overlay.elements.some(e=>!e.anchor)) warnings.push('Some AI concept elements are not source-anchored and remain illustrative.');
    return {values,warnings};
  }
}
