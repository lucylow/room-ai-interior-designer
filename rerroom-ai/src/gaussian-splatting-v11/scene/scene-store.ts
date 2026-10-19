import type { Gaussian3D, GaussianScene, SceneAnchor } from '../core/types';
import { validateGaussian, validateAnchor } from '../core/invariants';
import { vec3 } from '../math/vec3';

export class GaussianSceneStore {
  private scenes=new Map<string,GaussianScene>();
  private anchors=new Map<string,SceneAnchor>();
  upsert(scene:GaussianScene):void { for(const s of scene.splats) validateGaussian(s); this.scenes.set(scene.id,scene); }
  get(id:string):GaussianScene { const scene=this.scenes.get(id); if(!scene) throw new Error(`Unknown scene ${id}`); return scene; }
  list():GaussianScene[] { return [...this.scenes.values()]; }
  addAnchor(anchor:SceneAnchor):void { validateAnchor(anchor); this.anchors.set(anchor.id,anchor); }
  getAnchor(id:string):SceneAnchor|undefined { return this.anchors.get(id); }
  boundsFromSplats(splats:Gaussian3D[]) {
    if(!splats.length) return {center:[0,0,0] as [number,number,number],radius:0,min:[0,0,0] as [number,number,number],max:[0,0,0] as [number,number,number]};
    let min=splats[0].mean,max=splats[0].mean,r=0;
    for(const s of splats){min=vec3.min(min,vec3.sub(s.mean,s.scale));max=vec3.max(max,vec3.add(s.mean,s.scale));r=Math.max(r,vec3.len(s.scale));}
    return {center:vec3.mul(vec3.add(min,max),0.5),radius:vec3.distance(min,max)*0.5+r,min,max};
  }
}
