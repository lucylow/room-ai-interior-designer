import { SceneTwoD, Score, clamp, distance2 } from '../core/types';
export function evaluatePlanStyling(scene:SceneTwoD):Score{
  const counts={segments:scene.segments.length,furniture:scene.furniture.length};
  const base=clamp((counts.segments>3?0.85:0.55)*0.55+(counts.furniture>0?0.85:0.45)*0.45);
  const reasons:string[]=['plan styling inspected'];
  if(scene.furniture.some((f,i)=>scene.furniture.some((g,j)=>i<j && distance2(f.center,g.center)<Math.max(f.size.w,g.size.w)*0.35))) reasons.push('possible furniture overlap');
  if(!scene.segments.length) reasons.push('missing plan segments');
  return {value:base,confidence:clamp(0.55+scene.segments.length/100),reasons};
}
