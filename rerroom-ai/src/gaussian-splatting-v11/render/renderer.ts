import type { GaussianScene, RenderCamera, RenderMode, RenderResult, RenderTarget } from '../core/types';
import { projectGaussian } from '../math/projection';
import { cullProjected } from './culler';
import { rasterizeCpu } from './compositor';

export class CpuGaussianRenderer {
  render(scene:GaussianScene,camera:RenderCamera,target:RenderTarget,mode:RenderMode='rgb'):RenderResult{
    const start=Date.now();const projected=[];for(const g of scene.splats){const p=projectGaussian(g,camera.pose,camera.intrinsics,target.tileSize);if(p)projected.push(p);}const culled=cullProjected(projected,target,camera.intrinsics);const result=rasterizeCpu(culled.visible,target,mode,Date.now()-start);result.culledSplats=scene.splats.length-culled.visible.length;result.visibleSplats=culled.visible.length;return result;
  }
}
