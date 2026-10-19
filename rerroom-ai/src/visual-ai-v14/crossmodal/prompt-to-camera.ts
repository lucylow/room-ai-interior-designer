import { clamp, Score, Vec3 } from '../core/types';
export interface AlignmentInput { sourceId:string; targetId:string; translation?:Vec3; scale?:number; confidence:number; }
export function evaluatePromptToCamera(x:AlignmentInput):Score{
  const t=x.translation ? Math.hypot(x.translation.x,x.translation.y,x.translation.z):0;
  const scale=1-Math.min(0.5,Math.abs((x.scale??1)-1));
  const value=clamp(x.confidence*0.65+scale*0.25+(t<0.02?0.1:Math.max(0,0.1-t)));
  return {value,confidence:clamp(x.confidence),reasons:['prompt-to-camera alignment',`translation=${t.toFixed(3)}`,`scale=${(x.scale??1).toFixed(3)}`]};
}
