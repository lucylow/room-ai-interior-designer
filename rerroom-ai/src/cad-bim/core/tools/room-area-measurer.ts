import { AuthoritativeModel } from '../types';
export interface ToolResult { values:Array<Record<string,number|string>>; warnings:string[]; }
export class RoomAreaMeasurer {
  run(model:AuthoritativeModel):ToolResult {
    const warnings:string[]=[]; const values:Array<Record<string,number|string>>=[];
    for(const f of model.features){ if(!f.center && !f.geometry2d && !f.size) continue; const center=f.center||{x:0,y:0,z:0}; const size=f.size||{width:0,depth:0,height:0}; values.push({featureId:f.id,x:Number(center.x.toFixed(4)),y:Number(center.y.toFixed(4)),z:Number(center.z.toFixed(4)),width:Number(size.width.toFixed(4)),depth:Number(size.depth.toFixed(4)),height:Number(size.height.toFixed(4))}); }
    if(!values.length) warnings.push('No geometry-bearing source features available.');
    return {values,warnings};
  }
}
