import type { SceneObject, SpatialScene } from '../core/types';
import { moveObject } from '../core/scene';

export type NudgeKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

export function nudgeDelta(key: NudgeKey, amount = 0.05) {
  const value=Math.max(0.001,amount);
  switch(key){
    case 'ArrowUp': return {x:0,y:0,z:-value};
    case 'ArrowDown': return {x:0,y:0,z:value};
    case 'ArrowLeft': return {x:-value,y:0,z:0};
    case 'ArrowRight': return {x:value,y:0,z:0};
  }
}

export function nudgeObject(scene: SpatialScene, object: SceneObject, key: NudgeKey, amount=0.05): SpatialScene {
  if(object.locked) return scene;
  return moveObject(scene,object.id,nudgeDelta(key,amount));
}

export function isNudgeKey(key:string): key is NudgeKey {
  return key==='ArrowUp'||key==='ArrowDown'||key==='ArrowLeft'||key==='ArrowRight';
}
