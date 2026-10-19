import type { CameraIntrinsics, ProjectedSplat, RenderTarget } from '../core/types';
export interface CullReport {visible:ProjectedSplat[];culled:number;}
export function cullProjected(splats:ProjectedSplat[],target:RenderTarget,K:CameraIntrinsics):CullReport{const visible:ProjectedSplat[]=[];for(const s of splats){if(s.center[0]+s.radiusPx<0||s.center[1]+s.radiusPx<0||s.center[0]-s.radiusPx>=K.width||s.center[1]-s.radiusPx>=K.height||s.radiusPx<0.35)continue;if(s.depth<K.near||s.depth>K.far)continue;visible.push(s);}return {visible,culled:splats.length-visible.length};}
