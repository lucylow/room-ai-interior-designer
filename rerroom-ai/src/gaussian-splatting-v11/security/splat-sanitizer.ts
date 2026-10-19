import type { Gaussian3D } from '../core/types';
export function sanitizeSplats(splats:Gaussian3D[]):Gaussian3D[]{return splats.filter(g=>g.id&&g.mean.every(Number.isFinite)&&g.scale.every(v=>Number.isFinite(v)&&v>0)&&Number.isFinite(g.opacity)).map(g=>({...g,opacity:Math.max(0,Math.min(1,g.opacity)),confidence:Math.max(0,Math.min(1,g.confidence)),sourceFrameIds:[...g.sourceFrameIds]}));}
export function stripSourceFrames(splats:Gaussian3D[]):Gaussian3D[]{return splats.map(g=>({...g,sourceFrameIds:[]}));}
