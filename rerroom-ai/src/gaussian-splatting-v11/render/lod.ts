import type { Gaussian3D, QualityTier, RenderCamera } from '../core/types';
import { vec3 } from '../math/vec3';
export interface LodPolicy {maxSplats:number;pixelThreshold:number;confidenceFloor:number;}
const POLICIES:Record<QualityTier,LodPolicy>={preview:{maxSplats:80_000,pixelThreshold:2.0,confidenceFloor:0.25},balanced:{maxSplats:220_000,pixelThreshold:1.1,confidenceFloor:0.15},high:{maxSplats:500_000,pixelThreshold:0.6,confidenceFloor:0.05},ultra:{maxSplats:1_500_000,pixelThreshold:0.25,confidenceFloor:0}};
export function selectLod(splats:Gaussian3D[],camera:RenderCamera,tier:QualityTier):Gaussian3D[]{const p=POLICIES[tier];return splats.filter(s=>s.confidence>=p.confidenceFloor).map(s=>({s,d:vec3.distance(s.mean,camera.pose.position),importance:(s.opacity*s.confidence)/(vec3.distance(s.mean,camera.pose.position)+0.1)})).sort((a,b)=>b.importance-a.importance).slice(0,p.maxSplats).map(x=>x.s);}
export function policyFor(tier:QualityTier):LodPolicy{return POLICIES[tier];}
