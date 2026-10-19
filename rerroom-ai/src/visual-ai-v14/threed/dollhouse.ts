import { SceneThreeD, Score, avg, clamp } from '../core/types';
export function evaluateDollhouse(scene:SceneThreeD):Score{
  const visible=scene.splats.filter(s=>s.opacity>0.03).length;
  const confidence=avg(scene.splats.slice(0,512).map(s=>s.confidence));
  const density=clamp(visible/Math.max(1,scene.splats.length));
  const value=clamp(density*0.45+confidence*0.35+(scene.semanticLabels ? Math.min(1,Object.keys(scene.semanticLabels).length/12):0)*0.2);
  return {value,confidence:clamp(0.6+Math.min(0.35,scene.splats.length/10000)),reasons:['dollhouse evaluated',`visible splats=${visible}`,`confidence=${confidence.toFixed(2)}`]};
}
