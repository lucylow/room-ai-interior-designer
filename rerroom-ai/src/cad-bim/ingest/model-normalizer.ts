import { SourceFeature, AuthoritativeModel } from '../core/types';
import { getCoordinateTransform, CoordinatePreset } from './coordinate-system';
export function normalizeFeature(feature:SourceFeature,preset:CoordinatePreset,scaleToMeters:number):SourceFeature {
  const t=getCoordinateTransform(preset); const clone:SourceFeature=JSON.parse(JSON.stringify(feature));
  if(clone.center) clone.center=t.apply({x:clone.center.x*scaleToMeters,y:clone.center.y*scaleToMeters,z:clone.center.z*scaleToMeters});
  if(clone.size) clone.size={width:clone.size.width*scaleToMeters,depth:clone.size.depth*scaleToMeters,height:clone.size.height*scaleToMeters};
  if(clone.geometry2d) clone.geometry2d={points:clone.geometry2d.points.map(p=>({x:p.x*scaleToMeters,y:p.y*scaleToMeters}))};
  if(clone.transform){ clone.transform.position=t.apply({x:clone.transform.position.x*scaleToMeters,y:clone.transform.position.y*scaleToMeters,z:clone.transform.position.z*scaleToMeters}); }
  return clone;
}
export function normalizeModel(model:AuthoritativeModel,preset:CoordinatePreset,scale:number):AuthoritativeModel {
  return {...model,features:model.features.map(f=>normalizeFeature(f,preset,scale))};
}
